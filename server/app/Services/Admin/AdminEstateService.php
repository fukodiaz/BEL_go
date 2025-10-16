<?php
namespace App\Services\Admin;

use Illuminate\Validation\ValidationException;
use App\Services\AddressService;
use App\Http\Requests\EditEstateRequest;
use App\Http\Requests\CreateEstateRequest;
use App\Models\RealEstate;

class AdminEstateService {

    /**
     * create real estate
     */
    public function createEstate(CreateEstateRequest $data, AddressService $addr_serv) {
        $addr_id = $addr_serv->checkAddress($data->address_lat, $data->address_lng, $data->city_id);

        $estate = RealEstate::create([
            'city_id' => $data['city_id'],
            'imageIntro' => $data['imageIntro'],
            'imageDetails' => $data['imageDetails'],
            'price' => $data['price'],
            'conception_id' => $data['conception_id'],
            'descriptionShort' => $data['descriptionShort'],
            'information' => $data['information'],
            'address_id' => $addr_id,
            'slug' => $data['slug'],
        ]);

        return $estate;
    }

    /**
     * edit real estate
     */
    public function editEstate(EditEstateRequest $data, AddressService $addr_serv) {
        //find real estate
        $estate = RealEstate::findOrFail($data->id);
        //find or create address
        $addr_id = $addr_serv->checkAddress($data->address_lat, $data->address_lng, $data->city_id);

        $estate->fill($data->only(['city_id', 'imageIntro', 'imageDetails', 'price', 'conception_id', 'descriptionShort', 'information', 'slug']));
        $estate->address_id = $addr_id;
        $estate->save();

        return $estate;
    }

    /**
     * delete real estate from db
     */
    public function delete(int $id) {
        $estate = RealEstate::find($id);

        if ($estate) {
            $estate->delete();
            return ['data' => true];
        }

        throw ValidationException::withMessages([ 'message' => __("Couldn't delete real estate") ]);
    }
}