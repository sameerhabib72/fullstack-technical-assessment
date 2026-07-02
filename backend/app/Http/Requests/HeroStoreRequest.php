<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HeroStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['required', 'string', 'max:500'],
            'cta_text' => ['required', 'string', 'max:100'],
            'cta_url' => ['required', 'string', 'max:255'],
            'background_image' => ['required', 'string', 'max:255'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}