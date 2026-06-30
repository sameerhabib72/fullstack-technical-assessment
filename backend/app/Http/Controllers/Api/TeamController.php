<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use App\Http\Resources\TeamResource;
use App\Traits\ApiResponse;

class TeamController extends Controller
{
    use ApiResponse;

    public function index()
    {
        // Team members ko sort_order ke mutabiq mangwana
        $members = TeamMember::orderBy('sort_order', 'asc')->get();

        return $this->successResponse(
            TeamResource::collection($members),
            'Team members fetched successfully'
        );
    }
}
