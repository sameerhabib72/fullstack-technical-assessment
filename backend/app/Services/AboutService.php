<?php

namespace App\Services;

use App\Repositories\AboutRepository;

class AboutService extends BaseService
{
    protected function getRepository()
    {
        return AboutRepository::class;
    }
}