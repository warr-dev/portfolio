<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

use Carbon\Carbon;

class SettingsController extends Controller
{
    public function index(): Response
    {
        $careerStartDate = SiteSetting::get('careerStartDate', '2019-07-01');
        
        // Calculate dynamic years of experience based on start date
        try {
            $diffYears = (int) floor(Carbon::parse($careerStartDate)->floatDiffInYears(Carbon::now()));
            $computedYears = max(1, $diffYears) . '+ Years';
        } catch (\Exception $e) {
            $computedYears = '6+ Years';
        }

        $activeCv = SiteSetting::get('activeCv', 'comprehensive');
        $resumePdf = SiteSetting::get('resumePdf', '/Warren_Dalawampu_Resume.pdf');
        $cvPdf = SiteSetting::get('cvPdf', '/Warren_Dalawampu_CV_2026.pdf');

        $availableCvs = [
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

        $settings = [
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
            'resumePdf' => $resumePdf,
            'cvPdf' => $cvPdf,
            'availableCvs' => $availableCvs,
            'specializedTitle' => SiteSetting::get('specializedTitle', 'Hardware I/O, C++ & Edge Engineering'),
            'specializedSubtitle' => SiteSetting::get('specializedSubtitle', 'Physical to Cloud'),
            'specializedCapabilities' => SiteSetting::get('specializedCapabilities', []),
        ];

        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'title' => 'required|string|max:150',
            'statusBadge' => 'required|string|max:150',
            'location' => 'required|string|max:150',
            'bio' => 'required|string|max:2000',
            'email' => 'required|email|max:100',
            'phone' => 'required|string|max:50',
            'github' => 'required|url|max:200',
            'linkedin' => 'nullable|url|max:200',
            'careerStartDate' => 'required|date',
            'cvDisplayMode' => 'required|in:both,topbar_only,hero_only,hidden',
            'activeCv' => 'required|in:comprehensive,ats_resume',
            'specializedTitle' => 'nullable|string|max:150',
            'specializedSubtitle' => 'nullable|string|max:100',
            'specializedCapabilities' => 'nullable|array',
            'specializedCapabilities.*.title' => 'required|string|max:150',
            'specializedCapabilities.*.description' => 'required|string|max:1000',
            'specializedCapabilities.*.icon' => 'nullable|string|max:50',
            'cv_file' => 'nullable|file|mimes:pdf|max:10240',
            'resume_file' => 'nullable|file|mimes:pdf|max:10240',
            'new_password' => 'nullable|string|min:6',
        ]);

        // Compute dynamic experience string
        try {
            $diffYears = (int) floor(Carbon::parse($validated['careerStartDate'])->floatDiffInYears(Carbon::now()));
            $computedYears = max(1, $diffYears) . '+ Years';
        } catch (\Exception $e) {
            $computedYears = '6+ Years';
        }
        $validated['yearsExperience'] = $computedYears;
        $validated['specializedCapabilities'] = $request->input('specializedCapabilities', []);

        foreach (['name', 'title', 'statusBadge', 'location', 'bio', 'email', 'phone', 'github', 'linkedin', 'careerStartDate', 'yearsExperience', 'cvDisplayMode', 'activeCv', 'specializedTitle', 'specializedSubtitle', 'specializedCapabilities'] as $key) {
            if (array_key_exists($key, $validated)) {
                SiteSetting::set($key, $validated[$key]);
            }
        }

        if ($request->hasFile('cv_file')) {
            $path = $request->file('cv_file')->move(public_path(), 'Warren_Dalawampu_CV_2026.pdf');
            SiteSetting::set('cvPdf', '/Warren_Dalawampu_CV_2026.pdf');
        }

        if ($request->hasFile('resume_file')) {
            $path = $request->file('resume_file')->move(public_path(), 'Warren_Dalawampu_Resume.pdf');
            SiteSetting::set('resumePdf', '/Warren_Dalawampu_Resume.pdf');
        }

        if (! empty($validated['new_password'])) {
            $user = $request->user();
            $user->password = Hash::make($validated['new_password']);
            $user->save();
        }

        return redirect()->back()->with('success', 'Profile and site settings updated successfully.');
    }
}
