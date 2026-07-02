<?php

namespace App\Repositories;

use App\Models\Service;

class ServiceRepository extends BaseRepository
{
    protected function getModel(): string
    {
        return Service::class;
    }

    // public function getActive()
    // {
    //     return $this->model->active()->ordered()->get();
    // }
}