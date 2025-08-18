<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Offer;
use App\Models\Conception;
use App\Models\RealEstate;
use Illuminate\Support\Facades\Auth;
use App\Models\RealEstateUser;

use App\Filters\RealEstateFilter;

class RealEstateController extends Controller
{
    /**
     * receive all filtered real estate
     */
    public function receiveItems(Conception $category = null, RealEstateFilter $filter) {
        //  dd(request()->all());
        if ($category && $category->exists) {
            // $items = $category->real_estate->dump();
            $items = $category->real_estate()->filter($filter)->get();
        } else {
            $items = RealEstate::filter($filter)->get();
        }

        //check authenticated user
        if ($user = Auth::user()) {
            // $itemsLiked = $user->real_estate()->pluck('real_estate.id');  
            $itemsLiked = $user->real_estate()->wherePivot('liked', 1)->pluck('real_estate.id');

            if ($itemsLiked->isNotEmpty() && $items->isNotEmpty()) {
                $items->map(function($item, $key) use ($itemsLiked) {
                    $item['liked'] = $itemsLiked->contains($item->id);
                    return $item;
                });
            }
        }

        //receive avg-rating from pivot table
        $data_rating = RealEstateUser::getAvgRatings();
        $items = self::mapWithRating($items, $data_rating);

        return $items;
    }

    /**
     * receive instance of real estate by slug
     */
    public function getItem(RealEstate $slug) {
        // $item = RealEstate::where('slug', $slug)->firstOrFail();
        $item = $slug;
        $data_rating = RealEstateUser::getAvgRating($item->id);
        $item['rating'] = !empty($data_rating) ? $data_rating['rating'] : null;

        return $item;
    }

    /**
     * map collection real_estate with selected rating data 
     */
    public static function mapWithRating($items, $data_rating) {
        if ($data_rating->isNotEmpty() && $items->isNotEmpty()) {
            $items->map(function($item, $key) use ($data_rating) {
                if ($objRating = $data_rating->firstWhere('real_estate_id', $item->id))
                    $item['rating'] = $objRating->rating;
                return $item;
            }); 

            return $items;
        }
    }
}
