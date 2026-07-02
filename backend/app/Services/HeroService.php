<?php

namespace App\Services;

use App\Repositories\HeroRepository;

class HeroService extends BaseService
{
    protected function getRepository()
    {
        return HeroRepository::class;
    }

    /**
     * Get first hero record
     */
    public function getFirst()
    {
        return $this->repository->getFirst();
    }

    /**
     * Toggle hero status
     */
    public function toggleStatus($id)
    {
        $hero = $this->getById($id);
        $hero->update(['is_active' => !$hero->is_active]);
        return $hero->fresh();
    }
}