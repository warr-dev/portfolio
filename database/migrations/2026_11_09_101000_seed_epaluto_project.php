<?php

use App\Models\Project;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Project::updateOrCreate(
            ['slug' => 'epaluto-home-cook-marketplace'],
            [
                'title' => 'ePaluto On-Demand Home Cook Marketplace',
                'badge' => 'Full-Stack SvelteKit',
                'organization' => 'WarrDev Open Source',
                'description' => 'Hyper-local home-cooked bento delivery and neighborhood meal marketplace. Connects verified home chefs with local customers, featuring chef menu scheduling, community meal voting polls, and dual-mode auth.',
                'tags' => ['SvelteKit 2', 'Svelte 5 Runes', 'PostgreSQL 15', 'Tailwind v4', 'Firebase Admin', 'Docker', 'Playwright'],
                'demo_url' => null,
                'demo_status' => 'offline',
                'github_url' => 'https://github.com/warr-dev/ePaluto',
                'github_status' => 'public',
                'featured' => true,
                'sort_order' => 3,
                'media_type' => 'image',
                'media_url' => '/screenshots/epaluto.png',
                'cover_image' => '/screenshots/epaluto.png',
                'extra_info' => [
                    'Architecture' => 'SvelteKit 5 SSR + Node Adapter',
                    'Database' => 'PostgreSQL 15 (UUID Primary Keys)',
                    'Authentication' => 'Dual (Firebase Admin & JWT Cookie Bypass)',
                    'Features' => 'Cook Portal, Cart, & Menu Poll Voting',
                ],
                'content' => "### Architecture & Engineering Overview\n\n**ePaluto** is a hyper-local neighborhood food delivery platform connecting verified home-based chefs with local customers. The application leverages a server-rendered, edge-ready SvelteKit 5 framework paired with an ACID-compliant PostgreSQL database and dual-mode authentication.\n\n#### Key Engineering Highlights\n- **Svelte 5 Runes Reactivity**: Built with fine-grained reactive runes (`\$state`, `\$derived`, `\$props`) and native SvelteKit server actions.\n- **Dual-Mode Authentication**: Integrates Firebase Client/Admin SDK for Google & email sign-in alongside an HS256 signed tamper-proof JWT cookie bypass for development and automated test pipelines.\n- **PostgreSQL 15 Persistence**: High-throughput connection pooling via `pg` with strict UUID primary keys and relational schema modeling.\n- **Community Meal Voting**: Interactive chef menu polls allowing neighborhood patrons to vote on upcoming daily bento specials.",
            ]
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Project::where('slug', 'epaluto-home-cook-marketplace')->delete();
    }
};
