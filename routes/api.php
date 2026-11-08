<?php

declare(strict_types=1);

use App\Http\Controllers\Api\ProductionManageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Production Management API Routes
|--------------------------------------------------------------------------
|
| Secured endpoints for health monitoring, log inspection, cache warming,
| and maintenance operations. Protected by token authentication.
|
*/

Route::prefix('manage')
    ->middleware(['throttle:60,1', 'manage.auth'])
    ->group(function (): void {
        Route::get('/health', [ProductionManageController::class, 'health']);
        Route::get('/logs', [ProductionManageController::class, 'logs']);
        Route::post('/artisan', [ProductionManageController::class, 'artisan']);
        Route::post('/maintenance', [ProductionManageController::class, 'maintenance']);
    });
