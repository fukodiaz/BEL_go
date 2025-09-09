<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Conception;
use App\Filters\RealEstateFilter;
use App\Services\RealEstateService;
use Illuminate\Http\Request;
use Inertia\Inertia;
// use App\Models\Booking;

class AdminRealEstateController extends Controller
{
    public function getRealEstate(
        RealEstateFilter $filter, 
        RealEstateService $service)
    {
        $items = $service->receiveItems(null, $filter, true);
        return Inertia::render('Admin/RealEstate', [
            'items' => $items
        ]);
    }
}