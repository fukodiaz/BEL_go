<?php
namespace App\Services\Admin;

use Illuminate\Validation\ValidationException;
use App\Models\User;

class UserService 
{
    /**
     * geting all users
     */
    public function getUsers() {
        return User::all();
    }

    /**
     * create user
     */
    public function createUser($data) {
        $user = User::create([
            'name' => $data->name ? $data->name : '',
            'email' => $data->email,
            'password' => bcrypt($data->password),
            'role' => $data->role
        ]);

        return $user;
    }

    /**
     * edit user
     */
    public function editUser($data) {
        $user = User::findOrFail($data->id);
        $user->name = !empty($data->name) ? $data->name : $user->name;
        $user->email = !empty($data->email) ? $data->email : $user->email;
        $user->password = !empty($data->password) ? bcrypt($data->password) : $user->password;
        $user->role = !empty($data->role) ? $data->role : $user->role;
        $user->save();
        
        return $user;
    }

    /**
     * delete user
     */
    public function delete($id) {
        $user = User::find($id);

        if ($user) {
            $user->delete();
            return ['data' => true];
        }

        throw ValidationException::withMessages([ 'message' => __("Couldn't delete user") ]);
    }
}