import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ExternalLink, Lock, ShieldAlert, WifiOff, Eye, Image as ImageIcon, Video as VideoIcon, X, ArrowUpRight } from 'lucide-react';

export default function ProjectsSection({ projects }) {
    const [selectedMedia, setSelectedMedia] = useState(null);

    const renderDemoBadge = (status, url) => {
        switch (status) {
            case 'offline':
                return (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <WifiOff className="w-2.5 h-2.5" />
                        Offline / Sunset
                    </span>
                );
            case 'internal':
                return (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Lock className="w-2.5 h-2.5" />
                        Internal / LAN Only
                    </span>
                );
            case 'decommissioned':
                return (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                        Decommissioned
                    </span>
                );
            case 'live':
            default:
                if (url) {
                    return (
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Live Demo</span>
                            <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                        </a>
                    );
                }
                return null;
        }
    };

    const renderGithubBadge = (status, url) => {
        switch (status) {
            case 'private':
                return (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#8a8f98]" title="Proprietary commercial codebase">
                        <Lock className="w-2.5 h-2.5" />
                        Private Repo
                    </span>
                );
            case 'nda':
                return (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400/90" title="Protected under Non-Disclosure Agreement">
                        <ShieldAlert className="w-2.5 h-2.5 text-amber-400" />
                        NDA Protected
                    </span>
                );
            case 'archived':
                return (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#62666d]">
                        Archived
                    </span>
                );
            case 'public':
            default:
                if (url) {
                    return (
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-[#8a8f98] hover:text-[#5e6ad2] transition-colors"
                        >
                            <span>Source Code</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                    );
                }
                return null;
        }
    };

    return (
        <section id="projects" className="space-y-8">
            <div className="flex items-baseline justify-between border-b border-[#23252a] pb-4">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight text-[#f7f8f8]">Featured Systems & Projects</h2>
                    <p className="text-xs text-[#8a8f98] mt-0.5">High-impact architectures, micro-SaaS, and hardware integrations</p>
                </div>
                <span className="font-mono text-xs text-[#62666d]">0{projects.length} Works</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="group relative bg-[#0f1011] hover:bg-[#141516] border border-[#23252a] hover:border-[#34343a] p-6 rounded-xl transition-all duration-200 flex flex-col justify-between"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-mono text-[#5e6ad2] bg-[#5e6ad2]/10 px-2 py-0.5 rounded border border-[#5e6ad2]/20">
                                    {project.badge || 'Engineering'}
                                </span>
                                {project.organization && (
                                    <span className="text-xs font-mono text-[#8a8f98]">{project.organization}</span>
                                )}
                            </div>

                            <div className="flex items-start justify-between gap-2">
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="text-base font-semibold text-[#f7f8f8] hover:text-[#5e6ad2] transition-colors inline-flex items-center gap-1 group/link"
                                >
                                    <span>{project.title}</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8a8f98] group-hover/link:text-[#5e6ad2] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                </Link>
                            </div>

                            {/* Media Preview / Screenshot / Architecture Preview */}
                            {project.media_type && project.media_type !== 'none' && project.media_url && (
                                <div
                                    onClick={() => setSelectedMedia(project)}
                                    className="relative rounded-lg overflow-hidden border border-[#23252a] bg-[#141516] aspect-video cursor-pointer group/media hover:border-[#5e6ad2]/50 transition-all my-2"
                                >
                                    {project.media_type === 'image' ? (
                                        <img
                                            src={project.media_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="relative w-full h-full bg-[#18191a] flex items-center justify-center">
                                            <video
                                                src={project.media_url}
                                                className="w-full h-full object-cover"
                                                muted
                                                loop
                                                playsInline
                                                onMouseEnter={(e) => e.target.play()}
                                                onMouseLeave={(e) => e.target.pause()}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover/media:opacity-0 transition-opacity">
                                                <VideoIcon className="w-8 h-8 text-[#f7f8f8]" />
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/80 backdrop-blur-sm text-[10px] font-mono text-[#d0d6e0] flex items-center gap-1 opacity-0 group-hover/media:opacity-100 transition-opacity">
                                        <Eye className="w-3 h-3 text-[#5e6ad2]" />
                                        <span>Click to Inspect</span>
                                    </div>
                                </div>
                            )}

                            <p className="text-xs text-[#8a8f98] leading-relaxed">
                                {project.description}
                            </p>

                            {/* Extra Info & Key Metrics / Counters */}
                            {project.extra_info && Object.keys(project.extra_info).length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                                    {Object.entries(project.extra_info).map(([key, val], mIdx) => (
                                        <div
                                            key={mIdx}
                                            className="p-2 rounded-lg bg-[#141516] border border-[#23252a] flex flex-col justify-center"
                                        >
                                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8f98] truncate">
                                                {key}
                                            </span>
                                            <span className="text-xs font-mono font-semibold text-[#f7f8f8] mt-0.5 truncate">
                                                {String(val)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="pt-6 space-y-4">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5">
                                {project.tags && project.tags.map((tag, tIdx) => (
                                    <span
                                        key={tIdx}
                                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18191a] text-[#8a8f98] border border-[#23252a]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Status & Availability Links */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#23252a]/60">
                                <div className="flex items-center gap-2">
                                    {renderGithubBadge(project.github_status, project.github_url)}
                                </div>

                                <div className="flex items-center gap-2">
                                    {renderDemoBadge(project.demo_status, project.demo_url)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Media Inspection Modal */}
            {selectedMedia && (
                <div
                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
                    onClick={() => setSelectedMedia(null)}
                >
                    <div
                        className="bg-[#0f1011] border border-[#23252a] rounded-2xl max-w-4xl w-full p-4 sm:p-6 space-y-4 shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-[#23252a] pb-3">
                            <div>
                                <h3 className="text-sm font-semibold text-[#f7f8f8]">{selectedMedia.title}</h3>
                                <p className="text-xs text-[#8a8f98]">{selectedMedia.organization || 'Visual Showcase & Evidence'}</p>
                            </div>
                            <button
                                onClick={() => setSelectedMedia(null)}
                                className="p-1.5 rounded-lg bg-[#141516] hover:bg-[#1e2024] text-[#8a8f98] hover:text-[#f7f8f8]"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="rounded-xl overflow-hidden bg-black/60 flex items-center justify-center max-h-[70vh]">
                            {selectedMedia.media_type === 'image' ? (
                                <img
                                    src={selectedMedia.media_url}
                                    alt={selectedMedia.title}
                                    className="max-w-full max-h-[65vh] object-contain rounded-lg"
                                />
                            ) : (
                                <video
                                    src={selectedMedia.media_url}
                                    controls
                                    autoPlay
                                    className="max-w-full max-h-[65vh] rounded-lg"
                                />
                            )}
                        </div>

                        <p className="text-xs text-[#8a8f98] font-mono leading-relaxed pt-1">
                            {selectedMedia.description}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}
