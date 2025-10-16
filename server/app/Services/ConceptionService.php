<?php
namespace App\Services;

use App\Models\Conception;

class ConceptionService {
    /**
     * getting conceptions
     */
    public function getConceptions() {
        return Conception::all();
    }
}