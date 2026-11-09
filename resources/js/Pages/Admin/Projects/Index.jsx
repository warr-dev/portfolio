import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, router } from '@inertiajs/react';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    X, 
    ExternalLink, 
    Image as ImageIcon, 
    Video as VideoIcon, 
    Eye, 
    EyeOff, 
    Layers, 
    Upload, 
    ArrowUp, 
    ArrowDown, 
    BookOpen 
} from 'lucide-react';

const GithubIcon = ({ className = 'w-3.5 h-3.5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

export default function ProjectsIndex({ projects }) {
    const [editingProject, setEditingProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [extraInfoFields, setExtraInfoFields] = useState([]);
    const [filePreview, setFilePreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const [galleryItems, setGalleryItems] = useState([]);
    const [reordering, setReordering] = useState(false);

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

    const handleAddGalleryItem = () => {
        setGalleryItems([...galleryItems, { type: 'image', url: '', caption: '' }]);
    };

    const handleUpdateGalleryItem = (index, field, value) => {
        const updated = [...galleryItems];
        updated[index][field] = value;
        setGalleryItems(updated);
    };

    const handleRemoveGalleryItem = (index) => {
        const updated = galleryItems.filter((_, idx) => idx !== index);
        setGalleryItems(updated);
    };

    const handleAddExtraField = () => {
        setExtraInfoFields([...extraInfoFields, { key: '', value: '' }]);
    };

    const handleUpdateExtraField = (index, keyOrVal, value) => {
        const updated = [...extraInfoFields];
        updated[index][keyOrVal] = value;
        setExtraInfoFields(updated);
    };

    const handleRemoveExtraField = (index) => {
        const updated = extraInfoFields.filter((_, idx) => idx !== index);
        setExtraInfoFields(updated);
    };

    const toggleVisibility = (project) => {
        router.put(`/admin/projects/${project.id}`, {
            ...project,
            featured: !project.featured,
        }, {
            preserveScroll: true,
        });
    };

    const moveProject = (index, direction) => {
        if (reordering) return;
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= projects.length) return;

        const newProjects = [...projects];
        const temp = newProjects[index];
        newProjects[index] = newProjects[targetIndex];
        newProjects[targetIndex] = temp;

        const orders = newProjects.map((p, idx) => ({
            id: p.id,
            sort_order: idx + 1,
        }));

        setReordering(true);
        router.post('/admin/projects/reorder', { orders }, {
            preserveScroll: true,
            onFinish: () => setReordering(false),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const extraObj = {};
        extraInfoFields.forEach((f) => {
            if (f.key.trim()) {
                extraObj[f.key.trim()] = f.value.trim();
            }
        });

        const tagList = data.tags
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t !== '');

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('badge', data.badge || '');
        formData.append('organization', data.organization || '');
        formData.append('description', data.description);
        formData.append('content', data.content || '');
        formData.append('demo_url', data.demo_url || '');
        formData.append('github_url', data.github_url || '');
        formData.append('demo_status', data.demo_status);
        formData.append('github_status', data.github_status);
        formData.append('cover_image', data.cover_image || '');
        formData.append('media_type', data.media_type);
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
            <div className="flex items-center justify-between pb-2">
                <div>
                    <h2 className="text-sm font-semibold text-[#f7f8f8]">Projects ({projects.length})</h2>
                    <p className="text-xs text-[#8a8f98]">Reorder, toggle visibility, and update portfolio cards</p>
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
            <div className="bg-[#0f1011] border border-[#23252a] rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left text-xs min-w-[720px]">
                        <thead className="bg-[#141516] border-b border-[#23252a] font-mono text-[#8a8f98]">
                            <tr>
                                <th className="p-3.5 w-16 text-center shrink-0">Order</th>
                                <th className="p-3.5 min-w-[200px]">Cover & Title</th>
                                <th className="p-3.5">Organization</th>
                                <th className="p-3.5 min-w-[150px]">Tags</th>
                                <th className="p-3.5 w-24 text-center shrink-0">Status</th>
                                <th className="p-3.5 w-28 text-center shrink-0">Links</th>
                                <th className="p-3.5 w-24 text-right shrink-0">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#23252a]">
                        {projects.map((project, idx) => (
                            <tr key={project.id} className={`hover:bg-[#141516]/50 transition-colors ${!project.featured ? 'opacity-60 bg-[#141516]/20' : ''}`}>
                                {/* Order Controls */}
                                <td className="p-3.5 text-center">
                                    <div className="flex items-center justify-center gap-0.5 font-mono text-xs">
                                        <button
                                            type="button"
                                            disabled={idx === 0 || reordering}
                                            onClick={() => moveProject(idx, 'up')}
                                            className="p-1 rounded text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#1e2024] disabled:opacity-20 transition-colors"
                                            title="Move Up"
                                        >
                                            <ArrowUp className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="w-4 text-center font-semibold text-[#8a8f98]">{idx + 1}</span>
                                        <button
                                            type="button"
                                            disabled={idx === projects.length - 1 || reordering}
                                            onClick={() => moveProject(idx, 'down')}
                                            className="p-1 rounded text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#1e2024] disabled:opacity-20 transition-colors"
                                            title="Move Down"
                                        >
                                            <ArrowDown className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </td>

                                {/* Cover & Title */}
                                <td className="p-3.5">
                                    <div className="flex items-center gap-3">
                                        {project.cover_image || project.media_url ? (
                                            <div className="w-11 h-11 rounded-lg overflow-hidden border border-[#23252a] bg-[#141516] flex-shrink-0 flex items-center justify-center relative">
                                                {project.cover_image ? (
                                                    <img
                                                        src={project.cover_image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : project.media_type === 'video' ? (
                                                    <div className="w-full h-full flex items-center justify-center bg-[#1e2024]">
                                                        <VideoIcon className="w-4 h-4 text-[#828fff]" />
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
                                            <div className="w-11 h-11 rounded-lg border border-[#23252a]/60 bg-[#141516] flex-shrink-0 flex items-center justify-center text-[#62666d]">
                                                <ImageIcon className="w-4 h-4 opacity-40" />
                                            </div>
                                        )}

                                        <div>
                                            <div className="font-semibold text-[#f7f8f8] flex items-center gap-2">
                                                <span>{project.title}</span>
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

                                {/* Organization */}
                                <td className="p-3.5 font-mono text-[#8a8f98]">{project.organization || '—'}</td>

                                {/* Tags */}
                                <td className="p-3.5">
                                    <div className="flex flex-wrap gap-1 max-w-xs">
                                        {project.tags && project.tags.map((t, tIdx) => (
                                            <span key={tIdx} className="text-[10px] font-mono bg-[#18191a] text-[#8a8f98] px-1.5 py-0.5 rounded">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </td>

                                {/* Visibility Status */}
                                <td className="p-3.5 text-center">
                                    <button
                                        type="button"
                                        onClick={() => toggleVisibility(project)}
                                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-mono transition-colors border ${
                                            project.featured
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                                                : 'bg-zinc-800/50 text-[#8a8f98] border-zinc-700 hover:bg-zinc-800'
                                        }`}
                                        title={project.featured ? 'Visible on Portfolio (Click to Hide)' : 'Hidden from Portfolio (Click to Show)'}
                                    >
                                        {project.featured ? (
                                            <>
                                                <Eye className="w-3 h-3 text-emerald-400" />
                                                <span>Visible</span>
                                            </>
                                        ) : (
                                            <>
                                                <EyeOff className="w-3 h-3 text-[#8a8f98]" />
                                                <span>Hidden</span>
                                            </>
                                        )}
                                    </button>
                                </td>

                                {/* Clean Icon-Only Clickable Links with Tooltips */}
                                <td className="p-3.5 text-center">
                                    <div className="inline-flex items-center justify-center gap-1 text-[#8a8f98]">
                                        {/* Case Study Page */}
                                        <a
                                            href={`/projects/${project.slug}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-1.5 rounded-md hover:bg-[#1e2024] hover:text-[#5e6ad2] transition-colors"
                                            title="View Case Study Page"
                                        >
                                            <BookOpen className="w-3.5 h-3.5" />
                                        </a>

                                        {/* GitHub Repository */}
                                        {project.github_url ? (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-1.5 rounded-md hover:bg-[#1e2024] hover:text-[#f7f8f8] transition-colors"
                                                title={`GitHub (${project.github_status || 'public'})`}
                                            >
                                                <GithubIcon className="w-3.5 h-3.5" />
                                            </a>
                                        ) : (
                                            <span className="p-1.5 text-zinc-700 opacity-40 cursor-not-allowed" title="No GitHub URL">
                                                <GithubIcon className="w-3.5 h-3.5" />
                                            </span>
                                        )}

                                        {/* Live Demo */}
                                        {project.demo_url ? (
                                            <a
                                                href={project.demo_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-1.5 rounded-md hover:bg-[#1e2024] hover:text-emerald-400 transition-colors"
                                                title={`Live Demo (${project.demo_status || 'live'})`}
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        ) : (
                                            <span className="p-1.5 text-zinc-700 opacity-40 cursor-not-allowed" title="No Live Demo URL">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </span>
                                        )}
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="p-3.5 text-right">
                                    <div className="flex items-center justify-end gap-1">
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
        </div>

            {/* Modal with Fixed Header and Scrollable Body */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#0f1011] border border-[#23252a] rounded-xl max-w-2xl w-full shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        
                        {/* Fixed Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#23252a] bg-[#0f1011] shrink-0">
                            <div>
                                <h3 className="text-sm font-semibold text-[#f7f8f8]">
                                    {editingProject ? 'Edit Project' : 'New Project'}
                                </h3>
                                <p className="text-xs text-[#8a8f98]">
                                    Card details, links, media, and case study
                                </p>
                            </div>
                            <button 
                                type="button"
                                onClick={() => setIsModalOpen(false)} 
                                className="text-[#8a8f98] hover:text-[#f7f8f8] p-1 rounded-md hover:bg-[#141516] transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Scrollable Form Body */}
                        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                                
                                {/* Visibility & Ordering Quick Settings */}
                                <div className="flex items-center justify-between p-3 rounded-lg bg-[#141516] border border-[#23252a]">
                                    <div>
                                        <label className="text-xs font-mono text-[#f7f8f8] block">Portfolio Visibility</label>
                                        <p className="text-[11px] text-[#8a8f98]">Display this card publicly in the Projects section</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={Boolean(data.featured)}
                                            onChange={(e) => setData('featured', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-9 h-5 bg-[#23252a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5e6ad2]"></div>
                                    </label>
                                </div>

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
                                    <label className="text-xs font-mono text-[#8a8f98]">Card Description</label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={2}
                                        placeholder="Brief impact summary for portfolio card..."
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none resize-none"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">
                                        Case Study Content (Markdown)
                                    </label>
                                    <textarea
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        rows={4}
                                        placeholder="Overview, engineering breakthroughs, architecture..."
                                        className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none font-mono"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-mono text-[#8a8f98]">Tech Tags (Comma-separated)</label>
                                    <input
                                        type="text"
                                        value={data.tags}
                                        onChange={(e) => setData('tags', e.target.value)}
                                        placeholder="C++, WebSockets, Electron, Ubuntu"
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
                                            <option value="public">Public</option>
                                            <option value="private">Private (Proprietary)</option>
                                            <option value="nda">Confidential / NDA</option>
                                            <option value="archived">Archived</option>
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
                                        <label className="text-xs font-mono text-[#8a8f98]">Demo Status</label>
                                        <select
                                            value={data.demo_status}
                                            onChange={(e) => setData('demo_status', e.target.value)}
                                            className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3 py-2 text-xs text-[#f7f8f8] focus:outline-none"
                                        >
                                            <option value="live">Live Online</option>
                                            <option value="offline">Offline / Sunset</option>
                                            <option value="internal">Internal / LAN Only</option>
                                            <option value="decommissioned">Decommissioned</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Section 1: Cover Header Image */}
                                <div className="space-y-2 p-3.5 rounded-lg bg-[#141516] border border-[#23252a]">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-mono text-[#f7f8f8] flex items-center gap-1.5">
                                            <ImageIcon className="w-3.5 h-3.5 text-[#5e6ad2]" />
                                            <span>Cover Image</span>
                                        </label>
                                        <span className="text-[10px] font-mono text-[#8a8f98]">
                                            Dedicated page banner
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div>
                                            <label className="text-[11px] font-mono text-[#8a8f98] block mb-1">
                                                Image URL
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
                                                Or Upload File
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
                                            <span>Card Media (Preview)</span>
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
                                                        Media URL
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
                                                        Or Upload File
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

                                {/* Section 3: Media Gallery for Dedicated Page */}
                                <div className="space-y-2 p-3.5 rounded-lg bg-[#141516] border border-[#23252a]">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <label className="text-xs font-mono text-[#f7f8f8] flex items-center gap-1.5">
                                                <Layers className="w-3.5 h-3.5 text-[#5e6ad2]" />
                                                <span>Gallery Proof (Case Study)</span>
                                            </label>
                                            <p className="text-[10px] font-mono text-[#8a8f98]">
                                                Screenshots and demos on dedicated page
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleAddGalleryItem}
                                            className="text-[11px] font-mono px-2 py-1 rounded bg-[#1e2024] hover:bg-[#282a30] text-[#828fff] border border-[#2e3138] flex items-center gap-1 transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                            <span>Add Asset</span>
                                        </button>
                                    </div>

                                    <div className="space-y-2 pt-1">
                                        <label className="text-[11px] font-mono text-[#8a8f98] block">
                                            Batch Upload Gallery Files:
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
                                                {data.gallery_files.length} new files queued
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
                                                        placeholder="URL"
                                                        className="flex-1 bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#f7f8f8] focus:outline-none"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={item.caption}
                                                        onChange={(e) => handleUpdateGalleryItem(gIdx, 'caption', e.target.value)}
                                                        placeholder="Caption"
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
                                                Custom Metrics & Key Stats
                                            </label>
                                            <p className="text-[10px] font-mono text-[#8a8f98]">
                                                e.g. Active Users: 120k+, Latency: &lt;15ms
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
                                            No custom metrics added yet.
                                        </p>
                                    ) : (
                                        <div className="space-y-2 pt-1">
                                            {extraInfoFields.map((field, fIdx) => (
                                                <div key={fIdx} className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={field.key}
                                                        onChange={(e) => handleUpdateExtraField(fIdx, 'key', e.target.value)}
                                                        placeholder="Metric (e.g. Architecture)"
                                                        className="w-1/2 bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#f7f8f8] focus:outline-none"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={field.value}
                                                        onChange={(e) => handleUpdateExtraField(fIdx, 'value', e.target.value)}
                                                        placeholder="Value (e.g. Hybrid Cloud)"
                                                        className="w-1/2 bg-[#0f1011] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-2.5 py-1.5 text-xs font-mono text-[#f7f8f8] focus:outline-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveExtraField(fIdx)}
                                                        className="p-1.5 text-[#8a8f98] hover:text-rose-400 transition-colors"
                                                        title="Remove"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Fixed Footer */}
                            <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#23252a] bg-[#0f1011] shrink-0">
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
                                    className="bg-[#5e6ad2] hover:bg-[#828fff] text-white text-xs font-medium px-5 py-2 rounded-md shadow-[0_0_16px_rgba(94,106,210,0.35)] transition-all"
                                >
                                    {editingProject ? 'Save Changes' : 'Create Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
