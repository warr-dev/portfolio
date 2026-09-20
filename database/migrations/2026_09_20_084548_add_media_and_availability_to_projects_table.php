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
            $table->string('media_type')->default('none')->after('description'); // none, image, video, youtube
            $table->text('media_url')->nullable()->after('media_type');
            $table->string('demo_status')->default('live')->after('demo_url'); // live, offline, internal, decommissioned
            $table->string('github_status')->default('public')->after('github_url'); // public, private, nda, archived
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['media_type', 'media_url', 'demo_status', 'github_status']);
        });
    }
};
