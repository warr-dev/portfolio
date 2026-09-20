import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function ExperienceIndex({ experiences, availableSkills = [] }) {
    const [editingExp, setEditingExp] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [techInput, setTechInput] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, reset, processing } = useForm({
        role: '',
        company: '',
        location: '',
        period: '',
        is_current: false,
        bullet_points: '',
        technologies: [],
        sort_order: 0,
    });

    const openAddModal = () => {
        reset();
        setEditingExp(null);
        setTechInput('');
        setIsDropdownOpen(false);
        setIsModalOpen(true);
    };

    const openEditModal = (exp) => {
        setEditingExp(exp);
        setTechInput('');
        setIsDropdownOpen(false);
        setData({
            role: exp.role,
            company: exp.company,
            location: exp.location || '',
            period: exp.period,
            is_current: Boolean(exp.is_current),
            bullet_points: exp.bullet_points ? exp.bullet_points.join('\n') : '',
            technologies: Array.isArray(exp.technologies) ? [...exp.technologies] : [],
            sort_order: exp.sort_order || 0,
        });
        setIsModalOpen(true);
    };

    const handleAddTech = (techName) => {
        const trimmed = (techName || techInput).trim();
        if (!trimmed) return;

        const current = data.technologies || [];
        const newItems = trimmed
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t.length > 0 && !current.some((c) => c.toLowerCase() === t.toLowerCase()));

        if (newItems.length > 0) {
            setData('technologies', [...current, ...newItems]);
        }
        setTechInput('');
        setIsDropdownOpen(false);
    };

    const handleRemoveTech = (indexToRemove) => {
        setData('technologies', (data.technologies || []).filter((_, idx) => idx !== indexToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            handleAddTech();
        } else if (e.key === 'Backspace' && !techInput && data.technologies.length > 0) {
            handleRemoveTech(data.technologies.length - 1);
        } else if (e.key === 'Escape') {
            setIsDropdownOpen(false);
        }
    };

    const filteredSuggestions = availableSkills.filter((s) => {
        const matchesQuery = !techInput.trim() || s.toLowerCase().includes(techInput.trim().toLowerCase());
        const notAlreadyAdded = !(data.technologies || []).some((t) => t.toLowerCase() === s.toLowerCase());
        return matchesQuery && notAlreadyAdded;
    }).slice(0, 8);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let finalTechs = [...(data.technologies || [])];
        if (techInput.trim()) {
            const extra = techInput
                .split(',')
                .map((t) => t.trim())
                .filter((t) => t.length > 0 && !finalTechs.some((c) => c.toLowerCase() === t.toLowerCase()));
            finalTechs = [...finalTechs, ...extra];
        }

        const payload = {
            ...data,
            bullet_points: data.bullet_points.split('\n').map((b) => b.trim()).filter(Boolean),
            technologies: finalTechs,
        };

        if (editingExp) {
            put(`/admin/experience/${editingExp.id}`, {
                data: payload,
                onSuccess: () => {
                    setIsModalOpen(false);
                    setTechInput('');
                },
            });
        } else {
            post('/admin/experience', {
                data: payload,
                onSuccess: () => {
                    setIsModalOpen(false);
                    setTechInput('');
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Delete this career milestone?')) {
            destroy(`/admin/experience/${id}`);
        }
    };

    return (
        <AdminLayout title="Career Experience & Milestones">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-[#f7f8f8]">Work History Entries ({experiences.length})</h2>
                    <p className="text-xs text-[#8a8f98]">Manage company roles, impact bullet points, and dates</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-[#5e6ad2] hover:bg-[#828fff] text-white text-xs font-medium px-4 py-2 rounded-md transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(94,106,210,0.35)]"
                >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Milestone</span>
                </button>
            </div>

            <div className="space-y-4">
                {experiences.map((exp) => (
                    <div key={exp.id} className="bg-[#0f1011] border border-[#23252a] p-5 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-semibold text-[#f7f8f8]">{exp.role}</h3>
                                {exp.is_current && (
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5e6ad2]/15 text-[#828fff] border border-[#5e6ad2]/30">
                                        Current
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-[#8a8f98]">{exp.period}</span>
                                <button onClick={() => openEditModal(exp)} className="p-1.5 text-[#8a8f98] hover:text-[#f7f8f8]">
                                    <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => handleDelete(exp.id)} className="p-1.5 text-[#8a8f98] hover:text-rose-400">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        <p className="text-xs font-mono text-[#5e6ad2]">
                            {exp.company} {exp.location && <span className="text-[#8a8f98]">· {exp.location}</span>}
                        </p>

                        <ul className="text-xs text-[#8a8f98] space-y-1 list-disc list-inside">
                            {exp.bullet_points && exp.bullet_points.map((pt, idx) => <li key={idx}>{pt}</li>)}
                        </ul>

                        {exp.technologies && exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#23252a]/60">
                                {exp.technologies.map((t, idx) => (
                                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141516] text-[#8a8f98] border border-[#23252a]">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#0f1011] border border-[#23252a] rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#23252a] pb-3">
                            <h3 className="text-sm font-semibold text-[#f7f8f8]">
                                {editingExp ? 'Edit Milestone' : 'Add New Milestone'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-[#8a8f98] hover:text-[#f7f8f8]">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Role Title</label>
                                    <input
                                        type="text"
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Company</label>
                                    <input
                                        type="text"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Period / Date Span</label>
                                    <input
                                        type="text"
                                        value={data.period}
                                        onChange={(e) => setData('period', e.target.value)}
                                        placeholder="Aug 2024 — Present"
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Location</label>
                                    <input
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="Philippines (Remote)"
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="current-role"
                                    checked={data.is_current}
                                    onChange={(e) => setData('is_current', e.target.checked)}
                                    className="rounded bg-[#141516] border-[#23252a] text-[#5e6ad2] focus:ring-0"
                                />
                                <label htmlFor="current-role" className="text-xs text-[#d0d6e0]">
                                    Mark as currently active role
                                </label>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-mono text-[#8a8f98]">Bullet Points (one per line)</label>
                                <textarea
                                    rows={4}
                                    value={data.bullet_points}
                                    onChange={(e) => setData('bullet_points', e.target.value)}
                                    placeholder="Architected backend systems...&#10;Integrated third-party payment providers..."
                                    className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none resize-none"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5 relative">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-mono text-[#8a8f98]">Technologies & Stack</label>
                                    <span className="text-[10px] font-mono text-[#8a8f98]">
                                        {(data.technologies || []).length} { (data.technologies || []).length === 1 ? 'tech' : 'techs' }
                                    </span>
                                </div>

                                {/* Tagify Container */}
                                <div
                                    className="min-h-[72px] p-2 bg-[#141516] border border-[#23252a] focus-within:border-[#5e6ad2] rounded-md transition-colors flex flex-wrap items-center gap-1.5 cursor-text"
                                    onClick={() => document.getElementById('tech-tag-input')?.focus()}
                                >
                                    {(data.technologies || []).map((tech, idx) => (
                                        <div
                                            key={idx}
                                            className="inline-flex items-center gap-1.5 bg-[#1e2024] hover:bg-[#25282e] text-[#f7f8f8] border border-[#2e3138] text-xs font-mono px-2 py-0.5 rounded transition-all shadow-sm"
                                        >
                                            <span className="font-medium">{tech}</span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveTech(idx);
                                                }}
                                                className="text-[#8a8f98] hover:text-rose-400 transition-colors p-0.5"
                                                title={`Remove ${tech}`}
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}

                                    <input
                                        id="tech-tag-input"
                                        type="text"
                                        value={techInput}
                                        onChange={(e) => {
                                            setTechInput(e.target.value);
                                            setIsDropdownOpen(true);
                                        }}
                                        onFocus={() => setIsDropdownOpen(true)}
                                        onKeyDown={handleKeyDown}
                                        placeholder={(data.technologies || []).length === 0 ? "Type tech & press Enter (e.g. PHP, Laravel, Docker)..." : "Add more..."}
                                        className="flex-1 min-w-[140px] bg-transparent border-none text-xs text-[#f7f8f8] focus:outline-none focus:ring-0 p-1"
                                    />
                                </div>

                                {/* Autocomplete Suggestions Dropdown */}
                                {isDropdownOpen && filteredSuggestions.length > 0 && (
                                    <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-[#141516] border border-[#23252a] rounded-lg shadow-xl overflow-hidden py-1 max-h-48 overflow-y-auto">
                                        <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#8a8f98] border-b border-[#23252a]/60">
                                            Suggested from Skills Library
                                        </div>
                                        {filteredSuggestions.map((skill, sIdx) => (
                                            <button
                                                key={sIdx}
                                                type="button"
                                                onClick={() => handleAddTech(skill)}
                                                className="w-full text-left px-3 py-1.5 text-xs font-mono text-[#d0d6e0] hover:bg-[#5e6ad2]/20 hover:text-[#f7f8f8] flex items-center justify-between group transition-colors"
                                            >
                                                <span>{skill}</span>
                                                <span className="text-[10px] text-[#8a8f98] group-hover:text-[#828fff]">+ Add</span>
                                            </button>
                                        ))}
                                    </div>
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
                                    {editingExp ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
