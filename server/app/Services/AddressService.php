<?php
namespace App\Services;

use App\Models\Address;
use App\Models\City;

class AddressService {

    /**
     * create address
     */
    public function createAddress(
        string $city_name, 
        int|float $lat, 
        int|float $lng): Address 
    {
        $address = Address::create([
            'city_name' => $city_name,
            'lat' => $lat,
            'lng' => $lng
        ]);

        return $address;
    }

    /**
     * check existence address
     * @param int|float $lat
     * @param int|float $lng
     * @param int $city_id
     */
    public function checkAddress(
        int|float $lat, 
        int|float $lng, 
        int $city_id) 
    {
        $address = Address::where('lat', $lat)
                          ->where('lng', $lng)
                          ->first();
        //existing address
        if ($address) {
            return $address['id'];
        } else {
            //create new address
            $city = City::findOrFail($city_id);
            $new_addr = $this->createAddress($city['label'], $lat, $lng);

            return $new_addr->id;
        }
    }


}
