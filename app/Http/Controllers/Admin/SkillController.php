<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Skills/Index', [
            'skills' => Skill::orderBy('sort_order', 'asc')->get(),
        ]);
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
