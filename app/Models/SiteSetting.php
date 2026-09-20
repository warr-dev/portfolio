<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $guarded = [];

    /**
     * Get a setting by key with a default fallback.
     */
    public static function get(string $key, $default = null)
    {
        $setting = static::where('key', $key)->first();
        if (! $setting || is_null($setting->value)) {
            return $default;
        }

        $decoded = json_decode($setting->value, true);

        return json_last_error() === JSON_ERROR_NONE ? $decoded : $setting->value;
    }

    /**
     * Set a setting by key.
     */
    public static function set(string $key, $value): void
    {
        $val = is_array($value) ? json_encode($value) : $value;
        static::updateOrCreate(['key' => $key], ['value' => $val]);
    }
}
