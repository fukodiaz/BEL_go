<?
namespace App\Services;

use YooKassa\Client;
use App\Models\Payment;

class YooKassaService {
    protected $client;

    public function __construct () {
        /**
         * create object of client
         */
        $this->client = new Client();
        $this->client->setAuth(env('YKASSA_SHOP_ID'), env('YKASSA_SECRET_KEY'));
    }

    /**
     * receive instance of payment
     */
    public function createPayment($amount, $description, $urlReturn) {
        // create payment
        $payment = $this->client->createPayment([
            'amount' => [
                'value' => number_format($amount, 2, '.', ''),
                // 'currency' => 'EUR'
                'currency' => 'RUB'
            ],
            'confirmation' => [
                'type' => 'redirect',
                'return_url' => $urlReturn 
            ],
            'capture' => true,
            'description' => $description
        ], uniqid('', true));

        //save payment in table
        Payment::create([
            'payment_id'=>$payment->getId(),
            'user_id'=> request()->user()->id,
            'amount'=>$payment->getAmount()->getValue(),
            'currency'=>$payment->getAmount()->getCurrency(),
            'status'=>$payment->getStatus(),
            'description'=>$description

        ]);

        return $payment;
    }
}