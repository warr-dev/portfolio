<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function index(): Response
    {
        $allSkills = \App\Models\Skill::all()
            ->pluck('items')
            ->flatten(1)
            ->map(function ($item) {
                return is_array($item) ? ($item['name'] ?? '') : (string) $item;
            })
            ->filter()
            ->unique()
            ->values()
            ->all();

        return Inertia::render('Admin/Experience/Index', [
            'experiences' => Experience::orderBy('sort_order', 'asc')->get(),
            'availableSkills' => $allSkills,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'role' => 'required|string|max:150',
            'company' => 'required|string|max:150',
            'location' => 'nullable|string|max:150',
            'period' => 'required|string|max:100',
            'is_current' => 'boolean',
            'bullet_points' => 'required|array|min:1',
            'bullet_points.*' => 'string',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:50',
            'sort_order' => 'integer',
        ]);

        Experience::create($validated);

        return redirect()->back()->with('success', 'Career experience added successfully.');
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'role' => 'required|string|max:150',
            'company' => 'required|string|max:150',
            'location' => 'nullable|string|max:150',
            'period' => 'required|string|max:100',
            'is_current' => 'boolean',
            'bullet_points' => 'required|array|min:1',
            'bullet_points.*' => 'string',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string|max:50',
            'sort_order' => 'integer',
        ]);

        $experience->update($validated);

        return redirect()->back()->with('success', 'Career experience updated successfully.');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();

        return redirect()->back()->with('success', 'Career experience deleted successfully.');
    }
}
