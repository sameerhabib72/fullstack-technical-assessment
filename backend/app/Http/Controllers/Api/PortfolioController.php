<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PortfolioResource;
use App\Traits\ApiResponse;
use App\Models\PortfolioItem;

class PortfolioController extends Controller {
    use ApiResponse;
    public function index() {
        $items =PortfolioItem::orderBy('sort_order')->get();
        return $this->successResponse(PortfolioResource::collection($items), 'Portfolio fetched');
    }
}