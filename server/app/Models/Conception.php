<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conception extends Model
{
    use HasFactory;

    public function real_estate(): HasMany {
        return $this->hasMany(RealEstate::class); 
    } 

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
