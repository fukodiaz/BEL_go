<?php
namespace App\Services;

use App\Models\RealEstateUser;
use App\Models\RealEstate;
use App\Models\Conception;
use Illuminate\Support\Facades\Auth;
use App\Filters\RealEstateFilter;

class RealEstateService
{
    /**
     * receive all filtered real estate
     */
    public function receiveItems(Conception $category = null, RealEstateFilter $filter, $isPagin =false) {
        //  dd(request()->all());
        if ($category && $category->exists) {
            // $items = $category->real_estate->dump();
            $items = $category->real_estate()->filter($filter);
            $items = $this->checkPagination($items, $isPagin, 7);
        } else {
            $items = RealEstate::filter($filter);
            $items = $this->checkPagination($items, $isPagin, 7);
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

    private function checkPagination($items, $isPagin, $qItems=7) {
        if ($isPagin) {
            $items = $items->simplePaginate($qItems);
        } else {
            $items = $items->get();
        }

        return $items;
    }
}