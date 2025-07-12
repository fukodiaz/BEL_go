<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\Api\Auth\Spa\LoginController;
use App\Http\Controllers\Api\Auth\Spa\SignupController;
use App\Http\Controllers\RealEstateController;
use App\Http\Controllers\ConceptionController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\RatingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

require_once __DIR__ . '/old_routes.php';

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function() {
    Route::post('/signup', SignupController::class)->middleware('guest');
    Route::post('/login', LoginController::class)->middleware('guest');
    
    Route::middleware('auth:sanctum')->group(function() {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::post('/like', [LikesController::class, 'alterLike']);
        Route::get('/likes', [LikesController::class, 'getLikes']);
        Route::post('/rating', [RatingController::class, 'addRating']);
    });
    
    // Route::post('/like', LikesController::class)->middleware('auth:sanctum');
    // Route::get('/likes', LikesController::class)->middleware('auth:sanctum');

    Route::prefix('real_estate')->group(function() {
        Route::match(['get', 'post'], '/', [RealEstateController::class, 'receiveItems']);
        Route::match(['get', 'post'], '/category/{category}', [RealEstateController::class, 'receiveItems']);
        Route::get('/{slug:slug}', [RealEstateController::class, 'getItem'])->name('real_estate.item');
    });

    Route::get('/conceptions', [ConceptionController::class, 'getConceptions']);
});