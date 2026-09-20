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
        ];

        foreach ($projects as $project) {
            Project::create($project);
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
                    'Independently developed a localized casino system running on a LAN Ubuntu server from scratch, building from base OS up through C++ hardware drivers to an Electron client app.',
                    'Authored native C++ drivers for casino gaming terminal hardware (bill/ticket acceptors, printers, buttons, LEDs) utilizing proprietary vendor libraries and exposed via a WebSocket server.',
                    'Mentored and supervised junior developers during both architectural planning, code reviews, and implementation phases.',
                    'Maintained source control and deployment pipelines via self-hosted GitLab within a containerized dev environment.',
                ],
                'technologies' => ['PHP', 'Laravel', 'C++', 'WebSockets', 'Electron', 'Ubuntu', 'Xendit', 'UnionBank', 'GitLab'],
                'sort_order' => 1,
            ],
            [
                'role' => 'Configuration Analyst',
                'company' => 'EClaro Philippines',
                'location' => 'Philippines',
                'period' => 'Feb 2024 — Aug 2024',
                'is_current' => false,
                'bullet_points' => [
                    'Collaborated with multinational distributed engineering squads across the US, UK, India, Pakistan, and Russia.',
                    'Analyzed complex business requirements and translated them into system configurations for enterprise SaaS insurance claims processing.',
                    'Modeled client-specific claim workflows using MongoDB aggregation pipelines and spreadsheet-like transformation functions.',
                    'Conducted rigorous testing and regression cycles to keep claims processing fully auditable for regulatory compliance.',
                    'Maintained comprehensive documentation in Confluence and sprint tracking in Jira.',
                ],
                'technologies' => ['MongoDB', 'SaaS Workflows', 'Jira', 'Confluence', 'Enterprise Testing'],
                'sort_order' => 2,
            ],
            [
                'role' => 'PHP Developer',
                'company' => '1 Bit Software Development Corp.',
                'location' => 'Philippines',
                'period' => 'Apr 2023 — Feb 2024',
                'is_current' => false,
                'bullet_points' => [
                    'Built and maintained high-throughput RESTful APIs and live game streaming servers using Laravel and Node.js with strict TDD.',
                    'Applied Protobuf serialization and Redis caching to drastically reduce payload sizes and response latency in game backend APIs.',
                    'Leveraged advanced Laravel features: events, observers, jobs, queue workers, scheduler, commands, ORM, and custom middleware.',
                    'Built CI/CD pipelines and automated Telegram bot deployments, containerizing development with Docker to eliminate environment drift.',
                    'Created microservice administration panels via DCAT Admin to monitor and configure live game parameters.',
                ],
                'technologies' => ['PHP', 'Laravel', 'Node.js', 'Redis', 'Protobuf', 'MySQL', 'MongoDB', 'Docker', 'DCAT Admin', 'TDD'],
                'sort_order' => 3,
            ],
            [
                'role' => 'Junior Backend Developer',
                'company' => 'MVSoftech, Inc.',
                'location' => 'Calapan, Philippines',
                'period' => 'Oct 2020 — Apr 2023',
                'is_current' => false,
                'bullet_points' => [
                    'Built barcode-scanner time logging systems integrated with Laravel 7 HRIS and deployed thin-client kiosks on-site.',
                    'Developed Document Management Systems with fillable PDFs and automated processing pipelines.',
                    'Architected and maintained internal infrastructure: Nextcloud, replicated Linux VMs, reverse proxies, local DNS, WireGuard VPNs, and self-hosted GitLab CI/CD runners.',
                    'Developed UISP/UCRM plugins broadcasting SMS alerts via the Itexmo API and built automated directory file monitors in Python.',
                    'Mentored interns and conducted technical infrastructure audits for client platforms.',
                ],
                'technologies' => ['Laravel 7', 'ReactJS', '.NET C#', 'Node.js', 'Nextcloud', 'WireGuard', 'Cloudflare', 'Linux VMs', 'Python'],
                'sort_order' => 4,
            ],
            [
                'role' => 'Management Information System Officer',
                'company' => 'Mindoro State University',
                'location' => 'Calapan, Philippines',
                'period' => 'Jul 2019 — Sep 2020',
                'is_current' => false,
                'bullet_points' => [
                    'Developed campus enrollment management system using an MVC PHP framework to streamline student intake.',
                    'Administered and maintained campus computer laboratories, network routing, and hardware infrastructure.',
                ],
                'technologies' => ['PHP MVC', 'Networking', 'Hardware Maintenance', 'Campus Infrastructure'],
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
                'items' => ['Docker', 'Devcontainer', 'Linux (Ubuntu/Debian)', 'GitLab CI / Actions', 'Nginx & Reverse Proxies', 'Cloudflare Tunnels', 'WireGuard VPN', 'Portainer'],
                'sort_order' => 3,
            ],
            [
                'category' => 'Hardware, IoT & Low-Level',
                'level' => 'Specialist',
                'items' => ['C++ Drivers', 'Bill / Ticket Acceptors', 'Thermal Printers', 'LED / Button Controllers', 'Microcontrollers', 'Barcode Kiosks'],
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
