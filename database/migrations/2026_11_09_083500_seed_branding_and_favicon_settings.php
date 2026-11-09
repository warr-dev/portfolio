<?php

declare(strict_types=1);

use App\Models\SiteSetting;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! SiteSetting::where('key', 'logo_text_primary')->exists()) {
            SiteSetting::set('logo_text_primary', 'warr');
        }

        if (! SiteSetting::where('key', 'logo_text_secondary')->exists()) {
            SiteSetting::set('logo_text_secondary', 'dev');
        }

        if (! SiteSetting::where('key', 'logo_icon_text')->exists()) {
            SiteSetting::set('logo_icon_text', 'W');
        }

        if (! SiteSetting::where('key', 'logo_icon_url')->exists()) {
            SiteSetting::set('logo_icon_url', null);
        }

        if (! SiteSetting::where('key', 'favicon')->exists()) {
            SiteSetting::set('favicon', '/favicon.svg');
        }

        if (! SiteSetting::where('key', 'hero_badge_secondary')->exists()) {
            SiteSetting::set('hero_badge_secondary', '');
        }

        if (! SiteSetting::where('key', 'hero_badge_secondary_enabled')->exists()) {
            SiteSetting::set('hero_badge_secondary_enabled', false);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        SiteSetting::whereIn('key', [
            'logo_text_primary',
            'logo_text_secondary',
            'logo_icon_text',
            'logo_icon_url',
            'favicon',
            'hero_badge_secondary',
            'hero_badge_secondary_enabled',
        ])->delete();
    }
};
