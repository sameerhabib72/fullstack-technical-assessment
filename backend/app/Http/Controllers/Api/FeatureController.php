<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\FeatureStoreRequest;
use App\Http\Requests\FeatureUpdateRequest;
use App\Http\Resources\FeatureResource;
use App\Services\FeatureService;

class FeatureController extends BaseController
{
    public function __construct()
    {
        $this->service = app(FeatureService::class);
        $this->resource = FeatureResource::class;
        $this->storeRequest = FeatureStoreRequest::class;
        $this->updateRequest = FeatureUpdateRequest::class;
    }
}