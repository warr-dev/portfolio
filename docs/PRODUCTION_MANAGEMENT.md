# Production Management & Remote Operations Guide

This guide documents the architecture, authentication, security policies, and operational runbook for remotely managing and monitoring the live portfolio application on Hostinger (`https://warrdev.site`).

---

## 1. Overview & Architecture

The **Production Management REST API** provides a stateless, secure interface for automated systems, AI agents (Antigravity), and developer CLI scripts to inspect server health, execute administrative Artisan commands, tail logs, and toggle maintenance mode without needing interactive SSH sessions.

```
┌─────────────────────────────────┐
│     Antigravity / Developer     │
│  (./scripts/prod-manage.sh)     │
└────────────────┬────────────────┘
                 │ HTTPS (Bearer Token Auth)
┌────────────────▼─────────────────────────────────────────────────┐
│ Hostinger Production Server (https://warrdev.site)               │
│                                                                  │
│  Route: /api/manage/*                                            │
│  Middleware:                                                     │
│   ├── throttle:60,1 (Rate Limiting)                             │
│   ├── manage.auth (EnsureManageTokenIsValid)                     │
│   └── Exempt from Maintenance Mode                               │
│                                                                  │
│  Controller: ProductionManageController                          │
│   ├── GET  /api/manage/health      -> Server & DB Telemetry      │
│   ├── POST /api/manage/artisan     -> Whitelisted Artisan Runner │
│   ├── GET  /api/manage/logs        -> storage/logs/laravel.log   │
│   └── POST /api/manage/maintenance -> Artisan down/up            │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Authentication & Security Guardrails

### 2.1 Bearer Token Verification
Every request to `/api/manage/*` must include an `Authorization` header:
```http
Authorization: Bearer <MANAGE_API_KEY>
```
- **Constant-Time Comparison**: Handled via `hash_equals()` in `EnsureManageTokenIsValid` middleware to eliminate timing attacks.
- **Config Storage**: Defined in `.env` as `MANAGE_API_KEY` and mapped to `config('services.manage.token')`.
- **Cached Config Sync**: On production, whenever `MANAGE_API_KEY` is modified in `.env`, the config cache must be refreshed (`php artisan config:cache`) for Laravel to load the new token.

### 2.2 Rate Limiting
All management routes are wrapped in Laravel's native `throttle:60,1` middleware (maximum 60 requests per minute per IP), preventing denial-of-service attempts.

### 2.3 Strict Command Whitelisting
To prevent arbitrary remote code execution, database loss, or security violations, `POST /api/manage/artisan` strictly enforces an array of allowed commands:

| Allowed Command | Description |
|---|---|
| `about` | Displays complete system, environment, and driver overview |
| `optimize:clear` | Purges all cached bootstrap files (config, routes, views, events) |
| `config:cache` | Compiles configuration into a single fast cache file |
| `config:clear` | Removes configuration cache |
| `route:cache` | Pre-compiles route registrations |
| `route:clear` | Removes compiled route cache |
| `view:cache` | Pre-compiles Blade template views |
| `view:clear` | Removes compiled view files |
| `migrate:status` | Reports migration status across all database tables |
| `storage:link` | Generates or verifies public storage symbolic links |

> [!CAUTION]
> Destructive commands like `migrate:fresh`, `db:wipe`, or arbitrary shell execution are strictly blocked at the controller level and return `403 Forbidden`.

### 2.4 Maintenance Mode Bypass Exemption
In `bootstrap/app.php`, the management API route group is explicitly excluded from maintenance mode:
```php
$middleware->preventRequestsDuringMaintenance(except: [
    'api/manage/*',
]);
```
This ensures that when `artisan down` is called, the management endpoints remain live so that health diagnostics can be queried and the recovery command (`POST /api/manage/maintenance` with `{"action":"up"}`) can execute.

---

## 3. Command-Line Interface (`scripts/prod-manage.sh`)

A standalone bash script is provided in the root directory for local terminal and AI assistant use.

### Environment Resolution
The script automatically searches for:
1. `MANAGE_API_KEY` in environment variables or project `.env`.
2. `PROD_URL` in environment variables or project `.env` (defaults to `https://warrdev.site`).

### Usage Examples

```bash
# 1. Check live production health & telemetry
./scripts/prod-manage.sh health

# 2. Run whitelisted artisan commands
./scripts/prod-manage.sh artisan optimize:clear
./scripts/prod-manage.sh artisan config:cache
./scripts/prod-manage.sh artisan route:cache
./scripts/prod-manage.sh artisan migrate:status

# 3. Read production logs (default 50 lines, max 500)
./scripts/prod-manage.sh logs 30

# 4. Put site into maintenance mode with optional bypass secret
./scripts/prod-manage.sh maintenance down my-secret-bypass

# 5. Bring site back online
./scripts/prod-manage.sh maintenance up
```

---

## 4. API Endpoint Reference

### `GET /api/manage/health`
Returns live system metrics and database connectivity status.

**Sample Response (`200 OK`)**:
```json
{
  "status": "ok",
  "php_version": "8.3.36",
  "laravel_version": "13.32.0",
  "app_env": "production",
  "maintenance_mode": false,
  "db_connected": true,
  "disk_free_mb": 2236596,
  "cache_driver": "database"
}
```

### `POST /api/manage/artisan`
Executes an allowed Artisan command.

**Request Payload**:
```json
{
  "command": "optimize:clear"
}
```

**Sample Response (`200 OK`)**:
```json
{
  "command": "optimize:clear",
  "output": "\n   INFO  Clearing cached bootstrap files.  \n"
}
```

### `GET /api/manage/logs`
Fetches the last N lines of `storage/logs/laravel.log`.

**Query Parameters**:
- `lines` (optional, integer 1–500, default 50).

**Sample Response (`200 OK`)**:
```json
{
  "lines": 10,
  "content": "[2026-11-09 06:00:00] production.INFO: Scheduled job executed successfully."
}
```

### `POST /api/manage/maintenance`
Toggles site maintenance mode.

**Request Payload (Down)**:
```json
{
  "action": "down",
  "secret": "bypass-token-123"
}
```

**Request Payload (Up)**:
```json
{
  "action": "up"
}
```

**Sample Response (`200 OK`)**:
```json
{
  "status": "ok",
  "maintenance_mode": false,
  "output": "Application is now live."
}
```

---

## 5. Troubleshooting & Maintenance Runbook

### Issue: `{"error":"Unauthorized","message":"Management API key is not configured on this environment."}`
- **Cause**: `MANAGE_API_KEY` was added to production `.env`, but Laravel is reading from a stale `bootstrap/cache/config.php`.
- **Fix**: Re-cache configuration via SSH:
  ```bash
  ssh -p 65002 u102125202@151.106.124.61 "cd ~/domains/warrdev.site/portfolio && /opt/alt/php83/usr/bin/php artisan config:cache"
  ```

### Issue: `{"error":"Unauthorized"}`
- **Cause**: The `Authorization: Bearer <token>` does not match the server's `MANAGE_API_KEY`.
- **Fix**: Verify that the token in local `.env` matches the token in `/domains/warrdev.site/portfolio/.env`.

### Issue: `{"error":"Command not allowed"}` (HTTP 403)
- **Cause**: The requested command is not in `ProductionManageController::ALLOWED_ARTISAN_COMMANDS`.
- **Fix**: Only safe, non-destructive caching and status commands are allowed. For database migrations, use the CI/CD pipeline or SSH directly.
