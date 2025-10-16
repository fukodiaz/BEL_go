<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;  
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
        return response()->json(['user' => $user]);
    }

    public function editUser(EditUserRequest $req, UserService $service) {
        $editedUser = $service->editUser($req);

        return response()->json(['user' => $editedUser]);
    }

    public function delete(Request $req, UserService $service) {
        $id = (int)$req->id;
        if (empty($id)) 
            throw ValidationException::withMessages([ 'id' => __('Something is wrong with id of user') ]);

        $deleted = $service->delete($id);

        return response()->json(['deleted' => $deleted]);
    }
}