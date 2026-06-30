<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Http\Resources\ServiceResource;
use App\Traits\ApiResponse;

class ServiceController extends Controller
{
    use ApiResponse;
    public function index()
    {
        $services = Service::where('is_active', true)->orderBy('sort_order')->get();
        return $this->successResponse(ServiceResource::collection($services), 'Services fetched');
    }
}
