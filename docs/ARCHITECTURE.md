# Architecture Specification

## 1. System Overview
The Warren Dalawampu Portfolio is a reactive single-page public application paired with a dedicated, secure **Linear-Dark Inertia Administrative Panel** (`/admin`). Built with **Laravel 12 / 13**, **Inertia.js v2**, and **React 19**, styled using **Linear Dark Craft** design tokens and served locally via **Lerd** under **PHP 8.3** (`https://portfolio.test`).

## 2. Technology Stack
- **Backend Framework**: Laravel (pinned to PHP 8.3 via Lerd)
- **Runtime & Local Server**: Lerd (Nginx + PHP-FPM 8.3 + Node 22 + mkcert TLS)
- **Database Engine**: SQLite (WAL mode, zero-latency local relational storage)
- **Frontend Framework**: React 19 (`@inertiajs/react`, `react`, `react-dom`)
- **Styling & Design System**: Tailwind CSS v4 + `@tailwindcss/vite` using `awesome-design` Linear Dark Craft tokens
- **Icons**: Lucide React
- **Testing**: PHPUnit 12 (backend) + Playwright (browser E2E)

## 3. Design System Tokens (Linear Dark Craft)
- **Canvas Anchor**: `#010102` (deep obsidian with faint blue tint)
- **Surface Elevation**:
  - `Surface-1` (`#0f1011`): Primary cards, sidebar, and container panels
  - `Surface-2` (`#141516`): Form inputs, badges, and inner panels
  - `Surface-3` (`#18191a`): Technology tag pills
  - `Surface-4` (`#191a1b`): Hover states
- **Hairlines**:
  - `Default` (`#23252a`): 1px structural dividing lines
  - `Strong` (`#34343a`): Interactive focused border highlights
- **Typography & Inks**:
  - Primary: `#f7f8f8`
  - Muted: `#d0d6e0`
  - Subtle: `#8a8f98`
  - Tertiary: `#62666d`
- **Chromatic Accent**: `#5e6ad2` (lavender-indigo used for CTAs, active pills, focus rings, and glow effects)

## 4. Public Component Hierarchy
```
PortfolioLayout.jsx
├── Navbar.jsx (Floating frosted dock, anchor links, CV download, CTA)
└── main
    ├── Hero.jsx (Role status pill, display typography, dual CV downloads)
    ├── RecruiterHub.jsx (Fast-track metric cards, why-hire matrix)
    ├── ExperienceSection.jsx (Vertical rail timeline, career chronology)
    ├── ProjectsSection.jsx (Featured works, technology pills, source/demo links)
    ├── HardwareSection.jsx (C++ driver development, OS-to-client bridge)
    ├── SkillsSection.jsx (Categorized proficiency matrix)
    ├── EducationSection.jsx (MSIT, BSIT, honors, and certifications)
    └── ContactSection.jsx (Reactive Inertia form, flash feedback)
└── Footer.jsx (Copyright, direct contact coordinates)
```

## 5. Administrative Architecture (`/admin`)
- **Authentication Guard**: Protected by Laravel's `auth` web middleware session state. Unauthenticated requests to `/admin/*` are automatically redirected to `/admin/login`.
- **Admin Layout**: `AdminLayout.jsx` with persistent sidebar navigation, live site link, breadcrumbs, user info, and logout action.
- **Dedicated Route Controllers**:
  - `AuthController`: Login form and session authentication.
  - `DashboardController`: High-level metrics (unread inquiries, counts) and recent recruiter messages.
  - `SettingsController`: Form to edit hero title, bio, contact coordinates, and upload new CV PDFs.
  - `ProjectController`: Full CRUD for showcased works with tag chip editor and external links.
  - `ExperienceController`: Full CRUD for career milestones with multiline bullet points and tech tags.
  - `SkillController`: Full CRUD for skill groupings, proficiency tiers, and tool arrays.
  - `InboxController`: Inquiry viewer with unread indicators, mark-as-read triggers, and deletion actions.
