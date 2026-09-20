# Testing Runbook

This runbook documents how to run automated verification across the backend and frontend.

## 1. Backend PHPUnit Feature Tests

Tests are located in `tests/Feature/PortfolioTest.php`.

### What is tested:
- **`test_portfolio_page_loads_successfully_with_inertia_props`**: Asserts HTTP 200, checks Inertia component `Portfolio/Index`, and asserts presence of `projects`, `experiences`, `skills`, and `recruiterData`.
- **`test_contact_form_validates_required_fields`**: Asserts validation error keys when sending empty payload.
- **`test_contact_form_submits_successfully_and_saves_to_database`**: Submits valid contact payload, asserts redirect with flash success, and checks `contact_messages` table in SQLite.

### Execution Command:
```bash
php artisan test
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
