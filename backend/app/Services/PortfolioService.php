<?php

namespace App\Services;

use App\Repositories\PortfolioRepository;

class PortfolioService extends BaseService
{
    protected function getRepository()
    {
        return PortfolioRepository::class;
    }
}