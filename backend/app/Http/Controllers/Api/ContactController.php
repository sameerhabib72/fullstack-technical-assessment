<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactStoreRequest;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    //

    public function store(ContactStoreRequest $request)
    {
        $message = \App\Models\ContactMessage::create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Your message has been sent successfully!',
            'data' => $message
        ], 201);
    }
}
