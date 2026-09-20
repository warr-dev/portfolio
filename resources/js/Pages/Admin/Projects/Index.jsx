import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, X, ExternalLink, Image as ImageIcon, Video as VideoIcon, Eye, Layers, Upload } from 'lucide-react';

export default function ProjectsIndex({ projects }) {
    const [editingProject, setEditingProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [extraInfoFields, setExtraInfoFields] = useState([]);
    const [filePreview, setFilePreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const [galleryItems, setGalleryItems] = useState([]);

    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        title: '',
        badge: '',
        organization: '',
        description: '',
        content: '',
        tags: '',
        demo_url: '',
        github_url: '',
        demo_status: 'live',
        github_status: 'public',
        cover_image: '',
        cover_file: null,
        media_type: 'none',
        media_url: '',
        media_file: null,
        gallery_files: [],
        featured: true,
        sort_order: 0,
        extra_info: {},
    });

    const openAddModal = () => {
        reset();
        setEditingProject(null);
        setExtraInfoFields([]);
        setGalleryItems([]);
        setFilePreview(null);
        setCoverPreview(null);
        setIsModalOpen(true);
    };

    const openEditModal = (project) => {
        setEditingProject(project);
        setFilePreview(null);
        setCoverPreview(null);

        // Convert project.extra_info object to array of { key, value }
        let fields = [];
        if (project.extra_info && typeof project.extra_info === 'object') {
            fields = Object.entries(project.extra_info).map(([k, v]) => ({
                key: k,
                value: typeof v === 'object' ? JSON.stringify(v) : String(v),
            }));
        }
        setExtraInfoFields(fields);
        setGalleryItems(Array.isArray(project.gallery) ? project.gallery : []);

        setData({
            title: project.title,
            badge: project.badge || '',
            organization: project.organization || '',
            description: project.description,
            content: project.content || '',
            tags: project.tags ? project.tags.join(', ') : '',
            demo_url: project.demo_url || '',
            github_url: project.github_url || '',
            demo_status: project.demo_status || 'live',
            github_status: project.github_status || 'public',
            cover_image: project.cover_image || '',
            cover_file: null,
            media_type: project.media_type || 'none',
            media_url: project.media_url || '',
            media_file: null,
            gallery_files: [],
            featured: Boolean(project.featured),
            sort_order: project.sort_order || 0,
            extra_info: project.extra_info || {},
        });
        setIsModalOpen(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('media_file', file);
            const objectUrl = URL.createObjectURL(file);
            setFilePreview(objectUrl);
        } else {
            setData('media_file', null);
            setFilePreview(null);
        }
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('cover_file', file);
            const objectUrl = URL.createObjectURL(file);
            setCoverPreview(objectUrl);
        } else {
            setData('cover_file', null);
            setCoverPreview(null);
        }
    };

    const handleGalleryFilesChange = (e) => {
        const files = Array.from(e.target.files);
        setData('gallery_files', files);
    };

    const handleAddExtraField = () => {
        setExtraInfoFields([...extraInfoFields, { key: '', value: '' }]);
    };

    const handleUpdateExtraField = (index, field, val) => {
        const updated = [...extraInfoFields];
        updated[index][field] = val;
        setExtraInfoFields(updated);
    };

    const handleRemoveExtraField = (index) => {
        setExtraInfoFields(extraInfoFields.filter((_, idx) => idx !== index));
    };

    const handleAddGalleryItem = () => {
        setGalleryItems([...galleryItems, { type: 'image', url: '', caption: '' }]);
    };

    const handleUpdateGalleryItem = (index, field, val) => {
        const updated = [...galleryItems];
        updated[index][field] = val;
        setGalleryItems(updated);
    };

    const handleRemoveGalleryItem = (index) => {
        setGalleryItems(galleryItems.filter((_, idx) => idx !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const tagList = (data.tags || '').split(',').map((t) => t.trim()).filter(Boolean);

        // Assemble extra_info object
        const extraObj = {};
        extraInfoFields.forEach(({ key, value }) => {
            const trimmedKey = (key || '').trim();
            if (trimmedKey) {
                extraObj[trimmedKey] = (value || '').trim();
            }
        });

        const formData = new FormData();
        formData.append('title', data.title || '');
        formData.append('badge', data.badge || '');
        formData.append('organization', data.organization || '');
        formData.append('description', data.description || '');
        formData.append('content', data.content || '');
        formData.append('demo_url', data.demo_url || '');
        formData.append('github_url', data.github_url || '');
        formData.append('demo_status', data.demo_status || 'live');
        formData.append('github_status', data.github_status || 'public');
        formData.append('cover_image', data.cover_image || '');
        formData.append('media_type', data.media_type || 'none');
        formData.append('media_url', data.media_url || '');
        formData.append('featured', data.featured ? '1' : '0');
        formData.append('sort_order', data.sort_order || 0);
        formData.append('extra_info', JSON.stringify(extraObj));
        formData.append('gallery', JSON.stringify(galleryItems));

        tagList.forEach((tag, idx) => {
            formData.append(`tags[${idx}]`, tag);
        });

        if (data.cover_file instanceof File) {
            formData.append('cover_file', data.cover_file);
        }

        if (data.media_file instanceof File) {
            formData.append('media_file', data.media_file);
        }

        if (data.gallery_files && data.gallery_files.length > 0) {
            Array.from(data.gallery_files).forEach((file, idx) => {
                formData.append(`gallery_files[${idx}]`, file);
            });
        }

        if (editingProject) {
            formData.append('_method', 'put');
            router.post(`/admin/projects/${editingProject.id}`, formData, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                    setExtraInfoFields([]);
                    setGalleryItems([]);
                },
            });
        } else {
            router.post('/admin/projects', formData, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                    setExtraInfoFields([]);
                    setGalleryItems([]);
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            destroy(`/admin/projects/${id}`);
        }
    };

    return (
        <AdminLayout title="Manage Projects">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-[#f7f8f8]">Showcased Works ({projects.length})</h2>
                    <p className="text-xs text-[#8a8f98]">Add, modify, or archive projects displayed on the public portfolio</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-[#5e6ad2] hover:bg-[#828fff] text-white text-xs font-medium px-4 py-2 rounded-md transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(94,106,210,0.35)]"
                >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Project</span>
                </button>
            </div>

            {/* Projects Table */}
            <div className="bg-[#0f1011] border border-[#23252a] rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                    <thead className="bg-[#141516] border-b border-[#23252a] font-mono text-[#8a8f98]">
                        <tr>
                            <th className="p-4">Cover & Title</th>
                            <th className="p-4">Organization</th>
                            <th className="p-4">Tags</th>
                            <th className="p-4">Page / Links</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#23252a]">
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-[#141516]/50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        {project.cover_image || project.media_url ? (
                                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#23252a] bg-[#141516] flex-shrink-0 flex items-center justify-center relative">
                                                {project.cover_image ? (
                                                    <img
                                                        src={project.cover_image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : project.media_type === 'video' ? (
                                                    <div className="w-full h-full flex items-center justify-center bg-[#1e2024]">
                                                        <VideoIcon className="w-5 h-5 text-[#828fff]" />
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={project.media_url}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 rounded-lg border border-[#23252a]/60 bg-[#141516] flex-shrink-0 flex items-center justify-center text-[#62666d]">
                                                <ImageIcon className="w-5 h-5 opacity-40" />
                                            </div>
                                        )}

                                        <div>
                                            <div className="font-semibold text-[#f7f8f8] flex items-center gap-2">
                                                <span>{project.title}</span>
                                                <a
                                                    href={`/projects/${project.slug}`}
                                                    target="_blank"
                                                    className="text-[10px] font-mono text-[#5e6ad2] hover:underline"
                                                    title="View dedicated project page"
                                                >
                                                    ↗ View Page
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <span className="text-[10px] font-mono text-[#5e6ad2] bg-[#5e6ad2]/10 px-1.5 py-0.5 rounded border border-[#5e6ad2]/20">
                                                    {project.badge || 'General'}
                                                </span>
                                                {project.extra_info && Object.keys(project.extra_info).length > 0 && (
                                                    <span className="text-[10px] font-mono text-[#8a8f98] bg-[#18191a] px-1.5 py-0.5 rounded border border-[#23252a]">
                                                        {Object.keys(project.extra_info).length} metrics
                                                    </span>
                                                )}
                                                {project.gallery && project.gallery.length > 0 && (
                                                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20">
                                                        {project.gallery.length} media
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 font-mono text-[#8a8f98]">{project.organization || '—'}</td>
                                <td className="p-4">
                                    <div className="flex flex-wrap gap-1 max-w-xs">
                                        {project.tags && project.tags.map((t, idx) => (
                                            <span key={idx} className="text-[10px] font-mono bg-[#18191a] text-[#8a8f98] px-1.5 py-0.5 rounded">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-4 font-mono text-xs">
                                    <div className="flex items-center gap-2 text-[#8a8f98]">
                                        <a
                                            href={`/projects/${project.slug}`}
                                            target="_blank"
                                            className="p-1 rounded bg-[#18191a] hover:bg-[#23252a] text-[#d0d6e0] flex items-center gap-1"
                                            title="Open Dedicated Page"
                                        >
                                            <Eye className="w-3 h-3 text-[#5e6ad2]" />
                                            <span>Case Study</span>
                                        </a>
                                        {project.github_url && (
                                            <a href={project.github_url} target="_blank" className="hover:text-[#5e6ad2]" title="GitHub">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                        {project.demo_url && (
                                            <a href={project.demo_url} target="_blank" className="hover:text-emerald-400" title="Demo">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => openEditModal(project)}
                                            className="p-1.5 text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#141516] rounded transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className="p-1.5 text-[#8a8f98] hover:text-rose-400 hover:bg-[#141516] rounded transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-[#0f1011] border border-[#23252a] rounded-xl max-w-2xl w-full p-6 space-y-4 shadow-2xl my-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center justify-between border-b border-[#23252a] pb-3 sticky top-0 bg-[#0f1011] z-10">
                            <div>
                                <h3 className="text-sm font-semibold text-[#f7f8f8]">
                                    {editingProject ? 'Edit Project & Case Study' : 'Add New Project & Case Study'}
                                </h3>
                                <p className="text-[11px] text-[#8a8f98]">
                                    Configure project cards, covers, media proof, and dedicated page details
                                </p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-[#8a8f98] hover:text-[#f7f8f8]">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-mono text-[#8a8f98]">Project Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="e.g. Casino Gaming Kiosk Hardware Bridge"
                                    className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none"
                                    required
                                />
                                {errors.title && <p className="text-rose-400 text-[10px]">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Category Badge</label>
                                    <input
                                        type="text"
                                        value={data.badge}
                                        onChange={(e) => setData('badge', e.target.value)}
                                        placeholder="Hardware / IoT, SaaS Platform"
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Organization / Client</label>
                                    <input
                                        type="text"
                                        value={data.organization}
                                        onChange={(e) => setData('organization', e.target.value)}
                                        placeholder="NTT Limited, WarrDev"
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-mono text-[#8a8f98]">Short Card Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={2}
                                    placeholder="Brief impact summary for cards..."
                                    className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none resize-none"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-mono text-[#8a8f98]">
                                    Dedicated Page Case Study Content (Markdown / Detailed Overview)
                                </label>
                                <textarea
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    rows={4}
                                    placeholder="Comprehensive architectural write-up, key challenges, engineering breakthroughs, performance benches..."
                                    className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none font-mono"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-mono text-[#8a8f98]">Tech Tags (Comma-separated)</label>
                                <input
                                    type="text"
                                    value={data.tags}
                                    onChange={(e) => setData('tags', e.target.value)}
                                    placeholder="C++, WebSockets, Electron, Ubuntu Server"
                                    className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none"
                                />
                            </div>

                            {/* Links & Status */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">GitHub URL</label>
                                    <input
                                        type="url"
                                        value={data.github_url}
                                        onChange={(e) => setData('github_url', e.target.value)}
                                        placeholder="https://github.com/..."
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Repository Status</label>
                                    <select
                                        value={data.github_status}
                                        onChange={(e) => setData('github_status', e.target.value)}
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none"
                                    >
                                        <option value="public">Public (Direct link)</option>
                                        <option value="private">Private (Proprietary / Client owned)</option>
                                        <option value="nda">Confidential / NDA Protected</option>
                                        <option value="archived">Archived / Deprecated</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Live Demo URL</label>
                                    <input
                                        type="url"
                                        value={data.demo_url}
                                        onChange={(e) => setData('demo_url', e.target.value)}
                                        placeholder="https://..."
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Demo Availability Status</label>
                                    <select
                                        value={data.demo_status}
                                        onChange={(e) => setData('demo_status', e.target.value)}
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none"
                                    >
                                        <option value="live">Live Online (Active URL)</option>
                                        <option value="offline">Offline / Not available on internet</option>
                                        <option value="internal">Internal / LAN Only (Casino / On-premise)</option>
                                        <option value="decommissioned">Decommissioned / Historical</option>
                                    </select>
                                </div>
                            </div>

                            {/* Section 1: Dedicated Cover Image */}
                            <div className="space-y-2 p-3.5 rounded-lg bg-[#141516] border border-[#23252a]">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-mono text-[#f7f8f8] flex items-center gap-1.5">
                                        <ImageIcon className="w-3.5 h-3.5 text-[#5e6ad2]" />
                                        <span>Project Cover Header Image</span>
                                    </label>
                                    <span className="text-[10px] font-mono text-[#8a8f98]">
                                        Hero backdrop on dedicated page
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-[11px] font-mono text-[#8a8f98] block mb-1">
                                            Cover Image URL
                                        </label>
                                        <input
                                            type="text"
                                            value={data.cover_image || ''}
                                            onChange={(e) => setData('cover_image', e.target.value)}
                                            placeholder="https://... or /storage/..."
                                            className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-1.5 text-xs text-[#f7f8f8] focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-mono text-[#8a8f98] block mb-1">
                                            Or Upload Cover File
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCoverChange}
                                            className="text-xs text-[#8a8f98] file:mr-2.5 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-mono file:bg-[#1e2024] file:text-[#d0d6e0] hover:file:bg-[#282a30]"
                                        />
                                    </div>
                                </div>

                                {(coverPreview || data.cover_image) && (
                                    <div className="relative rounded-lg overflow-hidden border border-[#23252a] bg-[#0f1011] aspect-video max-h-40 flex items-center justify-center">
                                        <img
                                            src={coverPreview || data.cover_image}
                                            alt="Cover preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Section 2: Primary Card Media (Image / Video) */}
                            <div className="space-y-2 p-3.5 rounded-lg bg-[#141516] border border-[#23252a]">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-mono text-[#f7f8f8] flex items-center gap-1.5">
                                        <VideoIcon className="w-3.5 h-3.5 text-[#5e6ad2]" />
                                        <span>Card Primary Media (Preview Picture or Video)</span>
                                    </label>
                                    <span className="text-[10px] font-mono text-[#8a8f98]">
                                        Interactive card preview
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    {['none', 'image', 'video'].map((type) => (
                                        <button
                                            type="button"
                                            key={type}
                                            onClick={() => setData('media_type', type)}
                                            className={`py-1.5 px-2 rounded border text-xs font-mono capitalize transition-all ${
                                                data.media_type === type
                                                    ? 'bg-[#5e6ad2]/20 border-[#5e6ad2] text-[#f7f8f8]'
                                                    : 'bg-[#0f1011] border-[#23252a] text-[#8a8f98] hover:border-[#383b42]'
                                            }`}
                                        >
                                            {type === 'none' ? 'No Media' : type}
                                        </button>
                                    ))}
                                </div>

                                {data.media_type !== 'none' && (
                                    <div className="space-y-3 pt-2">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <div>
                                                <label className="text-[11px] font-mono text-[#8a8f98] block mb-1">
                                                    Media URL (link)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.media_url || ''}
                                                    onChange={(e) => setData('media_url', e.target.value)}
                                                    placeholder="https://... or /storage/..."
                                                    className="w-full bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-1.5 text-xs text-[#f7f8f8] focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-mono text-[#8a8f98] block mb-1">
                                                    Or Upload Media File
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*,video/*"
                                                    onChange={handleFileChange}
                                                    className="text-xs text-[#8a8f98] file:mr-2.5 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-mono file:bg-[#1e2024] file:text-[#d0d6e0] hover:file:bg-[#282a30]"
                                                />
                                            </div>
                                        </div>

                                        {(filePreview || data.media_url) && (
                                            <div className="relative rounded-lg overflow-hidden border border-[#23252a] bg-[#0f1011] aspect-video flex items-center justify-center max-h-48">
                                                {data.media_type === 'video' ? (
                                                    <video
                                                        src={filePreview || data.media_url}
                                                        controls
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    <img
                                                        src={filePreview || data.media_url}
                                                        alt="Media preview"
                                                        className="w-full h-full object-contain"
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Section 3: Multi-Media Gallery for Dedicated Page */}
                            <div className="space-y-2 p-3.5 rounded-lg bg-[#141516] border border-[#23252a]">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-xs font-mono text-[#f7f8f8] flex items-center gap-1.5">
                                            <Layers className="w-3.5 h-3.5 text-[#5e6ad2]" />
                                            <span>Media Proof Gallery (Screenshots & Video Demos)</span>
                                        </label>
                                        <p className="text-[10px] font-mono text-[#8a8f98]">
                                            Multiple images or videos showcasing the architecture for the dedicated page
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddGalleryItem}
                                        className="text-[11px] font-mono px-2 py-1 rounded bg-[#1e2024] hover:bg-[#282a30] text-[#828fff] border border-[#2e3138] flex items-center gap-1 transition-colors"
                                    >
                                        <Plus className="w-3 h-3" />
                                        <span>Add URL Asset</span>
                                    </button>
                                </div>

                                <div className="space-y-2 pt-1">
                                    <label className="text-[11px] font-mono text-[#8a8f98] block">
                                        Or Batch Upload Files to Gallery (Images & MP4s):
                                    </label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*,video/*"
                                        onChange={handleGalleryFilesChange}
                                        className="text-xs text-[#8a8f98] file:mr-2.5 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-mono file:bg-[#1e2024] file:text-[#d0d6e0] hover:file:bg-[#282a30]"
                                    />
                                    {data.gallery_files && data.gallery_files.length > 0 && (
                                        <span className="text-[10px] font-mono text-emerald-400 block">
                                            {data.gallery_files.length} new files queued for upload
                                        </span>
                                    )}
                                </div>

                                {galleryItems.length > 0 && (
                                    <div className="space-y-2 pt-2 border-t border-[#23252a]/60">
                                        {galleryItems.map((item, gIdx) => (
                                            <div key={gIdx} className="flex items-center gap-2">
                                                <select
                                                    value={item.type}
                                                    onChange={(e) => handleUpdateGalleryItem(gIdx, 'type', e.target.value)}
                                                    className="bg-[#0f1011] border border-[#23252a] text-xs font-mono text-[#f7f8f8] px-2 py-1.5 rounded"
                                                >
                                                    <option value="image">Image</option>
                                                    <option value="video">Video</option>
                                                </select>
                                                <input
                                                    type="text"
                                                    value={item.url}
                                                    onChange={(e) => handleUpdateGalleryItem(gIdx, 'url', e.target.value)}
                                                    placeholder="URL (https://... or /storage/...)"
                                                    className="flex-1 bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#f7f8f8] focus:outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    value={item.caption}
                                                    onChange={(e) => handleUpdateGalleryItem(gIdx, 'caption', e.target.value)}
                                                    placeholder="Caption / Description"
                                                    className="w-1/3 bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#f7f8f8] focus:outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveGalleryItem(gIdx)}
                                                    className="p-1.5 text-[#8a8f98] hover:text-rose-400 transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Section 4: Extra Info & Metrics */}
                            <div className="space-y-2 p-3.5 rounded-lg bg-[#141516] border border-[#23252a]">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="text-xs font-mono text-[#f7f8f8]">
                                            Extra Info & Metrics (Counters, Stats)
                                        </label>
                                        <p className="text-[10px] font-mono text-[#8a8f98]">
                                            e.g., Active Users: 120k+, Hardware Devices: 450, Latency: &lt;15ms
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddExtraField}
                                        className="text-[11px] font-mono px-2 py-1 rounded bg-[#1e2024] hover:bg-[#282a30] text-[#828fff] border border-[#2e3138] flex items-center gap-1 transition-colors"
                                    >
                                        <Plus className="w-3 h-3" />
                                        <span>Add Metric</span>
                                    </button>
                                </div>

                                {extraInfoFields.length === 0 ? (
                                    <p className="text-[11px] font-mono text-[#62666d] italic py-1">
                                        No custom metrics added yet. Click &quot;Add Metric&quot; to configure counter numbers or key stats.
                                    </p>
                                ) : (
                                    <div className="space-y-2 pt-1">
                                        {extraInfoFields.map((field, fIdx) => (
                                            <div key={fIdx} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={field.key}
                                                    onChange={(e) => handleUpdateExtraField(fIdx, 'key', e.target.value)}
                                                    placeholder="Metric (e.g. Active Users)"
                                                    className="w-1/2 bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#f7f8f8] focus:outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    value={field.value}
                                                    onChange={(e) => handleUpdateExtraField(fIdx, 'value', e.target.value)}
                                                    placeholder="Value (e.g. 50,000+)"
                                                    className="w-1/2 bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#f7f8f8] focus:outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveExtraField(fIdx)}
                                                    className="p-1.5 text-[#8a8f98] hover:text-rose-400 transition-colors"
                                                    title="Remove metric"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
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
                                    className="bg-[#5e6ad2] hover:bg-[#828fff] text-white text-xs font-medium px-5 py-2.5 rounded-md shadow-[0_0_16px_rgba(94,106,210,0.35)] transition-all"
                                >
                                    {editingProject ? 'Update Project' : 'Create Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
