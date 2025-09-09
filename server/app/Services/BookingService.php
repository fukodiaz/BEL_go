<?
namespace App\Services;

use App\Models\Booking;

class BookingService {

    public function makeBooking($real_estate_id, $check_in, $check_out, $status) {
        //check date intersection
        $rangeIntersec = Booking::where('real_estate_id', $real_estate_id)
                                ->where('status', 'confirm')
                                ->where(function($query) use ($check_in, $check_out) {
                                    $query->where('check_in', '<=' , $check_out)
                                          ->where('check_out', '>=' , $check_in);
                                })
                                ->exists();

        if ($rangeIntersec) {
            // abort(400, json_encode(['check_in'=> $check_in, 'check_out' => $check_out, '$rangeIntersec' => $rangeIntersec]));
            abort(400, "There is an intersection of booking dates");
        }

        //make booking record 
        $booking_record = Booking::create([
            'real_estate_id' => $real_estate_id,
            'user_id' => request()->user()->id,
            'check_in' => $check_in,
            'check_out' => $check_out,
            'status' => $status
        ]);

        return $booking_record;
    }

    /**
     * receive confirmed bookings
     */
    public function receiveBookings($real_estate_id) {
        return Booking::where('real_estate_id', $real_estate_id)
                        ->where('status', 'confirm')
                        ->get();
    }
}