<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RealEstateUser;
use App\Http\Controllers\RealEstateController;

class LikesController extends Controller
{
    /**
     * update like for real estate
     */
    public function alterLike(Request $req) {
        $idOffer = $req->idOffer;

        if (empty($idOffer)) {
            abort(400, 'Invalid data from request');
        }

        $user = $req->user();
        $item = $user->real_estate()->where('real_estate.id', $idOffer)->first();

        if ($item) {
            $pivot = $item->pivot;

            if ($pivot) {
                $newLiked = !$pivot->liked;
                $user->real_estate()->updateExistingPivot($idOffer, ['liked' => $newLiked]);

                return ['id' => $idOffer, 'liked' => $newLiked];
            }
        }

        $user->real_estate()->attach($idOffer, ['liked' => true]);
        return ['id' => $idOffer, 'liked' => true];
    }

    /**
     * receive liked real estate
     */
    public function getLikes(Request $req) {
        $items = $req->user()->real_estate()->wherePivot('liked', 1)->get();

        //receive avg-rating from pivot table
        $data_rating = RealEstateUser::getAvgRatings();
        $items = RealEstateController::mapWithRating($items, $data_rating);

        return $items;
    }
}
