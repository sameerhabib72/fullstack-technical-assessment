<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\PortfolioStoreRequest;
use App\Http\Requests\PortfolioUpdateRequest;
use App\Http\Resources\PortfolioResource;
use App\Services\PortfolioService;

class PortfolioController extends BaseController
{
    public function __construct()
    {
        $this->service = app(PortfolioService::class);
        $this->resource = PortfolioResource::class;
        $this->storeRequest = PortfolioStoreRequest::class;
        $this->updateRequest = PortfolioUpdateRequest::class;
    }
}