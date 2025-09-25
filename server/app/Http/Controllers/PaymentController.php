<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\YooKassaService;
use App\Services\BookingService;
use Carbon\Carbon;

class PaymentController extends Controller {

    /**
     * handling request payment
     */
    public function payment(Request $req, YooKassaService $yooKassa, BookingService $bookService) {     
        $validator = Validator::make($req->all(), [
            'amount' => ['required', 'numeric', 'gt:0'],
            'urlReturn' => ['required', 'url'],
            'startDate' => ['required', 'date'],
            'endDate' => ['required', 'date'],
            // 'real_estate_id' => ['required', 'integer', 'exists:real_estate, id']
            'real_estate_id' => ['required', 'integer']
        ]);

        if ($validator->fails()) {
            abort(400, $validator->errors()->first());
        }

        //logic with booking real_estate
        $booking = $bookService->makeBooking($req->real_estate_id, $req->startDate, $req->endDate, 'pending');
        //calculating total amount
        $qDays = Carbon::parse($req->startDate)->diffInDays(Carbon::parse($req->endDate)) + 1;
        $amount = $qDays*$req->amount;

        $payment = $yooKassa->createPayment($amount, $req->description, $req->urlReturn, $booking->id);

        return ['urlConfirm' => $payment->getConfirmation()->getConfirmationUrl()];
        // return $payment;
    }
}
