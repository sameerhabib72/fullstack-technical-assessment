<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->role,
            'bio' => $this->bio,
            'photo' => $this->photo,
            'linkedin' => $this->linkedin_url,
            'twitter' => $this->twitter_url,
            'facebook' => $this->facebook_url,
            'instagram' => $this->instagram_url,
        ];
    }
}
