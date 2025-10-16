<?php
namespace App\Services;

use App\Models\City;

class CityService {
    /**
     * receive cities
     */
    public function getCities() {
        return City::all();
    }
}