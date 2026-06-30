<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use App\Models\AboutSection;    
class AboutController extends Controller
{
    use ApiResponse;
    public function index() {
    $about =AboutSection::first();
    return $this->successResponse(new \App\Http\Resources\AboutResource($about), 'About data fetched');
}
}
