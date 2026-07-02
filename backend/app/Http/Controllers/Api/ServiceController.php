<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\ServiceStoreRequest;
use App\Http\Requests\ServiceUpdateRequest;
use App\Http\Resources\ServiceResource;
use App\Services\ServiceService;

class ServiceController extends BaseController
{
    public function __construct()
    {
        $this->service = app(ServiceService::class);
        $this->resource = ServiceResource::class;
        $this->storeRequest = ServiceStoreRequest::class;
        $this->updateRequest = ServiceUpdateRequest::class;
    }

    /**
     * Override index to get active services only
     */
    public function index()
    {
        try {
            $data = $this->service->getActiveServices();
            return $this->successResponse(
                $this->resource::collection($data),
                'Services fetched successfully'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}