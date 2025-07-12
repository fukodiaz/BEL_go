<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\DB;

class RealEstateUser extends Pivot
{
    protected $table = 'real_estate_user';

    /**
     * count average ratings for real_estate
     */
    protected static function avgRatingQuery() {
        return self::select('real_estate_id', DB::raw('ROUND(AVG(rating), 0) as rating'))
                   ->groupBy('real_estate_id');
    }

    public static function getAvgRatings() {
        return self::avgRatingQuery()->get();
    }

    public static function getAvgRating(int $id) {
        return self::avgRatingQuery()
                    ->having('real_estate_id', $id)
                    ->first();
    }
}
