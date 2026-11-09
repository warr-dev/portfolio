<?php

namespace Database\Seeders;

use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Projects
        $projects = [
            [
                'title' => 'Casino Gaming Kiosk Hardware Bridge',
                'slug' => 'casino-kiosk-hardware-bridge',
                'badge' => 'Hardware / IoT',
                'organization' => 'NTT Project',
                'description' => 'Architected a localized casino gaming engine from the base Ubuntu OS up: authored proprietary C++ device drivers for bill/ticket acceptors, thermal printers, buttons, and LEDs, bridged via a local high-throughput WebSocket server consumed by an Electron client.',
                'tags' => ['C++', 'WebSockets', 'Electron', 'Ubuntu Server', 'Driver Dev', 'GitLab'],
                'demo_url' => null,
                'github_url' => 'https://github.com/warr-dev',
                'featured' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Autoffiliate AI Syndication Studio',
                'slug' => 'autoffiliate-ai-syndication',
                'badge' => 'SaaS Platform',
                'organization' => 'WarrDev',
                'description' => 'Autonomous multi-channel affiliate marketing and video compilation engine. Features automated video rendering via FFmpeg, distributed queue workers, AI copy generation, and social media scheduling APIs.',
                'tags' => ['Laravel 12', 'React 19', 'Redis', 'FFmpeg', 'Tailwind CSS', 'Docker'],
                'demo_url' => null,
                'github_url' => 'https://github.com/warr-dev',
                'featured' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Kiosko Smart Vending Ecosystem',
                'slug' => 'kiosko-smart-vending',
                'badge' => 'IoT Ecosystem',
                'organization' => 'WarrDev',
                'description' => 'Ecosystem of smart vending products (Pabarya, Pahugas, Painternet, Print-Vendo) featuring captive portal network accounting, hardware coin/bill pulse listeners, and real-time cloud telemetry synchronization.',
                'tags' => ['Go', 'Tailwind', 'WebSockets', 'SQLite', 'IoT', 'Linux'],
                'demo_url' => null,
                'github_url' => 'https://github.com/warr-dev',
                'featured' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Trash2Cash Recycling Marketplace',
                'slug' => 'trash2cash-recycling-marketplace',
                'badge' => 'Full-Stack Platform',
                'organization' => 'WarrDev',
                'description' => 'Digital waste exchange and community recycling marketplace facilitating real-time material valuations, audited collection schedules, and integrated digital wallet rewards.',
                'tags' => ['Laravel 12', 'React 19', 'Tailwind v4', 'PostgreSQL', 'REST API'],
                'demo_url' => null,
                'github_url' => 'https://github.com/warr-dev',
                'featured' => true,
                'sort_order' => 4,
            ],
            [
                'title' => 'KiosKo Cloud Fleet Management Platform',
                'slug' => 'kiosko-cloud-fleet-management',
                'badge' => 'IoT & Cloud Fleet',
                'organization' => 'WarrDev Ecosystem',
                'description' => 'Autonomous vendo fleet orchestration and multi-location cloud management platform. Powers solid-state headless BYOD smart vending (printing, carwash, coin changers, and Wi-Fi 6) with optional headed kiosk clients and real-time remote telemetry.',
                'tags' => ['Laravel 12', 'React 19', 'Go', 'WebSockets', 'Docker', 'IoT Fleet', 'Linux'],
                'demo_url' => 'https://kiosko.cloud/',
                'github_url' => 'https://github.com/warr-dev',
                'featured' => true,
                'sort_order' => 5,
            ],
            [
                'title' => 'Palitayo Barter & Trade Marketplace',
                'slug' => 'palitayo-barter-auction-platform',
                'badge' => 'Full-Stack Marketplace',
                'organization' => 'WarrDev',
                'description' => 'Item-for-item barter auction and cashless trade marketplace. Features an interactive item vault, real-time barter bidding negotiations, verified trading tiers, and automated trade escrow workflows.',
                'tags' => ['Laravel 12', 'React 19', 'Inertia.js v2', 'Tailwind v4', 'PostgreSQL', 'WebSockets'],
                'demo_url' => 'https://palitayo.online/',
                'github_url' => 'https://github.com/warr-dev',
                'featured' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(['slug' => $project['slug']], $project);
        }

        // 2. Seed Experiences
        $experiences = [
            [
                'role' => 'Senior Backend Developer',
                'company' => 'NTT Limited Philippines Branch',
                'location' => 'Philippines (Remote / Hybrid)',
                'period' => 'Aug 2024 — Present',
                'is_current' => true,
                'bullet_points' => [
                    'Architected backend services for an enterprise online casino gaming platform, integrating secure third-party payment providers including Xendit and UnionBank.',
                    'Independently developed a localized casino hybrid platform for physical gaming terminals on LAN Ubuntu servers, architecting Layer-2 MAC-address terminal recognition to power accountless walk-in player sessions.',
                    'Authored native C++ hardware drivers for gaming terminal peripherals (bill/ticket acceptors, ticket printers, buttons, LEDs) and custom serial communication touchscreen drivers for target Ubuntu kiosk hardware.',
                    'Packaged and adapted platform games for a licensed Malta gaming OS with local game server sync, transitioning services from microservices to monolith architecture when project direction evolved.',
                    'Mentored and supervised junior developers during architectural planning, code reviews, and containerized deployment workflows via GitLab CI/CD.',
                ],
                'technologies' => ['PHP', 'Laravel', 'C++', 'WebSockets', 'Electron', 'Ubuntu Server', 'Serial Drivers', 'Xendit', 'UnionBank', 'GitLab CI'],
                'sort_order' => 1,
            ],
            [
                'role' => 'Configuration Analyst',
                'company' => 'Eclaro',
                'location' => 'Quezon City, National Capital Region, Philippines',
                'period' => 'Feb 2024 — Aug 2024 (7 mos)',
                'is_current' => false,
                'bullet_points' => [
                    'Worked on configuring a highly customizable SaaS platform for insurance claims processing, translating business requirements into system configurations tailored to specific client workflows.',
                    'Used MongoDB aggregation pipelines and spreadsheet-like functions to implement data processing logic and configurable business rules.',
                    'Collaborated with multinational teams to analyze requirements, implement configurations, document changes, and perform testing to ensure accuracy and reliability.',
                    'Used Jira for project tracking and Confluence for technical documentation and collaboration.',
                ],
                'technologies' => ['MongoDB', 'SaaS Workflows', 'Jira', 'Confluence', 'Aggregation Pipelines', 'Enterprise Testing'],
                'sort_order' => 2,
            ],
            [
                'role' => 'PHP Backend Developer',
                'company' => '1 Bit Software Development Corp',
                'location' => 'Philippines',
                'period' => 'Apr 2023 — Feb 2024 (11 mos)',
                'is_current' => false,
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
                'sort_order' => 3,
            ],
            [
                'role' => 'Junior backend developer',
                'company' => 'MVSoftech Inc',
                'location' => 'Philippines',
                'period' => 'Oct 2020 — Apr 2023 (2 yrs 7 mos)',
                'is_current' => false,
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
                'sort_order' => 4,
            ],
            [
                'role' => 'MIS personnel',
                'company' => 'Mindoro State College of Agriculture and Technology - Calapan City',
                'location' => 'Calapan, Philippines',
                'period' => 'Jul 2019 — Oct 2020 (1 yr 4 mos)',
                'is_current' => false,
                'bullet_points' => [
                    'Handled IT operations and technical support for the university, including computer laboratory maintenance, hardware and software troubleshooting, and campus network configuration and maintenance.',
                    'Assisted employees with technical issues and supported day-to-day IT operations.',
                    'Developed a campus enrollment system using an MVC-based PHP framework and assisted in facilitating and supporting student enrollment processes.',
                ],
                'technologies' => ['PHP MVC', 'Networking', 'Hardware Troubleshooting', 'Campus Infrastructure'],
                'sort_order' => 5,
            ],
        ];

        foreach ($experiences as $exp) {
            Experience::create($exp);
        }

        // 3. Seed Skills
        $skills = [
            [
                'category' => 'Backend & APIs',
                'level' => 'Expert',
                'items' => ['PHP (8.0 — 8.5)', 'Laravel 7-12', 'Node.js', 'C# (.NET API)', 'RESTful APIs', 'Microservices', 'TDD', 'WebSockets', 'DCAT Admin'],
                'sort_order' => 1,
            ],
            [
                'category' => 'Databases & Streaming',
                'level' => 'Advanced',
                'items' => ['MySQL', 'MongoDB', 'Redis', 'Memcached', 'RabbitMQ', 'Protobuf Serialization', 'SQLite'],
                'sort_order' => 2,
            ],
            [
                'category' => 'DevOps & Cloud Infra',
                'level' => 'Advanced',
                'items' => ['Linux (Ubuntu/Debian)', 'Docker', 'Kubernetes', 'Terraform', 'GitLab CI / Actions', 'Nginx & Reverse Proxies', 'Cloudflare Tunnels', 'WireGuard VPN', 'Devcontainer', 'Portainer'],
                'sort_order' => 3,
            ],
            [
                'category' => 'Hardware, IoT & Low-Level',
                'level' => 'Specialist',
                'items' => ['C++ Drivers', 'Bill / Ticket Acceptors', 'Thermal Printers', 'LED / Button Controllers', 'Microcontrollers', 'Barcode Kiosks', 'ESP32 / BLE'],
                'sort_order' => 4,
            ],
            [
                'category' => 'Frontend & Client',
                'level' => 'Intermediate',
                'items' => ['ReactJS 19', 'Inertia.js v2', 'Electron Desktop', 'Tailwind CSS', 'TypeScript', 'Vite'],
                'sort_order' => 5,
            ],
            [
                'category' => 'Integrations & Scripting',
                'level' => 'Advanced',
                'items' => ['Xendit Payments', 'UnionBank API', 'Telegram Bot API', 'Python Scripting', 'Bash Shell', 'Itexmo SMS'],
                'sort_order' => 6,
            ],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
}
