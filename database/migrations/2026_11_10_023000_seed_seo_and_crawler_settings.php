<?php

use App\Models\SiteSetting;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! SiteSetting::where('key', 'canonical_url')->exists()) {
            SiteSetting::set('canonical_url', 'https://warrdev.site');
        }

        if (! SiteSetting::where('key', 'meta_robots')->exists()) {
            SiteSetting::set('meta_robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
        }

        if (! SiteSetting::where('key', 'robots_txt')->exists()) {
            $defaultRobots = "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin/\n\nSitemap: https://warrdev.site/sitemap.xml\n";
            SiteSetting::set('robots_txt', $defaultRobots);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        SiteSetting::whereIn('key', [
            'canonical_url',
            'meta_robots',
            'robots_txt',
        ])->delete();
    }
};
