<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\PortfolioController;
use App\Models\SiteSetting;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Skills/Index', [
            'skills' => Skill::orderBy('sort_order', 'asc')->get(),
            'categorizedSkills' => SiteSetting::get('categorized_skills', PortfolioController::defaultCategorizedSkills()),
            'skillsViewMode' => SiteSetting::get('skills_view_mode', 'categorized'),
        ]);
    }

    public function updateCategorized(Request $request)
    {
        $validated = $request->validate([
            'categories' => 'required|array|min:1',
            'categories.*.id' => 'nullable|string|max:100',
            'categories.*.category' => 'required|string|max:150',
            'categories.*.subtitle' => 'nullable|string|max:255',
            'categories.*.badge' => 'nullable|string|max:100',
            'categories.*.accent' => 'nullable|string|max:50',
            'categories.*.description' => 'nullable|string|max:1000',
            'categories.*.items' => 'required|array|min:1',
            'categories.*.items.*' => 'required|string|max:100',
        ]);

        $cleanCategories = array_map(function ($cat) {
            $cat['items'] = array_values(array_filter(array_map('trim', $cat['items'] ?? [])));
            if (empty($cat['id'])) {
                $cat['id'] = Str::slug($cat['category']);
            }
            if (empty($cat['accent'])) {
                $cat['accent'] = 'emerald';
            }

            return $cat;
        }, $validated['categories']);

        SiteSetting::set('categorized_skills', $cleanCategories);

        return redirect()->back()->with('success', 'Categorized technical arsenal updated successfully.');
    }

    public function resetCategorized()
    {
        SiteSetting::set('categorized_skills', PortfolioController::defaultCategorizedSkills());

        return redirect()->back()->with('success', 'Categorized technical arsenal reset to default 3 tiers.');
    }

    public function updateViewMode(Request $request)
    {
        $validated = $request->validate([
            'mode' => 'required|in:categorized,stars',
        ]);

        SiteSetting::set('skills_view_mode', $validated['mode']);

        return redirect()->back()->with('success', 'Default skills presentation mode updated to '.($validated['mode'] === 'categorized' ? 'Categorized Experience' : 'Star Ratings').'.');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:100',
            'level' => 'nullable|string|max:50',
            'items' => 'required|array|min:1',
            'items.*' => 'nullable',
            'sort_order' => 'integer',
        ]);

        $validated['items'] = array_map(function ($item) {
            if (is_string($item)) {
                return ['name' => trim($item), 'level' => 5];
            }
            if (is_array($item)) {
                return [
                    'name' => trim($item['name'] ?? ''),
                    'level' => isset($item['level']) ? max(1, min(5, (int) $item['level'])) : 5,
                ];
            }

            return ['name' => (string) $item, 'level' => 5];
        }, array_filter($validated['items']));

        Skill::create($validated);

        return redirect()->back()->with('success', 'Skill category created successfully.');
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:100',
            'level' => 'nullable|string|max:50',
            'items' => 'required|array|min:1',
            'items.*' => 'nullable',
            'sort_order' => 'integer',
        ]);

        $validated['items'] = array_map(function ($item) {
            if (is_string($item)) {
                return ['name' => trim($item), 'level' => 5];
            }
            if (is_array($item)) {
                return [
                    'name' => trim($item['name'] ?? ''),
                    'level' => isset($item['level']) ? max(1, min(5, (int) $item['level'])) : 5,
                ];
            }

            return ['name' => (string) $item, 'level' => 5];
        }, array_filter($validated['items']));

        $skill->update($validated);

        return redirect()->back()->with('success', 'Skill category updated successfully.');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return redirect()->back()->with('success', 'Skill category deleted successfully.');
    }
}
