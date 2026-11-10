import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import {
    Plus,
    Edit2,
    Trash2,
    X,
    Layers,
    Star,
    RotateCcw,
    Check,
    ExternalLink,
    ChevronUp,
    ChevronDown,
    Save,
    Sparkles,
    CheckCircle2,
    Boxes,
    Cpu,
    Info,
} from 'lucide-react';

const ACCENT_OPTIONS = [
    { value: 'emerald', label: 'Emerald (Commercial / Production)', border: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' },
    { value: 'sky', label: 'Sky (Infrastructure / Cloud)', border: 'border-sky-500/40 text-sky-400 bg-sky-500/10' },
    { value: 'purple', label: 'Purple (Hardware / Systems)', border: 'border-purple-500/40 text-purple-400 bg-purple-500/10' },
    { value: 'amber', label: 'Amber (Specialized / High-Yield)', border: 'border-amber-500/40 text-amber-400 bg-amber-500/10' },
    { value: 'rose', label: 'Rose (Critical / Advanced)', border: 'border-rose-500/40 text-rose-400 bg-rose-500/10' },
    { value: 'indigo', label: 'Indigo (Architecture / Design)', border: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10' },
];

export default function SkillsIndex({ skills = [], categorizedSkills = [], skillsViewMode = 'categorized' }) {
    const [activeTab, setActiveTab] = useState('categorized'); // 'categorized' | 'stars'

    // ==========================================
    // 1. CATEGORIZED TECHNICAL ARSENAL STATE
    // ==========================================
    const [categories, setCategories] = useState(() => {
        if (Array.isArray(categorizedSkills) && categorizedSkills.length > 0) {
            return JSON.parse(JSON.stringify(categorizedSkills));
        }
        return [];
    });

    const [isSavingCategorized, setIsSavingCategorized] = useState(false);
    const [isResettingCategorized, setIsResettingCategorized] = useState(false);
    const [categorizedMessage, setCategorizedMessage] = useState('');
    const [tierInputs, setTierInputs] = useState({});

    // Update single field in a category
    const handleUpdateCategoryField = (index, field, value) => {
        setCategories((prev) => {
            const next = [...prev];
            next[index] = { ...next[index], [field]: value };
            return next;
        });
    };

    // Add item(s) to a category
    const handleAddSkillToTier = (tierIndex, rawInput) => {
        const trimmed = (rawInput || '').trim();
        if (!trimmed) return;

        const currentItems = categories[tierIndex]?.items || [];
        const lowerExisting = currentItems.map((i) => (typeof i === 'string' ? i.toLowerCase() : (i?.name || '').toLowerCase()));

        const newItems = trimmed
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t.length > 0 && !lowerExisting.includes(t.toLowerCase()));

        if (newItems.length === 0) {
            setTierInputs((prev) => ({ ...prev, [tierIndex]: '' }));
            return;
        }

        setCategories((prev) => {
            const next = [...prev];
            const updatedItems = [...(next[tierIndex].items || []), ...newItems];
            next[tierIndex] = { ...next[tierIndex], items: updatedItems };
            return next;
        });

        setTierInputs((prev) => ({ ...prev, [tierIndex]: '' }));
    };

    // Remove item from a category
    const handleRemoveSkillFromTier = (tierIndex, itemIndex) => {
        setCategories((prev) => {
            const next = [...prev];
            const updatedItems = next[tierIndex].items.filter((_, idx) => idx !== itemIndex);
            next[tierIndex] = { ...next[tierIndex], items: updatedItems };
            return next;
        });
    };

    // Move category up / down
    const handleMoveTier = (index, direction) => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= categories.length) return;

        setCategories((prev) => {
            const next = [...prev];
            const temp = next[index];
            next[index] = next[targetIndex];
            next[targetIndex] = temp;
            return next;
        });
    };

    // Add brand new tier
    const handleAddNewTier = () => {
        const newTier = {
            id: `custom-tier-${Date.now()}`,
            category: 'New Experience Tier',
            subtitle: 'Practical systems engineered in high-throughput environments',
            badge: 'Production / Specialization',
            accent: 'amber',
            description: 'Context and architectural justification for these specific skills.',
            items: ['TypeScript', 'Redis', 'PostgreSQL'],
        };
        setCategories((prev) => [...prev, newTier]);
    };

    // Delete tier
    const handleDeleteTier = (index) => {
        const tier = categories[index];
        if (confirm(`Are you sure you want to remove the tier "${tier.category || 'Untitled'}"?`)) {
            setCategories((prev) => prev.filter((_, idx) => idx !== index));
        }
    };

    // Save all categorized skills
    const handleSaveCategorized = (e) => {
        if (e) e.preventDefault();
        setIsSavingCategorized(true);
        setCategorizedMessage('');

        router.post(
            '/admin/skills/categorized',
            { categories },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSavingCategorized(false);
                    setCategorizedMessage('Categorized arsenal saved successfully!');
                    setTimeout(() => setCategorizedMessage(''), 4000);
                },
                onError: (err) => {
                    setIsSavingCategorized(false);
                    alert('Error saving categorized skills. Please verify all fields.');
                },
            }
        );
    };

    // Reset to defaults
    const handleResetCategorized = () => {
        if (confirm('Reset categorized technical arsenal to the default 3 credible tiers (Production, Infrastructure, Systems)? All custom edits will be reverted.')) {
            setIsResettingCategorized(true);
            router.post(
                '/admin/skills/categorized/reset',
                {},
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsResettingCategorized(false);
                        window.location.reload();
                    },
                    onError: () => {
                        setIsResettingCategorized(false);
                    },
                }
            );
        }
    };

    // View mode switcher
    const handleToggleViewMode = (mode) => {
        router.post(
            '/admin/skills/view-mode',
            { mode },
            {
                preserveScroll: true,
            }
        );
    };

    // ==========================================
    // 2. STAR RATINGS (DOMAIN SKILLS) STATE
    // ==========================================
    const [editingSkill, setEditingSkill] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [tagLevel, setTagLevel] = useState(5);
    const [itemError, setItemError] = useState('');

    const { data, setData, post, put, delete: destroy, reset, errors, processing } = useForm({
        category: '',
        items: [],
        sort_order: 0,
    });

    const openAddModal = () => {
        reset();
        setTagInput('');
        setTagLevel(5);
        setItemError('');
        setEditingSkill(null);
        setIsModalOpen(true);
    };

    const openEditModal = (skill) => {
        setEditingSkill(skill);
        setTagInput('');
        setTagLevel(5);
        setItemError('');

        const normalized = Array.isArray(skill.items)
            ? skill.items.map((item) => {
                  if (typeof item === 'string') return { name: item, level: 5 };
                  return { name: item?.name || '', level: Number(item?.level) || 5 };
              })
            : [];

        setData({
            category: skill.category,
            items: normalized,
            sort_order: skill.sort_order || 0,
        });
        setIsModalOpen(true);
    };

    const handleAddStarTag = (e) => {
        if (e) e.preventDefault();
        const trimmed = tagInput.trim();
        if (!trimmed) return;

        const existingNames = data.items.map((i) => i.name.toLowerCase());
        const newNames = trimmed
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t.length > 0 && !existingNames.includes(t.toLowerCase()));

        if (newNames.length === 0) {
            setTagInput('');
            return;
        }

        const newItems = newNames.map((name) => ({
            name,
            level: tagLevel,
        }));

        setData('items', [...data.items, ...newItems]);
        setTagInput('');
        setItemError('');
    };

    const handleRemoveStarTag = (indexToRemove) => {
        setData('items', data.items.filter((_, idx) => idx !== indexToRemove));
    };

    const handleUpdateTagLevel = (index, newLevel) => {
        const updated = [...data.items];
        updated[index] = { ...updated[index], level: newLevel };
        setData('items', updated);
    };

    const handleStarKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            handleAddStarTag();
        } else if (e.key === 'Backspace' && !tagInput && data.items.length > 0) {
            handleRemoveStarTag(data.items.length - 1);
        }
    };

    const handleStarSubmit = (e) => {
        e.preventDefault();

        let finalItems = [...data.items];
        if (tagInput.trim()) {
            const existingNames = finalItems.map((i) => i.name.toLowerCase());
            const extra = tagInput
                .split(',')
                .map((t) => t.trim())
                .filter((t) => t.length > 0 && !existingNames.includes(t.toLowerCase()))
                .map((name) => ({ name, level: tagLevel }));
            finalItems = [...finalItems, ...extra];
            setData('items', finalItems);
        }

        if (finalItems.length === 0) {
            setItemError('Please add at least one skill/tool item.');
            return;
        }

        if (editingSkill) {
            put(`/admin/skills/${editingSkill.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setTagInput('');
                },
            });
        } else {
            post('/admin/skills', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    setTagInput('');
                },
            });
        }
    };

    const handleStarDelete = (id) => {
        if (confirm('Delete this skill category?')) {
            destroy(`/admin/skills/${id}`);
        }
    };

    const totalCategorizedSkillsCount = categories.reduce((acc, cat) => acc + (cat.items?.length || 0), 0);
    const totalStarSkillsCount = skills.reduce((acc, s) => acc + (s.items?.length || 0), 0);

    return (
        <AdminLayout title="Skills & Arsenal">
            <div className="space-y-6 max-w-7xl mx-auto">
                {/* Header & Global Control Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#23252a] pb-5">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h1 className="text-base font-semibold text-[#f7f8f8]">Technical Arsenal & Skills Control</h1>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#141518] text-[#00ffcc] border border-[#23252a]">
                                Admin Controller
                            </span>
                        </div>
                        <p className="text-xs text-[#8a8f98] mt-1">
                            Configure categorized real-world experience tiers, domain star ratings, and the default presentation mode.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap">
                        {/* Default Public View Mode Switcher */}
                        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#0f1011] border border-[#23252a] text-xs">
                            <span className="text-[10px] font-mono uppercase text-[#8a8f98] px-2">Public Default:</span>
                            <button
                                type="button"
                                onClick={() => handleToggleViewMode('categorized')}
                                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                                    skillsViewMode === 'categorized'
                                        ? 'bg-[#1e2024] text-emerald-400 border border-emerald-500/30 shadow-sm'
                                        : 'text-[#8a8f98] hover:text-[#f7f8f8]'
                                }`}
                                title="Set Categorized Experience as the public default"
                            >
                                <Layers className="w-3.5 h-3.5" />
                                <span>Categorized</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleToggleViewMode('stars')}
                                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                                    skillsViewMode === 'stars'
                                        ? 'bg-[#1e2024] text-amber-400 border border-amber-500/30 shadow-sm'
                                        : 'text-[#8a8f98] hover:text-[#f7f8f8]'
                                }`}
                                title="Set Star Ratings as the public default"
                            >
                                <Star className="w-3.5 h-3.5" />
                                <span>Star Ratings</span>
                            </button>
                        </div>

                        {/* Public Link */}
                        <a
                            href="/#skills"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-[#141516] hover:bg-[#1a1c20] text-[#8a8f98] hover:text-[#f7f8f8] border border-[#23252a] text-xs font-mono transition-colors flex items-center gap-1.5"
                        >
                            <span>Live Preview</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#5e6ad2]" />
                        </a>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center justify-between border-b border-[#23252a]">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveTab('categorized')}
                            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all flex items-center gap-2 ${
                                activeTab === 'categorized'
                                    ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                                    : 'border-transparent text-[#8a8f98] hover:text-[#f7f8f8]'
                            }`}
                        >
                            <Layers className="w-4 h-4" />
                            <span>Categorized Experience Tiers</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#1a1c22] border border-[#2e3138]">
                                {categories.length} Tiers · {totalCategorizedSkillsCount} Skills
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('stars')}
                            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all flex items-center gap-2 ${
                                activeTab === 'stars'
                                    ? 'border-amber-400 text-amber-400 bg-amber-500/5'
                                    : 'border-transparent text-[#8a8f98] hover:text-[#f7f8f8]'
                            }`}
                        >
                            <Star className="w-4 h-4" />
                            <span>Domain Star Ratings</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#1a1c22] border border-[#2e3138]">
                                {skills.length} Domains · {totalStarSkillsCount} Skills
                            </span>
                        </button>
                    </div>

                    {/* Secondary Context Callout */}
                    <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-[#8a8f98]">
                        <Info className="w-3.5 h-3.5 text-[#5e6ad2]" />
                        <span>Changes made here immediately synchronize with the public portfolio.</span>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* TAB 1: CATEGORIZED TECHNICAL ARSENAL (EXPERIENCE TIERS)   */}
                {/* ========================================================= */}
                {activeTab === 'categorized' && (
                    <div className="space-y-6">
                        {/* Sticky Control Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0f1011] border border-[#23252a]">
                            <div className="flex items-center gap-2 flex-wrap">
                                <button
                                    type="button"
                                    onClick={handleAddNewTier}
                                    className="px-3 py-1.5 rounded-lg bg-[#5e6ad2] hover:bg-[#828fff] text-white text-xs font-medium transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(94,106,210,0.3)] cursor-pointer"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Add Experience Tier</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleResetCategorized}
                                    disabled={isResettingCategorized}
                                    className="px-3 py-1.5 rounded-lg bg-[#141516] hover:bg-[#1f2126] text-[#8a8f98] hover:text-white border border-[#23252a] text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                                    title="Reset to Production (PHP/Laravel), Infrastructure (K8s/Terraform), and Hardware (C++/Serial) defaults"
                                >
                                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                                    <span>{isResettingCategorized ? 'Resetting...' : 'Reset to 3 Credible Defaults'}</span>
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                {categorizedMessage && (
                                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                                        <Check className="w-3.5 h-3.5" />
                                        <span>{categorizedMessage}</span>
                                    </span>
                                )}

                                <button
                                    type="button"
                                    onClick={handleSaveCategorized}
                                    disabled={isSavingCategorized}
                                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold font-mono transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(52,211,153,0.35)] cursor-pointer disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{isSavingCategorized ? 'Saving Changes...' : 'Save Arsenal Tiers'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Tiers List / Cards */}
                        <div className="space-y-5">
                            {categories.map((tier, tierIdx) => {
                                const currentAccent = ACCENT_OPTIONS.find((a) => a.value === tier.accent) || ACCENT_OPTIONS[0];

                                return (
                                    <div
                                        key={tier.id || tierIdx}
                                        className="bg-[#0f1011] border border-[#23252a] rounded-xl p-5 space-y-4 transition-all hover:border-[#383b42] shadow-sm"
                                    >
                                        {/* Card Top Header: Category, Badge, Accent & Move/Delete */}
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#1f2126] pb-4">
                                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                {/* Category Title */}
                                                <div>
                                                    <label className="text-[10px] font-mono uppercase text-[#8a8f98] block mb-1">
                                                        Tier Category Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={tier.category || ''}
                                                        onChange={(e) => handleUpdateCategoryField(tierIdx, 'category', e.target.value)}
                                                        placeholder="e.g. Production experience"
                                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-1.5 text-xs text-[#f7f8f8] font-medium focus:outline-none"
                                                    />
                                                </div>

                                                {/* Badge Tag */}
                                                <div>
                                                    <label className="text-[10px] font-mono uppercase text-[#8a8f98] block mb-1">
                                                        Badge Label
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={tier.badge || ''}
                                                        onChange={(e) => handleUpdateCategoryField(tierIdx, 'badge', e.target.value)}
                                                        placeholder="e.g. Commercial / 6+ Yrs"
                                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-1.5 text-xs text-[#f7f8f8] font-mono focus:outline-none"
                                                    />
                                                </div>

                                                {/* Accent Selector */}
                                                <div>
                                                    <label className="text-[10px] font-mono uppercase text-[#8a8f98] block mb-1">
                                                        Accent Theme
                                                    </label>
                                                    <select
                                                        value={tier.accent || 'emerald'}
                                                        onChange={(e) => handleUpdateCategoryField(tierIdx, 'accent', e.target.value)}
                                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-2.5 py-1.5 text-xs text-[#f7f8f8] font-mono focus:outline-none"
                                                    >
                                                        {ACCENT_OPTIONS.map((opt) => (
                                                            <option key={opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Reorder and Delete Controls */}
                                            <div className="flex items-center gap-1.5 self-end lg:self-center">
                                                <button
                                                    type="button"
                                                    onClick={() => handleMoveTier(tierIdx, 'up')}
                                                    disabled={tierIdx === 0}
                                                    className="p-1.5 rounded bg-[#141516] hover:bg-[#1e2024] text-[#8a8f98] hover:text-white border border-[#23252a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                                    title="Move Tier Up"
                                                >
                                                    <ChevronUp className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleMoveTier(tierIdx, 'down')}
                                                    disabled={tierIdx === categories.length - 1}
                                                    className="p-1.5 rounded bg-[#141516] hover:bg-[#1e2024] text-[#8a8f98] hover:text-white border border-[#23252a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                                    title="Move Tier Down"
                                                >
                                                    <ChevronDown className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteTier(tierIdx)}
                                                    className="p-1.5 rounded bg-[#141516] hover:bg-rose-950/60 text-[#8a8f98] hover:text-rose-400 border border-[#23252a] hover:border-rose-800/50 transition-colors ml-1"
                                                    title="Delete this Tier"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Subtitle & Description */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-[10px] font-mono uppercase text-[#8a8f98] block mb-1">
                                                    Subtitle / Headline
                                                </label>
                                                <input
                                                    type="text"
                                                    value={tier.subtitle || ''}
                                                    onChange={(e) => handleUpdateCategoryField(tierIdx, 'subtitle', e.target.value)}
                                                    placeholder="Brief operational summary"
                                                    className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-1.5 text-xs text-[#d0d6e0] focus:outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[10px] font-mono uppercase text-[#8a8f98] block mb-1">
                                                    Credibility Justification / Context Description
                                                </label>
                                                <textarea
                                                    rows={1}
                                                    value={tier.description || ''}
                                                    onChange={(e) => handleUpdateCategoryField(tierIdx, 'description', e.target.value)}
                                                    placeholder="Explain the real-world operational context for why these skills are grouped here..."
                                                    className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-1.5 text-xs text-[#d0d6e0] focus:outline-none resize-y"
                                                />
                                            </div>
                                        </div>

                                        {/* Skill Chips & Tag Adder */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-mono uppercase text-[#8a8f98] flex items-center gap-1.5">
                                                    <span>Skills & Technologies in this Tier</span>
                                                    <span className="text-[#00ffcc] font-bold">({(tier.items || []).length})</span>
                                                </label>
                                                <span className="text-[10px] font-mono text-[#62666d]">
                                                    Type a skill & press Enter or comma to add
                                                </span>
                                            </div>

                                            <div className="min-h-[75px] p-2.5 bg-[#141516] border border-[#23252a] rounded-lg flex flex-wrap items-center gap-2">
                                                {(tier.items || []).map((skillName, sIdx) => (
                                                    <span
                                                        key={sIdx}
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e2024] text-[#f7f8f8] border border-[#2e3138] text-xs font-mono shadow-sm group hover:border-[#5e6ad2] transition-colors"
                                                    >
                                                        <span>{skillName}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveSkillFromTier(tierIdx, sIdx)}
                                                            className="text-[#8a8f98] hover:text-rose-400 p-0.5 rounded transition-colors"
                                                            title={`Remove ${skillName}`}
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </span>
                                                ))}

                                                {/* Inline Input */}
                                                <div className="flex-1 flex items-center gap-1.5 min-w-[180px]">
                                                    <input
                                                        type="text"
                                                        value={tierInputs[tierIdx] || ''}
                                                        onChange={(e) => setTierInputs((prev) => ({ ...prev, [tierIdx]: e.target.value }))}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' || e.key === ',') {
                                                                e.preventDefault();
                                                                handleAddSkillToTier(tierIdx, tierInputs[tierIdx]);
                                                            }
                                                        }}
                                                        placeholder={tier.items?.length === 0 ? 'Type skill name and press Enter...' : '+ Add skill...'}
                                                        className="flex-1 bg-transparent border-0 text-xs text-[#f7f8f8] placeholder-[#8a8f98]/60 focus:outline-none py-1 px-1 font-mono"
                                                    />
                                                    {tierInputs[tierIdx]?.trim() && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAddSkillToTier(tierIdx, tierInputs[tierIdx])}
                                                            className="px-2 py-0.5 rounded bg-[#5e6ad2] hover:bg-[#828fff] text-white text-[10px] font-mono font-semibold"
                                                        >
                                                            + Add
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ========================================================= */}
                {/* TAB 2: DOMAIN STAR RATINGS (TRADITIONAL MODEL RESOURCE)   */}
                {/* ========================================================= */}
                {activeTab === 'stars' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0f1011] border border-[#23252a]">
                            <div>
                                <h3 className="text-xs font-semibold text-[#f7f8f8]">Domain Competencies & Star Ratings</h3>
                                <p className="text-[11px] text-[#8a8f98]">
                                    Traditional 5-star proficiency ratings grouped into technical domains (Backend, Frontend, DevOps, etc.).
                                </p>
                            </div>

                            <button
                                onClick={openAddModal}
                                className="bg-[#5e6ad2] hover:bg-[#828fff] text-white text-xs font-medium px-3.5 py-1.5 rounded-md transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(94,106,210,0.35)] cursor-pointer"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>New Domain Category</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {skills.map((s) => (
                                <div key={s.id} className="bg-[#0f1011] border border-[#23252a] p-5 rounded-xl space-y-3 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-mono uppercase tracking-wider text-[#d0d6e0]">{s.category}</h3>
                                            <span className="text-[10px] font-mono text-[#8a8f98]">
                                                {(s.items || []).length} { (s.items || []).length === 1 ? 'skill' : 'skills' }
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {s.items && s.items.map((item, idx) => {
                                                const name = typeof item === 'string' ? item : (item?.name || '');
                                                const lvl = typeof item === 'object' && item?.level ? Number(item.level) : 5;
                                                return (
                                                    <span key={idx} className="inline-flex items-center gap-1.5 text-xs font-mono px-2 py-0.5 rounded bg-[#141516] text-[#d0d6e0] border border-[#23252a]">
                                                        <span>{name}</span>
                                                        <span className="inline-flex items-center text-amber-400 text-[10px]">
                                                            {'★'.repeat(lvl)}<span className="text-[#343842]">{'★'.repeat(5 - lvl)}</span>
                                                        </span>
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#23252a]/60">
                                        <button onClick={() => openEditModal(s)} className="p-1.5 text-[#8a8f98] hover:text-[#f7f8f8] cursor-pointer" title="Edit Category">
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button onClick={() => handleStarDelete(s.id)} className="p-1.5 text-[#8a8f98] hover:text-rose-400 cursor-pointer" title="Delete Category">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for Domain Star Ratings */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#0f1011] border border-[#23252a] rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#23252a] pb-3">
                            <h3 className="text-sm font-semibold text-[#f7f8f8]">
                                {editingSkill ? 'Edit Domain Category' : 'New Domain Category'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-[#8a8f98] hover:text-[#f7f8f8]">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleStarSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-mono text-[#8a8f98]">Category Name</label>
                                <input
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    placeholder="e.g. Backend & Systems Architecture"
                                    className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-mono text-[#8a8f98]">Items & Proficiency Stars</label>
                                    <span className="text-[10px] font-mono text-[#8a8f98]">
                                        {data.items.length} {data.items.length === 1 ? 'item' : 'items'}
                                    </span>
                                </div>

                                <div
                                    className="min-h-[110px] p-2.5 bg-[#141516] border border-[#23252a] focus-within:border-[#5e6ad2] rounded-md transition-colors flex flex-wrap items-center gap-2 cursor-text"
                                    onClick={() => document.getElementById('tag-input-field')?.focus()}
                                >
                                    {data.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="inline-flex items-center gap-2 bg-[#1e2024] hover:bg-[#25282e] text-[#f7f8f8] border border-[#2e3138] text-xs font-mono px-2.5 py-1 rounded-md transition-all shadow-sm"
                                        >
                                            <span className="font-medium">{item.name}</span>
                                            
                                            <div className="inline-flex items-center gap-0.5" title={`Proficiency: ${item.level}/5 stars (click to change)`}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleUpdateTagLevel(idx, star);
                                                        }}
                                                        className="p-0 text-[11px] leading-none hover:scale-125 transition-transform"
                                                    >
                                                        <span className={star <= (item.level || 5) ? 'text-amber-400' : 'text-[#3e424c]'}>
                                                            ★
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveStarTag(idx);
                                                }}
                                                className="text-[#8a8f98] hover:text-rose-400 p-0.5 rounded transition-colors ml-0.5"
                                                title={`Remove ${item.name}`}
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}

                                    <div className="flex-1 flex items-center gap-2 min-w-[200px]" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            id="tag-input-field"
                                            type="text"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={handleStarKeyDown}
                                            placeholder={data.items.length === 0 ? "Type skill name & press Enter..." : "Add skill..."}
                                            className="flex-1 bg-transparent border-0 text-xs text-[#f7f8f8] placeholder-[#8a8f98]/60 focus:outline-none py-1 px-1"
                                        />

                                        <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#0f1011] border border-[#23252a]" title="Default star level for next tag">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setTagLevel(star)}
                                                    className="p-0 text-[11px] leading-none hover:scale-125 transition-transform"
                                                >
                                                    <span className={star <= tagLevel ? 'text-amber-400' : 'text-[#3e424c]'}>
                                                        ★
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-[10px] font-mono text-[#8a8f98] pt-0.5">
                                    <span>Press <kbd className="px-1 py-0.5 rounded bg-[#1e2024] border border-[#2e3138] text-[#d0d6e0]">Enter</kbd> or <kbd className="px-1 py-0.5 rounded bg-[#1e2024] border border-[#2e3138] text-[#d0d6e0]">,</kbd> to add. Click stars on chips to calibrate.</span>
                                    {tagInput.trim() && (
                                        <button
                                            type="button"
                                            onClick={handleAddStarTag}
                                            className="text-[#5e6ad2] hover:text-[#828fff] underline font-medium"
                                        >
                                            + Add "{tagInput.trim()}" ({tagLevel}★)
                                        </button>
                                    )}
                                </div>

                                {itemError && (
                                    <p className="text-xs font-mono text-rose-400 mt-1">{itemError}</p>
                                )}
                                {errors.items && (
                                    <p className="text-xs font-mono text-rose-400 mt-1">{errors.items}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-xs font-mono text-[#8a8f98] hover:text-[#f7f8f8]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#5e6ad2] hover:bg-[#828fff] text-white text-xs font-medium px-4 py-2 rounded-md"
                                >
                                    {editingSkill ? 'Update Category' : 'Save Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
