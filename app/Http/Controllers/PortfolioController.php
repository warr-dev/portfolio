<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\Experience;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\Skill;
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

        $careerStartDate = SiteSetting::get('careerStartDate', '2019-07-01');
        try {
            $diffYears = (int) floor(\Carbon\Carbon::parse($careerStartDate)->floatDiffInYears(\Carbon\Carbon::now()));
            $computedYears = max(1, $diffYears) . '+ Years';
        } catch (\Exception $e) {
            $computedYears = '6+ Years';
        }

        $activeCv = SiteSetting::get('activeCv', 'comprehensive');
        $resumePdf = SiteSetting::get('resumePdf', '/Warren_Dalawampu_Resume.pdf');
        $cvPdf = SiteSetting::get('cvPdf', '/Warren_Dalawampu_CV_2026.pdf');

        $activeCvUrl = $activeCv === 'ats_resume' ? $resumePdf : $cvPdf;
        $activeCvLabel = $activeCv === 'ats_resume' ? 'ATS 1-Page Resume' : 'Comprehensive CV (PDF)';
        $activeCvFilename = $activeCv === 'ats_resume' ? 'Warren_Dalawampu_Resume.pdf' : 'Warren_Dalawampu_CV_2026.pdf';

        $recruiterData = [
            'name' => SiteSetting::get('name', 'Warren Dalawampu'),
            'title' => SiteSetting::get('title', 'Senior Backend Developer & Systems Software Engineer'),
            'statusBadge' => SiteSetting::get('statusBadge', 'Open to Senior Backend & Distributed Systems Roles'),
            'location' => SiteSetting::get('location', 'Pasig City, Philippines (Remote Worldwide)'),
            'bio' => SiteSetting::get('bio', '6+ years engineering high-concurrency gaming backends, localized OS-to-hardware casino engines, low-level C++ device drivers, and payment gateways across Laravel, Node.js, Linux infrastructure, and Docker.'),
            'email' => SiteSetting::get('email', 'warrdev08@gmail.com'),
            'phone' => SiteSetting::get('phone', '+63 956 164 5935'),
            'github' => SiteSetting::get('github', 'https://github.com/warr-dev'),
            'linkedin' => SiteSetting::get('linkedin', 'https://linkedin.com/in/warr-dev'),
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
            'education' => [
                [
                    'degree' => 'Master of Science in Information Technology (MSIT)',
                    'institution' => 'Batangas State University (Alangilan Campus)',
                    'period' => '2019 — 2021',
                ],
                [
                    'degree' => 'Bachelor of Science in Information Technology (BSIT)',
                    'institution' => 'Mindoro State University',
                    'period' => '2015 — 2019',
                    'honors' => 'Computer Programmer of the Year (2017) · Academic Scholar',
                ],
            ],
        ];

        return Inertia::render('Portfolio/Index', [
            'projects' => $projects,
            'experiences' => $experiences,
            'skills' => $skills,
            'recruiterData' => $recruiterData,
        ]);
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
            $diffYears = (int) floor(\Carbon\Carbon::parse($careerStartDate)->floatDiffInYears(\Carbon\Carbon::now()));
            $computedYears = max(1, $diffYears) . '+ Years';
        } catch (\Exception $e) {
            $computedYears = '6+ Years';
        }

        $activeCv = SiteSetting::get('activeCv', 'comprehensive');
        $resumePdf = SiteSetting::get('resumePdf', '/Warren_Dalawampu_Resume.pdf');
        $cvPdf = SiteSetting::get('cvPdf', '/Warren_Dalawampu_CV_2026.pdf');

        $recruiterData = [
            'name' => SiteSetting::get('name', 'Warren Dalawampu'),
            'title' => SiteSetting::get('title', 'Senior Backend Developer & Systems Software Engineer'),
            'statusBadge' => SiteSetting::get('statusBadge', 'Open to Senior Backend & Distributed Systems Roles'),
            'location' => SiteSetting::get('location', 'Pasig City, Philippines (Remote Worldwide)'),
            'email' => SiteSetting::get('email', 'warrdev08@gmail.com'),
            'github' => SiteSetting::get('github', 'https://github.com/warr-dev'),
            'linkedin' => SiteSetting::get('linkedin', 'https://linkedin.com/in/warr-dev'),
            'yearsExperience' => $computedYears,
            'cvDisplayMode' => SiteSetting::get('cvDisplayMode', 'both'),
            'activeCv' => $activeCv,
            'activeCvUrl' => $activeCv === 'ats_resume' ? $resumePdf : $cvPdf,
            'activeCvLabel' => $activeCv === 'ats_resume' ? 'ATS 1-Page Resume' : 'Comprehensive CV (PDF)',
            'activeCvFilename' => $activeCv === 'ats_resume' ? 'Warren_Dalawampu_Resume.pdf' : 'Warren_Dalawampu_CV_2026.pdf',
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
}
