<?php

namespace Tests\Feature;

use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SkillAdminTest extends TestCase
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

    public function test_guest_cannot_access_skills_admin(): void
    {
        $response = $this->get('/admin/skills');
        $response->assertRedirect('/login');
    }

    public function test_admin_can_view_skills_dashboard_with_categorized_arsenal(): void
    {
        $response = $this->actingAs($this->admin)->get('/admin/skills');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Skills/Index')
            ->has('skills')
            ->has('categorizedSkills', 3)
            ->where('skillsViewMode', 'categorized')
        );
    }

    public function test_admin_can_update_categorized_skills(): void
    {
        $customCategories = [
            [
                'id' => 'production-tier',
                'category' => 'Core Production Systems',
                'subtitle' => 'High-throughput enterprise platforms',
                'badge' => 'Production / 6+ Yrs',
                'accent' => 'emerald',
                'description' => 'Architected and operated daily under strict SLA requirements.',
                'items' => ['PHP', 'Laravel', 'Redis', 'Docker'],
            ],
            [
                'id' => 'specialized-tier',
                'category' => 'Specialized Hardware Protocols',
                'subtitle' => 'Serial I/O and embedded microcontrollers',
                'badge' => 'Hardware Specialist',
                'accent' => 'purple',
                'description' => 'Low-level hardware driver integrations.',
                'items' => ['C++', 'Serial Communication', 'ESP32'],
            ],
        ];

        $response = $this->actingAs($this->admin)->post('/admin/skills/categorized', [
            'categories' => $customCategories,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $stored = SiteSetting::get('categorized_skills');
        $this->assertIsArray($stored);
        $this->assertCount(2, $stored);
        $this->assertEquals('Core Production Systems', $stored[0]['category']);
        $this->assertEquals(['PHP', 'Laravel', 'Redis', 'Docker'], $stored[0]['items']);

        // Verify public home page renders the customized categories
        $homeResponse = $this->get('/');
        $homeResponse->assertStatus(200);
        $homeResponse->assertInertia(fn ($page) => $page
            ->component('Portfolio/Index')
            ->has('categorizedSkills', 2)
            ->where('categorizedSkills.0.category', 'Core Production Systems')
            ->where('categorizedSkills.1.category', 'Specialized Hardware Protocols')
        );
    }

    public function test_admin_can_reset_categorized_skills_to_defaults(): void
    {
        // First set custom
        SiteSetting::set('categorized_skills', [
            [
                'id' => 'custom',
                'category' => 'Temporary Custom',
                'subtitle' => 'Testing',
                'badge' => 'Temp',
                'accent' => 'rose',
                'description' => 'Desc',
                'items' => ['Java'],
            ],
        ]);

        $this->assertCount(1, SiteSetting::get('categorized_skills'));

        $response = $this->actingAs($this->admin)->post('/admin/skills/categorized/reset');

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $reset = SiteSetting::get('categorized_skills');
        $this->assertCount(3, $reset);
        $this->assertEquals('Production experience', $reset[0]['category']);
        $this->assertEquals('Hands-on infrastructure projects', $reset[1]['category']);
        $this->assertEquals('Systems & hardware engineering', $reset[2]['category']);
    }

    public function test_admin_can_update_skills_presentation_view_mode(): void
    {
        $response = $this->actingAs($this->admin)->post('/admin/skills/view-mode', [
            'mode' => 'stars',
        ]);

        $response->assertRedirect();
        $this->assertEquals('stars', SiteSetting::get('skills_view_mode'));

        $homeResponse = $this->get('/');
        $homeResponse->assertStatus(200);
        $homeResponse->assertInertia(fn ($page) => $page
            ->where('skillsViewMode', 'stars')
        );
    }
}
