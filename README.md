# Warren Dalawampu — Senior Backend & Systems Software Engineer Portfolio

<p align="left">
  <img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel 12" />
  <img src="https://img.shields.io/badge/Inertia.js-2.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Playwright-E2E-45ba4b?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright E2E" />
  <img src="https://img.shields.io/badge/PHPUnit-14%2F14_Pass-3c9cd7?style=for-the-badge&logo=php&logoColor=white" alt="PHPUnit Tests" />
</p>

A high-performance personal portfolio and dynamic administrative management suite built for **Warren Dalawampu**, showcasing 7+ years of expertise in distributed backend systems, localized hardware drivers (C++), gaming terminals, and enterprise web architecture.

Crafted with a sleek **Linear Dark Craft** design aesthetic (`#010102`, `#0f1011`, `#141516`, `#23252a`, `#5e6ad2`), micro-interactions, full responsive mobile sliding trays, and automated zero-downtime CI/CD deployment to Hostinger shared hosting.

---

## 🌟 Key Features

### Public Portfolio
- **Recruiter Fast-Track Hub**: Live tenure calculator (`7+ Years`), core technical metrics, and single-click downloadable CV / ATS resume.
- **Dedicated Project Showcases (`/projects/{slug}`)**: Full-screen media lightboxes, custom cover art, video walkthroughs, and performance impact counters (`extra_info`).
- **Dynamic Specialized Capabilities**: Configurable edge computing, C++ device drivers, and telemetry architecture cards that automatically hide when empty.
- **Experience Timeline & Tagify Skills Arsenal**: Per-skill gold star proficiency ratings (`★`) with ambient glow and interactive technology categorization.
- **Responsive Mobile Navigation**: Custom glassmorphism sliding drawers with instant section teleportation and touch-friendly controls.

### Administrative Control Center (`/admin`)
- **Site & Profile Settings**: Live tenure incrementation baseline, dynamic headline & status badge customizer, single-active CV switcher, and customizable section headings.
- **Full Project Lifecycle Manager**: Multi-media file uploads (PNG, JPG, MP4, WebM), URL video embeds, custom metric key-value counters, and availability badges (`offline`, `LAN only`, `NDA protected`).
- **Interactive Experience & Skills Editor**: Tagify-style chip management, autocomplete suggestions from existing skills database, and per-item proficiency rating.
- **Contact Inquiries Inbox**: Lead capture dashboard with unread tracking, sender telemetry, and message inspection.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Backend Framework** | Laravel 12.x, PHP 8.3+ |
| **Frontend Architecture** | Inertia.js 2.x, React 19, Lucide Icons |
| **Styling & Theme** | Tailwind CSS v4, Linear Dark Craft palette |
| **Database & Cache** | SQLite (zero-config, high-performance WAL mode) |
| **Testing & Quality** | PHPUnit (14 Feature tests, 102 assertions), Playwright E2E (10 browser tests) |
| **CI/CD & Hosting** | GitHub Actions (`.github/workflows/deploy.yml`), Hostinger Shared Hosting |

---

## 🚀 Getting Started

### Prerequisites
- **PHP 8.3+** with SQLite, GD, BCMath, and Fileinfo extensions
- **Composer 2.x**
- **Node.js 22+** & **npm**

### Local Installation

```bash
# 1. Clone repository
git clone git@github.com:warr-dev/portfolio.git
cd portfolio

# 2. Install backend dependencies
composer install

# 3. Install frontend dependencies
npm install

# 4. Configure environment
cp .env.example .env
php artisan key:generate

# 5. Run migrations & database seeders
touch database/database.sqlite
php artisan migrate --seed

# 6. Build assets & create storage symlink
npm run build
php artisan storage:link

# 7. Start local development server
php artisan serve
```

Visit the portfolio at `http://localhost:8000` and access the admin dashboard at `http://localhost:8000/admin`.

---

## 🧪 Testing Suite

### Backend Feature Tests (PHPUnit)
```bash
php artisan test
```
*Executes 14 feature test suites covering authentication, project management, multi-media uploads, contact submission, and settings persistence.*

### End-to-End Browser Tests (Playwright)
```bash
npx playwright test
```
*Runs 10 browser scenarios including mobile navigation drawers, settings dynamic reflection, and project deep-dive routing.*

---

## 📦 Documentation Suite

Detailed technical guides and architectural specifications are maintained directly in the repository under [`docs/`](docs/):

- 📖 [**Central Documentation Index**](docs/README.md)
- 🏗️ [**Architecture Specification**](docs/ARCHITECTURE.md)
- 🗄️ [**Database Schema & Model Specs**](docs/DATABASE_SCHEMA.md)
- 🔌 [**REST API & Inertia Reference**](docs/API_REFERENCE.md)
- 🧪 [**Testing Runbook & Verification**](docs/TESTING.md)
- 🚀 [**Hostinger Production Deployment Guide**](docs/DEPLOYMENT.md)
- 🗺️ [**Product Roadmap & Status Board**](docs/ROADMAP.md)
- 📝 [**Changelog**](docs/CHANGELOG.md)

---

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).
