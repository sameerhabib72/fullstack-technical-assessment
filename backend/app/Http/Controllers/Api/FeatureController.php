<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Feature;
use App\Http\Resources\FeatureResource;
use App\Traits\ApiResponse;

class FeatureController extends Controller
{
    use ApiResponse;

    public function index()
    {
        // Features ko unke sort_order ke mutabiq mangwana
        $features = Feature::orderBy('sort_order', 'asc')->get();

        return $this->successResponse(
            FeatureResource::collection($features),
            'Features fetched successfully'
        );
    }
}
