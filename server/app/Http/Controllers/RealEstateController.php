<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Offer;
use App\Models\Conception;
use App\Models\RealEstate;
use Illuminate\Support\Facades\Auth;
use App\Models\RealEstateUser;
use App\Services\BookingService;
use App\Services\RealEstateService;

use App\Filters\RealEstateFilter;

class RealEstateController extends Controller
{
    /**
     * receive all filtered real estate
     */
    public function receiveItems(Conception $category = null, RealEstateFilter $filter, RealEstateService $service) {
        $items = $service->receiveItems($category, $filter);

        return $items;
    }

    /**
     * receive instance of real estate by slug
     */
    public function getItem(RealEstate $slug, BookingService $bookService) {
        // $item = RealEstate::where('slug', $slug)->firstOrFail();
        $item = $slug;
        $data_rating = RealEstateUser::getAvgRating($item->id);
        $item['rating'] = !empty($data_rating) ? $data_rating['rating'] : null;

        //get confirmed bookings
        $item['bookings'] = $bookService->receiveBookings($item->id);
        
        return $item;
    }
}
