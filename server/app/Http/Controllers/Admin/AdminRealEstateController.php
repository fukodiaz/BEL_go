<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Conception;
use App\Models\RealEstate;
use App\Filters\AdminRealEstateFilter;
use App\Services\RealEstateService;
use App\Services\CityService;
use App\Services\ConceptionService;
use App\Services\Admin\AdminEstateService;
use App\Services\AddressService;
use App\Http\Requests\EditEstateRequest;
use App\Http\Requests\CreateEstateRequest;
use Illuminate\Validation\ValidationException; 
use Illuminate\Http\Request;
use Inertia\Inertia;
// use App\Models\Booking;

class AdminRealEstateController extends Controller
{
    public function getRealEstate(
        AdminRealEstateFilter $filter, 
        RealEstateService $service)
    {
        $items = $service->receiveItems(null, $filter, true);
        return  [
            'items' => $items
        ];
    }

    public function showPage(
        AdminRealEstateFilter $filter, 
        RealEstateService $service)
    {
        $items = $service->receiveItems(null, $filter, true);
        return Inertia::render('Admin/RealEstate', [
            'items' => $items
        ]);
    }

    public function showFormPage(
        RealEstateService $estate_serv, 
        CityService $city_serv,
        ConceptionService $concep_serv
        ) {
        $item = null;
        $cities = [];
        $conceptions = [];

        if ($slug = request()->slug) {
            $item = $estate_serv->getItemBySlug($slug);
        }
        if ($city_serv) {
            $cities = $city_serv->getCities(); 
        }
        if ($concep_serv) {
            $conceptions = $concep_serv->getConceptions(); 
        }

        return Inertia::render('Admin/RealEstateFormPage', [
            'item' => $item,
            'cities' => $cities,
            'conceptions' => $conceptions
        ]);
    }

    /**
     * create new real estate
     */
    public function createEstate(
        CreateEstateRequest $req, 
        AdminEstateService $est_serv,
        AddressService $addr_serv
        ) 
    {
        $estate = $est_serv->createEstate($req, $addr_serv);

        return response()->json(['estate' => $estate]);
    }

    /**
     * edit real estate
     */
    public function editEstate(
        EditEstateRequest $req, 
        AdminEstateService $est_serv,
        AddressService $addr_serv
        ) 
    {
        $estate = $est_serv->editEstate($req, $addr_serv);

        return response()->json(['estate' => $estate]);
    }

    /**
     * delete real estate
     */
    public function delete(Request $req, AdminEstateService $est_serv) {
        $id = (int)$req->id;
        if (empty($id)) 
            throw ValidationException::withMessages([ 'id' => __('Something is wrong with param of real estate') ]);

        $deleted = $est_serv->delete($id);

        return response()->json(['deleted' => $deleted]);
    }
}