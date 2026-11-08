<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureManageTokenIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $configuredToken = config('services.manage.token') ?: env('MANAGE_API_KEY');

        if (! is_string($configuredToken) || $configuredToken === '') {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'Management API key is not configured on this environment.',
            ], 401);
        }

        $providedToken = $request->bearerToken();

        if (! is_string($providedToken) || ! hash_equals($configuredToken, $providedToken)) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }

        return $next($request);
    }
}
