<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = [];

    protected $casts = [
        'tags' => 'array',
        'extra_info' => 'array',
        'gallery' => 'array',
        'featured' => 'boolean',
    ];
}
