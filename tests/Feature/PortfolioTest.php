<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortfolioTest extends TestCase
{
    use RefreshDatabase;

    public function test_portfolio_page_loads_successfully_with_inertia_props(): void
    {
        $this->seed();

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Portfolio/Index')
            ->has('projects')
            ->has('experiences')
            ->has('skills')
            ->has('recruiterData')
            ->where('recruiterData.name', 'Warren Dalawampu')
        );
    }

    public function test_contact_form_validates_required_fields(): void
    {
        $response = $this->post('/contact', []);

        $response->assertSessionHasErrors(['name', 'email', 'subject', 'message']);
    }

    public function test_contact_form_submits_successfully_and_saves_to_database(): void
    {
        $payload = [
            'name' => 'Alice Recruiter',
            'email' => 'alice@techcompany.com',
            'subject' => 'Senior Backend Engineer Role',
            'message' => 'Hi Warren, we are interested in discussing an open Senior Backend role with you.',
        ];

        $response = $this->post('/contact', $payload);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Alice Recruiter',
            'email' => 'alice@techcompany.com',
            'subject' => 'Senior Backend Engineer Role',
        ]);
    }

    public function test_dedicated_project_page_loads_with_details_and_media(): void
    {
        $project = Project::create([
            'title' => 'High-Concurrency Slot Engine',
            'slug' => 'high-concurrency-slot-engine',
            'badge' => 'Gaming / Backend',
            'organization' => 'Casino Lab',
            'description' => 'Real-time distributed slot machine backend with Protobuf communication.',
            'content' => 'Comprehensive technical case study covering microsecond spin resolution and Redis cluster locks.',
            'tags' => ['Laravel', 'Redis', 'Protobuf'],
            'demo_url' => 'https://demo.slotengine.test',
            'github_url' => 'https://github.com/warr-dev/slot-engine',
            'demo_status' => 'live',
            'github_status' => 'private',
            'cover_image' => 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
            'media_type' => 'image',
            'media_url' => 'https://images.unsplash.com/photo-1518770660439-4636190af475',
            'gallery' => [
                ['type' => 'image', 'url' => 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', 'caption' => 'Redis Architecture Bench'],
                ['type' => 'video', 'url' => 'https://example.com/demo.mp4', 'caption' => 'Engine Spin Demo'],
            ],
            'extra_info' => ['Throughput' => '100,000 spins/sec'],
            'featured' => true,
            'sort_order' => 1,
        ]);

        $response = $this->get("/projects/{$project->slug}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Portfolio/ProjectShow')
            ->has('project')
            ->has('relatedProjects')
            ->has('recruiterData')
            ->where('project.title', 'High-Concurrency Slot Engine')
            ->where('project.cover_image', 'https://images.unsplash.com/photo-1511512578047-dfb367046420')
            ->where('project.gallery.0.caption', 'Redis Architecture Bench')
        );
    }

    public function test_sitemap_xml_generates_valid_xml_with_project_routes(): void
    {
        Project::create([
            'title' => 'Sitemap Test Project',
            'slug' => 'sitemap-test-project',
            'badge' => 'Cloud',
            'description' => 'Test project for XML sitemap verification.',
            'tags' => ['Docker', 'AWS'],
            'demo_status' => 'offline',
            'github_status' => 'public',
            'media_type' => 'none',
            'featured' => true,
            'sort_order' => 1,
        ]);

        $response = $this->get('/sitemap.xml');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/xml');
        $this->assertStringContainsString('<?xml version="1.0" encoding="UTF-8"?>', $response->getContent());
        $this->assertStringContainsString('<loc>' . url('/') . '</loc>', $response->getContent());
        $this->assertStringContainsString('<loc>' . route('portfolio.project.show', 'sitemap-test-project') . '</loc>', $response->getContent());
    }

    public function test_robots_txt_returns_disallow_admin_and_sitemap_link(): void
    {
        $response = $this->get('/robots.txt');

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/plain; charset=UTF-8');
        $this->assertStringContainsString('User-agent: *', $response->getContent());
        $this->assertStringContainsString('Disallow: /admin', $response->getContent());
        $this->assertStringContainsString('Sitemap: ' . url('/sitemap.xml'), $response->getContent());
    }
}
