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
        if (empty($resumes)) {
            $resumes = $defaultCvs;
            SiteSetting::set('resumes', $resumes);
        }

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
            'linkedin_enabled' => (bool) SiteSetting::get('linkedin_enabled', true),
            'linkedin_company' => SiteSetting::get('linkedin_company', 'NTT Limited Philippines'),
            'linkedin_role' => SiteSetting::get('linkedin_role', 'Senior Backend Developer'),
            'linkedin_work_auth' => SiteSetting::get('linkedin_work_auth', 'Remote / B2B / Full-Time'),
            'linkedin_work_auth_note' => SiteSetting::get('linkedin_work_auth_note', 'Open to worldwide contracts'),
            'careerStartDate' => $careerStartDate,
            'yearsExperience' => $computedYears,
            'cvDisplayMode' => SiteSetting::get('cvDisplayMode', 'both'),
            'activeCv' => $activeCv,
            'resumePdf' => $resumePdf,
            'cvPdf' => $cvPdf,
            'availableCvs' => $resumes,
            'specializedTitle' => SiteSetting::get('specializedTitle', 'Hardware I/O, C++ & Edge Engineering'),
            'specializedSubtitle' => SiteSetting::get('specializedSubtitle', 'Physical to Cloud'),
            'specializedCapabilities' => SiteSetting::get('specializedCapabilities', []),
            'seo_title' => SiteSetting::get('seo_title', 'Warren Dalawampu — Senior Backend Developer & Systems Software Engineer'),
            'seo_description' => SiteSetting::get('seo_description', 'Senior Backend & Systems Software Engineer specializing in high-concurrency gaming engines, C++ hardware integrations, low-latency APIs, and distributed systems.'),
            'seo_keywords' => SiteSetting::get('seo_keywords', 'Warren Dalawampu, Senior Backend Developer, Systems Engineer, Laravel, Node.js, C++, Gaming Kiosks, Distributed Systems, High Concurrency'),
            'og_image' => SiteSetting::get('og_image', ''),
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
            'linkedin_enabled' => 'nullable|boolean',
            'linkedin_company' => 'nullable|string|max:150',
            'linkedin_role' => 'nullable|string|max:150',
            'linkedin_work_auth' => 'nullable|string|max:150',
            'linkedin_work_auth_note' => 'nullable|string|max:200',
            'careerStartDate' => 'required|date',
            'cvDisplayMode' => 'required|in:both,topbar_only,hero_only,hidden',
            'activeCv' => 'required|string|max:100',
            'specializedTitle' => 'nullable|string|max:150',
            'specializedSubtitle' => 'nullable|string|max:100',
            'specializedCapabilities' => 'nullable|array',
            'specializedCapabilities.*.title' => 'required|string|max:150',
            'specializedCapabilities.*.description' => 'required|string|max:1000',
            'specializedCapabilities.*.icon' => 'nullable|string|max:50',
            'seo_title' => 'nullable|string|max:200',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:500',
            'og_image' => 'nullable|string|max:500',
            'og_image_file' => 'nullable|image|mimes:jpeg,png,webp,jpg|max:5120',
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
        if ($request->has('linkedin_enabled')) {
            $val = $request->input('linkedin_enabled');
            $validated['linkedin_enabled'] = filter_var($val, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? (bool) $val;
        }

        if ($request->hasFile('og_image_file')) {
            $file = $request->file('og_image_file');
            $filename = 'og-image-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('seo', $filename, 'public');
            $validated['og_image'] = '/storage/' . $path;
        }

        foreach ([
            'name', 'title', 'statusBadge', 'location', 'bio', 'email', 'phone', 'github', 
            'linkedin', 'linkedin_enabled', 'linkedin_company', 'linkedin_role', 'linkedin_work_auth', 'linkedin_work_auth_note',
            'careerStartDate', 'yearsExperience', 'cvDisplayMode', 'activeCv', 'specializedTitle', 'specializedSubtitle', 'specializedCapabilities',
            'seo_title', 'seo_description', 'seo_keywords', 'og_image'
        ] as $key) {
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

    /**
     * Upload and add a new resume to the collection.
     */
    public function storeResume(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:150',
            'type' => 'nullable|string|max:100',
            'file' => 'required|file|mimes:pdf|max:15360',
        ]);

        $file = $request->file('file');
        $originalFilename = $file->getClientOriginalName();
        $safeName = \Illuminate\Support\Str::slug(pathinfo($originalFilename, PATHINFO_FILENAME));
        $uniqueFilename = $safeName . '-' . time() . '.pdf';

        // Store into public storage
        $path = $file->storeAs('resumes', $uniqueFilename, 'public');
        $url = '/storage/' . $path;

        $defaultCvs = [
            [
                'id' => 'comprehensive',
                'label' => 'Comprehensive Technical CV (2026)',
                'filename' => 'Warren_Dalawampu_CV_2026.pdf',
                'url' => SiteSetting::get('cvPdf', '/Warren_Dalawampu_CV_2026.pdf'),
                'type' => 'Full Technical Background',
            ],
            [
                'id' => 'ats_resume',
                'label' => 'ATS 1-Page Summary Resume',
                'filename' => 'Warren_Dalawampu_Resume.pdf',
                'url' => SiteSetting::get('resumePdf', '/Warren_Dalawampu_Resume.pdf'),
                'type' => 'ATS Standard 1-Page',
            ],
        ];

        $resumes = SiteSetting::get('resumes', $defaultCvs);

        $newId = 'resume_' . uniqid();
        $newResume = [
            'id' => $newId,
            'label' => $validated['label'],
            'type' => $validated['type'] ?: 'Custom CV / Resume',
            'filename' => $originalFilename,
            'url' => $url,
        ];

        $resumes[] = $newResume;
        SiteSetting::set('resumes', $resumes);

        return redirect()->back()->with('success', "Resume '{$validated['label']}' uploaded successfully.");
    }

    /**
     * Update an existing resume's metadata and optionally replace its PDF file.
     */
    public function updateResume(Request $request, $id)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:150',
            'type' => 'nullable|string|max:100',
            'file' => 'nullable|file|mimes:pdf|max:15360',
        ]);

        $defaultCvs = [
            [
                'id' => 'comprehensive',
                'label' => 'Comprehensive Technical CV (2026)',
                'filename' => 'Warren_Dalawampu_CV_2026.pdf',
                'url' => SiteSetting::get('cvPdf', '/Warren_Dalawampu_CV_2026.pdf'),
                'type' => 'Full Technical Background',
            ],
            [
                'id' => 'ats_resume',
                'label' => 'ATS 1-Page Summary Resume',
                'filename' => 'Warren_Dalawampu_Resume.pdf',
                'url' => SiteSetting::get('resumePdf', '/Warren_Dalawampu_Resume.pdf'),
                'type' => 'ATS Standard 1-Page',
            ],
        ];

        $resumes = SiteSetting::get('resumes', $defaultCvs);
        $found = false;

        foreach ($resumes as &$item) {
            if (($item['id'] ?? '') === $id) {
                $item['label'] = $validated['label'];
                $item['type'] = $validated['type'] ?: 'Custom CV / Resume';

                if ($request->hasFile('file')) {
                    $file = $request->file('file');
                    $originalFilename = $file->getClientOriginalName();
                    $safeName = \Illuminate\Support\Str::slug(pathinfo($originalFilename, PATHINFO_FILENAME));
                    $uniqueFilename = $safeName . '-' . time() . '.pdf';

                    $path = $file->storeAs('resumes', $uniqueFilename, 'public');
                    $item['filename'] = $originalFilename;
                    $item['url'] = '/storage/' . $path;
                }

                $found = true;
                break;
            }
        }

        if (! $found) {
            return redirect()->back()->withErrors(['resume' => 'Resume not found.']);
        }

        SiteSetting::set('resumes', $resumes);

        return redirect()->back()->with('success', "Resume '{$validated['label']}' updated successfully.");
    }

    /**
     * Switch active resume displayed on the public website.
     */
    public function setActiveResume(Request $request)
    {
        $validated = $request->validate([
            'activeCv' => 'required|string',
        ]);

        SiteSetting::set('activeCv', $validated['activeCv']);

        return redirect()->back()->with('success', 'Active public resume updated.');
    }

    /**
     * Delete a resume from the list.
     */
    public function destroyResume($id)
    {
        $resumes = SiteSetting::get('resumes', []);
        $activeCv = SiteSetting::get('activeCv', 'comprehensive');

        // Prevent deleting active resume if other resumes exist
        if ($activeCv === $id && count($resumes) > 1) {
            return redirect()->back()->withErrors(['activeCv' => 'Cannot delete the currently active resume. Please select another active resume first.']);
        }

        $filtered = array_values(array_filter($resumes, fn ($item) => ($item['id'] ?? '') !== $id));
        SiteSetting::set('resumes', $filtered);

        // If the deleted resume was active, set the first available as active
        if ($activeCv === $id && !empty($filtered)) {
            SiteSetting::set('activeCv', $filtered[0]['id']);
        }

        return redirect()->back()->with('success', 'Resume removed successfully.');
    }
}

