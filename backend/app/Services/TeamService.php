<?php

namespace App\Services;

use App\Repositories\TeamRepository;

class TeamService extends BaseService
{
    protected function getRepository()
    {
        return TeamRepository::class;
    }

    public function getOrderedTeam()
    {
        return $this->repository->getOrdered();
    }
}