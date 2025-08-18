<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\YooKassaService;
use Illuminate\Support\Str;

class PaymentController extends Controller {

    /**
     * handling request payment
     */
    public function payment(Request $req, YooKassaService $yooKassa) {
        $amount = (float)$req->amount;
        if (empty($amount) || $amount <=0)
            abort(400, 'Invalid data of amount payment');

        $urlReturn = $req->urlReturn;
        if (!Str::isUrl($urlReturn))
            abort(400, 'Invalid url for redirect');


        $payment = $yooKassa->createPayment($amount, $req->description, $urlReturn);

        return ['urlConfirm' => $payment->getConfirmation()->getConfirmationUrl()];
        // return $payment;
    }
}
