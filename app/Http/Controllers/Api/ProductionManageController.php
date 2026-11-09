<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Throwable;

class ProductionManageController extends Controller
{
    /**
     * Whitelist of safe artisan commands permitted to run via the API.
     *
     * @var array<int, string>
     */
    protected const ALLOWED_ARTISAN_COMMANDS = [
        'about',
        'optimize:clear',
        'config:cache',
        'config:clear',
        'route:cache',
        'route:clear',
        'view:cache',
        'view:clear',
        'migrate:status',
        'storage:link',
    ];

    /**
     * Report production health, database connectivity, and runtime metrics.
     */
    public function health(): JsonResponse
    {
        $dbConnected = false;
        try {
            $dbConnected = DB::connection()->getPdo() !== null;
        } catch (Throwable) {
            $dbConnected = false;
        }

        $freeBytes = @disk_free_space(base_path());
        $diskFreeMb = is_numeric($freeBytes) ? (int) round($freeBytes / 1024 / 1024) : 0;

        return response()->json([
            'status' => 'ok',
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
            'app_env' => (string) config('app.env'),
            'maintenance_mode' => app()->isDownForMaintenance(),
            'db_connected' => $dbConnected,
            'disk_free_mb' => $diskFreeMb,
            'cache_driver' => (string) config('cache.default'),
        ]);
    }

    /**
     * Execute an authorized whitelisted artisan command.
     */
    public function artisan(Request $request): JsonResponse
    {
        $command = $request->input('command');

        if (! is_string($command) || ! in_array($command, self::ALLOWED_ARTISAN_COMMANDS, true)) {
            return response()->json([
                'error' => 'Command not allowed',
                'allowed_commands' => self::ALLOWED_ARTISAN_COMMANDS,
            ], 403);
        }

        Artisan::call($command);

        return response()->json([
            'command' => $command,
            'output' => Artisan::output(),
        ]);
    }

    /**
     * Tail the most recent lines of the application error log.
     */
    public function logs(Request $request): JsonResponse
    {
        $linesToFetch = (int) $request->input('lines', 50);
        if ($linesToFetch < 1) {
            $linesToFetch = 1;
        } elseif ($linesToFetch > 500) {
            $linesToFetch = 500;
        }

        $logPath = storage_path('logs/laravel.log');

        if (! File::exists($logPath)) {
            return response()->json([
                'lines' => 0,
                'content' => '',
            ]);
        }

        $content = (string) File::get($logPath);
        $lines = explode("\n", trim($content));
        $slice = array_slice($lines, -$linesToFetch);

        return response()->json([
            'lines' => count($slice),
            'content' => implode("\n", $slice),
        ]);
    }

    /**
     * Toggle application maintenance mode (down/up).
     */
    public function maintenance(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'action' => 'required|in:down,up',
            'secret' => 'nullable|string',
        ]);

        if ($validated['action'] === 'down') {
            $params = [];
            if (! empty($validated['secret'])) {
                $params['--secret'] = $validated['secret'];
            }
            Artisan::call('down', $params);
        } else {
            Artisan::call('up');
        }

        return response()->json([
            'status' => 'ok',
            'maintenance_mode' => app()->isDownForMaintenance(),
            'output' => trim(Artisan::output()),
        ]);
    }

    /**
     * List projects via the management API.
     */
    public function getProjects(): JsonResponse
    {
        $projects = Project::orderBy('sort_order', 'asc')->get();

        return response()->json([
            'status' => 'ok',
            'count' => $projects->count(),
            'projects' => $projects,
        ]);
    }

    /**
     * Create or update a project via the management API.
     */
    public function storeProject(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'id' => 'nullable|integer|exists:projects,id',
            'title' => 'required|string|max:150',
            'slug' => 'nullable|string|max:150',
            'badge' => 'nullable|string|max:50',
            'organization' => 'nullable|string|max:100',
            'description' => 'required|string|max:2000',
            'tags' => 'required|array',
            'tags.*' => 'string|max:50',
            'demo_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'demo_status' => 'nullable|string|in:live,offline,internal,decommissioned',
            'github_status' => 'nullable|string|in:public,private,nda,archived',
            'media_type' => 'nullable|string|in:none,image,video,youtube',
            'media_url' => 'nullable|string|max:1000',
            'cover_image' => 'nullable|string|max:1000',
            'gallery' => 'nullable|array',
            'content' => 'nullable|string|max:20000',
            'featured' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
            'extra_info' => 'nullable|array',
        ]);

        $slug = $validated['slug'] ?? Str::slug($validated['title']);
        $validated['demo_status'] = $validated['demo_status'] ?? 'live';
        $validated['github_status'] = $validated['github_status'] ?? 'public';
        $validated['media_type'] = $validated['media_type'] ?? 'none';
        $validated['featured'] = $validated['featured'] ?? true;
        $validated['sort_order'] = $validated['sort_order'] ?? (Project::max('sort_order') + 1);

        if (! empty($validated['id'])) {
            $project = Project::findOrFail($validated['id']);
            $project->update($validated);
        } else {
            $project = Project::updateOrCreate(
                ['slug' => $slug],
                $validated
            );
        }

        return response()->json([
            'status' => 'ok',
            'message' => 'Project saved successfully',
            'project' => $project,
        ], 200);
    }

    /**
     * Delete a project via the management API.
     */
    public function destroyProject(Project $project): JsonResponse
    {
        $project->delete();

        return response()->json([
            'status' => 'ok',
            'message' => 'Project deleted successfully',
        ]);
    }
}
