<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conception;

class ConceptionController extends Controller
{
    public function getConceptions(Request $req) {
        return Conception::all();
    }
}
