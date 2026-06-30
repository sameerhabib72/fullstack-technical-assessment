<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use App\Http\Resources\HeroResource;
use App\Traits\ApiResponse;

class HeroController extends Controller
{
    use ApiResponse;

    public function index() // Public GET /api/hero
    {

        $heroes = HeroSection::where('is_active', true)->orderBy('created_at', 'desc')->get();
        return $this->successResponse(HeroResource::collection($heroes), 'Hero data fetched');
    }

    // Admin protected methods (Store, Update, Delete) hum baad mein Sanctum ke saath active karenge
}
