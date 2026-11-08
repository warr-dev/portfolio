# Testing Runbook

This runbook documents how to run automated verification across the backend and frontend.

## 1. Backend PHPUnit Feature Tests

Tests are located in:
- `tests/Feature/PortfolioTest.php` (Public portfolio and inquiry submissions)
- `tests/Feature/AdminTest.php` (Administrative panel authentication, settings, CRUD)
- `tests/Feature/Api/ProductionManageTest.php` (Production management API, auth, health, logs, artisan, and maintenance)

### What is tested in `ProductionManageTest`:
- **`test_unauthenticated_request_is_rejected`**: Ensures missing Bearer token returns 401 Unauthorized.
- **`test_invalid_token_is_rejected`**: Validates non-matching token rejection.
- **`test_authenticated_health_check_returns_system_metrics`**: Confirms 200 OK with PHP, Laravel, DB, and disk metrics.
- **`test_whitelisted_artisan_command_executes_successfully`**: Runs `about` command and verifies output structure.
- **`test_non_whitelisted_artisan_command_is_forbidden`**: Confirms destructive or non-whitelisted commands (`migrate:fresh`) return 403 Forbidden.
- **`test_logs_endpoint_returns_recent_log_content`**: Reads and asserts tailing of `storage/logs/laravel.log`.
- **`test_maintenance_mode_toggle_down_and_up`**: Toggles application maintenance mode (`down` with secret, and `up`).

### Execution Command:
```bash
php artisan test
# Or target specifically:
php artisan test --filter=ProductionManageTest
```

---

## 2. Frontend Playwright E2E Tests

Tests are located in `e2e/portfolio.spec.js`.

### What is tested:
- **Hero & Recruiter Metric Cards**: Validates hero headlines, status pill, and recruiter fast-track statistics.
- **Downloadable CV Verification**: Ensures download links for both `Warren_Dalawampu_CV_2026.pdf` and `Warren_Dalawampu_Resume.pdf` are present and clickable.
- **Featured Systems & Hardware Section**: Verifies rendering of casino kiosk, SaaS cards, and C++ driver section.
- **Reactive Contact Form**: Fills form fields, submits via Inertia, and asserts appearance of the confirmation toast.

### Execution Command:
```bash
npx playwright test
```
