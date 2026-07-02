<?php

namespace App\Services;

use App\Repositories\FaqRepository;

class FaqService extends BaseService
{
    protected function getRepository()
    {
        return FaqRepository::class;
    }

    public function getActiveFaqs()
    {
        return $this->repository->getActive();
    }
}