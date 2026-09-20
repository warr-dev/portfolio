import React from 'react';
import { Download, ExternalLink, ArrowDown } from 'lucide-react';

export default function Hero({ recruiterData }) {
    const cvMode = recruiterData?.cvDisplayMode || 'both';
    const showHeroCv = cvMode === 'both' || cvMode === 'hero_only';

    return (
        <section className="space-y-6 pt-4">
            <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f1011] border border-[#23252a] text-xs font-mono text-[#d0d6e0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{recruiterData.statusBadge || 'Open to Senior Backend & Distributed Systems Roles'}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141516] border border-[#23252a] text-xs font-mono text-[#8a8f98]">
                    <span>📍 {recruiterData.location}</span>
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#f7f8f8] leading-[1.08]">
                    {recruiterData.name}
                </h1>
                <p className="text-xl sm:text-2xl text-[#d0d6e0] font-light tracking-tight">
                    {recruiterData.title}
                </p>
            </div>

            <p className="text-base sm:text-lg text-[#8a8f98] max-w-2xl leading-relaxed">
                {recruiterData.bio || '6+ years engineering high-concurrency gaming backends, localized OS-to-hardware casino engines, low-level C++ device drivers, and payment gateways across Laravel, Node.js, Linux infrastructure, and Docker.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
                {showHeroCv && (
                    <a
                        href={recruiterData.activeCvUrl || recruiterData.cvPdf}
                        download={recruiterData.activeCvFilename || "Warren_Dalawampu_CV_2026.pdf"}
                        className="bg-[#5e6ad2] hover:bg-[#828fff] text-white px-4 py-2 rounded-md text-xs font-medium transition-all shadow-[0_0_20px_rgba(94,106,210,0.35)] flex items-center gap-2 active:scale-95"
                    >
                        <Download className="w-4 h-4" />
                        <span>Download {recruiterData.activeCvLabel || 'Curriculum Vitae (PDF)'}</span>
                    </a>
                )}
                <a
                    href={recruiterData.github}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-transparent hover:bg-[#0f1011] text-[#8a8f98] hover:text-[#f7f8f8] border border-transparent hover:border-[#23252a] px-3.5 py-2 rounded-md text-xs font-mono transition-colors flex items-center gap-1.5"
                >
                    <span>github.com/warr-dev</span>
                    <ExternalLink className="w-3 h-3" />
                </a>
                {recruiterData.linkedin && (
                    <a
                        href={recruiterData.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-transparent hover:bg-[#0f1011] text-[#8a8f98] hover:text-[#5e6ad2] border border-transparent hover:border-[#23252a] px-3.5 py-2 rounded-md text-xs font-mono transition-colors flex items-center gap-1.5"
                    >
                        <span>LinkedIn</span>
                        <ExternalLink className="w-3 h-3" />
                    </a>
                )}
            </div>
        </section>
    );
}
