<?php
namespace App\Services\Auth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;  
use Illuminate\Http\Request;

class AuthService {

    /**
     * general logic for login user
     */
    public function login(Request $request, $role='') {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            if (!empty($role) && Auth::user()->role != 'admin') {
                throw ValidationException::withMessages([
                    'role' => __('User without admin rights')
                ]);
            }

            return response()->json(['message' => __('Welcome!')]);
        }

        throw ValidationException::withMessages([
            'email' => __('The checked credentials dont match our records')
        ]);
    } 
}