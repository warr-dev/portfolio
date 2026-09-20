# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-09-20T10:44:58.944Z
> Files: 116 tracked | Anatomy hits: 0 | Misses: 0

> Project structure index. Auto-maintained by OpenWolf hooks and daemon.
> Run `openwolf scan` to generate, or wait for the first Claude Code session.
> Status: Pending initial scan

## ./

- `.editorconfig` — Editor configuration (~74 tok)
- `.gitattributes` — Git attributes (~50 tok)
- `.gitignore` — Git ignore rules (~91 tok)
- `.php-version` (~2 tok)
- `AGENTS.md` — Laravel Application (~436 tok)
- `artisan` — Laravel CLI entry point (~114 tok)
- `CLAUDE.md` — OpenWolf (~461 tok)
- `composer.json` — PHP package manifest (~778 tok)
- `DESIGN.md` — Overview (~6051 tok)
- `GEMINI.md` — OpenWolf (~75 tok)
- `package.json` — Node.js package manifest (~219 tok)
- `phpunit.xml` (~378 tok)
- `playwright.config.js` (~130 tok)
- `README.md` — Project documentation (~925 tok)
- `vite.config.js` — Vite build configuration (~136 tok)

## .github/workflows/

- `deploy.yml` — CI: Deploy Portfolio to Hostinger Shared Hosting (~2252 tok)

## app/Http/Controllers/

- `Controller.php` — Controller: Controller (~21 tok)
- `PortfolioController.php` — Display the main single-page portfolio with dynamically stored settings. (~1826 tok)

## app/Http/Controllers/Admin/

- `AuthController.php` — showLogin, login, logout (~334 tok)
- `DashboardController.php` — index (~202 tok)
- `ExperienceController.php` — index, store, update, destroy (~659 tok)
- `InboxController.php` — index, markAsRead, destroy (~198 tok)
- `ProjectController.php` — index, store, update, destroy (~2177 tok)
- `SettingsController.php` — index, update (~1451 tok)
- `SkillController.php` — index, store, update, destroy (~689 tok)

## app/Http/Middleware/

- `HandleInertiaRequests.php` — The root template that's loaded on the first page visit. (~358 tok)

## app/Models/

- `ContactMessage.php` — Model — 2 casts (~55 tok)
- `Experience.php` — Model — 6 casts (~74 tok)
- `Project.php` — Model — 8 casts (~77 tok)
- `SiteSetting.php` — Get a setting by key with a default fallback. (~218 tok)
- `Skill.php` — Normalize items to guarantee each item is an array with name and level (1-5). (~256 tok)
- `User.php` — use Illuminate\Contracts\Auth\MustVerifyEmail; (~224 tok)

## app/Providers/

- `AppServiceProvider.php` — Register any application services. (~97 tok)

## bootstrap/

- `app.php` (~209 tok)
- `providers.php` (~24 tok)

## bootstrap/cache/

- `.gitignore` — Git ignore rules (~4 tok)

## config/

- `app.php` (~1142 tok)
- `auth.php` (~1078 tok)
- `cache.php` (~1166 tok)
- `database.php` (~1834 tok)
- `filesystems.php` (~676 tok)
- `inertia.php` (~1614 tok)
- `logging.php` (~1229 tok)
- `mail.php` — Declares of (~969 tok)
- `queue.php` (~1120 tok)
- `services.php` — Declares of (~278 tok)
- `session.php` (~2247 tok)

## database/

- `.gitignore` — Git ignore rules (~3 tok)

## database/factories/

- `UserFactory.php` — Model factory: UserFactory (~279 tok)

## database/migrations/

- `0001_01_01_000000_create_users_table.php` — Run the migrations. (~393 tok)
- `0001_01_01_000001_create_cache_table.php` — Run the migrations. (~233 tok)
- `0001_01_01_000002_create_jobs_table.php` — Run the migrations. (~503 tok)
- `2026_09_19_210619_create_portfolio_tables.php` — Run the migrations. (~683 tok)
- `2026_09_19_212048_create_site_settings_table.php` — Run the migrations. (~170 tok)
- `2026_09_20_084548_add_media_and_availability_to_projects_table.php` — Run the migrations. (~274 tok)
- `2026_09_20_085453_make_level_nullable_on_skills_table.php` — Run the migrations. (~168 tok)
- `2026_09_20_095238_add_extra_info_to_projects_table.php` — Run the migrations. (~166 tok)
- `2026_09_20_103648_add_cover_and_gallery_to_projects_table.php` — Run the migrations. (~248 tok)

## database/seeders/

- `DatabaseSeeder.php` — Seed the application's database. (~3014 tok)

## docs/

- `API_REFERENCE.md` — API & Inertia Reference (~745 tok)
- `ARCHITECTURE.md` — Architecture Specification (~875 tok)
- `CHANGELOG.md` — Change log (~2213 tok)
- `DATABASE_SCHEMA.md` — Database Schema & Data Models (~718 tok)
- `README.md` — Project documentation (~203 tok)
- `ROADMAP.md` — Project Roadmap & Task Status (~583 tok)
- `TESTING.md` — Testing Runbook (~365 tok)

## e2e/

- `admin.spec.js` — Declares updatedStatus (~974 tok)
- `portfolio.spec.js` — Declares cvDownload (~1303 tok)

## mock/

- `index.html` — Warren Dalawampu — Senior Backend & Systems Software Engineer (~9385 tok)

## public/

- `.htaccess` — Apache configuration (~198 tok)
- `index.php` (~145 tok)
- `robots.txt` (~6 tok)

## resources/css/

- `app.css` — Styles: 9 rules, 17 vars (~537 tok)

## resources/js/

- `app.js` (~1 tok)
- `app.jsx` — /*.jsx', { eager: true }); (~135 tok)

## resources/js/Components/

- `ContactSection.jsx` — ContactSection — renders form — uses useForm (~2080 tok)
- `EducationSection.jsx` — EducationSection (~452 tok)
- `ExperienceSection.jsx` — ExperienceSection (~1038 tok)
- `Footer.jsx` — Footer (~223 tok)
- `HardwareSection.jsx` — HardwareSection (~712 tok)
- `Hero.jsx` — Hero (~1068 tok)
- `LinkedInSection.jsx` — LinkedInIcon — renders map (~1690 tok)
- `Navbar.jsx` — Navbar — uses useState (~1983 tok)
- `ProjectsSection.jsx` — ProjectsSection — uses useState (~4144 tok)
- `RecruiterHub.jsx` — RecruiterHub (~1410 tok)
- `SkillsSection.jsx` — SkillsSection (~1058 tok)

## resources/js/Layouts/

- `AdminLayout.jsx` — AdminLayout — uses useState (~3162 tok)
- `PortfolioLayout.jsx` — PortfolioLayout (~276 tok)

## resources/js/Pages/Admin/

- `Dashboard.jsx` — Dashboard (~1592 tok)
- `Login.jsx` — Login — renders form — uses useForm (~1520 tok)
- `Settings.jsx` — Settings — renders form — uses useForm (~6557 tok)

## resources/js/Pages/Admin/Experience/

- `Index.jsx` — ExperienceIndex — renders form — uses useState, useForm (~5635 tok)

## resources/js/Pages/Admin/Inbox/

- `Index.jsx` — InboxIndex — uses useForm (~1481 tok)

## resources/js/Pages/Admin/Projects/

- `Index.jsx` — ProjectsIndex — renders table — uses useState, useForm (~13863 tok)

## resources/js/Pages/Admin/Skills/

- `Index.jsx` — SkillsIndex — renders form — uses useState, useForm (~5158 tok)

## resources/js/Pages/Portfolio/

- `Index.jsx` — PortfolioIndex (~447 tok)
- `ProjectShow.jsx` — ProjectShow — uses useState (~5504 tok)

## resources/views/

- `app.blade.php` — Blade: app (~236 tok)
- `welcome.blade.php` — Blade: welcome (~19281 tok)

## routes/

- `console.php` (~56 tok)
- `web.php` — Public Portfolio Routes (~852 tok)

## storage/app/

- `.gitignore` — Git ignore rules (~9 tok)

## storage/app/private/

- `.gitignore` — Git ignore rules (~4 tok)

## storage/app/public/

- `.gitignore` — Git ignore rules (~4 tok)

## storage/framework/

- `.gitignore` — Git ignore rules (~35 tok)

## storage/framework/cache/

- `.gitignore` — Git ignore rules (~6 tok)

## storage/framework/cache/data/

- `.gitignore` — Git ignore rules (~4 tok)

## storage/framework/sessions/

- `.gitignore` — Git ignore rules (~4 tok)

## storage/framework/testing/

- `.gitignore` — Git ignore rules (~4 tok)

## storage/framework/views/

- `.gitignore` — Git ignore rules (~4 tok)

## storage/logs/

- `.gitignore` — Git ignore rules (~4 tok)

## test-results/

- `.last-run.json` (~13 tok)

## tests/

- `TestCase.php` — Declares TestCase (~38 tok)

## tests/Feature/

- `AdminTest.php` — AdminTest: test_guest_is_redirected_from_admin_dashboard_to_login, test_admin_can_login_with_valid_credentials, test_admin_can_update_profile_setti... (~3087 tok)
- `PortfolioTest.php` — PortfolioTest: test_portfolio_page_loads_successfully_with_inertia_props, test_contact_form_validates_required_fields, test_contact_form_submits_su... (~999 tok)

## tests/Unit/

- `ExampleTest.php` — A basic test example. (~65 tok)
