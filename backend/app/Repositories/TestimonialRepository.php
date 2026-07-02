<?php

namespace App\Repositories;

use App\Models\Testimonial;

class TestimonialRepository extends BaseRepository
{
    protected function getModel(): string
    {
        return Testimonial::class;
    }
}