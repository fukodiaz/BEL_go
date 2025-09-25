<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Payment;
use App\Models\Booking;

class YookassaWebhookController extends Controller
{
    const EVENTS_LIST = [
        'payment.succeeded',
        'payment.canceled',
    ];

    /**
     * handling ykassa-webhook with recording logs
     */
    public function handleWebhook(Request $req) {
        $data = $req->all();

        if (!isset($data['event']) || !in_array($data['event'], self::EVENTS_LIST)) {
            Log::channel('checking')->info('Payment from yookassa_webhook - unhandled case');
            return response()->json(['message' => 'Unhandled case']);
        }

        $paymentId = $data['object']['id'] ?? null;
        $status = $data['object']['status'] ?? null;

        //update info payment
        if ($paymentId && $status) {
            $payment = Payment::where('payment_id', $paymentId)->first();
            if ($payment) {
                $payment->status = $status;
                $payment->save();

                //update related booking record
                $booking = Booking::find($payment->booking_id);
                if ($booking) {
                    $booking->status = 'confirm';
                    $booking->save();
                }
            }
        }

        $paymentUpdated = ['event' => $data['event'], 'paymentId' => $paymentId, 'status' => $status];
        Log::channel('checking')->info(json_encode($paymentUpdated));
        return response()->json(['message' => 'Data from webhook is handled'], 200);
    }
}
