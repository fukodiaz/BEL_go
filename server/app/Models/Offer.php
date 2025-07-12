<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Traits\HasFilter;

class Offer extends Model
{
    use HasFactory, HasFilter;

    protected $fillable = [
        'city',
        'imageIntro',
        'imageDetails',
        'price',
        'rating',
        'concept',
        'descriptionShort',
        'information',
        'lat',
        'lng'
    ];
}
