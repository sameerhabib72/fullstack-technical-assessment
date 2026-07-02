<?php

namespace App\Repositories;

use App\Models\PortfolioItem;

class PortfolioRepository extends BaseRepository
{
    protected function getModel(): string
    {
        return PortfolioItem::class;
    }

    public function getOrdered()
    {
        return $this->model->ordered()->get();
    }
}