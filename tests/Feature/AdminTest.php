<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::create([
            'name' => 'Warren Dalawampu',
            'email' => 'warrdev08@gmail.com',
            'password' => bcrypt('password'),
        ]);
    }

    public function test_guest_is_redirected_from_admin_dashboard_to_login(): void
    {
        $response = $this->get('/admin');

        $response->assertRedirect('/login');
    }

    public function test_admin_can_login_with_valid_credentials(): void
    {
        $response = $this->post('/admin/login', [
            'email' => 'warrdev08@gmail.com',
            'password' => 'password',
        ]);

        $response->assertRedirect('/admin');
        $this->assertAuthenticatedAs($this->admin);
    }

    public function test_admin_can_update_profile_settings(): void
    {
        $payload = [
            'name' => 'Warren Dalawampu (Updated)',
            'title' => 'Principal Systems Architect',
            'statusBadge' => 'Available for Consulting',
            'location' => 'Global Remote',
            'bio' => 'Updated developer biography test string.',
            'email' => 'warrdev08@gmail.com',
            'phone' => '+63 956 164 5935',
            'github' => 'https://github.com/warr-dev',
            'linkedin' => 'https://linkedin.com/in/warr-dev-test',
            'careerStartDate' => '2018-06-01',
            'cvDisplayMode' => 'hero_only',
            'activeCv' => 'ats_resume',
            'specializedTitle' => 'Embedded Systems & Edge Compute',
            'specializedSubtitle' => 'Silicon to Cloud',
            'specializedCapabilities' => [
                [
                    'icon' => 'Cpu',
                    'title' => 'Custom Microcontroller Firmware',
                    'description' => 'Developed bare-metal C++ firmware for industrial telemetry.',
                ],
            ],
        ];

        $response = $this->actingAs($this->admin)->post('/admin/settings', $payload);

        $response->assertSessionHas('success');
        $this->assertEquals('Warren Dalawampu (Updated)', SiteSetting::get('name'));
        $this->assertEquals('Principal Systems Architect', SiteSetting::get('title'));
        $this->assertEquals('https://linkedin.com/in/warr-dev-test', SiteSetting::get('linkedin'));
        $this->assertEquals('2018-06-01', SiteSetting::get('careerStartDate'));
        $this->assertEquals('hero_only', SiteSetting::get('cvDisplayMode'));
        $this->assertEquals('ats_resume', SiteSetting::get('activeCv'));
        $this->assertEquals('Embedded Systems & Edge Compute', SiteSetting::get('specializedTitle'));
        $this->assertEquals('Silicon to Cloud', SiteSetting::get('specializedSubtitle'));
        $this->assertCount(1, SiteSetting::get('specializedCapabilities'));
        $this->assertStringContainsString('Years', SiteSetting::get('yearsExperience'));
    }

    public function test_admin_can_create_and_delete_project(): void
    {
        $projectPayload = [
            'title' => 'Test Automated Project',
            'badge' => 'DevOps',
            'organization' => 'WarrDev Labs',
            'description' => 'Automated test project description.',
            'tags' => ['Docker', 'PHP 8.3'],
            'demo_url' => 'https://demo.warr.dev',
            'github_url' => 'https://github.com/warr-dev/test',
            'demo_status' => 'offline',
            'github_status' => 'private',
            'media_type' => 'image',
            'media_url' => 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
            'featured' => true,
            'sort_order' => 10,
        ];

        $createResponse = $this->actingAs($this->admin)->post('/admin/projects', $projectPayload);
        $createResponse->assertSessionHas('success');

        $project = Project::where('title', 'Test Automated Project')->first();
        $this->assertNotNull($project);
        $this->assertEquals('offline', $project->demo_status);
        $this->assertEquals('private', $project->github_status);
        $this->assertEquals('image', $project->media_type);

        $deleteResponse = $this->actingAs($this->admin)->delete("/admin/projects/{$project->id}");
        $deleteResponse->assertSessionHas('success');

        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }

    public function test_admin_can_upload_project_media_file(): void
    {
        \Illuminate\Support\Facades\Storage::fake('public');

        $file = \Illuminate\Http\UploadedFile::fake()->image('screenshot.png', 800, 600);

        $payload = [
            'title' => 'Project With Uploaded Media',
            'badge' => 'Fullstack',
            'description' => 'Project with real uploaded file asset.',
            'tags' => ['React', 'Laravel'],
            'demo_status' => 'offline',
            'github_status' => 'public',
            'media_type' => 'image',
            'media_file' => $file,
            'featured' => false,
            'sort_order' => 1,
        ];

        $response = $this->actingAs($this->admin)->post('/admin/projects', $payload);
        $response->assertSessionHas('success');

        $project = Project::where('title', 'Project With Uploaded Media')->first();
        $this->assertNotNull($project);
        $this->assertNotNull($project->media_url);
        $this->assertStringStartsWith('/storage/projects/', $project->media_url);

        $storedPath = str_replace('/storage/', '', $project->media_url);
        \Illuminate\Support\Facades\Storage::disk('public')->assertExists($storedPath);
    }

    public function test_admin_can_upload_project_cover_and_gallery_files(): void
    {
        \Illuminate\Support\Facades\Storage::fake('public');

        $cover = \Illuminate\Http\UploadedFile::fake()->image('cover.jpg', 1200, 630);
        $galleryImg = \Illuminate\Http\UploadedFile::fake()->image('diagram.png', 1000, 700);

        $payload = [
            'title' => 'Project With Cover And Gallery',
            'badge' => 'IoT Ecosystem',
            'description' => 'Project with high-res cover and photo gallery.',
            'content' => 'Deep dive into hardware microcontroller firmware.',
            'tags' => ['C++', 'FreeRTOS'],
            'demo_status' => 'internal',
            'github_status' => 'private',
            'media_type' => 'none',
            'cover_file' => $cover,
            'gallery_files' => [$galleryImg],
            'featured' => true,
            'sort_order' => 1,
        ];

        $response = $this->actingAs($this->admin)->post('/admin/projects', $payload);
        $response->assertSessionHas('success');

        $project = Project::where('title', 'Project With Cover And Gallery')->first();
        $this->assertNotNull($project);
        $this->assertNotNull($project->cover_image);
        $this->assertStringStartsWith('/storage/projects/covers/', $project->cover_image);
        $this->assertIsArray($project->gallery);
        $this->assertCount(1, $project->gallery);
        $this->assertEquals('image', $project->gallery[0]['type']);
        $this->assertStringStartsWith('/storage/projects/gallery/', $project->gallery[0]['url']);
    }

    public function test_admin_can_save_project_extra_info_metrics(): void
    {
        $payload = [
            'title' => 'Telecom Messaging Broker',
            'badge' => 'High Scale',
            'description' => 'Real-time SMS gateway with SMPP protocol support.',
            'tags' => ['Go', 'Redis', 'Kafka'],
            'demo_status' => 'internal',
            'github_status' => 'private',
            'media_type' => 'none',
            'extra_info' => [
                'Throughput' => '25,000 msg/sec',
                'Active Gateways' => '14',
                'Uptime' => '99.99%',
            ],
            'featured' => true,
            'sort_order' => 2,
        ];

        $response = $this->actingAs($this->admin)->post('/admin/projects', $payload);
        $response->assertSessionHas('success');

        $project = Project::where('title', 'Telecom Messaging Broker')->first();
        $this->assertNotNull($project);
        $this->assertIsArray($project->extra_info);
        $this->assertEquals('25,000 msg/sec', $project->extra_info['Throughput']);
        $this->assertEquals('14', $project->extra_info['Active Gateways']);
        $this->assertEquals('99.99%', $project->extra_info['Uptime']);

        // Test update with extra_info JSON string (as sent by FormData)
        $updatePayload = [
            'title' => 'Telecom Messaging Broker',
            'badge' => 'High Scale',
            'description' => 'Real-time SMS gateway with SMPP protocol support.',
            'tags' => ['Go', 'Redis', 'Kafka'],
            'demo_status' => 'internal',
            'github_status' => 'private',
            'media_type' => 'none',
            'extra_info' => json_encode([
                'Throughput' => '50,000 msg/sec',
                'Active Gateways' => '28',
            ]),
            'featured' => true,
            'sort_order' => 2,
        ];

        $updateResponse = $this->actingAs($this->admin)->put("/admin/projects/{$project->id}", $updatePayload);
        $updateResponse->assertSessionHas('success');

        $fresh = $project->fresh();
        $this->assertEquals('50,000 msg/sec', $fresh->extra_info['Throughput']);
        $this->assertEquals('28', $fresh->extra_info['Active Gateways']);
    }

    public function test_admin_can_mark_contact_message_as_read_and_delete(): void
    {
        $message = ContactMessage::create([
            'name' => 'Recruiter Test',
            'email' => 'recruiter@agency.com',
            'subject' => 'Job Opportunity',
            'message' => 'Test inquiry body.',
        ]);

        $this->assertNull($message->read_at);

        $readResponse = $this->actingAs($this->admin)->post("/admin/inbox/{$message->id}/read");
        $readResponse->assertSessionHas('success');
        $this->assertNotNull($message->fresh()->read_at);

        $deleteResponse = $this->actingAs($this->admin)->delete("/admin/inbox/{$message->id}");
        $deleteResponse->assertSessionHas('success');
        $this->assertDatabaseMissing('contact_messages', ['id' => $message->id]);
    }

    public function test_admin_can_create_and_update_skill_with_star_proficiency(): void
    {
        $payload = [
            'category' => 'Cloud & Virtualization',
            'items' => [
                ['name' => 'Kubernetes', 'level' => 4],
                ['name' => 'Terraform', 'level' => 5],
            ],
            'sort_order' => 5,
        ];

        $createResponse = $this->actingAs($this->admin)->post('/admin/skills', $payload);
        $createResponse->assertSessionHas('success');

        $skill = \App\Models\Skill::where('category', 'Cloud & Virtualization')->first();
        $this->assertNotNull($skill);
        $this->assertCount(2, $skill->items);
        $this->assertEquals('Kubernetes', $skill->items[0]['name']);
        $this->assertEquals(4, $skill->items[0]['level']);

        // Test updating category and items with stars
        $updatePayload = [
            'category' => 'Cloud & Virtualization (Updated)',
            'items' => [
                ['name' => 'Kubernetes', 'level' => 5],
                ['name' => 'Terraform', 'level' => 5],
                ['name' => 'Helm', 'level' => 4],
            ],
            'sort_order' => 1,
        ];

        $updateResponse = $this->actingAs($this->admin)->put("/admin/skills/{$skill->id}", $updatePayload);
        $updateResponse->assertSessionHas('success');

        $updatedSkill = $skill->fresh();
        $this->assertEquals('Cloud & Virtualization (Updated)', $updatedSkill->category);
        $this->assertCount(3, $updatedSkill->items);
        $this->assertEquals('Helm', $updatedSkill->items[2]['name']);
        $this->assertEquals(4, $updatedSkill->items[2]['level']);
    }
}
