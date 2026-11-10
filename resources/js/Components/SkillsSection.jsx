import React, { useState, useEffect } from 'react';
import { Layers, Star, CheckCircle2, Boxes, Cpu, Info } from 'lucide-react';

const DEFAULT_CATEGORIZED_SKILLS = [
    {
        id: 'production-experience',
        category: 'Production experience',
        subtitle: 'Commercial & enterprise systems delivered over 6+ years in production',
        badge: 'Commercial / 6+ Yrs',
        accent: 'emerald',
        icon: CheckCircle2,
        description: 'Battle-tested daily in high-concurrency commercial platforms, real-money transactions, and live customer traffic.',
        items: [
            'PHP',
            'Laravel',
            'Node.js',
            'MySQL',
            'MongoDB',
            'Linux',
            'Docker',
            'Git',
            'REST APIs',
            'CI/CD',
        ],
    },
    {
        id: 'infrastructure-projects',
        category: 'Hands-on infrastructure projects',
        subtitle: 'Bare-metal homelab clusters, multi-node runtimes & automated IaC',
        badge: 'Infrastructure & Homelab',
        accent: 'sky',
        icon: Boxes,
        description: 'Engineered in bare-metal homelab clusters, custom Linux kernels, and automated IaC. Kept under project experience for genuine technical credibility.',
        items: [
            'Kubernetes',
            'Terraform',
            'Ansible',
            'GCP',
            'Calico',
            'containerd',
            'GitLab CI',
            'WireGuard',
        ],
    },
    {
        id: 'systems-hardware',
        category: 'Systems & hardware engineering',
        subtitle: 'Physical I/O device drivers, serial protocols & embedded microcontrollers',
        badge: 'Hardware & Low-Level',
        accent: 'purple',
        icon: Cpu,
        description: 'Engineered for physical gaming kiosks, autonomous vending machines, cash/ticket acceptor peripherals, thermal printers, and real-time serial protocols.',
        items: [
            'C++',
            'Ubuntu',
            'Serial Communication',
            'WebSockets',
            'ESP32',
            'Raspberry Pi',
            'Hardware Drivers',
        ],
    },
];

export default function SkillsSection({ skills = [], categorizedSkills = null, initialViewMode = 'categorized' }) {
    const [viewMode, setViewMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('portfolio_skills_view_mode');
            if (saved === 'categorized' || saved === 'stars') {
                return saved;
            }
        }
        return initialViewMode || 'categorized';
    });

    const handleViewChange = (mode) => {
        setViewMode(mode);
        if (typeof window !== 'undefined') {
            localStorage.setItem('portfolio_skills_view_mode', mode);
        }
    };

    // Use backend-provided categorized skills or fallback default
    const experienceCategories = (Array.isArray(categorizedSkills) && categorizedSkills.length > 0)
        ? categorizedSkills.map((cat, idx) => ({
              ...DEFAULT_CATEGORIZED_SKILLS[idx],
              ...cat,
              icon: idx === 0 ? CheckCircle2 : idx === 1 ? Boxes : Cpu,
              accent: idx === 0 ? 'emerald' : idx === 1 ? 'sky' : 'purple',
          }))
        : DEFAULT_CATEGORIZED_SKILLS;

    const accentStyles = {
        emerald: {
            border: 'border-[#23252a] hover:border-emerald-500/40',
            topLine: 'from-emerald-500/80 via-emerald-400/40 to-transparent',
            badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
            icon: 'text-emerald-400',
            dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]',
            itemHover: 'hover:border-emerald-500/35 hover:bg-[#121614]',
        },
        sky: {
            border: 'border-[#23252a] hover:border-sky-500/40',
            topLine: 'from-sky-500/80 via-sky-400/40 to-transparent',
            badge: 'bg-sky-500/10 text-sky-400 border-sky-500/25',
            icon: 'text-sky-400',
            dot: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]',
            itemHover: 'hover:border-sky-500/35 hover:bg-[#101418]',
        },
        purple: {
            border: 'border-[#23252a] hover:border-purple-500/40',
            topLine: 'from-purple-500/80 via-purple-400/40 to-transparent',
            badge: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
            icon: 'text-purple-400',
            dot: 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.5)]',
            itemHover: 'hover:border-purple-500/35 hover:bg-[#151218]',
        },
    };

    return (
        <section id="skills" className="space-y-8">
            {/* Header with Title and Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#23252a] pb-5 gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <h2 className="text-lg font-semibold tracking-tight text-[#f7f8f8]">Technical Arsenal</h2>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#141518] text-[#a1a7b4] border border-[#2a2d34]">
                            {viewMode === 'categorized' ? 'Experience Tiered' : 'Skill Level Rated'}
                        </span>
                    </div>
                    <p className="text-xs text-[#8a8f98]">
                        {viewMode === 'categorized'
                            ? 'Credible breakdown by real-world context: commercial production, infrastructure projects & low-level hardware'
                            : 'Comprehensive competencies extracted from 6+ years production development'}
                    </p>
                </div>

                {/* View Mode Switcher Pill */}
                <div
                    role="tablist"
                    aria-label="Technical Arsenal Display Mode"
                    className="inline-flex items-center bg-[#0d0e10] p-1 rounded-xl border border-[#23252a] shadow-inner font-mono text-xs self-start sm:self-auto shrink-0"
                >
                    <button
                        type="button"
                        role="tab"
                        aria-selected={viewMode === 'categorized'}
                        onClick={() => handleViewChange('categorized')}
                        className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                            viewMode === 'categorized'
                                ? 'bg-[#1a1c22] text-[#f7f8f8] border border-[#383b42] shadow-sm'
                                : 'text-[#7e8490] hover:text-[#d0d6e0] border border-transparent'
                        }`}
                        title="Categorized by real-world experience (Production, Infrastructure Projects, Hardware)"
                    >
                        <Layers className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Categorized</span>
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={viewMode === 'stars'}
                        onClick={() => handleViewChange('stars')}
                        className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                            viewMode === 'stars'
                                ? 'bg-[#1a1c22] text-[#f7f8f8] border border-[#383b42] shadow-sm'
                                : 'text-[#7e8490] hover:text-[#d0d6e0] border border-transparent'
                        }`}
                        title="Detailed domain view with 1-5 star ratings"
                    >
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        <span>Star Ratings</span>
                    </button>
                </div>
            </div>

            {/* VIEW 1: CATEGORIZED BY EXPERIENCE LEVEL (RECOMMENDED DEFAULT) */}
            {viewMode === 'categorized' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {experienceCategories.map((group) => {
                            const style = accentStyles[group.accent] || accentStyles.emerald;
                            const IconComponent = group.icon || CheckCircle2;

                            return (
                                <div
                                    key={group.id}
                                    className={`relative flex flex-col justify-between p-5 rounded-2xl bg-[#0c0d10] border ${style.border} transition-all duration-200 shadow-sm overflow-hidden group`}
                                >
                                    {/* Top Accent Gradient Line */}
                                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${style.topLine}`} />

                                    <div className="space-y-4">
                                        {/* Card Header */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-lg bg-[#14161b] border border-[#23252a] flex items-center justify-center">
                                                        <IconComponent className={`w-3.5 h-3.5 ${style.icon}`} />
                                                    </div>
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border ${style.badge}`}>
                                                        {group.badge}
                                                    </span>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-semibold text-[#f7f8f8] tracking-tight">
                                                    {group.category}
                                                </h3>
                                                <p className="text-[11px] text-[#8a8f98] font-mono mt-1 leading-snug">
                                                    {group.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Badges List */}
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {group.items && group.items.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#111216] border border-[#23252a] ${style.itemHover} text-xs font-mono text-[#d0d6e0] transition-all duration-150 shadow-sm`}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
                                                    <span className="font-medium text-[#f7f8f8]">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer Context / Description */}
                                    {group.description && (
                                        <div className="mt-5 pt-3 border-t border-[#1a1c22]">
                                            <p className="text-[10px] text-[#62666d] font-mono leading-relaxed">
                                                {group.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Credibility Note Callout */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0c0d10] border border-[#23252a] text-xs font-mono text-[#8a8f98]">
                        <Info className="w-4 h-4 text-[#5e6ad2] shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <span className="text-[#f7f8f8] font-medium block">
                                Transparent Technical Arsenal Standard
                            </span>
                            <p className="text-[11px] text-[#717680] leading-relaxed">
                                Experience is categorized by verified real-world context rather than subjective 5-star ratings. Technologies like Kubernetes and Terraform are kept under project and infrastructure lab experience to reflect genuine operational boundaries, providing credible technical transparency.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* VIEW 2: STAR RATINGS VIEW (BY DOMAIN) */}
            {viewMode === 'stars' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skillGroup) => (
                            <div key={skillGroup.id} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#62666d]">
                                        {skillGroup.category}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items && skillGroup.items.map((item, idx) => {
                                        const name = typeof item === 'string' ? item : (item?.name || '');
                                        const level = typeof item === 'object' && item?.level ? Number(item.level) : 5;

                                        return (
                                            <div
                                                key={idx}
                                                className="group inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0f1011] hover:bg-[#141516] border border-[#23252a] hover:border-[#383b42] text-xs font-mono text-[#d0d6e0] transition-all duration-200 shadow-sm"
                                            >
                                                <span className="font-medium text-[#f7f8f8]">{name}</span>
                                                <div className="inline-flex items-center gap-0.5" title={`${level}/5 stars`}>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <svg
                                                            key={star}
                                                            className={`w-2.5 h-2.5 ${
                                                                star <= level
                                                                    ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.3)]'
                                                                    : 'text-[#2e3138] fill-[#23252a]'
                                                            }`}
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-3 rounded-lg bg-[#0c0d10] border border-[#23252a] text-center font-mono text-[11px] text-[#62666d]">
                        <span>Viewing domain competency with star ratings · Switch to </span>
                        <button
                            type="button"
                            onClick={() => handleViewChange('categorized')}
                            className="text-emerald-400 hover:underline font-semibold cursor-pointer"
                        >
                            Categorized Experience Mode
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
