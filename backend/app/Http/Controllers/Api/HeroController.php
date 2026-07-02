<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use App\Http\Resources\HeroResource;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class HeroController extends Controller
{
    use ApiResponse;

    // ✅ Get active hero (single record)
    public function index()
    {
        try {
            $hero = HeroSection::getActiveHero();
            
            if (!$hero) {
                return $this->errorResponse('Hero not found', 404);
            }
            
            return $this->successResponse(
                new HeroResource($hero),
                'Hero data fetched successfully'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    // ✅ Get hero by id
    public function show($id)
    {
        try {
            $hero = HeroSection::findOrFail($id);
            return $this->successResponse(
                new HeroResource($hero),
                'Hero data fetched successfully'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 404);
        }
    }

    // ✅ Create hero (will deactivate others)
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'subtitle' => 'required|string|max:500',
                'cta_text' => 'required|string|max:100',
                'cta_url' => 'required|string|max:255',
                'background_image' => 'required|string|max:255',
                'is_active' => 'sometimes|boolean',
            ]);

            // ✅ If active, deactivate all others
            if (isset($validated['is_active']) && $validated['is_active']) {
                HeroSection::where('is_active', true)->update(['is_active' => false]);
            }

            $hero = HeroSection::create($validated);
            
            return $this->successResponse(
                new HeroResource($hero),
                'Hero created successfully',
                201
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 422);
        }
    }

    // ✅ Update hero
    public function update(Request $request, $id)
    {
        try {
            $hero = HeroSection::findOrFail($id);
            
            $validated = $request->validate([
                'title' => 'sometimes|string|max:255',
                'subtitle' => 'sometimes|string|max:500',
                'cta_text' => 'sometimes|string|max:100',
                'cta_url' => 'sometimes|string|max:255',
                'background_image' => 'sometimes|string|max:255',
                'is_active' => 'sometimes|boolean',
            ]);

            // ✅ If activating, deactivate all others
            if (isset($validated['is_active']) && $validated['is_active']) {
                HeroSection::where('id', '!=', $id)
                    ->where('is_active', true)
                    ->update(['is_active' => false]);
            }

            $hero->update($validated);
            
            return $this->successResponse(
                new HeroResource($hero),
                'Hero updated successfully'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 422);
        }
    }

    // ✅ Delete hero
    public function destroy($id)
    {
        try {
            $hero = HeroSection::findOrFail($id);
            $hero->delete();
            
            return $this->successResponse(null, 'Hero deleted successfully');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 404);
        }
    }

    // ✅ Toggle status
    public function toggleStatus($id)
    {
        try {
            $hero = HeroSection::findOrFail($id);
            $newStatus = !$hero->is_active;
            
            // ✅ If activating, deactivate all others
            if ($newStatus) {
                HeroSection::where('id', '!=', $id)
                    ->where('is_active', true)
                    ->update(['is_active' => false]);
            }
            
            $hero->update(['is_active' => $newStatus]);
            
            return $this->successResponse(
                new HeroResource($hero),
                'Status toggled successfully'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 404);
        }
    }
}