<?php

namespace App\Repositories;

use App\Models\AboutSection;

class AboutRepository extends BaseRepository
{
    protected function getModel(): string
    {
        return AboutSection::class;
    }
}