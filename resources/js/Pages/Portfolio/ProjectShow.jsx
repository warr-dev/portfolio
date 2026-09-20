import React, { useState } from 'react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Link } from '@inertiajs/react';
import { 
    ArrowLeft, 
    ExternalLink, 
    Lock, 
    ShieldAlert, 
    WifiOff, 
    Layers, 
    Calendar, 
    Building2, 
    Image as ImageIcon, 
    Video as VideoIcon, 
    Eye, 
    X,
    ChevronRight
} from 'lucide-react';

export default function ProjectShow({ project, relatedProjects = [], recruiterData }) {
    const [activeGalleryMedia, setActiveGalleryMedia] = useState(null);

    const renderDemoBadge = (status, url) => {
        switch (status) {
            case 'offline':
                return (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <WifiOff className="w-3.5 h-3.5" />
                        Offline / Decommissioned from Web
                    </span>
                );
            case 'internal':
                return (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Lock className="w-3.5 h-3.5" />
                        Internal LAN / On-Premises Architecture Only
                    </span>
                );
            case 'decommissioned':
                return (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 border border-zinc-700">
                        Decommissioned System
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
                            className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Launch Live System</span>
                            <ExternalLink className="w-3 h-3 ml-0.5" />
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
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-[#141516] text-[#8a8f98] border border-[#23252a]">
                        <Lock className="w-3.5 h-3.5" />
                        Private Repository (Commercial IP)
                    </span>
                );
            case 'nda':
                return (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Confidential (Protected under NDA)
                    </span>
                );
            case 'archived':
                return (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-[#141516] text-[#62666d] border border-[#23252a]">
                        Archived Repository
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
                            className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-[#141516] text-[#f7f8f8] border border-[#23252a] hover:border-[#5e6ad2] transition-colors"
                        >
                            <span>Inspect Source Code</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    );
                }
                return null;
        }
    };

    const galleryItems = Array.isArray(project.gallery) ? project.gallery : [];

    return (
        <PortfolioLayout title={`${project.title} — Warren Dalawampu`}>
            <Navbar recruiterData={recruiterData} />

            <main className="relative z-10 max-w-4xl mx-auto px-6 pt-12 pb-24 space-y-12">
                
                {/* Back Link */}
                <div>
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-xs font-mono text-[#8a8f98] hover:text-[#f7f8f8] transition-colors py-1 group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to All Works</span>
                    </Link>
                </div>

                {/* Project Header Header */}
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono text-[#5e6ad2] bg-[#5e6ad2]/10 px-2.5 py-1 rounded-md border border-[#5e6ad2]/20">
                            {project.badge || 'Engineering Architecture'}
                        </span>
                        {project.organization && (
                            <span className="inline-flex items-center gap-1 text-xs font-mono text-[#8a8f98] bg-[#141516] px-2.5 py-1 rounded-md border border-[#23252a]">
                                <Building2 className="w-3 h-3" />
                                {project.organization}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f7f8f8] leading-[1.1]">
                        {project.title}
                    </h1>

                    <p className="text-base sm:text-lg text-[#8a8f98] leading-relaxed max-w-3xl">
                        {project.description}
                    </p>

                    {/* Action & Availability Bar */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        {renderDemoBadge(project.demo_status, project.demo_url)}
                        {renderGithubBadge(project.github_status, project.github_url)}
                    </div>
                </div>

                {/* Hero Cover Media / Main Architecture Showcase */}
                {(project.cover_image || (project.media_type !== 'none' && project.media_url)) && (
                    <div className="space-y-3">
                        <div className="relative rounded-2xl overflow-hidden border border-[#23252a] bg-[#0f1011] shadow-2xl aspect-video">
                            {project.cover_image ? (
                                <img
                                    src={project.cover_image}
                                    alt={`${project.title} Cover`}
                                    className="w-full h-full object-cover"
                                />
                            ) : project.media_type === 'video' ? (
                                <video
                                    src={project.media_url}
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img
                                    src={project.media_url}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <span className="text-[11px] font-mono text-[#62666d] block text-center">
                            Architecture Diagram & Interface Production Capture
                        </span>
                    </div>
                )}

                {/* Performance Metrics & Extra Information Grid */}
                {project.extra_info && Object.keys(project.extra_info).length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-xs font-mono uppercase tracking-wider text-[#5e6ad2] border-b border-[#23252a] pb-2">
                            Key Performance Metrics & Architectural Telemetry
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {Object.entries(project.extra_info).map(([key, val], idx) => (
                                <div
                                    key={idx}
                                    className="bg-[#0f1011] border border-[#23252a] p-4 rounded-xl space-y-1 hover:border-[#383b42] transition-colors"
                                >
                                    <span className="text-[10px] font-mono text-[#8a8f98] uppercase tracking-wider block truncate">
                                        {key}
                                    </span>
                                    <p className="text-lg font-mono font-semibold text-[#f7f8f8] truncate">
                                        {String(val)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* In-Depth Technical Specification / Content */}
                {project.content ? (
                    <div className="space-y-4">
                        <h2 className="text-xs font-mono uppercase tracking-wider text-[#5e6ad2] border-b border-[#23252a] pb-2">
                            Detailed Engineering Case Study
                        </h2>
                        <div className="prose prose-invert max-w-none text-sm text-[#d0d6e0] leading-relaxed whitespace-pre-line space-y-4 font-normal">
                            {project.content}
                        </div>
                    </div>
                ) : null}

                {/* Media Proof Gallery & Video Demonstrations */}
                {galleryItems.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-baseline justify-between border-b border-[#23252a] pb-2">
                            <h2 className="text-xs font-mono uppercase tracking-wider text-[#5e6ad2]">
                                Visual Proof & Media Gallery ({galleryItems.length})
                            </h2>
                            <span className="text-[10px] font-mono text-[#62666d]">
                                Click to preview high-res image / video
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {galleryItems.map((item, gIdx) => (
                                <div
                                    key={gIdx}
                                    onClick={() => setActiveGalleryMedia(item)}
                                    className="group relative bg-[#0f1011] border border-[#23252a] hover:border-[#5e6ad2]/60 rounded-xl overflow-hidden aspect-video cursor-pointer transition-all flex flex-col justify-end"
                                >
                                    {item.type === 'video' ? (
                                        <div className="w-full h-full bg-[#141516] flex items-center justify-center relative">
                                            <video
                                                src={item.url}
                                                className="w-full h-full object-cover"
                                                muted
                                                loop
                                                playsInline
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                                <VideoIcon className="w-8 h-8 text-[#f7f8f8]" />
                                            </div>
                                        </div>
                                    ) : (
                                        <img
                                            src={item.url}
                                            alt={item.caption || `Proof ${gIdx + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    )}

                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 flex items-center justify-between">
                                        <span className="text-[11px] font-mono text-[#d0d6e0] truncate max-w-[80%]">
                                            {item.caption || (item.type === 'video' ? 'Video Demo' : 'Capture Asset')}
                                        </span>
                                        <Eye className="w-3.5 h-3.5 text-[#5e6ad2] shrink-0" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tech Stack Chips */}
                <div className="space-y-3 pt-2">
                    <h2 className="text-xs font-mono uppercase tracking-wider text-[#5e6ad2]">
                        Technologies & System Stack
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {project.tags && project.tags.map((tag, tIdx) => (
                            <span
                                key={tIdx}
                                className="text-xs font-mono px-3 py-1 rounded-lg bg-[#141516] text-[#d0d6e0] border border-[#23252a]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Related Work Navigation */}
                {relatedProjects.length > 0 && (
                    <div className="space-y-4 pt-8 border-t border-[#23252a]">
                        <h2 className="text-xs font-mono uppercase tracking-wider text-[#8a8f98]">
                            Explore More Engineering Systems
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {relatedProjects.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/projects/${rel.slug}`}
                                    className="p-4 rounded-xl bg-[#0f1011] hover:bg-[#141516] border border-[#23252a] hover:border-[#383b42] transition-colors flex items-center justify-between group"
                                >
                                    <div>
                                        <span className="text-[10px] font-mono text-[#5e6ad2] block">
                                            {rel.badge || 'Project'}
                                        </span>
                                        <p className="text-sm font-semibold text-[#f7f8f8] group-hover:text-[#5e6ad2] transition-colors">
                                            {rel.title}
                                        </p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-[#62666d] group-hover:text-[#f7f8f8] group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </main>

            {/* Media Lightbox Modal */}
            {activeGalleryMedia && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
                    onClick={() => setActiveGalleryMedia(null)}
                >
                    <div
                        className="bg-[#0f1011] border border-[#23252a] rounded-2xl max-w-5xl w-full p-4 sm:p-6 space-y-4 shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-[#23252a] pb-3">
                            <span className="text-xs font-mono text-[#f7f8f8]">
                                {activeGalleryMedia.caption || 'Media Asset Lightbox'}
                            </span>
                            <button
                                onClick={() => setActiveGalleryMedia(null)}
                                className="p-1.5 rounded-lg bg-[#141516] hover:bg-[#1e2024] text-[#8a8f98] hover:text-[#f7f8f8]"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="rounded-xl overflow-hidden bg-black/60 flex items-center justify-center max-h-[75vh]">
                            {activeGalleryMedia.type === 'video' ? (
                                <video
                                    src={activeGalleryMedia.url}
                                    controls
                                    autoPlay
                                    className="max-w-full max-h-[70vh] rounded-lg"
                                />
                            ) : (
                                <img
                                    src={activeGalleryMedia.url}
                                    alt={activeGalleryMedia.caption || 'Inspection'}
                                    className="max-w-full max-h-[70vh] object-contain rounded-lg"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer recruiterData={recruiterData} />
        </PortfolioLayout>
    );
}
