<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Projects/Index', [
            'projects' => Project::orderBy('sort_order', 'asc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'badge' => 'nullable|string|max:50',
            'organization' => 'nullable|string|max:100',
            'description' => 'required|string|max:2000',
            'tags' => 'required|array',
            'tags.*' => 'string|max:50',
            'demo_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'demo_status' => 'required|string|in:live,offline,internal,decommissioned',
            'github_status' => 'required|string|in:public,private,nda,archived',
            'media_type' => 'required|string|in:none,image,video,youtube',
            'media_url' => 'nullable|string|max:1000',
            'media_file' => 'nullable|file|mimes:jpg,jpeg,png,webp,gif,mp4,webm|max:51200',
            'cover_image' => 'nullable|string|max:1000',
            'cover_file' => 'nullable|file|mimes:jpg,jpeg,png,webp,gif|max:15360',
            'gallery' => 'nullable',
            'gallery_files' => 'nullable|array',
            'gallery_files.*' => 'file|mimes:jpg,jpeg,png,webp,gif,mp4,webm|max:51200',
            'content' => 'nullable|string|max:20000',
            'featured' => 'boolean',
            'sort_order' => 'integer',
            'extra_info' => 'nullable',
        ]);

        if (isset($validated['extra_info'])) {
            if (is_string($validated['extra_info'])) {
                $decoded = json_decode($validated['extra_info'], true);
                $validated['extra_info'] = is_array($decoded) ? $decoded : null;
            } elseif (!is_array($validated['extra_info'])) {
                $validated['extra_info'] = null;
            }
        }

        // Parse gallery items if sent as string
        $galleryItems = [];
        if (isset($validated['gallery'])) {
            if (is_string($validated['gallery'])) {
                $decodedGallery = json_decode($validated['gallery'], true);
                $galleryItems = is_array($decodedGallery) ? $decodedGallery : [];
            } elseif (is_array($validated['gallery'])) {
                $galleryItems = $validated['gallery'];
            }
        }

        // Handle uploaded cover file
        if ($request->hasFile('cover_file')) {
            $path = $request->file('cover_file')->store('projects/covers', 'public');
            $validated['cover_image'] = '/storage/'.$path;
        }
        unset($validated['cover_file']);

        // Handle primary media file
        if ($request->hasFile('media_file')) {
            $path = $request->file('media_file')->store('projects', 'public');
            $validated['media_url'] = '/storage/'.$path;
        }
        unset($validated['media_file']);

        // Handle multiple gallery file uploads
        if ($request->hasFile('gallery_files')) {
            foreach ($request->file('gallery_files') as $file) {
                $mime = $file->getMimeType();
                $type = str_starts_with($mime, 'video') ? 'video' : 'image';
                $path = $file->store('projects/gallery', 'public');
                $galleryItems[] = [
                    'type' => $type,
                    'url' => '/storage/'.$path,
                    'caption' => $file->getClientOriginalName(),
                ];
            }
        }
        unset($validated['gallery_files']);
        $validated['gallery'] = !empty($galleryItems) ? $galleryItems : null;

        $slug = Str::slug($validated['title']);
        $uniqueSlug = $slug;
        $counter = 1;
        while (Project::where('slug', $uniqueSlug)->exists()) {
            $uniqueSlug = $slug.'-'.$counter++;
        }
        $validated['slug'] = $uniqueSlug;

        Project::create($validated);

        return redirect()->back()->with('success', 'Project created successfully.');
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'badge' => 'nullable|string|max:50',
            'organization' => 'nullable|string|max:100',
            'description' => 'required|string|max:2000',
            'tags' => 'required|array',
            'tags.*' => 'string|max:50',
            'demo_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'demo_status' => 'required|string|in:live,offline,internal,decommissioned',
            'github_status' => 'required|string|in:public,private,nda,archived',
            'media_type' => 'required|string|in:none,image,video,youtube',
            'media_url' => 'nullable|string|max:1000',
            'media_file' => 'nullable|file|mimes:jpg,jpeg,png,webp,gif,mp4,webm|max:51200',
            'cover_image' => 'nullable|string|max:1000',
            'cover_file' => 'nullable|file|mimes:jpg,jpeg,png,webp,gif|max:15360',
            'gallery' => 'nullable',
            'gallery_files' => 'nullable|array',
            'gallery_files.*' => 'file|mimes:jpg,jpeg,png,webp,gif,mp4,webm|max:51200',
            'content' => 'nullable|string|max:20000',
            'featured' => 'boolean',
            'sort_order' => 'integer',
            'extra_info' => 'nullable',
        ]);

        if (isset($validated['extra_info'])) {
            if (is_string($validated['extra_info'])) {
                $decoded = json_decode($validated['extra_info'], true);
                $validated['extra_info'] = is_array($decoded) ? $decoded : null;
            } elseif (!is_array($validated['extra_info'])) {
                $validated['extra_info'] = null;
            }
        }

        // Parse gallery items if sent
        $galleryItems = $project->gallery ?? [];
        if (isset($validated['gallery'])) {
            if (is_string($validated['gallery'])) {
                $decodedGallery = json_decode($validated['gallery'], true);
                $galleryItems = is_array($decodedGallery) ? $decodedGallery : [];
            } elseif (is_array($validated['gallery'])) {
                $galleryItems = $validated['gallery'];
            }
        }

        // Handle uploaded cover file
        if ($request->hasFile('cover_file')) {
            $path = $request->file('cover_file')->store('projects/covers', 'public');
            $validated['cover_image'] = '/storage/'.$path;
        }
        unset($validated['cover_file']);

        // Handle primary media file
        if ($request->hasFile('media_file')) {
            $path = $request->file('media_file')->store('projects', 'public');
            $validated['media_url'] = '/storage/'.$path;
        }
        unset($validated['media_file']);

        // Handle multiple gallery file uploads
        if ($request->hasFile('gallery_files')) {
            foreach ($request->file('gallery_files') as $file) {
                $mime = $file->getMimeType();
                $type = str_starts_with($mime, 'video') ? 'video' : 'image';
                $path = $file->store('projects/gallery', 'public');
                $galleryItems[] = [
                    'type' => $type,
                    'url' => '/storage/'.$path,
                    'caption' => $file->getClientOriginalName(),
                ];
            }
        }
        unset($validated['gallery_files']);
        $validated['gallery'] = !empty($galleryItems) ? $galleryItems : null;

        $project->update($validated);

        return redirect()->back()->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->back()->with('success', 'Project deleted successfully.');
    }
}
