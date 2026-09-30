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
            'linkedin_enabled' => true,
            'linkedin_company' => 'Acme Distributed Labs',
            'linkedin_role' => 'Lead Systems Architect',
            'linkedin_work_auth' => 'Worldwide B2B & Full-Time',
            'linkedin_work_auth_note' => 'Available for international contracts',
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
            'seo_title' => 'Warren Dalawampu — Principal Systems Architect',
            'seo_description' => 'Custom SEO Meta Description for test verification.',
            'seo_keywords' => 'Warren, Architect, C++, Linux, PHP',
            'og_image' => 'https://images.unsplash.com/photo-custom-test',
        ];

        $response = $this->actingAs($this->admin)->post('/admin/settings', $payload);

        $response->assertSessionHas('success');
        $this->assertEquals('Warren Dalawampu (Updated)', SiteSetting::get('name'));
        $this->assertEquals('Principal Systems Architect', SiteSetting::get('title'));
        $this->assertEquals('https://linkedin.com/in/warr-dev-test', SiteSetting::get('linkedin'));
        $this->assertTrue(SiteSetting::get('linkedin_enabled'));
        $this->assertEquals('Acme Distributed Labs', SiteSetting::get('linkedin_company'));
        $this->assertEquals('Lead Systems Architect', SiteSetting::get('linkedin_role'));
        $this->assertEquals('Worldwide B2B & Full-Time', SiteSetting::get('linkedin_work_auth'));
        $this->assertEquals('Available for international contracts', SiteSetting::get('linkedin_work_auth_note'));
        $this->assertEquals('2018-06-01', SiteSetting::get('careerStartDate'));
        $this->assertEquals('hero_only', SiteSetting::get('cvDisplayMode'));
        $this->assertEquals('ats_resume', SiteSetting::get('activeCv'));
        $this->assertEquals('Embedded Systems & Edge Compute', SiteSetting::get('specializedTitle'));
        $this->assertEquals('Silicon to Cloud', SiteSetting::get('specializedSubtitle'));
        $this->assertEquals('Warren Dalawampu — Principal Systems Architect', SiteSetting::get('seo_title'));
        $this->assertEquals('Custom SEO Meta Description for test verification.', SiteSetting::get('seo_description'));
        $this->assertEquals('Warren, Architect, C++, Linux, PHP', SiteSetting::get('seo_keywords'));
        $this->assertEquals('https://images.unsplash.com/photo-custom-test', SiteSetting::get('og_image'));
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

    public function test_admin_can_upload_and_add_new_resume_to_list(): void
    {
        \Illuminate\Support\Facades\Storage::fake('public');

        $pdf = \Illuminate\Http\UploadedFile::fake()->create('custom_backend_cv.pdf', 500, 'application/pdf');

        $payload = [
            'label' => 'Embedded Systems & C++ CV',
            'type' => 'Low-Level & Hardware',
            'file' => $pdf,
        ];

        $response = $this->actingAs($this->admin)->post('/admin/settings/resumes', $payload);
        $response->assertSessionHas('success');

        $resumes = SiteSetting::get('resumes', []);
        $this->assertNotEmpty($resumes);

        $added = collect($resumes)->firstWhere('label', 'Embedded Systems & C++ CV');
        $this->assertNotNull($added);
        $this->assertEquals('Low-Level & Hardware', $added['type']);
        $this->assertStringEndsWith('.pdf', $added['url']);
    }

    public function test_admin_can_switch_active_resume(): void
    {
        $resumes = [
            [
                'id' => 'cv_1',
                'label' => 'Resume 1',
                'type' => 'Fullstack',
                'filename' => 'resume1.pdf',
                'url' => '/storage/resumes/resume1.pdf',
            ],
            [
                'id' => 'cv_2',
                'label' => 'Resume 2',
                'type' => 'Backend',
                'filename' => 'resume2.pdf',
                'url' => '/storage/resumes/resume2.pdf',
            ],
        ];
        SiteSetting::set('resumes', $resumes);
        SiteSetting::set('activeCv', 'cv_1');

        $response = $this->actingAs($this->admin)->post('/admin/settings/resumes/active', [
            'activeCv' => 'cv_2',
        ]);
        $response->assertSessionHas('success');

        $this->assertEquals('cv_2', SiteSetting::get('activeCv'));
    }

    public function test_admin_can_delete_resume_from_list(): void
    {
        $resumes = [
            [
                'id' => 'cv_1',
                'label' => 'Resume 1',
                'type' => 'Fullstack',
                'filename' => 'resume1.pdf',
                'url' => '/storage/resumes/resume1.pdf',
            ],
            [
                'id' => 'cv_2',
                'label' => 'Resume 2',
                'type' => 'Backend',
                'filename' => 'resume2.pdf',
                'url' => '/storage/resumes/resume2.pdf',
            ],
        ];
        SiteSetting::set('resumes', $resumes);
        SiteSetting::set('activeCv', 'cv_1');

        $response = $this->actingAs($this->admin)->delete('/admin/settings/resumes/cv_2');
        $response->assertSessionHas('success');

        $updatedResumes = SiteSetting::get('resumes', []);
        $this->assertCount(1, $updatedResumes);
        $this->assertEquals('cv_1', $updatedResumes[0]['id']);
    }

    public function test_admin_can_update_existing_resume(): void
    {
        \Illuminate\Support\Facades\Storage::fake('public');

        $resumes = [
            [
                'id' => 'cv_edit_test',
                'label' => 'Original Label',
                'type' => 'Original Type',
                'filename' => 'old_file.pdf',
                'url' => '/storage/resumes/old_file.pdf',
            ],
        ];
        SiteSetting::set('resumes', $resumes);

        $newPdf = \Illuminate\Http\UploadedFile::fake()->create('replacement.pdf', 300, 'application/pdf');

        $updatePayload = [
            'label' => 'Updated Custom Label',
            'type' => 'Updated Custom Type',
            'file' => $newPdf,
        ];

        $response = $this->actingAs($this->admin)->post('/admin/settings/resumes/cv_edit_test', $updatePayload);
        $response->assertSessionHas('success');

        $updatedList = SiteSetting::get('resumes', []);
        $this->assertCount(1, $updatedList);
        $this->assertEquals('Updated Custom Label', $updatedList[0]['label']);
        $this->assertEquals('Updated Custom Type', $updatedList[0]['type']);
        $this->assertEquals('replacement.pdf', $updatedList[0]['filename']);
    }
}


