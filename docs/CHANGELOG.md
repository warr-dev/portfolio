# Changelog

All notable changes to the **Warren Dalawampu Portfolio & Admin Engine** will be documented in this file.

## [Unreleased] - 2026-09-20

### Added
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

