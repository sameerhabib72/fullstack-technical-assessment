<?php

namespace App\Services;

use App\Repositories\TestimonialRepository;

class TestimonialService extends BaseService
{
    protected function getRepository()
    {
        return TestimonialRepository::class;
    }
}