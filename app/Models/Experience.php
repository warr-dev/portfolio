<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $guarded = [];

    protected $casts = [
        'bullet_points' => 'array',
        'technologies' => 'array',
        'is_current' => 'boolean',
    ];
}
