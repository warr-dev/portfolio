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
        $existingName = SiteSetting::get('name', 'Warren Dalawampu');
        $existingTitle = SiteSetting::get('title', 'Senior Backend Developer & DevOps / Infrastructure Engineer');
        $existingBio = SiteSetting::get('bio', '6+ years engineering high-concurrency gaming backends, localized OS-to-hardware casino engines, low-level C++ device drivers, payment gateways, and Linux/Docker/Kubernetes infrastructure across Laravel, Node.js, and cloud environments.');
        $existingBadge = SiteSetting::get('statusBadge', 'Open to Senior Backend & DevOps / Infrastructure Roles');
        $existingLocation = SiteSetting::get('location', 'Sta Maria, Naujan, Oriental Mindoro, Philippines');

        if (! SiteSetting::where('key', 'hero_name')->exists()) {
            SiteSetting::set('hero_name', $existingName);
        }

        if (! SiteSetting::where('key', 'hero_title')->exists()) {
            SiteSetting::set('hero_title', $existingTitle);
        }

        if (! SiteSetting::where('key', 'hero_subtitle')->exists()) {
            SiteSetting::set('hero_subtitle', 'Distributed Systems, High Concurrency & Edge Hardware Integrations');
        }

        if (! SiteSetting::where('key', 'hero_caption')->exists()) {
            SiteSetting::set('hero_caption', $existingBio);
        }

        if (! SiteSetting::where('key', 'hero_status_badge')->exists()) {
            SiteSetting::set('hero_status_badge', $existingBadge);
        }

        if (! SiteSetting::where('key', 'hero_location')->exists()) {
            SiteSetting::set('hero_location', $existingLocation);
        }

        if (! SiteSetting::where('key', 'hero_layout')->exists()) {
            SiteSetting::set('hero_layout', 'layout4');
        }

        if (! SiteSetting::where('key', 'hero_design_accent')->exists()) {
            SiteSetting::set('hero_design_accent', 'indigo');
        }

        if (! SiteSetting::where('key', 'hero_actions')->exists()) {
            $defaultActions = [
                [
                    'id' => 1,
                    'type' => 'button',
                    'label' => 'Download Curriculum Vitae (PDF)',
                    'url' => '/Warren_Dalawampu_CV_2026.pdf',
                    'variant' => 'primary',
                    'icon' => 'Download',
                    'download' => true,
                    'is_external' => false,
                ],
                [
                    'id' => 2,
                    'type' => 'button',
                    'label' => 'Explore Featured Projects',
                    'url' => '#projects',
                    'variant' => 'secondary',
                    'icon' => 'ArrowDown',
                    'download' => false,
                    'is_external' => false,
                ],
                [
                    'id' => 3,
                    'type' => 'link',
                    'label' => 'github.com/warr-dev',
                    'url' => 'https://github.com/warr-dev',
                    'variant' => 'ghost',
                    'icon' => 'ExternalLink',
                    'download' => false,
                    'is_external' => true,
                ],
                [
                    'id' => 4,
                    'type' => 'link',
                    'label' => 'LinkedIn Profile',
                    'url' => 'https://linkedin.com/in/warrdev',
                    'variant' => 'ghost',
                    'icon' => 'ExternalLink',
                    'download' => false,
                    'is_external' => true,
                ],
            ];
            SiteSetting::set('hero_actions', $defaultActions);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        SiteSetting::whereIn('key', [
            'hero_name',
            'hero_title',
            'hero_subtitle',
            'hero_caption',
            'hero_status_badge',
            'hero_location',
            'hero_layout',
            'hero_design_accent',
            'hero_actions',
        ])->delete();
    }
};
