<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PortfolioStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'url' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer'],
        ];
    }
}