<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'real_estate_id',
        'user_id',
        'check_in',
        'check_out',
        'status'
    ];
}
