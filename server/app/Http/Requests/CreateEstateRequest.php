<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateEstateRequest extends FormRequest
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
            'slug' => ['required', 'string', 'min:3'],
            'descriptionShort' => ['required', 'string', 'min:5'],
            'information' => ['nullable', 'string'],
            'city_id' => ['required', 'integer'],
            'conception_id' => ['required', 'integer'],
            'address_lat' => ['required', 'numeric'],
            'address_lng' => ['required', 'numeric'],
            'price' => ['required', 'numeric'],
            'imageIntro' => ['nullable', 'string'],
            'imageDetails' => ['nullable', 'string'],
            'id' => ['sometimes']
        ];
    }
}
