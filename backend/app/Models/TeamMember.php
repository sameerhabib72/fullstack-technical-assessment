<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    //
    protected $fillable = ['name', 'role', 'bio', 'photo', 'linkedin_url', 'twitter_url', 'facebook_url','instagram_url','sort_order'];
}
