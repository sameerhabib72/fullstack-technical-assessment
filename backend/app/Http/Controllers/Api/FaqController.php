<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\FaqStoreRequest;
use App\Http\Requests\FaqUpdateRequest;
use App\Http\Resources\FaqResource;
use App\Services\FaqService;

class FaqController extends BaseController
{
    public function __construct()
    {
        $this->service = app(FaqService::class);
        $this->resource = FaqResource::class;
        $this->storeRequest = FaqStoreRequest::class;
        $this->updateRequest = FaqUpdateRequest::class;
    }

    /**
     * Override index to get active FAQs only
     */
    public function index()
    {
        try {
            $data = $this->service->getActiveFaqs();
            return $this->successResponse(
                $this->resource::collection($data),
                'FAQs fetched successfully'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}