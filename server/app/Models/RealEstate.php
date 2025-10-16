<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

use App\Traits\HasFilter;

class RealEstate extends Model
{
    use HasFactory;
    use HasFilter;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'city_id',
        'imageIntro',
        'imageDetails',
        'price',
        'conception_id',
        'descriptionShort',
        'information',
        'address_id',
        'slug',
    ];

    protected $table = 'real_estate';
    protected $with = ['address', 'conception', 'city'];

    public function address():BelongsTo 
    {
        return $this->belongsTo(Address::class);
    }

    public function conception():BelongsTo 
    {
        return $this->belongsTo(Conception::class);
    }

    public function city():BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function users():BelongsToMany {
        return $this->belongsToMany(User::class)->withPivot('liked', 'rating');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
