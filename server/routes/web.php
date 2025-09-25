<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Http\Controllers\Api\Auth\Spa\LoginController;
use App\Http\Controllers\Api\Auth\Spa\SignupController;
use App\Http\Controllers\Api\Auth\Admin\SigninController;
use App\Http\Controllers\RealEstateController;
use App\Http\Controllers\ConceptionController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Admin\AdminRealEstateController;
use App\Http\Controllers\Admin\AdminUserController;

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

Route::prefix('admin')->group(function() {
    Route::middleware(['auth.sanctum.redirect'])->group(function() {
        Route::get('/', fn() => Inertia::render('Admin/Main'))->name('admin.main');
        Route::prefix('real_estate')->group(function() {
            Route::get('/', [AdminRealEstateController::class, 'getRealEstate'])->name('admin.real_estate');
        });
        // Route::get('/real_estate', fn() => Inertia::render('Admin/RealEstate'))->name('admin.real_estate');
        Route::get('/bookings', fn() => Inertia::render('Admin/Bookings'))->name('admin.bookings');
        Route::prefix('users')->group(function() {
            Route::get('/', [AdminUserController::class, 'showPage'])->name('admin.users.show');
            Route::post('/', [AdminUserController::class, 'createUser'])->name('admin.user.create');
            Route::put('/', [AdminUserController::class, 'editUser'])->name('admin.user.edit');
        });
    });

    Route::prefix('login')->group(function() {
        Route::get('/', [SigninController::class, 'showPage'])->name('admin.index');
        Route::post('/', [SigninController::class, 'signin'])->name('admin.signin');
    });
});

// Route::get('/admin/{any?}', function () {
//     return view('admin');
// })->where('any', '.*');

// Route::prefix('admin')->group(function() {
//     Route::get('/', fn() => Inertia::render('Admin/Main'))->name('admin.main');
//     Route::get('/real_estate', fn() => Inertia::render('Admin/RealEstate'))->name('admin.real_estate');
//     Route::get('/bookings', fn() => Inertia::render('Admin/Bookings'))->name('admin.bookings');
// });

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

        Route::post('/payment', [PaymentController::class, 'payment']);
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