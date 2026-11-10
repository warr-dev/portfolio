<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\Experience;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\Skill;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Display the main single-page portfolio with dynamically stored settings.
     */
    public function index(): Response
    {
        $projects = Project::where('featured', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        $experiences = Experience::orderBy('sort_order', 'asc')->get();

        $skills = Skill::orderBy('sort_order', 'asc')->get();
        $skillsViewMode = SiteSetting::get('skills_view_mode', 'categorized');
        $categorizedSkills = SiteSetting::get('categorized_skills', self::defaultCategorizedSkills());

        $careerStartDate = SiteSetting::get('careerStartDate', '2019-07-01');
        try {
            $diffYears = (int) floor(Carbon::parse($careerStartDate)->floatDiffInYears(Carbon::now()));
            $computedYears = max(1, $diffYears).'+ Years';
        } catch (\Exception $e) {
            $computedYears = '6+ Years';
        }

        $activeCv = SiteSetting::get('activeCv', 'comprehensive');
        $resumePdf = SiteSetting::get('resumePdf', '/Warren_Dalawampu_Resume.pdf');
        $cvPdf = SiteSetting::get('cvPdf', '/Warren_Dalawampu_CV_2026.pdf');

        $defaultCvs = [
            [
                'id' => 'comprehensive',
                'label' => 'Comprehensive Technical CV (2026)',
                'filename' => 'Warren_Dalawampu_CV_2026.pdf',
                'url' => $cvPdf,
                'type' => 'Full Technical Background',
            ],
            [
                'id' => 'ats_resume',
                'label' => 'ATS 1-Page Summary Resume',
                'filename' => 'Warren_Dalawampu_Resume.pdf',
                'url' => $resumePdf,
                'type' => 'ATS Standard 1-Page',
            ],
        ];

        $resumes = SiteSetting::get('resumes', $defaultCvs);
        $selectedResume = collect($resumes)->firstWhere('id', $activeCv) ?: ($resumes[0] ?? $defaultCvs[0]);

        $activeCvUrl = $selectedResume['url'] ?? $cvPdf;
        $activeCvLabel = $selectedResume['label'] ?? 'Comprehensive CV (PDF)';
        $activeCvFilename = $selectedResume['filename'] ?? 'Warren_Dalawampu_CV_2026.pdf';

        $defaultHeroActions = [
            [
                'id' => 1,
                'type' => 'button',
                'label' => 'Download '.($selectedResume['label'] ?? 'Curriculum Vitae (PDF)'),
                'url' => $activeCvUrl,
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
                'url' => SiteSetting::get('github', 'https://github.com/warr-dev'),
                'variant' => 'ghost',
                'icon' => 'ExternalLink',
                'download' => false,
                'is_external' => true,
            ],
            [
                'id' => 4,
                'type' => 'link',
                'label' => 'LinkedIn Profile',
                'url' => SiteSetting::get('linkedin', 'https://linkedin.com/in/warrdev'),
                'variant' => 'ghost',
                'icon' => 'ExternalLink',
                'download' => false,
                'is_external' => true,
            ],
        ];

        $name = SiteSetting::get('hero_name', SiteSetting::get('name', 'Warren Dalawampu'));
        $title = SiteSetting::get('hero_title', SiteSetting::get('title', 'Senior Backend Developer & DevOps / Infrastructure Engineer'));
        $subtitle = SiteSetting::get('hero_subtitle', 'Distributed Systems, High Concurrency & Edge Hardware Integrations');
        $caption = SiteSetting::get('hero_caption', SiteSetting::get('bio', '6+ years engineering high-concurrency gaming backends, localized OS-to-hardware casino engines, low-level C++ device drivers, payment gateways, and Linux/Docker/Kubernetes infrastructure across Laravel, Node.js, and cloud environments.'));
        $statusBadge = SiteSetting::get('hero_status_badge', SiteSetting::get('statusBadge', 'Open to Senior Backend & DevOps / Infrastructure Roles'));
        $location = SiteSetting::get('hero_location', SiteSetting::get('location', 'Sta Maria, Naujan, Oriental Mindoro, Philippines'));

        $recruiterData = [
            'name' => $name,
            'title' => $title,
            'subtitle' => $subtitle,
            'caption' => $caption,
            'statusBadge' => $statusBadge,
            'location' => $location,
            'heroLayout' => SiteSetting::get('hero_layout', 'layout4'),
            'heroDesignAccent' => SiteSetting::get('hero_design_accent', 'indigo'),
            'heroActions' => SiteSetting::get('hero_actions', $defaultHeroActions),
            'heroBadgeSecondary' => SiteSetting::get('hero_badge_secondary', ''),
            'heroBadgeSecondaryEnabled' => (bool) SiteSetting::get('hero_badge_secondary_enabled', false),
            'logoTextPrimary' => SiteSetting::get('logo_text_primary', 'warr'),
            'logoTextSecondary' => SiteSetting::get('logo_text_secondary', 'dev'),
            'logoIconText' => SiteSetting::get('logo_icon_text', 'W'),
            'logoIconUrl' => SiteSetting::get('logo_icon_url', null),
            'favicon' => SiteSetting::get('favicon', '/favicon.svg'),
            'bio' => $caption,
            'email' => SiteSetting::get('email', 'warrdev08@gmail.com'),
            'phone' => SiteSetting::get('phone', '+63 956 164 5935'),
            'github' => SiteSetting::get('github', 'https://github.com/warr-dev'),
            'linkedin' => SiteSetting::get('linkedin', 'https://linkedin.com/in/warrdev'),
            'linkedinEnabled' => (bool) SiteSetting::get('linkedin_enabled', true),
            'linkedinCompany' => SiteSetting::get('linkedin_company', 'NTT Limited Philippines'),
            'linkedinRole' => SiteSetting::get('linkedin_role', 'Senior Backend Developer'),
            'linkedinWorkAuth' => SiteSetting::get('linkedin_work_auth', 'Remote / B2B / Full-Time'),
            'linkedinWorkAuthNote' => SiteSetting::get('linkedin_work_auth_note', 'Open to worldwide contracts'),
            'careerStartDate' => $careerStartDate,
            'yearsExperience' => $computedYears,
            'cvDisplayMode' => SiteSetting::get('cvDisplayMode', 'both'),
            'activeCv' => $activeCv,
            'activeCvUrl' => $activeCvUrl,
            'activeCvLabel' => $activeCvLabel,
            'activeCvFilename' => $activeCvFilename,
            'resumePdf' => $resumePdf,
            'cvPdf' => $cvPdf,
            'specializedTitle' => SiteSetting::get('specializedTitle', 'Hardware I/O, C++ & Edge Engineering'),
            'specializedSubtitle' => SiteSetting::get('specializedSubtitle', 'Physical to Cloud'),
            'specializedCapabilities' => SiteSetting::get('specializedCapabilities', []),
            'seoTitle' => SiteSetting::get('seo_title', 'Warren Dalawampu — Senior Backend Developer & DevOps / Infrastructure Engineer'),
            'seoDescription' => SiteSetting::get('seo_description', 'Senior Backend & Systems Software Engineer specializing in high-concurrency gaming engines, C++ hardware integrations, low-latency APIs, and distributed systems.'),
            'seoKeywords' => SiteSetting::get('seo_keywords', 'Warren Dalawampu, Senior Backend Developer, Systems Engineer, Laravel, Node.js, C++, Gaming Kiosks, Distributed Systems, High Concurrency'),
            'ogImage' => SiteSetting::get('og_image', ''),
            'education' => [
                [
                    'degree' => 'Master of Science in Information Technology (MSIT)',
                    'institution' => 'Batangas State University (Alangilan Campus)',
                    'period' => '2019 — 2022',
                ],
                [
                    'degree' => 'Bachelor of Science in Information Technology (BSIT)',
                    'institution' => 'Mindoro State University',
                    'period' => '2015 — 2019',
                    'honors' => 'Computer Programmer of the Year (2017) · Academic Scholar',
                ],
            ],
        ];

        $recruiterData['skillsViewMode'] = $skillsViewMode;
        $recruiterData['categorizedSkills'] = $categorizedSkills;

        return Inertia::render('Portfolio/Index', [
            'projects' => $projects,
            'experiences' => $experiences,
            'skills' => $skills,
            'categorizedSkills' => $categorizedSkills,
            'skillsViewMode' => $skillsViewMode,
            'recruiterData' => $recruiterData,
        ]);
    }

    /**
     * Default credible categorized technical arsenal grouped by real-world context.
     */
    public static function defaultCategorizedSkills(): array
    {
        return [
            [
                'id' => 'production-experience',
                'category' => 'Production experience',
                'subtitle' => 'Commercial & enterprise systems delivered over 6+ years in production',
                'badge' => 'Commercial Production',
                'badge_color' => 'emerald',
                'description' => 'Architected and maintained in high-concurrency production environments handling real users, revenue transactions, and strict uptime SLAs.',
                'items' => [
                    'PHP',
                    'Laravel',
                    'Node.js',
                    'MySQL',
                    'MongoDB',
                    'Linux',
                    'Docker',
                    'Git',
                    'REST APIs',
                    'CI/CD',
                ],
            ],
            [
                'id' => 'infrastructure-projects',
                'category' => 'Hands-on infrastructure projects',
                'subtitle' => 'Bare-metal homelab clusters, multi-node runtimes & automated IaC',
                'badge' => 'Infrastructure & Homelab',
                'badge_color' => 'sky',
                'description' => 'Deployed and managed in bare-metal cluster labs and staging projects. Kept under project experience for genuine technical credibility.',
                'items' => [
                    'Kubernetes',
                    'Terraform',
                    'Ansible',
                    'GCP',
                    'Calico',
                    'containerd',
                    'GitLab CI',
                    'WireGuard',
                ],
            ],
            [
                'id' => 'systems-hardware',
                'category' => 'Systems & hardware engineering',
                'subtitle' => 'Physical I/O device drivers, serial protocols & embedded microcontrollers',
                'badge' => 'Hardware & Low-Level',
                'badge_color' => 'violet',
                'description' => 'Engineered for physical gaming machines, cash/ticket acceptor peripherals, thermal printers, and real-time serial protocols.',
                'items' => [
                    'C++',
                    'Ubuntu',
                    'Serial Communication',
                    'WebSockets',
                    'ESP32',
                    'Raspberry Pi',
                    'Hardware Drivers',
                ],
            ],
        ];
    }

    /**
     * Store incoming contact inquiries with validation and flash notification.
     */
    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'subject' => 'required|string|max:200',
            'message' => 'required|string|max:5000',
        ]);

        ContactMessage::create([
            ...$validated,
            'ip_address' => $request->ip(),
        ]);

        return redirect()->back()->with('success', 'Message received. Warren will reply promptly within 24 hours.');
    }

    /**
     * Display a dedicated page for an individual project instance.
     */
    public function showProject(Project $project): Response
    {
        $careerStartDate = SiteSetting::get('careerStartDate', '2019-07-01');
        try {
            $diffYears = (int) floor(Carbon::parse($careerStartDate)->floatDiffInYears(Carbon::now()));
            $computedYears = max(1, $diffYears).'+ Years';
        } catch (\Exception $e) {
            $computedYears = '6+ Years';
        }

        $activeCv = SiteSetting::get('activeCv', 'comprehensive');
        $resumePdf = SiteSetting::get('resumePdf', '/Warren_Dalawampu_Resume.pdf');
        $cvPdf = SiteSetting::get('cvPdf', '/Warren_Dalawampu_CV_2026.pdf');

        $recruiterData = [
            'name' => SiteSetting::get('name', 'Warren Dalawampu'),
            'title' => SiteSetting::get('title', 'Senior Backend Developer & DevOps / Infrastructure Engineer'),
            'statusBadge' => SiteSetting::get('statusBadge', 'Open to Senior Backend & DevOps / Infrastructure Roles'),
            'location' => SiteSetting::get('location', 'Pasig City, Philippines (Remote Worldwide)'),
            'email' => SiteSetting::get('email', 'warrdev08@gmail.com'),
            'github' => SiteSetting::get('github', 'https://github.com/warr-dev'),
            'linkedin' => SiteSetting::get('linkedin', 'https://linkedin.com/in/warrdev'),
            'yearsExperience' => $computedYears,
            'cvDisplayMode' => SiteSetting::get('cvDisplayMode', 'both'),
            'activeCv' => $activeCv,
            'activeCvUrl' => $activeCv === 'ats_resume' ? $resumePdf : $cvPdf,
            'activeCvLabel' => $activeCv === 'ats_resume' ? 'ATS 1-Page Resume' : 'Comprehensive CV (PDF)',
            'activeCvFilename' => $activeCv === 'ats_resume' ? 'Warren_Dalawampu_Resume.pdf' : 'Warren_Dalawampu_CV_2026.pdf',
            'seoTitle' => "{$project->title} — Systems Architecture Case Study | Warren Dalawampu",
            'seoDescription' => $project->description ?: "Technical deep-dive and production architecture for {$project->title} by Warren Dalawampu.",
            'seoKeywords' => implode(', ', array_merge(['Warren Dalawampu', $project->title, $project->badge], is_array($project->tags) ? $project->tags : [])),
            'ogImage' => $project->cover_image ?: ($project->media_url ?: SiteSetting::get('og_image', '')),
        ];

        // Fetch related/other projects
        $relatedProjects = Project::where('id', '!=', $project->id)
            ->where('featured', true)
            ->orderBy('sort_order', 'asc')
            ->take(2)
            ->get();

        return Inertia::render('Portfolio/ProjectShow', [
            'project' => $project,
            'relatedProjects' => $relatedProjects,
            'recruiterData' => $recruiterData,
        ]);
    }

    /**
     * Generate dynamic XML sitemap for SEO crawlers.
     */
    public function sitemap()
    {
        $baseUrl = url('/');
        $projects = Project::orderBy('updated_at', 'desc')->get();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";

        // Homepage
        $latestUpdate = Project::max('updated_at') ?: now()->toAtomString();
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$baseUrl}</loc>\n";
        $xml .= '    <lastmod>'.Carbon::parse($latestUpdate)->toAtomString()."</lastmod>\n";
        $xml .= "    <changefreq>weekly</changefreq>\n";
        $xml .= "    <priority>1.0</priority>\n";
        $xml .= "  </url>\n";

        // Projects
        foreach ($projects as $proj) {
            $xml .= "  <url>\n";
            $xml .= '    <loc>'.route('portfolio.project.show', $proj->slug)."</loc>\n";
            $xml .= '    <lastmod>'.$proj->updated_at->toAtomString()."</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.8</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }

    /**
     * Generate dynamic robots.txt linking to the XML sitemap.
     */
    public function robots()
    {
        $sitemapUrl = url('/sitemap.xml');
        $robots = "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /admin/\n\nSitemap: {$sitemapUrl}\n";

        return response($robots, 200, [
            'Content-Type' => 'text/plain',
        ]);
    }
}
