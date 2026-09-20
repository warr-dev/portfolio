<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('cover_image')->nullable()->after('description');
            $table->json('gallery')->nullable()->after('media_url'); // Array of { type: 'image'|'video', url: string, caption: string }
            $table->longText('content')->nullable()->after('description'); // Detailed markdown/rich case study for dedicated project page
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['cover_image', 'gallery', 'content']);
        });
    }
};
