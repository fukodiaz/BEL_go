<?php

namespace App\Http\Controllers\Api\Auth\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;  
use App\Services\Auth\AuthService;
use Inertia\Inertia;

class SigninController extends Controller
{
    /**
     * traversing a route with admin signin
     */
    public function showPage() {
        
        return Inertia::render('Admin/Auth');
    }

    /**
     * Handle the incoming request.
     */
    public function signin(Request $request, AuthService $service)
    {
       return $service->login($request, 'admin');
    }
}