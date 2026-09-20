import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function SkillsIndex({ skills }) {
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

        // Normalize items to { name, level }
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

    const handleAddTag = (e) => {
        if (e) e.preventDefault();
        const trimmed = tagInput.trim();
        if (!trimmed) return;

        // Support comma-separated batch paste/input
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

    const handleRemoveTag = (indexToRemove) => {
        setData('items', data.items.filter((_, idx) => idx !== indexToRemove));
    };

    const handleUpdateTagLevel = (index, newLevel) => {
        const updated = [...data.items];
        updated[index] = { ...updated[index], level: newLevel };
        setData('items', updated);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            handleAddTag();
        } else if (e.key === 'Backspace' && !tagInput && data.items.length > 0) {
            handleRemoveTag(data.items.length - 1);
        }
    };

    const handleSubmit = (e) => {
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

    const handleDelete = (id) => {
        if (confirm('Delete this skill category?')) {
            destroy(`/admin/skills/${id}`);
        }
    };

    return (
        <AdminLayout title="Skills & Arsenal">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-[#f7f8f8]">Skill Categories ({skills.length})</h2>
                    <p className="text-xs text-[#8a8f98]">Manage skill competencies, frameworks, tools, and item proficiency</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-[#5e6ad2] hover:bg-[#828fff] text-white text-xs font-medium px-4 py-2 rounded-md transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(94,106,210,0.35)]"
                >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Category</span>
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
                            <button onClick={() => openEditModal(s)} className="p-1.5 text-[#8a8f98] hover:text-[#f7f8f8]">
                                <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDelete(s.id)} className="p-1.5 text-[#8a8f98] hover:text-rose-400">
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#0f1011] border border-[#23252a] rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#23252a] pb-3">
                            <h3 className="text-sm font-semibold text-[#f7f8f8]">
                                {editingSkill ? 'Edit Category' : 'New Skill Category'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-[#8a8f98] hover:text-[#f7f8f8]">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-mono text-[#8a8f98]">Category Name</label>
                                <input
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    placeholder="Backend & APIs"
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

                                {/* Tagify Container with per-item star rating */}
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
                                            
                                            {/* Interactive star rating per item */}
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
                                                    handleRemoveTag(idx);
                                                }}
                                                className="text-[#8a8f98] hover:text-rose-400 p-0.5 rounded transition-colors ml-0.5"
                                                title={`Remove ${item.name}`}
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Inline Add Input */}
                                    <div className="flex-1 flex items-center gap-2 min-w-[200px]" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            id="tag-input-field"
                                            type="text"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder={data.items.length === 0 ? "Type skill name & press Enter..." : "Add skill..."}
                                            className="flex-1 bg-transparent border-0 text-xs text-[#f7f8f8] placeholder-[#8a8f98]/60 focus:outline-none py-1 px-1"
                                        />

                                        {/* Stars level selector for new skill tag being added */}
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
                                            onClick={handleAddTag}
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
