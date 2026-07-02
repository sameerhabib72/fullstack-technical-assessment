<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FaqUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'question' => ['sometimes', 'string', 'max:255'],
            'answer' => ['sometimes', 'string'],
            'category' => ['nullable', 'string', 'max:100'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}