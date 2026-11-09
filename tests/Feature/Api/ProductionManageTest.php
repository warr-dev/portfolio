<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
use Tests\TestCase;

class ProductionManageTest extends TestCase
{
    use RefreshDatabase;

    private string $testToken = 'test-manage-secret-token-12345';

    protected function setUp(): void
    {
        parent::setUp();
        Config::set('services.manage.token', $this->testToken);
    }

    protected function tearDown(): void
    {
        if (app()->isDownForMaintenance()) {
            $this->artisan('up');
        }
        parent::tearDown();
    }

    public function test_unauthenticated_request_is_rejected(): void
    {
        $response = $this->getJson('/api/manage/health');

        $response->assertStatus(401);
        $response->assertJson(['error' => 'Unauthorized']);
    }

    public function test_invalid_token_is_rejected(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer invalid-token')
            ->getJson('/api/manage/health');

        $response->assertStatus(401);
        $response->assertJson(['error' => 'Unauthorized']);
    }

    public function test_authenticated_health_check_returns_system_metrics(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer '.$this->testToken)
            ->getJson('/api/manage/health');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'php_version',
            'laravel_version',
            'app_env',
            'maintenance_mode',
            'db_connected',
            'disk_free_mb',
            'cache_driver',
        ]);
        $response->assertJson(['status' => 'ok']);
    }

    public function test_whitelisted_artisan_command_executes_successfully(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer '.$this->testToken)
            ->postJson('/api/manage/artisan', [
                'command' => 'about',
            ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'command',
            'output',
        ]);
        $this->assertSame('about', $response->json('command'));
    }

    public function test_non_whitelisted_artisan_command_is_forbidden(): void
    {
        $response = $this->withHeader('Authorization', 'Bearer '.$this->testToken)
            ->postJson('/api/manage/artisan', [
                'command' => 'migrate:fresh',
            ]);

        $response->assertStatus(403);
        $response->assertJson(['error' => 'Command not allowed']);
    }

    public function test_logs_endpoint_returns_recent_log_content(): void
    {
        $logPath = storage_path('logs/laravel.log');
        File::ensureDirectoryExists(dirname($logPath));
        File::append($logPath, "Test log entry for ProductionManageTest\n");

        $response = $this->withHeader('Authorization', 'Bearer '.$this->testToken)
            ->getJson('/api/manage/logs?lines=5');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'lines',
            'content',
        ]);
        $this->assertStringContainsString('Test log entry for ProductionManageTest', $response->json('content'));
    }

    public function test_maintenance_mode_toggle_down_and_up(): void
    {
        $responseDown = $this->withHeader('Authorization', 'Bearer '.$this->testToken)
            ->postJson('/api/manage/maintenance', [
                'action' => 'down',
                'secret' => 'test-bypass-key',
            ]);

        $responseDown->assertStatus(200);
        $responseDown->assertJson([
            'status' => 'ok',
            'maintenance_mode' => true,
        ]);
        $this->assertTrue(app()->isDownForMaintenance());

        $responseUp = $this->withHeader('Authorization', 'Bearer '.$this->testToken)
            ->postJson('/api/manage/maintenance', [
                'action' => 'up',
            ]);

        $responseUp->assertStatus(200);
        $responseUp->assertJson([
            'status' => 'ok',
            'maintenance_mode' => false,
        ]);
        $this->assertFalse(app()->isDownForMaintenance());
    }

    public function test_can_manage_projects_via_api(): void
    {
        $payload = [
            'title' => 'API Generated Project',
            'slug' => 'api-generated-project',
            'badge' => 'API Test',
            'organization' => 'WarrDev Labs',
            'description' => 'Created via management REST API.',
            'tags' => ['REST', 'Laravel'],
            'demo_url' => 'https://example.com',
            'github_url' => 'https://github.com/warr-dev/api-test',
            'featured' => true,
        ];

        // 1. Create Project
        $postRes = $this->withHeader('Authorization', 'Bearer '.$this->testToken)
            ->postJson('/api/manage/projects', $payload);

        $postRes->assertStatus(200);
        $postRes->assertJson([
            'status' => 'ok',
            'message' => 'Project saved successfully',
            'project' => [
                'slug' => 'api-generated-project',
            ],
        ]);

        $projectId = $postRes->json('project.id');

        // 2. List Projects
        $listRes = $this->withHeader('Authorization', 'Bearer '.$this->testToken)
            ->getJson('/api/manage/projects');

        $listRes->assertStatus(200);
        $this->assertGreaterThanOrEqual(1, $listRes->json('count'));

        // 3. Delete Project
        $delRes = $this->withHeader('Authorization', 'Bearer '.$this->testToken)
            ->deleteJson("/api/manage/projects/{$projectId}");

        $delRes->assertStatus(200);
        $delRes->assertJson([
            'status' => 'ok',
            'message' => 'Project deleted successfully',
        ]);
    }
}
