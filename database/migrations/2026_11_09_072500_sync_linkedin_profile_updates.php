<?php

declare(strict_types=1);

use App\Models\Experience;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\Skill;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations to synchronize exact details from LinkedIn PDF export.
     */
    public function up(): void
    {
        // 1. Synchronize Site Settings
        SiteSetting::set('name', 'Warren Dalawampu');
        SiteSetting::set('title', 'DevOps & Infrastructure Engineer | Backend Engineering');
        SiteSetting::set('statusBadge', 'Open to DevOps, Infrastructure & Senior Backend Roles');
        SiteSetting::set('location', 'Sta Maria, Naujan, Oriental Mindoro, Philippines');
        SiteSetting::set('phone', '09561645935');
        SiteSetting::set('linkedin', 'https://www.linkedin.com/in/warrdev');
        SiteSetting::set('bio', "I'm a Software Engineer specializing in backend development, infrastructure, and systems engineering, with hands-on experience building, deploying, and maintaining software solutions across application, server, and hardware environments. My background combines backend engineering with practical infrastructure operations across PHP, Laravel, Node.js, React, Linux, Docker, Kubernetes, Terraform, and CI/CD.");

        // 2. Experience 1: NTT Limited Philippines Branch
        $ntt = Experience::where('company', 'like', '%NTT%')->first();
        if ($ntt) {
            $ntt->update([
                'company' => 'NTT Limited Philippines Branch',
                'role' => 'Senior Backend Developer',
                'period' => 'Aug 2024 — Present (2 yrs 4 mos)',
                'is_current' => true,
                'location' => 'Philippines',
                'bullet_points' => [
                    'Developed and maintained backend and frontend features for a gaming casino platform, including third-party game provider integrations and payment gateway integrations with UnionBank and Xendit.',
                    'Independently developed a hybrid extension of the platform for physical gaming machine terminals, designed for walk-in players to access platform games without creating accounts. Implemented MAC-address-based device identification over a local Layer 2 LAN environment to support accountless player sessions and terminal recognition.',
                    'Initially integrated the hybrid platform with the microservices version of the existing system, then adapted the integration to the monolithic platform when the project direction changed.',
                    'Researched and developed a C++ hardware management system for gaming terminal peripherals, including bill/ticket acceptors, ticket printers, buttons, button LEDs, and tower lights. Implemented configurable hardware handling over serial connections, with support for enabling, disabling, and adding devices, as well as WebSocket-based simulated drivers.',
                    'Deployed the system on Ubuntu-based terminals. When touchscreen drivers were unavailable for the target hardware, developed a custom driver using serial communication to enable touchscreen functionality.',
                    'Later adapted and packaged the application for an existing gaming OS from Malta, where offline games are managed through a local game server, enabling the company\'s platform games to run on physical gaming machine terminals.',
                ],
                'technologies' => [
                    'PHP',
                    'Laravel',
                    'C++',
                    'WebSockets',
                    'Electron',
                    'Ubuntu',
                    'Serial Drivers',
                    'Xendit',
                    'UnionBank',
                    'GitLab',
                ],
            ]);
        }

        // 3. Experience 2: Eclaro
        $eclaro = Experience::where('company', 'like', '%Eclaro%')->first();
        if ($eclaro) {
            $eclaro->update([
                'company' => 'Eclaro',
                'role' => 'Configuration Analyst',
                'period' => 'Feb 2024 — Aug 2024 (7 mos)',
                'is_current' => false,
                'location' => 'Quezon City, National Capital Region, Philippines',
                'bullet_points' => [
                    'Worked on configuring a highly customizable SaaS platform for insurance claims processing, translating business requirements into system configurations tailored to specific client workflows.',
                    'Used MongoDB aggregation pipelines and spreadsheet-like functions to implement data processing logic and configurable business rules.',
                    'Collaborated with multinational teams to analyze requirements, implement configurations, document changes, and perform testing to ensure accuracy and reliability.',
                    'Used Jira for project tracking and Confluence for technical documentation and collaboration.',
                ],
                'technologies' => ['MongoDB', 'SaaS Workflows', 'Jira', 'Confluence', 'Aggregation Pipelines', 'Enterprise Testing'],
            ]);
        }

        // 4. Experience 3: 1 Bit Software Development Corp
        $oneBit = Experience::where('company', 'like', '%1 Bit%')->first();
        if ($oneBit) {
            $oneBit->update([
                'company' => '1 Bit Software Development Corp',
                'role' => 'PHP Backend Developer',
                'period' => 'Apr 2023 — Feb 2024 (11 mos)',
                'is_current' => false,
                'location' => 'Philippines',
                'bullet_points' => [
                    'Developed backend systems and RESTful APIs using PHP and Laravel, translating business requirements into maintainable application functionality.',
                    'Worked on proprietary casino gaming systems, third-party game provider integrations, and streaming services built with Laravel and Node.js.',
                    'Implemented microservices, Test-Driven Development (TDD), caching, and Protobuf to support application performance, reliability, and maintainability.',
                    'Worked with MySQL and MongoDB for application data management.',
                    'Utilized Laravel features including events, observers, jobs, queue workers, schedulers, commands, Eloquent ORM, and middleware. Used Laravel Telescope for API monitoring and debugging.',
                    'Collaborated with frontend developers on API integration and Telegram-based web applications. Developed and managed Telegram bots for service notifications and built microservice administration interfaces using DCAT Admin.',
                    'Configured Docker-based development environments, worked with remote development devices through VS Code, maintained private Git and GitHub repositories, and implemented CI/CD pipelines for automated deployments.',
                ],
                'technologies' => ['PHP', 'Laravel', 'Node.js', 'Redis', 'Protobuf', 'MySQL', 'MongoDB', 'Docker', 'DCAT Admin', 'TDD', 'Telegram API'],
            ]);
        }

        // 5. Experience 4: MVSoftech Inc
        $mvsoftech = Experience::where('company', 'like', '%MVSoftech%')->first();
        if ($mvsoftech) {
            $mvsoftech->update([
                'company' => 'MVSoftech Inc',
                'role' => 'Junior backend developer',
                'period' => 'Oct 2020 — Apr 2023 (2 yrs 7 mos)',
                'is_current' => false,
                'location' => 'Philippines',
                'bullet_points' => [
                    'Developed and maintained business applications, backend services, internal tools, and supporting infrastructure across different projects.',
                    'Built frontend applications using ReactJS integrated with .NET C# APIs.',
                    'Developed a document management system with fillable PDF forms and automated document handling, as well as Node.js and MongoDB applications for dashboards and data visualization. Created Python scripts for automated file monitoring and data imports.',
                    'Customized and enhanced a Laravel 7-based HRIS and project management system to support business workflows. Integrated Node.js services for employee data synchronization and developed a barcode-based time logging kiosk with employee ID printing.',
                    'Developed a UISP UCRM plugin for promotional SMS broadcasting through the iTexMo API and created a web interface for simplifying WordPress project redeployment.',
                    'Handled infrastructure and server administration, including Linux virtual machines, replication, Docker deployments, Nextcloud, reverse proxies, Cloudflare, local DNS, and WireGuard VPN.',
                    'Set up and maintained self-hosted GitLab and GitLab Runners, BookStack, Portainer, and MongoDB management tools. Implemented automated deployments using GitHub webhooks.',
                    'Collaborated with network engineers on port forwarding, public IP configuration, and multi-subdomain deployments. Assisted with client system audits, proposed technical improvements, and guided interns through development tasks.',
                ],
                'technologies' => ['Laravel 7', 'ReactJS', '.NET C#', 'Node.js', 'MongoDB', 'Python', 'Nextcloud', 'WireGuard', 'Cloudflare', 'Linux VMs', 'Docker', 'GitLab CI'],
            ]);
        }

        // 6. Experience 5: Mindoro State College of Agriculture and Technology - Calapan City
        $mscat = Experience::where('company', 'like', '%Mindoro State%')->orWhere('company', 'like', '%MSCAT%')->first();
        if ($mscat) {
            $mscat->update([
                'company' => 'Mindoro State College of Agriculture and Technology - Calapan City',
                'role' => 'MIS personnel',
                'period' => 'Jul 2019 — Oct 2020 (1 yr 4 mos)',
                'is_current' => false,
                'location' => 'Calapan, Philippines',
                'bullet_points' => [
                    'Handled IT operations and technical support for the university, including computer laboratory maintenance, hardware and software troubleshooting, and campus network configuration and maintenance.',
                    'Assisted employees with technical issues and supported day-to-day IT operations.',
                    'Developed a campus enrollment system using an MVC-based PHP framework and assisted in facilitating and supporting student enrollment processes.',
                ],
                'technologies' => ['PHP MVC', 'Networking', 'Hardware Troubleshooting', 'Campus Infrastructure'],
            ]);
        }

        // 7. Update DevOps & Cloud Infra Skills
        $devopsSkill = Skill::where('category', 'like', '%DevOps%')->first();
        if ($devopsSkill) {
            $devopsSkill->update([
                'items' => [
                    'Linux (Ubuntu/Debian)',
                    'Docker',
                    'Kubernetes',
                    'Terraform',
                    'GitLab CI / Actions',
                    'Cloudflare Tunnels',
                    'WireGuard VPN',
                    'Nginx & Reverse Proxies',
                    'Devcontainer',
                    'Portainer',
                ],
            ]);
        }

        // 8. Update Hardware Skills to include ESP32 / BLE
        $hardwareSkill = Skill::where('category', 'like', '%Hardware%')->first();
        if ($hardwareSkill) {
            $items = $hardwareSkill->items;
            $names = array_column($items, 'name');
            if (! in_array('ESP32 / BLE', $names, true)) {
                $items[] = ['name' => 'ESP32 / BLE', 'level' => 5];
                $hardwareSkill->update(['items' => $items]);
            }
        }

        // 9. Add or Update KiosKo Cloud Fleet Management Platform
        Project::updateOrCreate(
            ['slug' => 'kiosko-cloud-fleet-management'],
            [
                'title' => 'KiosKo Cloud Fleet Management Platform',
                'badge' => 'IoT & Cloud Fleet',
                'organization' => 'WarrDev Ecosystem',
                'description' => 'Autonomous vendo fleet orchestration and multi-location cloud management platform. Powers solid-state headless BYOD smart vending (printing, carwash, coin changers, and Wi-Fi 6) with optional headed kiosk clients and real-time remote telemetry.',
                'tags' => ['Laravel 12', 'React 19', 'Go', 'WebSockets', 'Docker', 'IoT Fleet', 'Linux'],
                'demo_url' => 'https://kiosko.cloud/',
                'demo_status' => 'live',
                'github_url' => 'https://github.com/warr-dev',
                'github_status' => 'private',
                'featured' => true,
                'sort_order' => 1,
                'media_type' => 'image',
                'media_url' => '/screenshots/kiosko-cloud.png',
                'cover_image' => '/screenshots/kiosko-cloud.png',
                'extra_info' => [
                    'Architecture' => 'Hybrid Cloud & Edge',
                    'Telemetry' => 'Real-time WebSockets',
                    'Clients' => 'Headless BYOD & Kiosk',
                ],
            ]
        );

        // 10. Add or Update Palitayo Barter Auction Platform
        Project::updateOrCreate(
            ['slug' => 'palitayo-barter-auction-platform'],
            [
                'title' => 'Palitayo Barter & Trade Marketplace',
                'badge' => 'Full-Stack Marketplace',
                'organization' => 'WarrDev',
                'description' => 'Item-for-item barter auction and cashless trade marketplace. Features an interactive item vault, real-time barter bidding negotiations, verified trading tiers, and automated trade escrow workflows.',
                'tags' => ['Laravel 12', 'React 19', 'Inertia.js v2', 'Tailwind v4', 'PostgreSQL', 'WebSockets'],
                'demo_url' => 'https://palitayo.online/',
                'demo_status' => 'live',
                'github_url' => 'https://github.com/warr-dev',
                'github_status' => 'private',
                'featured' => true,
                'sort_order' => 2,
                'media_type' => 'image',
                'media_url' => '/screenshots/palitayo-online.png',
                'cover_image' => '/screenshots/palitayo-online.png',
                'extra_info' => [
                    'Model' => 'Cashless Barter',
                    'Engine' => 'Vault & Trade Escrow',
                    'Stack' => 'Inertia v2 + React 19',
                ],
            ]
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Safe no-op
    }
};
