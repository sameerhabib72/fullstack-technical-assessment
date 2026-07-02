<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    protected $fillable = [
        'title', 
        'subtitle', 
        'cta_text', 
        'cta_url', 
        'background_image', 
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // ✅ Scope for active records
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // ✅ Get single active hero
    public static function getActiveHero()
    {
        return self::where('is_active', true)->first();
    }
}