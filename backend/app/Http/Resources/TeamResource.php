<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->role,
            'bio' => $this->bio,
            'photo' => $this->photo,
            'linkedin_url' => $this->linkedin_url,
            'twitter_url' => $this->twitter_url,
            'sort_order' => $this->sort_order,
        ];
    }
}