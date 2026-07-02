<?php

namespace App\Services;

use App\Repositories\FeatureRepository;

class FeatureService extends BaseService
{
    protected function getRepository()
    {
        return FeatureRepository::class;
    }
}