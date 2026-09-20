import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
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
    Database 
} from 'lucide-react';

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
        email: settings.email || '',
        phone: settings.phone || '',
        github: settings.github || '',
        linkedin: settings.linkedin || '',
        careerStartDate: settings.careerStartDate || '2019-07-01',
        cvDisplayMode: settings.cvDisplayMode || 'both',
        activeCv: settings.activeCv || 'comprehensive',
        specializedTitle: settings.specializedTitle || 'Hardware I/O, C++ & Edge Engineering',
        specializedSubtitle: settings.specializedSubtitle || 'Physical to Cloud',
        specializedCapabilities: Array.isArray(settings.specializedCapabilities) ? settings.specializedCapabilities : [],
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

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/settings', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Site & Profile Settings">
            <div className="bg-[#0f1011] border border-[#23252a] rounded-xl p-6 sm:p-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Basic Info */}
                    <div className="space-y-4">
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

                    {/* Contact Channels */}
                    <div className="space-y-4 pt-2">
                        <h2 className="text-xs font-mono uppercase tracking-wider text-[#5e6ad2] border-b border-[#23252a] pb-2">
                            02 / Contact & Socials
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

                            <div className="space-y-1.5">
                                <label className="text-xs font-mono text-[#0a66c2]">LinkedIn Profile URL</label>
                                <input
                                    type="url"
                                    value={data.linkedin}
                                    onChange={(e) => setData('linkedin', e.target.value)}
                                    placeholder="https://linkedin.com/in/warr-dev"
                                    className="w-full bg-[#141516] border border-[#23252a] focus:border-[#0a66c2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Specialized Capability Section Manager */}
                    <div className="space-y-4 pt-2">
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

                    {/* CV & Resume Uploads & Visibility Controls */}
                    <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between border-b border-[#23252a] pb-2">
                            <h2 className="text-xs font-mono uppercase tracking-wider text-[#5e6ad2]">
                                04 / Downloadable CV Assets & Visibility
                            </h2>
                            <span className="text-[10px] font-mono text-[#8a8f98]">
                                Controls placement on Topbar and Hero section
                            </span>
                        </div>

                        {/* Active CV Selector (Single CV displayed on portfolio) */}
                        <div className="bg-[#141516] border border-[#23252a] p-4 rounded-lg space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-xs font-mono text-[#f7f8f8] block">
                                        Active Public CV Selection (Single Download)
                                    </label>
                                    <span className="text-[11px] text-[#8a8f98] block">
                                        Choose which CV document is offered when visitors click the download button.
                                    </span>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5e6ad2]/20 text-[#5e6ad2] border border-[#5e6ad2]/30">
                                    Single CV Active
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                {(settings.availableCvs || [
                                    { id: 'comprehensive', label: 'Comprehensive Technical CV (2026)', url: settings.cvPdf, type: 'Full Technical Background', filename: 'Warren_Dalawampu_CV_2026.pdf' },
                                    { id: 'ats_resume', label: 'ATS 1-Page Summary Resume', url: settings.resumePdf, type: 'ATS Standard 1-Page', filename: 'Warren_Dalawampu_Resume.pdf' }
                                ]).map((cv) => (
                                    <div
                                        key={cv.id}
                                        onClick={() => setData('activeCv', cv.id)}
                                        className={`cursor-pointer p-3.5 rounded-lg border transition-all flex flex-col justify-between gap-2.5 ${
                                            data.activeCv === cv.id
                                                ? 'bg-[#5e6ad2]/15 border-[#5e6ad2] text-[#f7f8f8]'
                                                : 'bg-[#0f1011] border-[#23252a] text-[#8a8f98] hover:border-[#383b42]'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <span className="text-xs font-medium block text-[#f7f8f8]">{cv.label}</span>
                                                <span className="text-[10px] font-mono text-[#5e6ad2] block mt-0.5">{cv.type}</span>
                                            </div>
                                            <div className="pt-0.5">
                                                <input
                                                    type="radio"
                                                    name="activeCv"
                                                    checked={data.activeCv === cv.id}
                                                    onChange={() => setData('activeCv', cv.id)}
                                                    className="accent-[#5e6ad2] cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-[#23252a]/60 pt-2 text-[10px] font-mono text-[#62666d]">
                                            <span className="truncate max-w-[180px]">{cv.filename}</span>
                                            <a
                                                href={cv.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-[#5e6ad2] hover:underline"
                                            >
                                                Preview PDF ↗
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CV Display Mode Placement Picker */}
                        <div className="bg-[#141516] border border-[#23252a] p-4 rounded-lg space-y-2">
                            <label className="text-xs font-mono text-[#f7f8f8] block">
                                CV Download Button Display Placement
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2 bg-[#141516] p-4 rounded-lg border border-[#23252a]">
                                <span className="text-xs font-medium text-[#f7f8f8] block">Replace Comprehensive CV (PDF)</span>
                                <span className="text-[11px] font-mono text-[#8a8f98] block">Current: {settings.cvPdf}</span>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setData('cv_file', e.target.files[0])}
                                    className="text-xs text-[#8a8f98] file:mr-3 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-mono file:bg-[#18191a] file:text-[#d0d6e0] hover:file:bg-[#23252a]"
                                />
                            </div>

                            <div className="space-y-2 bg-[#141516] p-4 rounded-lg border border-[#23252a]">
                                <span className="text-xs font-medium text-[#f7f8f8] block">Replace ATS 1-Page Resume (PDF)</span>
                                <span className="text-[11px] font-mono text-[#8a8f98] block">Current: {settings.resumePdf}</span>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setData('resume_file', e.target.files[0])}
                                    className="text-xs text-[#8a8f98] file:mr-3 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-mono file:bg-[#18191a] file:text-[#d0d6e0] hover:file:bg-[#23252a]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="space-y-4 pt-2">
                        <h2 className="text-xs font-mono uppercase tracking-wider text-[#5e6ad2] border-b border-[#23252a] pb-2">
                            05 / Security & Credentials
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

                    <div className="pt-4 flex justify-end">
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
        </AdminLayout>
    );
}
