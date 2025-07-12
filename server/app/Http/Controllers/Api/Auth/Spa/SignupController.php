<?php

namespace App\Http\Controllers\Api\Auth\Spa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;  
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class SignupController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'min:7'],
            'repeat_pw' => ['required', 'same:password']
        ]);

         $credentials['password'] = Hash::make($credentials['password']);

        if (User::create([
                'email' => $credentials['email'], 
                'password' => $credentials['password'],
                'name' => isset($credentials['name']) ? $credentials['name'] : '' 
            ])) {
            $request->session()->regenerate();

            return response()->json(['message' => __('Your account was created')]);
        }

        return response()->json(['message' => __('Couldnt create account')], 401);
    }
}