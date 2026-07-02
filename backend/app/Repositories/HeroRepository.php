<?php

namespace App\Repositories;

use App\Models\HeroSection;

class HeroRepository extends BaseRepository
{
    protected function getModel(): string
    {
        return HeroSection::class;
    }

    /**
     * Get first hero record
     */
    public function getFirst()
    {
        return $this->model->first();
    }
}