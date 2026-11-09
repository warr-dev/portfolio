import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import { 
    Save, 
    Upload, 
    AlertCircle, 
    Plus, 
    Trash2, 
    Cpu, 
    Terminal, 
    CircuitBoard, 
    Server, 
    Radio, 
    Wrench, 
    Shield, 
    Database,
    FileText,
    CheckCircle2,
    User,
    Mail,
    Lock,
    Layers,
    Edit2,
    X,
    Globe,
    Image as ImageIcon,
    Sparkles,
    Download,
    ExternalLink,
    ArrowDown,
    Palette,
    Eye,
    Layout
} from 'lucide-react';

const HERO_LAYOUT_OPTIONS = [
    {
        id: 'layout1',
        title: 'Layout 1: Minimalist Linear',
        desc: 'Left-aligned classic Linear aesthetic with sleek action bar & mono tag',
        badge: 'Classic',
    },
    {
        id: 'layout2',
        title: 'Layout 2: Centered Impact',
        desc: 'Symmetric centered presentation with ambient radial glow and prominent CTAs',
        badge: 'Showcase',
    },
    {
        id: 'layout3',
        title: 'Layout 3: Split Terminal',
        desc: 'Two-column grid with live mock devops shell telemetry, server health, and cursor',
        badge: 'DevOps / CLI',
    },
    {
        id: 'layout4',
        title: 'Layout 4: Bento Modern Showcase',
        desc: 'Premium bento card grid with status pills, verified badge, and integrated metrics',
        badge: 'Recommended',
    },
];

const HERO_ACCENT_OPTIONS = [
    { id: 'indigo', label: 'Linear Indigo', color: '#5e6ad2', border: 'border-[#5e6ad2]' },
    { id: 'emerald', label: 'DevOps Emerald', color: '#10b981', border: 'border-[#10b981]' },
    { id: 'cyan', label: 'Cyberpunk Cyan', color: '#06b6d4', border: 'border-[#06b6d4]' },
    { id: 'violet', label: 'Ultra Violet', color: '#8b5cf6', border: 'border-[#8b5cf6]' },
    { id: 'amber', label: 'Warm Amber', color: '#f59e0b', border: 'border-[#f59e0b]' },
];

const HERO_ACTION_ICONS = [
    { value: 'Download', label: 'Download (CV / File)' },
    { value: 'ExternalLink', label: 'External Link' },
    { value: 'ArrowDown', label: 'Arrow Down (Scroll)' },
    { value: 'Mail', label: 'Mail (Contact)' },
    { value: 'Github', label: 'GitHub' },
    { value: 'Terminal', label: 'Terminal / CLI' },
    { value: 'Globe', label: 'Globe / Web' },
    { value: 'FileText', label: 'Document / PDF' },
    { value: 'Sparkles', label: 'Sparkles' },
    { value: 'None', label: 'No Icon' },
];

const ICON_OPTIONS = [
    { value: 'Cpu', label: 'CPU / Hardware', icon: Cpu },
    { value: 'Terminal', label: 'Terminal / Shell', icon: Terminal },
    { value: 'CircuitBoard', label: 'Circuit Board', icon: CircuitBoard },
    { value: 'Server', label: 'Server / Node', icon: Server },
    { value: 'Radio', label: 'Radio / Wireless', icon: Radio },
    { value: 'Shield', label: 'Shield / Security', icon: Shield },
    { value: 'Database', label: 'Database / Storage', icon: Database },
    { value: 'Wrench', label: 'Wrench / Systems', icon: Wrench },
];

export default function Settings({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        name: settings.name || '',
        title: settings.title || '',
        statusBadge: settings.statusBadge || '',
        location: settings.location || '',
        bio: settings.bio || '',
        hero_name: settings.hero_name || settings.name || '',
        hero_title: settings.hero_title || settings.title || '',
        hero_subtitle: settings.hero_subtitle || 'Distributed Systems, High Concurrency & Edge Hardware Integrations',
        hero_caption: settings.hero_caption || settings.bio || '',
        hero_status_badge: settings.hero_status_badge || settings.statusBadge || 'Open to Senior Backend & DevOps / Infrastructure Roles',
        hero_location: settings.hero_location || settings.location || 'Sta Maria, Naujan, Oriental Mindoro, Philippines',
        hero_layout: settings.hero_layout || 'layout4',
        hero_design_accent: settings.hero_design_accent || 'indigo',
        hero_actions: Array.isArray(settings.hero_actions) && settings.hero_actions.length > 0
            ? settings.hero_actions
            : [
                { id: 1, type: 'button', label: 'Download Curriculum Vitae (PDF)', url: '/Warren_Dalawampu_CV_2026.pdf', variant: 'primary', icon: 'Download', download: true, is_external: false },
                { id: 2, type: 'button', label: 'Explore Featured Projects', url: '#projects', variant: 'secondary', icon: 'ArrowDown', download: false, is_external: false },
                { id: 3, type: 'link', label: 'github.com/warr-dev', url: 'https://github.com/warr-dev', variant: 'ghost', icon: 'ExternalLink', download: false, is_external: true },
                { id: 4, type: 'link', label: 'LinkedIn Profile', url: 'https://linkedin.com/in/warrdev', variant: 'ghost', icon: 'ExternalLink', download: false, is_external: true },
            ],
        email: settings.email || '',
        phone: settings.phone || '',
        github: settings.github || '',
        linkedin: settings.linkedin || '',
        linkedin_enabled: settings.linkedin_enabled !== undefined ? settings.linkedin_enabled : true,
        linkedin_company: settings.linkedin_company || 'NTT Limited Philippines',
        linkedin_role: settings.linkedin_role || 'Senior Backend Developer',
        linkedin_work_auth: settings.linkedin_work_auth || 'Remote / B2B / Full-Time',
        linkedin_work_auth_note: settings.linkedin_work_auth_note || 'Open to worldwide contracts',
        careerStartDate: settings.careerStartDate || '2019-07-01',
        cvDisplayMode: settings.cvDisplayMode || 'both',
        activeCv: settings.activeCv || 'comprehensive',
        specializedTitle: settings.specializedTitle || 'Hardware I/O, C++ & Edge Engineering',
        specializedSubtitle: settings.specializedSubtitle || 'Physical to Cloud',
        specializedCapabilities: Array.isArray(settings.specializedCapabilities) ? settings.specializedCapabilities : [],
        seo_title: settings.seo_title || '',
        seo_description: settings.seo_description || '',
        seo_keywords: settings.seo_keywords || '',
        og_image: settings.og_image || '',
        og_image_file: null,
        cv_file: null,
        resume_file: null,
        new_password: '',
    });

    // Compute live dynamic years experience preview
    const calculateDynamicExperience = (startDateStr) => {
        if (!startDateStr) return '0+ Years';
        const start = new Date(startDateStr);
        if (isNaN(start.getTime())) return 'Invalid date';
        const now = new Date();
        let years = now.getFullYear() - start.getFullYear();
        const m = now.getMonth() - start.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < start.getDate())) {
            years--;
        }
        return `${Math.max(1, years)}+ Years`;
    };

    const dynamicExpPreview = calculateDynamicExperience(data.careerStartDate);

    const addHeroAction = () => {
        setData('hero_actions', [
            ...data.hero_actions,
            {
                id: Date.now(),
                type: 'button',
                label: 'New Action',
                url: '#projects',
                variant: 'secondary',
                icon: 'ExternalLink',
                download: false,
                is_external: false,
            },
        ]);
    };

    const removeHeroAction = (index) => {
        const updated = [...data.hero_actions];
        updated.splice(index, 1);
        setData('hero_actions', updated);
    };

    const updateHeroAction = (index, field, value) => {
        const updated = [...data.hero_actions];
        updated[index] = {
            ...updated[index],
            [field]: value,
        };
        setData('hero_actions', updated);
    };

    const addCapability = () => {
        setData('specializedCapabilities', [
            ...data.specializedCapabilities,
            {
                icon: 'Cpu',
                title: '',
                description: '',
            },
        ]);
    };

    const removeCapability = (index) => {
        const updated = [...data.specializedCapabilities];
        updated.splice(index, 1);
        setData('specializedCapabilities', updated);
    };

    const updateCapability = (index, field, value) => {
        const updated = [...data.specializedCapabilities];
        updated[index] = {
            ...updated[index],
            [field]: value,
        };
        setData('specializedCapabilities', updated);
    };

    const [newResumeForm, setNewResumeForm] = useState({
        label: '',
        type: '',
        file: null,
    });
    const [uploadingResume, setUploadingResume] = useState(false);
    const [resumeUploadError, setResumeUploadError] = useState(null);

    const handleUploadResume = (e) => {
        e.preventDefault();
        if (!newResumeForm.label.trim()) {
            setResumeUploadError('Resume label is required.');
            return;
        }
        if (!newResumeForm.file) {
            setResumeUploadError('Please select a PDF file.');
            return;
        }

        setResumeUploadError(null);
        setUploadingResume(true);

        const formData = new FormData();
        formData.append('label', newResumeForm.label);
        formData.append('type', newResumeForm.type || 'Custom CV');
        formData.append('file', newResumeForm.file);

        router.post('/admin/settings/resumes', formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setNewResumeForm({ label: '', type: '', file: null });
                setUploadingResume(false);
                // Reset file input value
                const fileInput = document.getElementById('new-resume-file-input');
                if (fileInput) fileInput.value = '';
            },
            onError: (errs) => {
                setUploadingResume(false);
                setResumeUploadError(Object.values(errs)[0] || 'Failed to upload resume.');
            },
        });
    };

    const handleSelectActiveResume = (cvId) => {
        setData('activeCv', cvId);
        router.post('/admin/settings/resumes/active', { activeCv: cvId }, {
            preserveScroll: true,
        });
    };

    const handleDeleteResume = (cvId, cvLabel) => {
        if (!confirm(`Are you sure you want to delete '${cvLabel}'?`)) {
            return;
        }
        router.delete(`/admin/settings/resumes/${cvId}`, {
            preserveScroll: true,
        });
    };

    const [editingResume, setEditingResume] = useState(null);
    const [editResumeForm, setEditResumeForm] = useState({
        label: '',
        type: '',
        file: null,
    });
    const [updatingResume, setUpdatingResume] = useState(false);
    const [editResumeError, setEditResumeError] = useState(null);

    const handleStartEditResume = (cv) => {
        setEditingResume(cv);
        setEditResumeForm({
            label: cv.label || '',
            type: cv.type || '',
            file: null,
        });
        setEditResumeError(null);
    };

    const handleCancelEdit = () => {
        setEditingResume(null);
        setEditResumeForm({ label: '', type: '', file: null });
        setEditResumeError(null);
    };

    const handleUpdateResume = (e) => {
        e.preventDefault();
        if (!editingResume) return;
        if (!editResumeForm.label.trim()) {
            setEditResumeError('Resume label is required.');
            return;
        }

        setEditResumeError(null);
        setUpdatingResume(true);

        const formData = new FormData();
        formData.append('label', editResumeForm.label);
        formData.append('type', editResumeForm.type || 'Custom CV');
        if (editResumeForm.file) {
            formData.append('file', editResumeForm.file);
        }

        router.post(`/admin/settings/resumes/${editingResume.id}`, formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setUpdatingResume(false);
                setEditingResume(null);
            },
            onError: (errs) => {
                setUpdatingResume(false);
                setEditResumeError(Object.values(errs)[0] || 'Failed to update resume.');
            },
        });
    };

    const [activeTab, setActiveTab] = useState('hero'); // default to 'hero'

    const SUBMODULE_TABS = [
        { id: 'hero', label: 'Hero Section & Layout', icon: Sparkles, badge: (data.hero_layout || 'layout4').toUpperCase() },
        { id: 'cv', label: 'CV & Resume Manager', icon: FileText, badge: `${settings.availableCvs?.length || 0} Available` },
        { id: 'profile', label: 'Core Profile & Bio', icon: User },
        { id: 'contact', label: 'Contact & Socials', icon: Mail },
        { id: 'capabilities', label: 'Specialized Capabilities', icon: Layers, badge: data.specializedCapabilities?.length > 0 ? `${data.specializedCapabilities.length}` : null },
        { id: 'seo', label: 'SEO & Social Graph', icon: Globe },
        { id: 'security', label: 'Security & Auth', icon: Lock },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/settings', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Site & Profile Settings">
            <div className="space-y-6">
                {/* Submodule Tab Bar */}
                <div className="bg-[#0f1011] border border-[#23252a] p-1.5 rounded-xl flex items-center gap-1.5 overflow-x-auto scrollbar-none shadow-lg">
                    {SUBMODULE_TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isCurrent = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                                    isCurrent
                                        ? 'bg-[#141516] text-[#f7f8f8] border border-[#34343a] shadow-[0_0_12px_rgba(94,106,210,0.15)] font-semibold'
                                        : 'text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#141516]/50 border border-transparent'
                                }`}
                            >
                                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#5e6ad2]' : 'text-[#8a8f98]'}`} />
                                <span>{tab.label}</span>
                                {tab.badge && (
                                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                        isCurrent 
                                            ? 'bg-[#5e6ad2]/20 text-[#5e6ad2] border border-[#5e6ad2]/30'
                                            : 'bg-[#1f2024] text-[#8a8f98]'
                                    }`}>
                                        {tab.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="bg-[#0f1011] border border-[#23252a] rounded-xl p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Submodule 00: Hero Section Design & Layout */}
                    {activeTab === 'hero' && (
                        <div className="space-y-8 animate-in fade-in duration-200">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#23252a] pb-3">
                                <div>
                                    <h2 className="text-xs font-mono uppercase tracking-wider text-[#5e6ad2]">
                                        00 / Hero Section Design, Content & Layout
                                    </h2>
                                    <p className="text-xs text-[#8a8f98] mt-0.5">
                                        Customize your headline, subtitle, bio caption, interactive button actions, and select your preferred presentation layout.
                                    </p>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5e6ad2]/10 text-[#828fff] border border-[#5e6ad2]/30">
                                    Current: {(data.hero_layout || 'layout4').toUpperCase()}
                                </span>
                            </div>

                            {/* 1. Layout Selector */}
                            <div className="space-y-3">
                                <label className="text-xs font-mono text-[#d0d6e0] flex items-center gap-1.5">
                                    <Layout className="w-3.5 h-3.5 text-[#5e6ad2]" />
                                    <span>Select Hero Presentation Layout</span>
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {HERO_LAYOUT_OPTIONS.map((layoutOpt) => {
                                        const isSelected = (data.hero_layout || 'layout4') === layoutOpt.id;
                                        return (
                                            <button
                                                key={layoutOpt.id}
                                                type="button"
                                                onClick={() => setData('hero_layout', layoutOpt.id)}
                                                className={`text-left p-4 rounded-xl border transition-all relative flex flex-col justify-between ${
                                                    isSelected
                                                        ? 'bg-[#15161c] border-[#5e6ad2] shadow-[0_0_16px_rgba(94,106,210,0.25)] ring-1 ring-[#5e6ad2]/40'
                                                        : 'bg-[#141516] border-[#23252a] hover:border-[#383a42] hover:bg-[#18191c]'
                                                }`}
                                            >
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-semibold text-[#f7f8f8]">
                                                            {layoutOpt.title}
                                                        </span>
                                                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                                                            layoutOpt.badge === 'Recommended'
                                                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                                                : 'bg-[#23252a] text-[#8a8f98]'
                                                        }`}>
                                                            {layoutOpt.badge}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-[#8a8f98] leading-relaxed">
                                                        {layoutOpt.desc}
                                                    </p>
                                                </div>

                                                <div className="mt-3 pt-2 border-t border-[#23252a]/60 flex items-center justify-between text-[10px] font-mono">
                                                    <span className={isSelected ? 'text-[#828fff] font-bold' : 'text-[#62666d]'}>
                                                        {isSelected ? '● ACTIVE' : '○ SELECT'}
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 2. Design Accent Color Picker */}
                            <div className="space-y-3">
                                <label className="text-xs font-mono text-[#d0d6e0] flex items-center gap-1.5">
                                    <Palette className="w-3.5 h-3.5 text-[#5e6ad2]" />
                                    <span>Design Color Accent & Glow</span>
                                </label>
                                <div className="flex flex-wrap items-center gap-2">
                                    {HERO_ACCENT_OPTIONS.map((acc) => {
                                        const isSelected = (data.hero_design_accent || 'indigo') === acc.id;
                                        return (
                                            <button
                                                key={acc.id}
                                                type="button"
                                                onClick={() => setData('hero_design_accent', acc.id)}
                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                                                    isSelected
                                                        ? 'bg-[#15161c] border-[#f7f8f8] text-[#f7f8f8] shadow-md font-semibold'
                                                        : 'bg-[#141516] border-[#23252a] text-[#8a8f98] hover:text-[#f7f8f8] hover:border-[#383a42]'
                                                }`}
                                            >
                                                <span
                                                    className="w-2.5 h-2.5 rounded-full shadow-sm"
                                                    style={{ backgroundColor: acc.color }}
                                                />
                                                <span>{acc.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 3. Hero Content Fields */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-mono uppercase tracking-wider text-[#d0d6e0]">
                                    Hero Content & Copy
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-mono text-[#8a8f98]">Author / Display Name</label>
                                        <input
                                            type="text"
                                            value={data.hero_name}
                                            onChange={(e) => {
                                                setData('hero_name', e.target.value);
                                                setData('name', e.target.value);
                                            }}
                                            placeholder="e.g. Warren Dalawampu"
                                            className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                            required
                                        />
                                        {errors.hero_name && <p className="text-[11px] text-rose-400 font-mono">{errors.hero_name}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-mono text-[#8a8f98]">Primary Title / Headline</label>
                                        <input
                                            type="text"
                                            value={data.hero_title}
                                            onChange={(e) => {
                                                setData('hero_title', e.target.value);
                                                setData('title', e.target.value);
                                            }}
                                            placeholder="e.g. Senior Backend Developer & DevOps / Infrastructure Engineer"
                                            className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                            required
                                        />
                                        {errors.hero_title && <p className="text-[11px] text-rose-400 font-mono">{errors.hero_title}</p>}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Subtitle / Domain Focus Tag</label>
                                    <input
                                        type="text"
                                        value={data.hero_subtitle}
                                        onChange={(e) => setData('hero_subtitle', e.target.value)}
                                        placeholder="e.g. Distributed Systems, High Concurrency & Edge Hardware Integrations"
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                    />
                                    {errors.hero_subtitle && <p className="text-[11px] text-rose-400 font-mono">{errors.hero_subtitle}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-mono text-[#8a8f98]">Caption / Bio Intro Summary</label>
                                        <span className="text-[10px] font-mono text-[#62666d]">
                                            {data.hero_caption?.length || 0} / 2500 chars
                                        </span>
                                    </div>
                                    <textarea
                                        rows={3}
                                        value={data.hero_caption}
                                        onChange={(e) => {
                                            setData('hero_caption', e.target.value);
                                            setData('bio', e.target.value);
                                        }}
                                        placeholder="Brief descriptive paragraph explaining your core focus, accomplishments, and tech stack."
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors leading-relaxed"
                                    />
                                    {errors.hero_caption && <p className="text-[11px] text-rose-400 font-mono">{errors.hero_caption}</p>}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-mono text-[#8a8f98]">Status Badge</label>
                                        <input
                                            type="text"
                                            value={data.hero_status_badge}
                                            onChange={(e) => {
                                                setData('hero_status_badge', e.target.value);
                                                setData('statusBadge', e.target.value);
                                            }}
                                            placeholder="e.g. Open to Senior Backend & DevOps / Infrastructure Roles"
                                            className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-mono text-[#8a8f98]">Location</label>
                                        <input
                                            type="text"
                                            value={data.hero_location}
                                            onChange={(e) => {
                                                setData('hero_location', e.target.value);
                                                setData('location', e.target.value);
                                            }}
                                            placeholder="e.g. Sta Maria, Naujan, Oriental Mindoro, Philippines"
                                            className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 4. Hero Actions (Buttons & Links) Builder */}
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center justify-between border-b border-[#23252a] pb-2">
                                    <div>
                                        <h3 className="text-xs font-mono uppercase tracking-wider text-[#d0d6e0]">
                                            Hero Actions (Buttons & Links)
                                        </h3>
                                        <p className="text-[11px] text-[#8a8f98]">
                                            Configure primary and secondary CTA buttons, file download triggers, or external profile links.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addHeroAction}
                                        className="bg-[#141516] hover:bg-[#1c1d22] border border-[#23252a] hover:border-[#5e6ad2] text-[#f7f8f8] text-xs font-mono px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 active:scale-95"
                                    >
                                        <Plus className="w-3.5 h-3.5 text-[#5e6ad2]" />
                                        <span>Add Action</span>
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {data.hero_actions?.map((action, index) => (
                                        <div
                                            key={action.id || index}
                                            className="bg-[#141516] border border-[#23252a] rounded-xl p-4 space-y-3 transition-all hover:border-[#34353f]"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1e2025] text-[#8a8f98]">
                                                        #{index + 1}
                                                    </span>
                                                    <span className="text-xs font-semibold text-[#f7f8f8]">
                                                        {action.label || 'Unnamed Action'}
                                                    </span>
                                                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                                                        action.type === 'button' 
                                                            ? 'bg-[#5e6ad2]/20 text-[#828fff]' 
                                                            : 'bg-[#23252a] text-[#8a8f98]'
                                                    }`}>
                                                        {action.type}
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeHeroAction(index)}
                                                    className="text-[#8a8f98] hover:text-rose-400 p-1 rounded hover:bg-[#1f2024] transition-colors"
                                                    title="Delete Action"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-mono text-[#8a8f98]">Type</label>
                                                    <select
                                                        value={action.type}
                                                        onChange={(e) => updateHeroAction(index, 'type', e.target.value)}
                                                        className="w-full bg-[#0f1011] border border-[#23252a] rounded-md px-2.5 py-1.5 text-xs text-[#f7f8f8] focus:outline-none"
                                                    >
                                                        <option value="button">Interactive Button</option>
                                                        <option value="link">Text / External Link</option>
                                                    </select>
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-mono text-[#8a8f98]">Action Label</label>
                                                    <input
                                                        type="text"
                                                        value={action.label}
                                                        onChange={(e) => updateHeroAction(index, 'label', e.target.value)}
                                                        placeholder="e.g. Download CV"
                                                        className="w-full bg-[#0f1011] border border-[#23252a] rounded-md px-2.5 py-1.5 text-xs text-[#f7f8f8] focus:outline-none"
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-mono text-[#8a8f98]">Target URL / Path</label>
                                                    <input
                                                        type="text"
                                                        value={action.url}
                                                        onChange={(e) => updateHeroAction(index, 'url', e.target.value)}
                                                        placeholder="e.g. /cv.pdf, #projects, https://..."
                                                        className="w-full bg-[#0f1011] border border-[#23252a] rounded-md px-2.5 py-1.5 text-xs text-[#f7f8f8] focus:outline-none font-mono"
                                                        required
                                                    />
                                                </div>

                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-mono text-[#8a8f98]">Style Variant</label>
                                                    <select
                                                        value={action.variant || 'secondary'}
                                                        onChange={(e) => updateHeroAction(index, 'variant', e.target.value)}
                                                        className="w-full bg-[#0f1011] border border-[#23252a] rounded-md px-2.5 py-1.5 text-xs text-[#f7f8f8] focus:outline-none"
                                                    >
                                                        <option value="primary">Primary (Glow Fill)</option>
                                                        <option value="secondary">Secondary (Dark Fill)</option>
                                                        <option value="outline">Outline (Border Glow)</option>
                                                        <option value="ghost">Ghost (Subtle Link)</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-mono text-[#8a8f98]">Icon</label>
                                                    <select
                                                        value={action.icon || 'None'}
                                                        onChange={(e) => updateHeroAction(index, 'icon', e.target.value)}
                                                        className="w-full bg-[#0f1011] border border-[#23252a] rounded-md px-2.5 py-1.5 text-xs text-[#f7f8f8] focus:outline-none"
                                                    >
                                                        {HERO_ACTION_ICONS.map((ico) => (
                                                            <option key={ico.value} value={ico.value}>{ico.label}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="flex items-center gap-2 pt-4">
                                                    <input
                                                        type="checkbox"
                                                        id={`action-download-${index}`}
                                                        checked={Boolean(action.download)}
                                                        onChange={(e) => updateHeroAction(index, 'download', e.target.checked)}
                                                        className="rounded bg-[#0f1011] border-[#23252a] text-[#5e6ad2] focus:ring-0"
                                                    />
                                                    <label htmlFor={`action-download-${index}`} className="text-xs text-[#d0d6e0] font-mono">
                                                        Trigger File Download
                                                    </label>
                                                </div>

                                                <div className="flex items-center gap-2 pt-4">
                                                    <input
                                                        type="checkbox"
                                                        id={`action-external-${index}`}
                                                        checked={Boolean(action.is_external)}
                                                        onChange={(e) => updateHeroAction(index, 'is_external', e.target.checked)}
                                                        className="rounded bg-[#0f1011] border-[#23252a] text-[#5e6ad2] focus:ring-0"
                                                    />
                                                    <label htmlFor={`action-external-${index}`} className="text-xs text-[#d0d6e0] font-mono">
                                                        Open In New Tab
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {(!data.hero_actions || data.hero_actions.length === 0) && (
                                        <div className="text-center py-6 border border-dashed border-[#23252a] rounded-xl text-xs text-[#8a8f98] font-mono">
                                            No hero actions configured. Click "Add Action" above.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 5. Live Preview Card */}
                            <div className="space-y-3 pt-4 border-t border-[#23252a]">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-mono text-[#d0d6e0] flex items-center gap-1.5">
                                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                                        <span>Live Hero Settings Preview</span>
                                    </label>
                                    <span className="text-[10px] font-mono text-[#8a8f98]">
                                        Previewing: {data.hero_layout?.toUpperCase() || 'LAYOUT4'} with {data.hero_design_accent?.toUpperCase() || 'INDIGO'} accent
                                    </span>
                                </div>

                                <div className="p-6 rounded-2xl bg-[#090a0c] border border-[#23252a] space-y-4">
                                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                                        <span className="px-2.5 py-0.5 rounded-full bg-[#141516] border border-[#23252a] text-[#d0d6e0] flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            {data.hero_status_badge || 'Status badge'}
                                        </span>
                                        <span className="px-2.5 py-0.5 rounded-full bg-[#141516] border border-[#23252a] text-[#8a8f98]">
                                            📍 {data.hero_location || 'Location'}
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        <h4 className="text-2xl sm:text-3xl font-bold text-[#f7f8f8]">
                                            {data.hero_name || 'Your Name'}
                                        </h4>
                                        <p className="text-base sm:text-lg font-medium text-[#828fff]">
                                            {data.hero_title || 'Your Professional Title'}
                                        </p>
                                        {data.hero_subtitle && (
                                            <p className="text-xs font-mono text-[#8a8f98]">
                                                &gt; [ {data.hero_subtitle} ]
                                            </p>
                                        )}
                                    </div>

                                    <p className="text-xs sm:text-sm text-[#8a8f98] leading-relaxed max-w-2xl">
                                        {data.hero_caption || 'Hero bio caption text will render here.'}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-2 pt-2">
                                        {data.hero_actions?.map((act, i) => (
                                            <span
                                                key={i}
                                                className={`text-xs px-3 py-1.5 rounded-md font-medium inline-flex items-center gap-1.5 ${
                                                    act.variant === 'primary'
                                                        ? 'bg-[#5e6ad2] text-white shadow-md'
                                                        : 'bg-[#141516] border border-[#23252a] text-[#d0d6e0]'
                                                }`}
                                            >
                                                {act.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submodule 01: Core Profile Data */}
                    {activeTab === 'profile' && (
                        <div className="space-y-4 animate-in fade-in duration-200">
                            <h2 className="text-xs font-mono uppercase tracking-wider text-[#5e6ad2] border-b border-[#23252a] pb-2">
                                01 / Core Profile Data
                            </h2>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Full Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        required
                                    />
                                    {errors.name && <p className="text-[11px] text-rose-400 font-mono">{errors.name}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-mono text-[#8a8f98]">Career Starting Date</label>
                                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                                            ⚡ Calculated: {dynamicExpPreview}
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        value={data.careerStartDate}
                                        onChange={(e) => setData('careerStartDate', e.target.value)}
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        required
                                    />
                                    <span className="text-[10px] font-mono text-[#62666d] block">
                                        Years of experience automatically increments every year from this baseline.
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-mono text-[#8a8f98]">Professional Headline / Role Title</label>
                                <input
                                    type="text"
                                    data-testid="settings-title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                    required
                                />
                                {errors.title && <p className="text-[11px] text-rose-400 font-mono">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Status / Availability Pill</label>
                                    <input
                                        type="text"
                                        data-testid="settings-status-badge"
                                        value={data.statusBadge}
                                        onChange={(e) => setData('statusBadge', e.target.value)}
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Location Coordinates</label>
                                    <input
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-mono text-[#8a8f98]">Hero Biography</label>
                                <textarea
                                    rows={3}
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors resize-none"
                                    required
                                />
                                {errors.bio && <p className="text-[11px] text-rose-400 font-mono">{errors.bio}</p>}
                            </div>
                        </div>
                    )}

                    {/* Submodule 02: Contact & Socials */}
                    {activeTab === 'contact' && (
                        <div className="space-y-4 animate-in fade-in duration-200">
                            <h2 className="text-xs font-mono uppercase tracking-wider text-[#5e6ad2] border-b border-[#23252a] pb-2">
                                02 / Contact & Socials
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Phone</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">GitHub URL</label>
                                    <input
                                        type="url"
                                        value={data.github}
                                        onChange={(e) => setData('github', e.target.value)}
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            {/* LinkedIn Section Detailed Configuration */}
                            <div className="bg-[#141516] border border-[#23252a] rounded-lg p-4 sm:p-5 space-y-4">
                                <div className="flex items-center justify-between border-b border-[#23252a] pb-3">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold text-[#f7f8f8]">LinkedIn Profile & Network Card</span>
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0a66c2]/15 text-[#0a66c2] border border-[#0a66c2]/30">
                                                Configurable Section
                                            </span>
                                        </div>
                                        <span className="text-[11px] text-[#8a8f98] block mt-0.5">
                                            Customize the copy, current engagement, and work authorization displayed in the dedicated LinkedIn section.
                                        </span>
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-[#8a8f98] hover:text-[#f7f8f8]">
                                        <input
                                            type="checkbox"
                                            checked={data.linkedin_enabled}
                                            onChange={(e) => setData('linkedin_enabled', e.target.checked)}
                                            className="w-4 h-4 rounded border-[#23252a] bg-[#0f1011] text-[#0a66c2] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                                        />
                                        <span>Show LinkedIn Section</span>
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5 sm:col-span-2">
                                        <label className="text-xs font-mono text-[#0a66c2]">LinkedIn Profile URL</label>
                                        <input
                                            type="url"
                                            value={data.linkedin}
                                            onChange={(e) => setData('linkedin', e.target.value)}
                                            placeholder="https://linkedin.com/in/warrdev"
                                            className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#0a66c2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        />
                                        <span className="text-[10px] font-mono text-[#62666d] block">
                                            URL used for the "Connect on LinkedIn" and "View Profile" actions.
                                        </span>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-mono text-[#8a8f98]">Current Engagement (Company)</label>
                                        <input
                                            type="text"
                                            value={data.linkedin_company}
                                            onChange={(e) => setData('linkedin_company', e.target.value)}
                                            placeholder="NTT Limited Philippines"
                                            className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-mono text-[#8a8f98]">Current Role / Subtitle</label>
                                        <input
                                            type="text"
                                            value={data.linkedin_role}
                                            onChange={(e) => setData('linkedin_role', e.target.value)}
                                            placeholder="Senior Backend Developer"
                                            className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-mono text-[#8a8f98]">Work Authorization</label>
                                        <input
                                            type="text"
                                            value={data.linkedin_work_auth}
                                            onChange={(e) => setData('linkedin_work_auth', e.target.value)}
                                            placeholder="Remote / B2B / Full-Time"
                                            className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-mono text-[#8a8f98]">Work Authorization Note</label>
                                        <input
                                            type="text"
                                            value={data.linkedin_work_auth_note}
                                            onChange={(e) => setData('linkedin_work_auth_note', e.target.value)}
                                            placeholder="Open to worldwide contracts"
                                            className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submodule 03: Specialized Capabilities */}
                    {activeTab === 'capabilities' && (
                        <div className="space-y-4 animate-in fade-in duration-200">
                            <div className="flex items-center justify-between border-b border-[#23252a] pb-2">
                                <div>
                                    <h2 className="text-xs font-mono uppercase tracking-wider text-[#5e6ad2]">
                                        03 / Specialized Capabilities (Hardware / C++ / Systems)
                                    </h2>
                                    <span className="text-[11px] text-[#8a8f98] block mt-0.5">
                                        Dynamic capability cards rendered on portfolio. If 0 entries are configured, the entire section and its navigation links are automatically hidden.
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={addCapability}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#141516] hover:bg-[#1f2024] border border-[#23252a] hover:border-[#5e6ad2] text-xs font-mono text-[#d0d6e0] transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5 text-[#5e6ad2]" />
                                    <span>Add Capability</span>
                                </button>
                            </div>

                            {/* Section Header Controls */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#141516] border border-[#23252a] p-4 rounded-lg">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Section Heading Title</label>
                                    <input
                                        type="text"
                                        value={data.specializedTitle}
                                        onChange={(e) => setData('specializedTitle', e.target.value)}
                                        placeholder="Hardware I/O, C++ & Edge Engineering"
                                        className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-1.5 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Section Subtitle / Tag</label>
                                    <input
                                        type="text"
                                        value={data.specializedSubtitle}
                                        onChange={(e) => setData('specializedSubtitle', e.target.value)}
                                        placeholder="Physical to Cloud"
                                        className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-1.5 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Dynamic Capability Cards */}
                            {data.specializedCapabilities.length === 0 ? (
                                <div className="bg-[#141516]/50 border border-dashed border-[#23252a] rounded-lg p-6 text-center space-y-2">
                                    <p className="text-xs text-[#8a8f98]">
                                        No specialized capabilities configured. The Specialized Capability section is currently <strong className="text-rose-400 font-mono">HIDDEN</strong> on the public portfolio.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={addCapability}
                                        className="inline-flex items-center gap-1.5 text-xs text-[#5e6ad2] hover:text-[#828fff] font-mono hover:underline"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>Add your first capability entry</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {data.specializedCapabilities.map((item, index) => (
                                        <div key={index} className="bg-[#141516] border border-[#23252a] rounded-lg p-4 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-5 h-5 rounded bg-[#23252a] flex items-center justify-center text-[10px] font-mono text-[#8a8f98]">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-xs font-semibold text-[#f7f8f8]">
                                                        {item.title || 'Untitled Capability'}
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeCapability(index)}
                                                    className="text-[#8a8f98] hover:text-rose-400 p-1 rounded hover:bg-[#0f1011] transition-colors"
                                                    title="Delete capability entry"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div className="space-y-1">
                                                    <label className="text-[11px] font-mono text-[#8a8f98]">Icon</label>
                                                    <select
                                                        value={item.icon || 'Cpu'}
                                                        onChange={(e) => updateCapability(index, 'icon', e.target.value)}
                                                        className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-2.5 py-1.5 text-xs text-[#f7f8f8] focus:outline-none transition-colors font-mono"
                                                    >
                                                        {ICON_OPTIONS.map((opt) => (
                                                            <option key={opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="sm:col-span-2 space-y-1">
                                                    <label className="text-[11px] font-mono text-[#8a8f98]">Capability Title</label>
                                                    <input
                                                        type="text"
                                                        value={item.title}
                                                        onChange={(e) => updateCapability(index, 'title', e.target.value)}
                                                        placeholder="e.g. Casino Terminal Hardware Integration"
                                                        className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-1.5 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[11px] font-mono text-[#8a8f98]">Detailed Description</label>
                                                <textarea
                                                    rows={2}
                                                    value={item.description}
                                                    onChange={(e) => updateCapability(index, 'description', e.target.value)}
                                                    placeholder="Explain technical systems, hardware drivers, low-level architecture, or edge protocols..."
                                                    className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-1.5 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Submodule 04: CV & Resume Manager */}
                    {activeTab === 'cv' && (
                        <div className="space-y-5 animate-in fade-in duration-200">
                            <div className="flex items-center justify-between border-b border-[#23252a] pb-2">
                                <div>
                                    <h2 className="text-xs font-mono uppercase tracking-wider text-[#5e6ad2]">
                                        04 / Resume & CV Management Submodule
                                    </h2>
                                    <span className="text-[11px] text-[#8a8f98] block mt-0.5">
                                        Manage your resume repository, pick which one is active on the website, or upload targeted variations.
                                    </span>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5e6ad2]/20 text-[#5e6ad2] border border-[#5e6ad2]/30">
                                    {settings.availableCvs?.length || 0} Available
                                </span>
                            </div>

                            {/* Active Resume Selection Grid */}
                            <div className="bg-[#141516] border border-[#23252a] p-4 sm:p-5 rounded-lg space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-xs font-semibold text-[#f7f8f8] block">
                                            Select Active Resume to Show on Website
                                        </label>
                                        <span className="text-[11px] text-[#8a8f98] block">
                                            Click any card to immediately switch which resume is downloaded on your public portfolio.
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                                    {(settings.availableCvs || []).map((cv) => {
                                        const isActive = (data.activeCv || settings.activeCv) === cv.id;
                                        return (
                                            <div
                                                key={cv.id}
                                                onClick={() => handleSelectActiveResume(cv.id)}
                                                className={`relative cursor-pointer p-4 rounded-lg border transition-all flex flex-col justify-between gap-3 group ${
                                                    isActive
                                                        ? 'bg-[#5e6ad2]/15 border-[#5e6ad2] shadow-[0_0_15px_rgba(94,106,210,0.2)]'
                                                        : 'bg-[#0f1011] border-[#23252a] hover:border-[#383b42]'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-1.5">
                                                            <FileText className={`w-3.5 h-3.5 ${isActive ? 'text-[#5e6ad2]' : 'text-[#8a8f98]'}`} />
                                                            <span className="text-xs font-medium text-[#f7f8f8] block truncate max-w-[170px]">
                                                                {cv.label}
                                                            </span>
                                                        </div>
                                                        <span className="text-[10px] font-mono text-[#5e6ad2] block">
                                                            {cv.type || 'Custom Resume'}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-1.5">
                                                        <input
                                                            type="radio"
                                                            name="activeCv"
                                                            checked={isActive}
                                                            onChange={() => handleSelectActiveResume(cv.id)}
                                                            className="accent-[#5e6ad2] cursor-pointer"
                                                            title="Set as active public resume"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between border-t border-[#23252a]/70 pt-2.5 text-[10px] font-mono text-[#62666d]">
                                                    <span className="truncate max-w-[110px]" title={cv.filename}>
                                                        {cv.filename}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <a
                                                            href={cv.url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-[#5e6ad2] hover:text-[#828fff] hover:underline"
                                                        >
                                                            Preview ↗
                                                        </a>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleStartEditResume(cv);
                                                            }}
                                                            className="text-[#8a8f98] hover:text-[#5e6ad2] p-0.5 rounded transition-colors"
                                                            title="Edit resume details"
                                                        >
                                                            <Edit2 className="w-3 h-3" />
                                                        </button>
                                                        {/* Allow deleting custom resumes */}
                                                        {cv.id !== 'comprehensive' && cv.id !== 'ats_resume' && (
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDeleteResume(cv.id, cv.label);
                                                                }}
                                                                className="text-rose-400 hover:text-rose-300 p-0.5 rounded transition-colors"
                                                                title="Delete resume"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Edit Resume Modal / Inline Sub-Panel */}
                            {editingResume && (
                                <div className="bg-[#181a1f] border border-[#5e6ad2]/50 p-4 sm:p-5 rounded-lg space-y-3.5 shadow-xl animate-in fade-in duration-150">
                                    <div className="flex items-center justify-between border-b border-[#2d3142] pb-2">
                                        <div className="flex items-center gap-2">
                                            <Edit2 className="w-4 h-4 text-[#5e6ad2]" />
                                            <h3 className="text-xs font-semibold text-[#f7f8f8]">
                                                Edit Resume: <span className="text-[#5e6ad2]">{editingResume.label}</span>
                                            </h3>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleCancelEdit}
                                            className="text-[#8a8f98] hover:text-[#f7f8f8] p-1 rounded transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {editResumeError && (
                                        <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
                                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                            <span>{editResumeError}</span>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                                        <div className="sm:col-span-4 space-y-1">
                                            <label className="text-[11px] font-mono text-[#8a8f98]">Resume Label / Name</label>
                                            <input
                                                type="text"
                                                value={editResumeForm.label}
                                                onChange={(e) => setEditResumeForm({ ...editResumeForm, label: e.target.value })}
                                                className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-1.5 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                                required
                                            />
                                        </div>

                                        <div className="sm:col-span-3 space-y-1">
                                            <label className="text-[11px] font-mono text-[#8a8f98]">Target Focus / Type</label>
                                            <input
                                                type="text"
                                                value={editResumeForm.type}
                                                onChange={(e) => setEditResumeForm({ ...editResumeForm, type: e.target.value })}
                                                className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-1.5 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                            />
                                        </div>

                                        <div className="sm:col-span-3 space-y-1">
                                            <label className="text-[11px] font-mono text-[#8a8f98]">Replace PDF (optional)</label>
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => setEditResumeForm({ ...editResumeForm, file: e.target.files[0] })}
                                                className="w-full text-xs text-[#8a8f98] file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[11px] file:font-mono file:bg-[#1f2024] file:text-[#d0d6e0] hover:file:bg-[#282a30] cursor-pointer"
                                            />
                                        </div>

                                        <div className="sm:col-span-2 flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={handleUpdateResume}
                                                disabled={updatingResume}
                                                className="flex-1 bg-[#5e6ad2] hover:bg-[#828fff] disabled:opacity-50 text-white px-3 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center justify-center gap-1 shadow-[0_0_12px_rgba(94,106,210,0.3)]"
                                            >
                                                <span>{updatingResume ? 'Saving...' : 'Update'}</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancelEdit}
                                                className="px-2.5 py-2 rounded-md border border-[#2d3142] hover:bg-[#23252a] text-xs font-mono text-[#8a8f98] transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Upload & Add New Resume Card */}
                            <div className="bg-[#141516] border border-[#23252a] p-4 sm:p-5 rounded-lg space-y-3.5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Upload className="w-4 h-4 text-[#5e6ad2]" />
                                        <h3 className="text-xs font-semibold text-[#f7f8f8]">
                                            Upload & Add New Resume
                                        </h3>
                                    </div>
                                    <span className="text-[10px] font-mono text-[#8a8f98]">
                                        PDF up to 15MB
                                    </span>
                                </div>

                                {resumeUploadError && (
                                    <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
                                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                        <span>{resumeUploadError}</span>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                                    <div className="sm:col-span-4 space-y-1">
                                        <label className="text-[11px] font-mono text-[#8a8f98]">Resume Label / Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Distributed Systems & C++ CV"
                                            value={newResumeForm.label}
                                            onChange={(e) => setNewResumeForm({ ...newResumeForm, label: e.target.value })}
                                            className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-1.5 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="sm:col-span-3 space-y-1">
                                        <label className="text-[11px] font-mono text-[#8a8f98]">Target Focus / Type</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Backend Focus"
                                            value={newResumeForm.type}
                                            onChange={(e) => setNewResumeForm({ ...newResumeForm, type: e.target.value })}
                                            className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-1.5 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="sm:col-span-3 space-y-1">
                                        <label className="text-[11px] font-mono text-[#8a8f98]">PDF File</label>
                                        <input
                                            id="new-resume-file-input"
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e) => setNewResumeForm({ ...newResumeForm, file: e.target.files[0] })}
                                            className="w-full text-xs text-[#8a8f98] file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[11px] file:font-mono file:bg-[#1f2024] file:text-[#d0d6e0] hover:file:bg-[#282a30] cursor-pointer"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <button
                                            type="button"
                                            onClick={handleUploadResume}
                                            disabled={uploadingResume}
                                            className="w-full bg-[#5e6ad2] hover:bg-[#828fff] disabled:opacity-50 text-white px-3 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(94,106,210,0.3)]"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            <span>{uploadingResume ? 'Saving...' : 'Add Resume'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* CV Display Placement */}
                            <div className="bg-[#141516] border border-[#23252a] p-4 rounded-lg space-y-2">
                                <label className="text-xs font-mono text-[#f7f8f8] block">
                                    Public CV Download Button Placement
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
                                    {[
                                        { value: 'both', title: 'Both Placements', desc: 'Topbar and Hero Section' },
                                        { value: 'topbar_only', title: 'Topbar Only', desc: 'Navbar direct action' },
                                        { value: 'hero_only', title: 'Hero Section Only', desc: 'Primary CTA in Hero' },
                                        { value: 'hidden', title: 'Hidden', desc: 'Recruiter Hub only' },
                                    ].map((option) => (
                                        <button
                                            type="button"
                                            key={option.value}
                                            onClick={() => setData('cvDisplayMode', option.value)}
                                            className={`p-3 rounded-lg border text-left transition-all ${
                                                data.cvDisplayMode === option.value
                                                    ? 'bg-[#5e6ad2]/15 border-[#5e6ad2] text-[#f7f8f8]'
                                                    : 'bg-[#0f1011] border-[#23252a] text-[#8a8f98] hover:border-[#383b42]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium block">{option.title}</span>
                                                {data.cvDisplayMode === option.value && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#5e6ad2]" />
                                                )}
                                            </div>
                                            <span className="text-[10px] font-mono text-[#8a8f98] block mt-1">
                                                {option.desc}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submodule 05: SEO & Social Graph */}
                    {activeTab === 'seo' && (
                        <div className="space-y-5 animate-in fade-in duration-200">
                            <div>
                                <h2 className="text-xs font-mono uppercase tracking-wider text-[#5e6ad2] border-b border-[#23252a] pb-2">
                                    05 / SEO & Social Graph Meta Tags
                                </h2>
                                <span className="text-[11px] text-[#8a8f98] block mt-1">
                                    Configure search engine indexing, OpenGraph cards for LinkedIn/Slack/Twitter, and JSON-LD structured schemas.
                                </span>
                            </div>

                            <div className="bg-[#141516] border border-[#23252a] rounded-lg p-5 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Global Page Title (&lt;title&gt; and og:title)</label>
                                    <input
                                        type="text"
                                        value={data.seo_title}
                                        onChange={(e) => setData('seo_title', e.target.value)}
                                        placeholder="Warren Dalawampu — Senior Backend Developer & Systems Software Engineer"
                                        className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                    />
                                    <span className="text-[10px] font-mono text-[#62666d] block">
                                        Recommended length: 50–60 characters for optimal Google SERP presentation.
                                    </span>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Meta Description (meta description and og:description)</label>
                                    <textarea
                                        rows={3}
                                        value={data.seo_description}
                                        onChange={(e) => setData('seo_description', e.target.value)}
                                        placeholder="Senior Backend & Systems Software Engineer specializing in high-concurrency gaming engines, C++ hardware integrations, low-latency APIs, and distributed systems."
                                        className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors resize-none"
                                    />
                                    <span className="text-[10px] font-mono text-[#62666d] block">
                                        Recommended length: 140–160 characters. Displayed on search results and social share snippets.
                                    </span>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Meta Keywords (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={data.seo_keywords}
                                        onChange={(e) => setData('seo_keywords', e.target.value)}
                                        placeholder="Warren Dalawampu, Senior Backend Developer, Systems Engineer, Laravel, Node.js, C++, Gaming Kiosks, Distributed Systems"
                                        className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* OpenGraph & Social Image */}
                                <div className="border-t border-[#23252a] pt-4 space-y-3">
                                    <label className="text-xs font-semibold text-[#f7f8f8] block">
                                        Social Sharing Image (og:image / Twitter Card Banner)
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                        <div className="space-y-2">
                                            <input
                                                type="url"
                                                value={data.og_image}
                                                onChange={(e) => setData('og_image', e.target.value)}
                                                placeholder="https://example.com/social-preview.png"
                                                className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                            />
                                            <span className="text-[10px] font-mono text-[#62666d] block">
                                                Or upload a direct banner image asset (1200x630px recommended):
                                            </span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setData('og_image_file', e.target.files[0])}
                                                className="w-full text-xs text-[#8a8f98] file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[11px] file:font-mono file:bg-[#1f2024] file:text-[#d0d6e0] hover:file:bg-[#282a30] cursor-pointer"
                                            />
                                        </div>

                                        {data.og_image && (
                                            <div className="rounded-lg border border-[#23252a] bg-[#0f1011] p-2 flex flex-col items-center justify-center overflow-hidden">
                                                <img 
                                                    src={data.og_image} 
                                                    alt="OpenGraph Preview" 
                                                    className="w-full h-32 object-cover rounded-md"
                                                />
                                                <span className="text-[10px] font-mono text-[#62666d] mt-1 truncate max-w-full">
                                                    Current Preview: {data.og_image}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submodule 06: Security & Credentials */}
                    {activeTab === 'security' && (
                        <div className="space-y-4 animate-in fade-in duration-200">
                            <h2 className="text-xs font-mono uppercase tracking-wider text-[#5e6ad2] border-b border-[#23252a] pb-2">
                                06 / Security & Credentials
                            </h2>
                            <div className="space-y-1.5 max-w-sm">
                                <label className="text-xs font-mono text-[#8a8f98]">Change Admin Password (leave blank to keep)</label>
                                <input
                                    type="password"
                                    value={data.new_password}
                                    onChange={(e) => setData('new_password', e.target.value)}
                                    placeholder="New password (min 6 chars)"
                                    className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                />
                                {errors.new_password && <p className="text-[11px] text-rose-400 font-mono">{errors.new_password}</p>}
                            </div>
                        </div>
                    )}

                    <div className="pt-4 border-t border-[#23252a] flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#8a8f98]">
                            Active submodule: <span className="text-[#5e6ad2]">{SUBMODULE_TABS.find(t => t.id === activeTab)?.label}</span>
                        </span>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#5e6ad2] hover:bg-[#828fff] disabled:opacity-50 text-white text-xs font-medium px-6 py-2.5 rounded-md transition-all duration-150 shadow-[0_0_16px_rgba(94,106,210,0.35)] active:scale-95 flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Saving...' : 'Save Settings'}</span>
                        </button>
                    </div>

                </form>
            </div>
            </div>
        </AdminLayout>
    );
}

