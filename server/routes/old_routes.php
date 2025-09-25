<?php 
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CityController;
use App\Http\Controllers\OfferController;

Route::prefix('api')->group(function() {
    Route::get('/dataCities', [CityController::class, 'dataCities']);
    Route::get('/offers', [OfferController::class, 'offers']);
});