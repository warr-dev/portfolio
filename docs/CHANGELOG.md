# Changelog

All notable changes to the **Warren Dalawampu Portfolio & Admin Engine** will be documented in this file.

## [Unreleased] - 2026-11-10

### Added
- **Full Admin Control Center for Categorized Technical Arsenal & Skills Presentation (`SkillController.php`, `Admin/Skills/Index.jsx`, `Settings.jsx`, `routes/web.php`, `SkillAdminTest.php`)**:
  - **Comprehensive Admin Management for Categorized Arsenal**: Empowered the Admin panel (`/admin/skills`) with interactive visual management for the categorized experience tiers:
    - **Tier Level Editing**: Ability to edit Category Title, Subtitle, Badge Label, Accent theme (`emerald`, `sky`, `purple`, `amber`, `rose`, `indigo`), and operational context/credibility descriptions.
    - **Skill Chips Manager**: Interactive chips with instant `✕` removal and an inline tag input with Enter/comma keybinds and batch comma-separated paste support.
    - **Tier Reordering & Dynamic Addition**: Move tiers up/down, add new custom experience tiers dynamically, and delete tiers with confirmation guards.
    - **One-Click Default Reset**: Added `Reset to 3 Credible Defaults` button invoking `POST /admin/skills/categorized/reset` to safely restore original production (PHP/Laravel), infrastructure (K8s/Terraform), and hardware (C++/Serial) tiers.
  - **Dual-Mode Administration & View Switcher**: Admin can toggle the public default view mode between `[Categorized by Experience]` and `[Star Ratings]` with 1-click (`POST /admin/skills/view-mode`), immediately updating public portfolio visitors.
  - **Direct Settings Cross-Link**: Integrated quick access in Admin Settings Submodule 04 (`Settings.jsx`) directing admins directly to the new Arsenal Control Center.
  - **Dynamic Theme Accents on Public Portfolio (`SkillsSection.jsx`)**: Enhanced `SkillsSection.jsx` to dynamically support any number of tiers and custom accent palettes (`emerald`, `sky`, `purple`, `amber`, `rose`, `indigo`) without overriding admin configurations.
  - **Automated Verification Suite (`SkillAdminTest.php`)**: Added 5 new PHPUnit feature tests (38/38 tests passing, 304 assertions) verifying guest route protection, admin index rendering, categorized tier updates, default resets, and public portfolio reflections.
- **Admin Control for SEO, Robots.txt & Crawler Directives (`Settings.jsx`, `SettingsController.php`, `PortfolioController.php`, `PortfolioLayout.jsx`, `2026_11_10_023000_seed_seo_and_crawler_settings.php`)**:
  - **Dynamic `/robots.txt` Engine**: Upgraded `PortfolioController::robots()` to read custom rules stored in `SiteSetting::get('robots_txt')`. Automatically detects and replaces `{sitemap_url}` tokens with the dynamically configured canonical XML sitemap link.
  - **Full Robots.txt Code Editor & One-Click Presets in Admin**:
    - Created an interactive monospace syntax-styled editor inside Submodule 05 (`SEO, Robots & Crawlers`).
    - Added one-click quick presets: "Preset: Allow All (Standard)", "Preset: Block AI Scrapers (GPTBot, CCBot, ClaudeBot, Bytespider, etc.)", "Preset: Disallow All", and "+ Sitemap Token".
    - Added direct navigation pill links to open live `/robots.txt` and `/sitemap.xml` in new tabs for instant crawler verification.
  - **Meta Robots Indexing Tag Control**: Added customizable meta robots tag directives in `PortfolioLayout.jsx` and Admin Settings with quick presets: "Standard Public Index", "Simple Index", "Noindex & Nofollow (Private)", and "Noindex, Follow Links".
  - **Canonical Site URL & Base Domain**: Added configurable canonical base URL (`https://warrdev.site`), updating `<link rel="canonical">`, XML sitemap generation, OpenGraph tags, and JSON-LD structured schemas (`@id` and `url`).
  - **Cloudflare & Hostinger Troubleshooting Advisory**: Integrated a diagnostic guide into Admin Submodule 05 explaining how Cloudflare "Bot Fight Mode" and SSL encryption modes can cause crawler "Cache miss" or 403 blocks on external readers, providing actionable steps to verify and resolve bot access issues.
  - **Automated Verification**: Updated `PortfolioTest.php` and `AdminTest.php` to verify dynamic robots.txt serving, canonical sitemap generation, and admin settings persistence (33/33 PHPUnit tests passing).
- **Categorized Technical Arsenal & Interactive View Switcher (`SkillsSection.jsx`, `PortfolioController.php`, `Settings.jsx`, `PortfolioTest.php`)**:
  - **Credible 3-Tier Experience Categorization**: Replaced subjective 5-star ratings with three experience-grounded categories reflecting real-world operational contexts:
    1. **Production Experience**: PHP, Laravel, Node.js, MySQL, MongoDB, Linux, Docker, Git, REST APIs, CI/CD (`Commercial / 6+ Yrs` badge).
    2. **Hands-on Infrastructure Projects**: Kubernetes, Terraform, Ansible, GCP, Calico, containerd, GitLab CI, WireGuard (`Infrastructure & Homelab` badge).
    3. **Systems & Hardware Engineering**: C++, Ubuntu, Serial Communication, WebSockets, ESP32, Raspberry Pi, Hardware Drivers (`Hardware & Low-Level` badge).
  - **Interactive Mode Switcher**: Added a cyberpunk Linear-styled segmented control in the section header allowing visitors to toggle in real time between `[Categorized by Experience]` (default) and `[Star Ratings by Domain]`, persisting preferences via `localStorage`.
  - **Credibility Standard Callout**: Integrated a transparent notice explaining technical boundaries (keeping Kubernetes and Terraform under project clusters rather than inflated enterprise claims for genuine credibility).
  - **Admin Settings Management**: Added `skills_view_mode` configuration in `SiteSetting`, `PortfolioController`, and Admin Settings Submodule 04, allowing operators to choose the public default mode.
  - **Automated Verification**: Added `test_categorized_technical_arsenal_renders_credible_three_tiers` to PHPUnit suite (32/32 tests passing, Pint verified).

### Fixed
- **Projects Table Responsive Horizontal Scrollbar (`Projects/Index.jsx`)**:
  - **Screen Clamping & Clipping Fix**: Wrapped the table in an `overflow-x-auto custom-scrollbar` container with a `min-w-[720px]` table width guarantee. This allows smaller screens and narrower browser windows to smoothly scroll horizontally with styled dark scrollbars without clipping the `Links` or `Actions` action columns.
- **Career Milestone Modal Form Submission & Custom Scrollbar (`Experience/Index.jsx`)**:
  - **303 Redirect / No Message / Modal Not Closing**: Fixed a bug where `put()` and `post()` from `useForm` were called with an extra `{ data: payload }` envelope wrapping the data instead of passing `payload` directly to `router.put()` / `router.post()`. This caused Laravel's validation rules (`role`, `company`, `period`, `bullet_points`) to fail silently into validation errors on `$request->validate()`, returning a 303 redirect with session validation errors that went unrendered and prevented `onSuccess` from firing and closing the modal.
  - **Inline Validation Feedback**: Added explicit error text rendering (`{errors.role}`, `{errors.company}`, `{errors.period}`, `{errors.bullet_points}`) so validation feedback is immediately visible.
  - **Fixed Header/Footer Architecture & Clean Dark Scrollbar**: Upgraded the Milestone modal to the fixed header/footer flex column architecture, applying `.custom-scrollbar` with subtle dark thumb/track styling to eliminate ugly default browser scrollbars.
- **Public & Admin Favicon Override Resolution (`PortfolioLayout.jsx`, `AdminLayout.jsx`, `public/favicon.ico`)**:
  - **Root Cause Identified**: Discovered a conflicting hardcoded lightning bolt emoji SVG data URI (`<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,...⚡..." />`) located at the bottom of the `<Head>` block inside [`PortfolioLayout.jsx`](file:///home/war/projects/portfolio/resources/js/Layouts/PortfolioLayout.jsx). When Inertia rendered the public portfolio page, this lower tag overrode the dynamic favicon and `public/favicon.svg`. Because [`AdminLayout.jsx`](file:///home/war/projects/portfolio/resources/js/Layouts/AdminLayout.jsx) did not render `PortfolioLayout`, it did not contain this override and correctly displayed the configured SVG favicon, causing the symptom where favicon was only observed on the admin side.
  - **Removed Hardcoded SVG Data URI**: Cleaned out the conflicting emoji data URI so [`PortfolioLayout.jsx`](file:///home/war/projects/portfolio/resources/js/Layouts/PortfolioLayout.jsx) cleanly binds the user-configured `recruiterData.favicon` (falling back to `/favicon.svg`).
  - **Replaced 0-byte `favicon.ico`**: Generated a valid multi-resolution standard icon file at `public/favicon.ico` (replacing the empty 0-byte file) to ensure full legacy browser and tab compatibility.
  - **Admin `<Head>` Consistency**: Added explicit `<Head><title>...</title></Head>` tag inside [`AdminLayout.jsx`](file:///home/war/projects/portfolio/resources/js/Layouts/AdminLayout.jsx) for consistent title and icon management across the admin dashboard.
- **Hero Actions Boolean Serialization & Download / New Tab Bugfix (`SettingsController.php`, `Hero.jsx`, `Settings.jsx`)**:
  - **Root-Cause Discovery**: Fixed an issue where Inertia `forceFormData: true` serialized nested checkbox booleans to string literals (`"true"` / `"false"`), causing Laravel's strict nested `boolean` validation rule to reject requests with `The hero_actions.0.download field must be true or false`, silently aborting saves on production `warrdev.site`.
  - **Pre-Validation Boolean Normalization**: Added pre-normalization in `SettingsController::update` converting incoming FormData booleans using `filter_var(..., FILTER_VALIDATE_BOOLEAN)` without PHP reference pointers.
  - **Direct Download & New Tab Attributes**: Enhanced `Hero.jsx` `ActionItem` to extract the target filename directly into `download={downloadFilename}` (forcing browser file-save dialogs instead of inline preview) and bind `target="_blank"` with `rel="noopener noreferrer"` when `is_external` is enabled.
  - **Checkbox State Fidelity**: Updated `Settings.jsx` checkboxes to use truthy parsing so checkboxes accurately reflect database state.

### Added
- **Project REST Management API (`routes/api.php`, `ProductionManageController.php`, `ProductionManageTest.php`, `API_REFERENCE.md`)**:
  - Implemented secure API endpoints for project synchronization protected by `manage.auth` (`Authorization: Bearer <MANAGE_API_KEY>`):
    - `GET /api/manage/projects`: Lists all showcased projects with count and attributes.
    - `POST /api/manage/projects`: Creates or updates a showcased project directly via JSON payload with automatic slugging and sort order defaults.
    - `DELETE /api/manage/projects/{project}`: Removes a project via API.
  - Added feature test suite `ProductionManageTest::test_can_manage_projects_via_api`.
- **ePaluto On-Demand Home Cook Bento Marketplace Showcase (`2026_11_09_101000_seed_epaluto_project.php`, `DatabaseSeeder.php`, `public/screenshots/epaluto.png`)**:
  - Added new featured showcase project for [`https://github.com/warr-dev/ePaluto`](https://github.com/warr-dev/ePaluto).
  - Highlights full-stack SvelteKit 2 + Svelte 5 Runes architecture, PostgreSQL 15 connection pooling, Firebase Admin + signed JWT dual-mode auth, community chef menu voting polls, and Playwright E2E testing.
  - Generated and bundled high-res 1280x800 preview assets (`public/screenshots/epaluto.png` and `public/screenshots/epaluto.webp`).
- **Unified Branding Across Admin Console & Login (`AdminLayout.jsx`, `Login.jsx`, `HandleInertiaRequests.php`)**:
  - Replaced hardcoded text (`warren.admin`) with dynamic brand tokens (`logoTextPrimary` / `logoTextSecondary`), custom logo icon images, and monogram letters (`logoIconText`).
  - Synced global favicon controls (`<link rel="icon">`) to all admin views.
- **Projects Reordering & Visibility Controls (`ProjectController.php`, `Projects/Index.jsx`, `web.php`, `AdminTest.php`)**:
  - **Reorder Engine**: Added interactive up/down arrow controls and `/admin/projects/reorder` endpoint to order projects.
  - **Visibility Controls**: Added 1-click eye toggle (`featured: true/false`) with clear visual cues and dimmed row styling for hidden projects.
  - **Streamlined Link Bar**: Replaced verbose text tags with clean clickable icons with tooltips (`BookOpen` for Case Study, `GithubIcon` for repository, `ExternalLink` for demo).
  - **Fixed Modal Header & Footer**: Redesigned the project edit/create modal into a clean flex column layout where the header and footer remain pinned in place while only the form content scrolls.
  - **Short UI Copy**: Replaced lengthy verbose descriptive strings with concise labels across all fields and previews.
- **Logo Branding, Favicon Control & Dynamic Monogram Seeder (`Navbar.jsx`, `Settings.jsx`, `SettingsController.php`, `PortfolioController.php`, `2026_11_09_083500_seed_branding_and_favicon_settings.php`)**:
  - **Dynamic Text Branding**: Replaced hardcoded logo with configurable primary and secondary text tokens defaulting to **`warr`** in primary accent glow (`#5e6ad2`) and **`dev`** in neutral secondary text (`#8a8f98`).
  - **Monogram & Logo Image Support**: Added configurable icon text (default `'W'`) and custom uploaded logo image asset support in the Navbar and Admin headers.
  - **Favicon Control**: Implemented dynamic browser favicon injection (`<link rel="icon">`) via `public/favicon.svg` and `public/favicon.ico` with admin controls for file uploads or custom URLs.
  - **Hero Secondary Trust Badge Control**: Replaced the hardcoded Layout 4 "Verified Engineer" chip with an admin toggle (`hero_badge_secondary_enabled`, default `false`) and custom text input (`hero_badge_secondary`).
  - **Admin Settings Submodule Branding**: Added dedicated management interface with live Navbar brand preview, favicon image preview, and file upload handlers.
- **Fully Updatable Hero Section & Multi-Layout Architecture (`Hero.jsx`, `Settings.jsx`, `SettingsController.php`, `PortfolioController.php`, `2026_11_09_081000_seed_hero_section_settings.php`)**:
  - **Dynamic Profile Copy**: Made author `name`, primary `title`, domain `subtitle`, descriptive `caption`, live `status_badge`, and `location` completely updatable via database settings without external REST API dependencies.
  - **Configurable Hero Actions**: Built interactive button and link manager supporting customizable labels, target URLs, style variants (`primary` glow fill, `secondary` dark fill, `outline` glow border, `ghost` text link), download triggers, external link targets, and dynamic icons (`Download`, `ExternalLink`, `ArrowDown`, `Mail`, `Github`, `Terminal`, `Globe`, `FileText`, `Sparkles`).
  - **4 Selectable Presentation Layouts**:
    - `layout1`: **Minimalist Linear** — clean left-aligned typography, status pills, and action button row.
    - `layout2`: **Centered Impact** — symmetrical centered presentation with ambient radial glow backdrop.
    - `layout3`: **Split Terminal Showcase** — 2-column layout with interactive live cluster telemetry shell, server health, and uptime.
    - `layout4`: **Bento Modern Showcase** *(Recommended)* — high-contrast Bento card with verified engineer badge, dynamic gradient headline, action hub, and bottom 4-metric statistics rail.
  - **Design Accent Themes**: Selectable color themes across `Linear Indigo`, `DevOps Emerald`, `Cyberpunk Cyan`, `Ultra Violet`, and `Warm Amber`.
  - **Admin Settings Submodule 00**: Integrated visual layout selector cards, accent color swatch picker, action item builder with add/delete controls, and real-time live hero preview.
- **Global Agent Skill Distillation (`portfolio-sync`)**:
  - Packaged entire portfolio sync and showcase capture workflow into global skill at `~/.gemini/config/skills/portfolio-sync/`.
  - Bundled standalone Playwright screenshot & WebP optimization CLI script (`scripts/capture_showcase.py`).
  - Documented strict zero-push and no-API-update safety policies in `SKILL.md`.
- **Featured Live Projects & Automated Screenshots (`KiosKo Cloud` & `Palitayo`)**:
  - **KiosKo Cloud Fleet Management Platform (`https://kiosko.cloud/`)**: Added showcase card featuring autonomous vendo fleet orchestration, headless BYOD architecture, and real-time remote telemetry. Captured automated 1280x800 screenshot and high-density WebP in `public/screenshots/kiosko-cloud.png`.
  - **Palitayo Barter & Trade Marketplace (`https://palitayo.online/`)**: Added showcase card featuring item-for-item cashless barter auctions, item vault, and trade escrow workflows. Captured automated 1280x800 screenshot and high-density WebP in `public/screenshots/palitayo-online.png`.
- **LinkedIn Profile & DevOps Engineering Sync (`2026_11_09_072500_sync_linkedin_profile_updates.php`, `PortfolioController.php`, `DatabaseSeeder.php`)**:
  - **Title & Bio Pivot**: Updated primary professional title to *Senior Backend Developer & DevOps / Infrastructure Engineer* and status badge to *Open to Senior Backend & DevOps / Infrastructure Roles*, highlighting high-concurrency systems, C++ hardware, Linux, Docker, and Kubernetes expertise.
  - **NTT Limited Technical Deep-Dive**: Expanded career milestones to detail the layer-2 MAC-address terminal recognition for walk-in players, custom serial touchscreen driver authoring on Ubuntu, and packaging platform games for Malta Gaming OS.
  - **DevOps & Cloud Infrastructure Skills**: Promoted **Kubernetes**, **Terraform**, and **CI/CD** pipelines in the proficiency matrix. Added **ESP32 / BLE** to hardware integrations.
  - **Education Graduation Year**: Updated Master of Science in Information Technology (MSIT) period from 2019–2021 to 2019–2022.
  - **LinkedIn Canonical URL**: Aligned fallback and placeholder references to [`https://linkedin.com/in/warrdev`](https://linkedin.com/in/warrdev).
  - **Resume Asset Sync**: Synchronized updated LinkedIn-exported PDF to `public/Warren_Dalawampu_Resume.pdf` and `public/Warren_Dalawampu_LinkedIn_Resume.pdf`.

## [Unreleased] - 2026-11-08

### Added
- **Production Management REST API (`routes/api.php`, `ProductionManageController.php`, `EnsureManageTokenIsValid.php`)**:
  - **Secure Token-Based API Authentication**: Created `EnsureManageTokenIsValid` middleware validating `Authorization: Bearer <token>` against `config('services.manage.token')` / `MANAGE_API_KEY` using constant-time `hash_equals` comparison. Aliased as `manage.auth`.
  - **Maintenance Mode Bypass**: Configured `$middleware->preventRequestsDuringMaintenance(except: ['api/manage/*'])` in `bootstrap/app.php` so health inspections, log analysis, and `up` commands remain accessible even when production is down.
  - **System Health Diagnostics (`GET /api/manage/health`)**: Reports real-time PHP/Laravel versions, environment mode, SQLite database connectivity status, free disk space in MB, and maintenance status.
  - **Artisan Command Execution (`POST /api/manage/artisan`)**: Executes strictly whitelisted administrative Artisan operations (`about`, `optimize:clear`, `config:cache`, `config:clear`, `route:cache`, `route:clear`, `view:cache`, `view:clear`, `migrate:status`, `storage:link`) and rejects non-whitelisted commands with 403 Forbidden.
  - **Application Error Log Tailing (`GET /api/manage/logs`)**: Tails the most recent lines (configurable via `lines` query param, capped at 500) of `storage/logs/laravel.log`.
  - **Maintenance Mode Management (`POST /api/manage/maintenance`)**: Programmatically toggles `artisan down` (with optional bypass secret) and `artisan up`.
  - **CLI Management Helper Script (`scripts/prod-manage.sh`)**: Executable bash utility automating health checks, cache warming, log tailing, and maintenance operations from the terminal or AI agent.
  - **Comprehensive Production Operations Documentation (`docs/PRODUCTION_MANAGEMENT.md`)**: Full operational runbook detailing architecture, security guardrails, whitelisted commands, and troubleshooting procedures.
  - **Automated Feature Test Suite (`tests/Feature/Api/ProductionManageTest.php`)**: 7 feature tests verifying authentication rejections, metric responses, command whitelisting, log reading, and maintenance toggling (all 27 tests and 168 assertions passing).

## [Unreleased] - 2026-09-30

### Added
- **Complete SEO & Social Graph Suite (`PortfolioLayout.jsx`, `SettingsController.php`, `PortfolioController.php`, `Settings.jsx`)**:
  - **Dynamic OpenGraph & Twitter Card Meta Tags**: Added full OpenGraph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) and Twitter Cards (`summary_large_image`, `twitter:creator`) support across both the main portfolio and individual project case study views.
  - **Dynamic JSON-LD Structured Data Schema**: Integrated rich Google-recognized schemas (`Person`, `WebSite`, `SoftwareSourceCode`, and `Article`) injecting semantic data directly into `<head>` via `<script type="application/ld+json">`.
  - **Dynamic XML Sitemap Generator (`/sitemap.xml`)**: Automated sitemap routing outputting valid XML with `<lastmod>`, `<changefreq>`, and priority weightings for the homepage and all active project permalinks.
  - **Dynamic Robots Directive (`/robots.txt`)**: Programmatic robots handler serving indexation directives, indexing public content, disallowing `/admin`, and pointing web crawlers to `/sitemap.xml`.
  - **Admin Settings Submodule 05 (SEO & Social Graph)**: Added dedicated management interface in `/admin/settings` controlling global page title, meta description, keywords, and OpenGraph banner uploads (with direct media asset preview and storage in `public/seo/`).
  - **Scroll-Spy Active Navigation Indicator (`Navbar.jsx`)**: Implemented dynamic bounding client rect scroll listener highlighting the user's active viewport section (`Recruiter Hub`, `Experience`, `Projects`, `Skills`, etc.) with linear purple accent styling and indicator bars on desktop and active pills on mobile.
  - **Feature & E2E Testing**: Added PHPUnit tests verifying XML generation, robots output, and settings update (`tests/Feature/PortfolioTest.php`, `tests/Feature/AdminTest.php`) and Playwright E2E tests verifying dynamic metadata and active link scroll-spy transitions (all 20 PHPUnit tests and 11 Playwright browser tests passing).
- **Configurable LinkedIn Profile & Network Section (`LinkedInSection.jsx`, `SettingsController.php`, `PortfolioController.php`)**:
  - Replaced hardcoded LinkedIn copy in `LinkedInSection.jsx` (`NTT Limited Philippines`, `Senior Backend Developer`, `Remote / B2B / Full-Time`, `Open to worldwide contracts`) with dynamic configuration keys stored in `SiteSetting`.
  - Added full admin configuration controls inside Submodule 02 (`Contact & Socials`):
    - LinkedIn Profile URL.
    - Show/Hide LinkedIn section toggle (`linkedin_enabled`).
    - Current Engagement / Company (`linkedin_company`).
    - Current Role / Subtitle (`linkedin_role`).
    - Work Authorization (`linkedin_work_auth`).
    - Work Authorization Note (`linkedin_work_auth_note`).
  - Updated `Navbar.jsx` mobile navigation links to respect the `linkedin_enabled` toggle and profile URL state.
  - Enhanced `SiteSetting::set` to serialize booleans to JSON, preserving boolean fidelity.
  - Updated test assertions in `tests/Feature/AdminTest.php` (all 18 tests, 122 assertions passing).
- **Dynamic Multi-Resume Library & Active Public Resume Switcher (`SettingsController.php` & `Settings.jsx`)**:
  - Implemented dynamic resume library in Admin Settings (`/admin/settings`) supporting arbitrary uploaded resumes (PDF).
  - Added dedicated endpoints:
    - `POST /admin/settings/resumes`: Uploads new PDF resumes to public storage with custom labels and target focus types (Create).
    - `POST /admin/settings/resumes/active`: Sets and switches the single active resume displayed to visitors on the website.
    - `POST /admin/settings/resumes/{id}`: Updates resume label, focus type, and optionally replaces the underlying PDF file (Update).
    - `DELETE /admin/settings/resumes/{id}`: Safely removes uploaded custom resumes while preventing accidental deletion of the active resume (Delete).
  - Added interactive in-place Edit UI on resume cards with instant validation and cancellation.
  - Re-architected `/admin/settings` into focused, tabbed submodules (`CV & Resume Manager`, `Core Profile & Bio`, `Contact & Socials`, `Specialized Capabilities`, and `Security & Auth`) with animated tab switches, count badges, and persistent submodule state.
  - Added full automated feature test coverage in `tests/Feature/AdminTest.php` (18 tests, 122 assertions passing).

## [Unreleased] - 2026-09-20

### Added
- **Interactive & Headless Administrative User Creation Command (`php artisan make:user`)**:
  - Implemented [`CreateUser.php`](file:///home/war/projects/portfolio/app/Console/Commands/CreateUser.php) Artisan command.
  - Supports both interactive prompts (hidden password input) and flags (`--name`, `--email`, `--password`).
  - Includes validation rules ensuring name presence, email format and database uniqueness, and minimum password length.
- **Hostinger Multi-Tenant Directory Structure (`portfolio/`)**:
  - Migrated deployment target directory from generic `laravel/` to project-specific `portfolio/`.
  - Configured Hostinger document root symlink: `public_html -> portfolio/public`.
  - Updated GitHub Actions CI/CD pipeline (`.github/workflows/deploy.yml`) to deploy to `staging/portfolio`, rsync with `--delete` to `$TARGET/portfolio/`, and run cache warmup from inside `portfolio/`.
  - Hardened `rsync` deployment with preservation rules (`--exclude='.env'`, `--exclude='database/*.sqlite*'`, `--exclude='storage/app/public/*'`) to prevent server-side environment secrets and database files from being wiped during `--delete` syncs.
  - Updated `docs/DEPLOYMENT.md` setup guide and server architecture diagrams.
- **Dynamic Specialized Capability Section & Zero-Entry Hiding (`HardwareSection.jsx` & `Settings.jsx`)**:
  - Made the Specialized Capabilities section ("Hardware I/O, C++ & Edge Engineering") completely dynamic and configurable via Admin Settings (`/admin/settings`).
  - Added support for custom section heading titles, subtitles/tags, and an interactive list of capability cards with custom icons (`Cpu`, `Terminal`, `CircuitBoard`, `Server`, `Radio`, `Shield`, `Database`, `Wrench`), titles, and descriptions.
  - Configured zero-entry hiding: If 0 capability entries are present in the database, the section (`#hardware-systems`) and its corresponding mobile navigation links are automatically hidden from the public portfolio.
- **Streamlined Desktop Navigation Bar (`Navbar.jsx`)**:
  - Removed duplicate CV download trigger from desktop navbar actions (leaving clean primary CV flow in Recruiter Hub / Hero).
  - Cleaned desktop center navigation anchors to focus strictly on core pillars: `Recruiter Hub`, `Experience`, `Projects`, and `Skills`.
  - Removed redundant `Hardware & C++`, `LinkedIn`, and duplicate `Contact` anchors on desktop, preserving the dedicated high-priority "Get in touch" CTA button on the right.
  - Kept comprehensive navigation items intact within the mobile hamburger drawer for small screens.
- **Dedicated Project Instance Page & Case Study Route (`/projects/{slug}`)**:
  - Implemented full-page deep-dive template (`ProjectShow.jsx`) with dynamic hero backdrop, organization attribution, technical tags, and related works cross-navigation.
  - Added dedicated route `GET /projects/{project:slug}` linked directly from project titles on the home portfolio rail and the admin management table.
  - Interactive full-screen media inspection lightbox for both images and video demos.
- **Project Cover Image & Multi-Media Gallery (`cover_image`, `gallery`, `content`)**:
  - Migrated `projects` table to support `cover_image` (custom banner/hero backdrop), `gallery` (JSON array of `{type, url, caption}`), and `content` (long-form engineering case studies).
  - Admin Project Modal enhanced with direct cover file uploading, multi-file gallery batch uploads (PNG, JPG, MP4, WebM), and URL gallery item entry.
- **Mobile Hamburger Navigation on Client Portfolio (`Navbar.jsx`)**:
  - Added responsive hamburger trigger button (`Menu` / `X` toggle) visible on `< md` screens.
  - Implemented glassmorphism mobile dropdown tray (`#0f1011/95` backdrop blur) rendering all section anchor links, Recruiter Hub fast-track, direct CV download, and "Get in touch" CTA with automatic close on click.
- **Mobile Hamburger Navigation Drawer in Admin Panel (`AdminLayout.jsx`)**:
  - Replaced vertical stacked layout on mobile with a sleek sticky mobile header (`h-14`) featuring brand monogram, external portfolio link, and hamburger toggle.
  - Implemented full-height sliding mobile drawer with touch-friendly navigation tiles for Dashboard, Settings, Projects, Experience, Skills, and Inbox, alongside quick-logout action.
- **Experience Interactive Tagify & Skills Autocomplete**:
  - Replaced the plain text input in `/admin/experience` with an interactive Tagify chip manager for `technologies`.
  - Added dynamic autocomplete dropdown connected to existing skills in the database (`availableSkills`).
  - Allows keyboard tag addition (<kbd>Enter</kbd>, comma), backspace removal, and quick selection from suggestions without proficiency star ratings.
- **Tagify-Style Interactive Skills Manager**:
  - Implemented interactive chip management in the admin skills interface (`/admin/skills`).
  - Added support for keyboard tag generation (`Enter`, `,`), backspace deletion, and batch comma-separated entry.
- **Per-Item Star Proficiency Rating & Clean Category Headers**:
  - Upgraded skill items data structure to `{ name: string, level: 1..5 }` with star proficiency exclusively assigned per skill item.
  - Removed obsolete proficiency levels from the category container level across admin index, modals, validation, database schema, and the public portfolio.
  - Rendered polished gold star ratings (`★`) with ambient glow on the public portfolio (`#skills` section) and admin preview cards.
- **Single Active CV Selection & Document Library ("Don't show 2 CV, select 1")**:
  - Refactored frontend to render strictly **one** primary CV download CTA on Hero, Navbar, and RecruiterHub rather than rendering separate concurrent buttons for both comprehensive CV and ATS resume.
  - Added `activeCv` setting (`comprehensive` vs `ats_resume`) in `SiteSetting` and an interactive Active CV selector in Admin Settings (`/admin/settings`).
  - Added direct PDF preview links and dynamic filenames/labels (`activeCvUrl`, `activeCvLabel`, `activeCvFilename`) dynamically passed to the public frontend.
- **GitHub Actions Hostinger CI/CD Deployment Workflow (`.github/workflows/deploy.yml`)**:
  - Replicated the production Hostinger deployment pipeline proven in the `kiosko` project.
  - Automated PHP 8.3 & Node 22 setup, Composer dependencies installation with `--optimize-autoloader`, and Vite/Tailwind v4 asset bundling.
  - Automatically isolates backend to `portfolio_backend/` and frontend public assets to `public_html/` with Hostinger-tailored `index.php` bootstrappers, remote SSH rsync, directory flattening, and cache warm-ups (`config:cache`, `route:cache`, `view:cache`).
- **Refined LinkedIn Section Copy**:
  - Updated section title and subheadings from "LinkedIn Profile & Endorsements" to "LinkedIn Profile & Network" and "Professional Network & Career Profile" to accurately reflect profile presence without premature endorsements.
- **CV Display Placement Controls**:
  - Added configurable display modes (`both`, `topbar_only`, `hero_only`, `hidden`) in Site Settings.
  - Navbar and Hero sections automatically adapt their CV download button rendering to the admin's preference.
- **Dynamic Years of Experience Calculator**:
  - Replaced hardcoded years of experience strings with baseline date tracking (`careerStartDate`).
  - Automatically calculates and increments career tenure (e.g. `7+ Years`) in real-time with live preview in the admin panel.
- **Dedicated LinkedIn Section**:
  - Designed and built high-contrast `LinkedInSection` with verified developer status, direct connection CTA, and career fact matrix.
  - Added `#linkedin` anchor in Navbar navigation.
- **Project Media Showcase & Availability Controls**:
  - Added database columns and schema migration for `media_type` (`none`, `image`, `video`, `youtube`), `media_url`, `demo_status`, and `github_status`.
  - Added support for both external media URLs and local file uploads (`/storage/projects/`).
  - Added status badges on projects for `offline`, `internal / LAN only`, `decommissioned`, `private repo`, and `NDA protected`.
  - Added interactive media inspection modal with video playback and image previews.
- **Project Custom Extra Info & Performance Counters (`extra_info`)**:
  - Added nullable JSON column `extra_info` to `projects` table for arbitrary metrics, statistics, and impact counters (e.g. `Active Users: 120k+`, `Hardware Devices: 450`, `Latency: <15ms`).
  - Integrated dynamic key-value metric manager into Admin Projects modal (`/admin/projects`) allowing on-the-fly additions and deletions.
  - Rendered high-contrast stat counter cards on public portfolio project cards (`ProjectsSection.jsx`) between description and tags.
- **Interactive Live Media Preview & Table Thumbnails**:
  - Added instant visual preview in the Admin Project Modal (`/admin/projects`) for both remote URLs and local file selections (`blob:` object URLs) before saving.
  - Supports image previews and HTML5 video playback directly inside the modal.
  - Added compact visual media thumbnails in the Admin Projects table row alongside project titles.
- **Linear Dark Custom Minimalist Scrollbars**:
  - Replaced the browser's default bulky gray scrollbars across the entire portfolio and admin dashboard with a sleek 8px custom scrollbar track (`#010102`), pill thumb (`#23252a`), and hover accent (`#5e6ad2`).
  - Added `.custom-scrollbar` utility for internal scrolling panels, modals, and suggestion dropdowns.
- **Automated Test Coverage**:
  - Updated `AdminTest.php` to verify dynamic settings, project media/availability persistence, file uploads, and `extra_info` JSON metrics persistence.
  - 12/12 PHPUnit feature tests passing (73 assertions).
  - 7/7 Playwright browser tests passing.

### Fixed
- **Inertia.js `useForm` Update Payload**:
  - Resolved `PUT /admin/skills/{id}` payload submission issue where passing `{ data: payload }` inside Inertia options bypassed the request body.
  - Refactored form state to directly store normalized item arrays, enabling seamless updates and real-time persistence.
- **Project Media Upload Pipeline & Multipart FormData Handling**:
  - Resolved media upload failure in `/admin/projects` where file objects passed via standard Inertia `useForm` options were dropped during method spoofing or attempted direct column insertion.
  - Migrated project creation and update requests to explicit `FormData` payloads via `router.post(url, formData)` with method spoofing (`_method: 'put'`).
- **Hostinger CI/CD Staging Directory Log Verbosity**:
  - Replaced verbose file-by-file `rsync -av` in `.github/workflows/deploy.yml` with quiet `rsync -a -q`.
  - Replaced noisy terminal clutter with a single clean status message (`✓ Staging directory prepared successfully.`).
- **Hostinger Deployment Symlink Architecture (`public_html -> laravel/public`)**:
  - Migrated deployment pipeline to sync the full Laravel application into `laravel/` and automatically link `public_html` via symbolic link (`ln -s laravel/public public_html`).
  - Preserved standard Laravel public folder structure and enabled seamless `storage:link` operation without custom index.php overrides.

