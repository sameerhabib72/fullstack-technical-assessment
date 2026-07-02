<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\ContactStoreRequest;
use App\Http\Resources\ContactMessageResource;
use App\Services\ContactService;
use Illuminate\Http\Request;

class ContactController extends BaseController
{
    public function __construct()
    {
        $this->service = app(ContactService::class);
        $this->resource = ContactMessageResource::class;
        $this->storeRequest = ContactStoreRequest::class;
    }

    public function store(Request $request)
    {
        try {
            $validated = app($this->storeRequest)->validated();
            $data = $this->service->createContactMessage($validated);
            
            return $this->successResponse(
                new $this->resource($data),
                'Your message has been sent successfully!',
                201
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 422);
        }
    }

    public function markAsRead($id)
    {
        try {
            $data = $this->service->markAsRead($id);
            return $this->successResponse(
                new $this->resource($data),
                'Message marked as read'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 404);
        }
    }

    public function unreadCount()
    {
        try {
            $count = $this->service->getUnreadCount();
            return $this->successResponse(
                ['count' => $count],
                'Unread count fetched'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}