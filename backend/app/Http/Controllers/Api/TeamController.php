<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\TeamStoreRequest;
use App\Http\Requests\TeamUpdateRequest;
use App\Http\Resources\TeamResource;
use App\Services\TeamService;

class TeamController extends BaseController
{
    public function __construct()
    {
        $this->service = app(TeamService::class);
        $this->resource = TeamResource::class;
        $this->storeRequest = TeamStoreRequest::class;
        $this->updateRequest = TeamUpdateRequest::class;
    }

    /**
     * Override index to get ordered team members
     */
    public function index()
    {
        try {
            $data = $this->service->getOrderedTeam();
            return $this->successResponse(
                $this->resource::collection($data),
                'Team members fetched successfully'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}