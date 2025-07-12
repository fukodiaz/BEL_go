<?php

namespace App\Http\Controllers;

use App\Models\RealEstateUser;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function addRating(Request $req) {
        $idOffer = $req->idOffer;
        $rating = (int)$req->rating;

        /**
        * check validation of data from request
        */
        if (empty($idOffer) || empty($rating) || $rating<1 || $rating>5)
            abort(400, 'Invalid data from request');

        
        $user = $req->user();
        $item = $user->real_estate()->where('real_estate.id', $idOffer)->first();

        /**
        * if record exists in pivot table then update it else attach new record
        */
        if ($item) {
            $user->real_estate()->updateExistingPivot($idOffer, ['rating' => $rating]);

            $data_rating = RealEstateUser::getAvgRating($idOffer);
            return ['id' => $idOffer, 'rating' => $data_rating['rating'], 'updating'=> true];
        }

        $user->real_estate()->attach($idOffer, ['rating' => $rating]);
        $data_rating = RealEstateUser::getAvgRating($idOffer);
        return ['id' => $idOffer, 'rating' => $data_rating['rating'], 'attach' => true]; 
    }
}
