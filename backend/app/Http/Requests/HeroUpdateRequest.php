<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HeroUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'subtitle' => ['sometimes', 'string', 'max:500'],
            'cta_text' => ['sometimes', 'string', 'max:100'],
            'cta_url' => ['sometimes', 'string', 'max:255'],
            'background_image' => ['sometimes', 'string', 'max:255'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}