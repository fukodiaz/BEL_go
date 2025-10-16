<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255', 'min:5'],
            'email' => ['sometimes', 'string', 'email'],
            'password' => ['sometimes', 'string', 'min:7'],
            'role' => ['nullable', 'string', 'max:15'],
            'id' => ['required', 'integer']
        ];
    }
}