<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioItem extends Model
{
    protected $fillable = [
        'title', 'description', 'image', 'category', 'url', 'sort_order'
    ];

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order', 'asc');
    }
}