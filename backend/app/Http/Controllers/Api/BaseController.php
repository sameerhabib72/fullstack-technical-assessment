<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    use ApiResponse;

    protected $service;
    protected $resource;
    protected $storeRequest;
    protected $updateRequest;

    public function index()
    {
        try {
            $data = $this->service->getAll();
            return $this->successResponse(
                $this->resource::collection($data),
                'Data fetched successfully'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $data = $this->service->getById($id);
            return $this->successResponse(
                new $this->resource($data),
                'Data fetched successfully'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 404);
        }
    }

    public function store(Request $request)
    {
        try {
            // If storeRequest is set, validate
            if ($this->storeRequest) {
                $validated = app($this->storeRequest)->validated();
            } else {
                $validated = $request->all();
            }
            
            $data = $this->service->create($validated);
            return $this->successResponse(
                new $this->resource($data),
                'Created successfully',
                201
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 422);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // If updateRequest is set, validate
            if ($this->updateRequest) {
                $validated = app($this->updateRequest)->validated();
            } else {
                $validated = $request->all();
            }
            
            $data = $this->service->update($id, $validated);
            return $this->successResponse(
                new $this->resource($data),
                'Updated successfully'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 422);
        }
    }

    public function destroy($id)
    {
        try {
            $this->service->delete($id);
            return $this->successResponse(null, 'Deleted successfully');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 404);
        }
    }
}