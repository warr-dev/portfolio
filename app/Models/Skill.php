<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $guarded = [];

    protected $casts = [
        'items' => 'array',
    ];

    /**
     * Normalize items to guarantee each item is an array with name and level (1-5).
     */
    public function getItemsAttribute($value): array
    {
        $decoded = is_string($value) ? json_decode($value, true) : $value;
        if (!is_array($decoded)) {
            return [];
        }

        return array_map(function ($item) {
            if (is_string($item)) {
                return ['name' => $item, 'level' => 5];
            }
            if (is_array($item)) {
                return [
                    'name' => $item['name'] ?? '',
                    'level' => isset($item['level']) ? (int) $item['level'] : 5,
                ];
            }
            return ['name' => (string) $item, 'level' => 5];
        }, $decoded);
    }
}
