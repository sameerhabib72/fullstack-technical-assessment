<?php

namespace App\Repositories;

use App\Models\Faq;

class FaqRepository extends BaseRepository
{
    protected function getModel(): string
    {
        return Faq::class;
    }

    // public function getActive()
    // {
    //     return $this->model->active()->ordered()->get();
    // }
}