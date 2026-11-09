import React from 'react';
import { 
    Download, 
    ExternalLink, 
    ArrowDown, 
    Mail, 
    Terminal, 
    Globe, 
    FileText, 
    Sparkles, 
    Cpu, 
    Layers, 
    ShieldCheck, 
    Server, 
    Activity 
} from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
    );
}

const ACCENT_STYLES = {
    indigo: {
        id: 'indigo',
        label: 'Linear Indigo',
        gradient: 'from-[#5e6ad2] to-[#828fff]',
        textAccent: 'text-[#828fff]',
        bgAccent: 'bg-[#5e6ad2]',
        bgAccentHover: 'hover:bg-[#828fff]',
        bgSubtle: 'bg-[#5e6ad2]/10',
        borderAccent: 'border-[#5e6ad2]/40',
        glowShadow: 'shadow-[0_0_24px_rgba(94,106,210,0.35)]',
        pingColor: 'bg-[#5e6ad2]',
        badgeBg: 'bg-[#5e6ad2]/10 text-[#828fff] border-[#5e6ad2]/30',
        bentoBorder: 'hover:border-[#5e6ad2]/50',
    },
    emerald: {
        id: 'emerald',
        label: 'DevOps Emerald',
        gradient: 'from-[#10b981] to-[#34d399]',
        textAccent: 'text-[#34d399]',
        bgAccent: 'bg-[#10b981]',
        bgAccentHover: 'hover:bg-[#34d399]',
        bgSubtle: 'bg-[#10b981]/10',
        borderAccent: 'border-[#10b981]/40',
        glowShadow: 'shadow-[0_0_24px_rgba(16,185,129,0.35)]',
        pingColor: 'bg-[#10b981]',
        badgeBg: 'bg-[#10b981]/10 text-[#34d399] border-[#10b981]/30',
        bentoBorder: 'hover:border-[#10b981]/50',
    },
    cyan: {
        id: 'cyan',
        label: 'Cyberpunk Cyan',
        gradient: 'from-[#06b6d4] to-[#22d3ee]',
        textAccent: 'text-[#22d3ee]',
        bgAccent: 'bg-[#06b6d4]',
        bgAccentHover: 'hover:bg-[#22d3ee]',
        bgSubtle: 'bg-[#06b6d4]/10',
        borderAccent: 'border-[#06b6d4]/40',
        glowShadow: 'shadow-[0_0_24px_rgba(6,182,212,0.35)]',
        pingColor: 'bg-[#06b6d4]',
        badgeBg: 'bg-[#06b6d4]/10 text-[#22d3ee] border-[#06b6d4]/30',
        bentoBorder: 'hover:border-[#06b6d4]/50',
    },
    violet: {
        id: 'violet',
        label: 'Ultra Violet',
        gradient: 'from-[#8b5cf6] to-[#a78bfa]',
        textAccent: 'text-[#a78bfa]',
        bgAccent: 'bg-[#8b5cf6]',
        bgAccentHover: 'hover:bg-[#a78bfa]',
        bgSubtle: 'bg-[#8b5cf6]/10',
        borderAccent: 'border-[#8b5cf6]/40',
        glowShadow: 'shadow-[0_0_24px_rgba(139,92,246,0.35)]',
        pingColor: 'bg-[#8b5cf6]',
        badgeBg: 'bg-[#8b5cf6]/10 text-[#a78bfa] border-[#8b5cf6]/30',
        bentoBorder: 'hover:border-[#8b5cf6]/50',
    },
    amber: {
        id: 'amber',
        label: 'Warm Amber',
        gradient: 'from-[#f59e0b] to-[#fbbf24]',
        textAccent: 'text-[#fbbf24]',
        bgAccent: 'bg-[#f59e0b]',
        bgAccentHover: 'hover:bg-[#fbbf24]',
        bgSubtle: 'bg-[#f59e0b]/10',
        borderAccent: 'border-[#f59e0b]/40',
        glowShadow: 'shadow-[0_0_24px_rgba(245,158,11,0.35)]',
        pingColor: 'bg-[#f59e0b]',
        badgeBg: 'bg-[#f59e0b]/10 text-[#fbbf24] border-[#f59e0b]/30',
        bentoBorder: 'hover:border-[#f59e0b]/50',
    },
};

function renderActionIcon(iconName, className = "w-4 h-4") {
    switch (iconName) {
        case 'Download':
            return <Download className={className} />;
        case 'ExternalLink':
            return <ExternalLink className={className} />;
        case 'ArrowDown':
            return <ArrowDown className={className} />;
        case 'Mail':
            return <Mail className={className} />;
        case 'Github':
            return <GithubIcon className={className} />;
        case 'Terminal':
            return <Terminal className={className} />;
        case 'Globe':
            return <Globe className={className} />;
        case 'FileText':
            return <FileText className={className} />;
        case 'Sparkles':
            return <Sparkles className={className} />;
        case 'Cpu':
            return <Cpu className={className} />;
        case 'Layers':
            return <Layers className={className} />;
        case 'Server':
            return <Server className={className} />;
        default:
            return null;
    }
}

function ActionItem({ action, accentStyle }) {
    const isButton = action.type === 'button';
    const variant = action.variant || (isButton ? 'primary' : 'ghost');

    const isDownload = Boolean(action.download === true || action.download === 'true' || action.download === 1 || action.download === '1');
    const isExternal = Boolean(action.is_external === true || action.is_external === 'true' || action.is_external === 1 || action.is_external === '1');

    let baseClass = "inline-flex items-center gap-2 rounded-md text-xs font-medium transition-all active:scale-95";

    if (variant === 'primary') {
        baseClass += ` ${accentStyle.bgAccent} ${accentStyle.bgAccentHover} text-white px-4 py-2 font-medium ${accentStyle.glowShadow}`;
    } else if (variant === 'secondary') {
        baseClass += ` bg-[#141516] hover:bg-[#1a1b1e] text-[#d0d6e0] hover:text-[#f7f8f8] border border-[#23252a] hover:border-[#383a42] px-4 py-2`;
    } else if (variant === 'outline') {
        baseClass += ` bg-transparent text-[#d0d6e0] hover:text-white border ${accentStyle.borderAccent} hover:bg-[#141516] px-3.5 py-2`;
    } else {
        // ghost / link
        baseClass += ` bg-transparent hover:bg-[#0f1011] text-[#8a8f98] hover:text-[#f7f8f8] border border-transparent hover:border-[#23252a] px-3.5 py-2 font-mono`;
    }

    const iconElement = renderActionIcon(action.icon, "w-3.5 h-3.5");

    // Extract filename from URL if downloading (e.g. Warren_Dalawampu_CV_2026.pdf)
    const downloadFilename = isDownload && action.url 
        ? (action.url.split('/').pop().split('?')[0] || true) 
        : undefined;

    return (
        <a
            href={action.url}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            download={downloadFilename}
            className={baseClass}
        >
            {iconElement}
            <span>{action.label}</span>
        </a>
    );
}

export default function Hero({ recruiterData }) {
    const layout = recruiterData?.heroLayout || 'layout4';
    const accentKey = recruiterData?.heroDesignAccent || 'indigo';
    const accentStyle = ACCENT_STYLES[accentKey] || ACCENT_STYLES.indigo;

    const name = recruiterData?.hero_name || recruiterData?.name || 'Warren Dalawampu';
    const title = recruiterData?.hero_title || recruiterData?.title || 'Senior Backend Developer & DevOps / Infrastructure Engineer';
    const subtitle = recruiterData?.hero_subtitle || recruiterData?.subtitle || 'Distributed Systems, High Concurrency & Edge Hardware Integrations';
    const caption = recruiterData?.hero_caption || recruiterData?.caption || recruiterData?.bio || '6+ years engineering high-concurrency gaming backends, localized OS-to-hardware casino engines, low-level C++ device drivers, payment gateways, and Linux/Docker/Kubernetes infrastructure across Laravel, Node.js, and cloud environments.';
    const statusBadge = recruiterData?.hero_status_badge || recruiterData?.statusBadge || 'Open to Senior Backend & DevOps / Infrastructure Roles';
    const location = recruiterData?.hero_location || recruiterData?.location || 'Sta Maria, Naujan, Oriental Mindoro, Philippines';

    // Actions fallback if not configured
    const actions = Array.isArray(recruiterData?.heroActions) && recruiterData.heroActions.length > 0
        ? recruiterData.heroActions
        : [
            {
                id: 1,
                type: 'button',
                label: `Download ${recruiterData?.activeCvLabel || 'Curriculum Vitae (PDF)'}`,
                url: recruiterData?.activeCvUrl || '/Warren_Dalawampu_CV_2026.pdf',
                variant: 'primary',
                icon: 'Download',
                download: true,
                is_external: false,
            },
            {
                id: 2,
                type: 'button',
                label: 'Explore Featured Projects',
                url: '#projects',
                variant: 'secondary',
                icon: 'ArrowDown',
                download: false,
                is_external: false,
            },
            {
                id: 3,
                type: 'link',
                label: 'github.com/warr-dev',
                url: recruiterData?.github || 'https://github.com/warr-dev',
                variant: 'ghost',
                icon: 'ExternalLink',
                download: false,
                is_external: true,
            },
            {
                id: 4,
                type: 'link',
                label: 'LinkedIn Profile',
                url: recruiterData?.linkedin || 'https://linkedin.com/in/warrdev',
                variant: 'ghost',
                icon: 'ExternalLink',
                download: false,
                is_external: true,
            },
        ];

    // ==========================================
    // LAYOUT 1: Minimalist Linear (Classic)
    // ==========================================
    if (layout === 'layout1') {
        return (
            <section className="space-y-6 pt-4 animate-in fade-in duration-300">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f1011] border border-[#23252a] text-xs font-mono text-[#d0d6e0]">
                        <span className={`w-1.5 h-1.5 rounded-full ${accentStyle.pingColor} animate-pulse`} />
                        <span>{statusBadge}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141516] border border-[#23252a] text-xs font-mono text-[#8a8f98]">
                        <span>📍 {location}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#f7f8f8] leading-[1.08]">
                        {name}
                    </h1>
                    <p className="text-xl sm:text-2xl text-[#d0d6e0] font-light tracking-tight">
                        {title}
                    </p>
                    {subtitle && (
                        <p className={`text-xs sm:text-sm font-mono tracking-wider uppercase ${accentStyle.textAccent}`}>
                            // {subtitle}
                        </p>
                    )}
                </div>

                <p className="text-base sm:text-lg text-[#8a8f98] max-w-2xl leading-relaxed">
                    {caption}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                    {actions.map((action, idx) => (
                        <ActionItem key={action.id || idx} action={action} accentStyle={accentStyle} />
                    ))}
                </div>
            </section>
        );
    }

    // ==========================================
    // LAYOUT 2: Centered Impact (SaaS & Showcase)
    // ==========================================
    if (layout === 'layout2') {
        return (
            <section className="relative pt-6 pb-4 text-center max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
                {/* Ambient Radial Backdrop Glow */}
                <div className={`absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none ${accentStyle.bgAccent}`} />

                <div className="flex flex-wrap items-center justify-center gap-2 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f1011] border border-[#23252a] text-xs font-mono text-[#d0d6e0]">
                        <span className={`w-2 h-2 rounded-full ${accentStyle.pingColor} animate-pulse`} />
                        <span>{statusBadge}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141516] border border-[#23252a] text-xs font-mono text-[#8a8f98]">
                        <span>📍 {location}</span>
                    </div>
                </div>

                <div className="space-y-3 relative z-10">
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f7f8f8]">
                        {name}
                    </h1>
                    <p className={`text-2xl sm:text-3xl font-medium tracking-tight bg-gradient-to-r ${accentStyle.gradient} bg-clip-text text-transparent`}>
                        {title}
                    </p>
                    {subtitle && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141516]/80 border border-[#23252a] text-xs font-mono text-[#8a8f98]">
                            <span>⚡</span>
                            <span>{subtitle}</span>
                        </div>
                    )}
                </div>

                <p className="text-base sm:text-lg text-[#8a8f98] max-w-2xl mx-auto leading-relaxed relative z-10">
                    {caption}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-3 relative z-10">
                    {actions.map((action, idx) => (
                        <ActionItem key={action.id || idx} action={action} accentStyle={accentStyle} />
                    ))}
                </div>
            </section>
        );
    }

    // ==========================================
    // LAYOUT 3: Split Terminal Showcase (DevOps)
    // ==========================================
    if (layout === 'layout3') {
        return (
            <section className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
                {/* Left Column: Profile Content */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f1011] border border-[#23252a] text-xs font-mono text-[#d0d6e0]">
                            <span className={`w-1.5 h-1.5 rounded-full ${accentStyle.pingColor} animate-pulse`} />
                            <span>{statusBadge}</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141516] border border-[#23252a] text-xs font-mono text-[#8a8f98]">
                            <span>📍 {location}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#f7f8f8]">
                            {name}
                        </h1>
                        <p className={`text-xl sm:text-2xl font-light tracking-tight ${accentStyle.textAccent}`}>
                            {title}
                        </p>
                        {subtitle && (
                            <p className="text-xs font-mono text-[#8a8f98]">
                                &gt; {subtitle}
                            </p>
                        )}
                    </div>

                    <p className="text-base text-[#8a8f98] leading-relaxed">
                        {caption}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        {actions.map((action, idx) => (
                            <ActionItem key={action.id || idx} action={action} accentStyle={accentStyle} />
                        ))}
                    </div>
                </div>

                {/* Right Column: Live Mock Shell / Systems Telemetry */}
                <div className="lg:col-span-5">
                    <div className="bg-[#0b0c0e] border border-[#23252a] rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
                        {/* Terminal Window Header */}
                        <div className="bg-[#141516] px-4 py-2.5 border-b border-[#23252a] flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            </div>
                            <span className="text-[11px] text-[#8a8f98]">warr@devops-cluster:~</span>
                            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        </div>

                        {/* Terminal Body */}
                        <div className="p-4 space-y-2 text-[#d0d6e0] leading-relaxed">
                            <div className="text-[#8a8f98]"># Active Telemetry Stream</div>
                            <p><span className="text-[#5e6ad2]">➜</span> <span className="text-emerald-400">host:</span> warrdev.site</p>
                            <p><span className="text-[#5e6ad2]">➜</span> <span className="text-emerald-400">role:</span> DevOps & Backend Architect</p>
                            <p><span className="text-[#5e6ad2]">➜</span> <span className="text-emerald-400">core_stack:</span> [K8s, Docker, Laravel, C++]</p>
                            <p><span className="text-[#5e6ad2]">➜</span> <span className="text-emerald-400">iot_fleets:</span> 100+ Autonomous Vendo Kiosks</p>
                            <p><span className="text-[#5e6ad2]">➜</span> <span className="text-emerald-400">system_uptime:</span> 99.98% Healthy</p>
                            <p><span className="text-[#5e6ad2]">➜</span> <span className="text-emerald-400">status:</span> <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">READY_FOR_DEPLOY</span></p>
                            <div className="pt-2 flex items-center gap-1 text-[#8a8f98]">
                                <span>warr@cluster:~$</span>
                                <span className={`w-2 h-4 ${accentStyle.pingColor} inline-block animate-pulse`} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // ==========================================
    // LAYOUT 4: Bento Modern Showcase / Accent Grid (Default)
    // ==========================================
    return (
        <section className="pt-4 animate-in fade-in duration-300">
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#121316]/95 via-[#0e0f11]/95 to-[#090a0b]/98 border border-[#23252a] p-6 sm:p-9 shadow-2xl backdrop-blur-xl ${accentStyle.bentoBorder} transition-colors`}>
                {/* Radial Glow Highlight */}
                <div className={`absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${accentStyle.bgAccent}`} />

                <div className="relative z-10 space-y-6">
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f1011] border border-[#23252a] text-xs font-mono text-[#d0d6e0]">
                                <span className={`w-2 h-2 rounded-full ${accentStyle.pingColor} animate-pulse`} />
                                <span>{statusBadge}</span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141516] border border-[#23252a] text-xs font-mono text-[#8a8f98]">
                                <span>📍 {location}</span>
                            </div>
                        </div>

                        {recruiterData?.heroBadgeSecondaryEnabled && recruiterData?.heroBadgeSecondary && (
                            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141516] border border-[#23252a] text-[11px] font-mono text-[#8a8f98]">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                <span>{recruiterData.heroBadgeSecondary}</span>
                            </div>
                        )}
                    </div>

                    {/* Main Title & Bio */}
                    <div className="space-y-3">
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f7f8f8] leading-[1.06]">
                            {name}
                        </h1>
                        <p className={`text-xl sm:text-3xl font-semibold tracking-tight bg-gradient-to-r ${accentStyle.gradient} bg-clip-text text-transparent`}>
                            {title}
                        </p>
                        {subtitle && (
                            <p className="text-xs sm:text-sm font-mono text-[#8a8f98] tracking-wide">
                                <span className={accentStyle.textAccent}>&gt;</span> [ {subtitle} ]
                            </p>
                        )}
                    </div>

                    <p className="text-base sm:text-lg text-[#8a8f98] max-w-2xl leading-relaxed">
                        {caption}
                    </p>

                    {/* Interactive Action Hub */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        {actions.map((action, idx) => (
                            <ActionItem key={action.id || idx} action={action} accentStyle={accentStyle} />
                        ))}
                    </div>

                    {/* Bottom Mini-Bento Stat Rail */}
                    <div className="pt-6 border-t border-[#1c1d22] grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        <div className="bg-[#121316]/70 border border-[#202127] rounded-xl p-3 sm:p-4">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8f98]">Experience</span>
                            <p className="text-base sm:text-lg font-semibold text-[#f7f8f8] mt-0.5">
                                {recruiterData?.yearsExperience || '6+ Years'}
                            </p>
                            <span className="text-[11px] text-[#8a8f98]">Production Ready</span>
                        </div>
                        <div className="bg-[#121316]/70 border border-[#202127] rounded-xl p-3 sm:p-4">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8f98]">Autonomous Fleets</span>
                            <p className="text-base sm:text-lg font-semibold text-[#f7f8f8] mt-0.5">
                                KiosKo & IoT
                            </p>
                            <span className="text-[11px] text-[#8a8f98]">Edge to Cloud</span>
                        </div>
                        <div className="bg-[#121316]/70 border border-[#202127] rounded-xl p-3 sm:p-4">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8f98]">Core Infra</span>
                            <p className="text-base sm:text-lg font-semibold text-[#f7f8f8] mt-0.5">
                                K8s · Docker
                            </p>
                            <span className="text-[11px] text-[#8a8f98]">CI/CD Automated</span>
                        </div>
                        <div className="bg-[#121316]/70 border border-[#202127] rounded-xl p-3 sm:p-4">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8f98]">System Uptime</span>
                            <p className="text-base sm:text-lg font-semibold text-[#f7f8f8] mt-0.5 text-emerald-400">
                                99.98%
                            </p>
                            <span className="text-[11px] text-[#8a8f98]">Zero-Downtime</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
