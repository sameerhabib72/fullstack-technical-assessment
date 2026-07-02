<?php

namespace App\Repositories;

use App\Models\TeamMember;

class TeamRepository extends BaseRepository
{
    protected function getModel(): string
    {
        return TeamMember::class;
    }

    public function getOrdered()
    {
        return $this->model->ordered()->get();
    }
}