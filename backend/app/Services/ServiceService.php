<?php

namespace App\Services;

use App\Repositories\ServiceRepository;

class ServiceService extends BaseService
{
    protected function getRepository()
    {
        return ServiceRepository::class;
    }

    public function getActiveServices()
    {
        return $this->repository->getActive();
    }
}