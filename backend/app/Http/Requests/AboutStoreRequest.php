<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AboutStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'image' => ['nullable', 'string', 'max:255'],
            'mission' => ['required', 'string'],
            'vision' => ['required', 'string'],
        ];
    }
}