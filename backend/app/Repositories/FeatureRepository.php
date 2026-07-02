<?php

namespace App\Repositories;

use App\Models\Feature;

class FeatureRepository extends BaseRepository
{
    protected function getModel(): string
    {
        return Feature::class;
    }

    public function getOrdered()
    {
        return $this->model->ordered()->get();
    }
}