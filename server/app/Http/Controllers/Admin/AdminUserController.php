<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Admin\UserService;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\EditUserRequest;
use Inertia\Inertia;
// use App\Models\Booking;

class AdminUserController extends Controller
{
    public function showPage(Request $req, UserService $service) {
        $users = $service->getUsers();

        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }

    public function createUser(CreateUserRequest $req, UserService $service) {
        $user = $service->createUser($req);

        //return response()->json(['createUser' => $req->all()]);
        return response()->json(['createdUser' => $user]);
    }

    public function editUser(EditUserRequest $req, UserService $service) {
        $editedUser = $service->editUser($req);

        return response()->json(['editedUser' => $editedUser]);
    }
}