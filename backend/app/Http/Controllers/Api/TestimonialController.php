<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\TestimonialStoreRequest;
use App\Http\Requests\TestimonialUpdateRequest;
use App\Http\Resources\TestimonialResource;
use App\Services\TestimonialService;

class TestimonialController extends BaseController
{
    public function __construct()
    {
        $this->service = app(TestimonialService::class);
        $this->resource = TestimonialResource::class;
        $this->storeRequest = TestimonialStoreRequest::class;
        $this->updateRequest = TestimonialUpdateRequest::class;
    }
}