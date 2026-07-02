<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\AboutStoreRequest;
use App\Http\Requests\AboutUpdateRequest;
use App\Http\Resources\AboutResource;
use App\Services\AboutService;

class AboutController extends BaseController
{
    public function __construct()
    {
        $this->service = app(AboutService::class);
        $this->resource = AboutResource::class;
        $this->storeRequest = AboutStoreRequest::class;
        $this->updateRequest = AboutUpdateRequest::class;
    }

    public function index()
    {
        try {
            $data = $this->service->getAll();
            return $this->successResponse(
                $this->resource::collection($data),
                'About data fetched successfully'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}