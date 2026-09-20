import React from 'react';
import { ExternalLink, MapPin, CheckCircle2 } from 'lucide-react';

const LinkedInIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
    </svg>
);

export default function LinkedInSection({ recruiterData }) {
    if (!recruiterData?.linkedin) return null;

    return (
        <section id="linkedin" className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-[#23252a] pb-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0a66c2] uppercase tracking-wider mb-1">
                        <LinkedInIcon className="w-3.5 h-3.5 text-[#0a66c2]" />
                        <span>Professional Network & Career Profile</span>
                    </div>
                    <h2 className="text-lg font-semibold tracking-tight text-[#f7f8f8]">LinkedIn Profile & Network</h2>
                </div>
                <a
                    href={recruiterData.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-[#8a8f98] hover:text-[#0a66c2] flex items-center gap-1 transition-colors"
                >
                    <span>View Profile</span>
                    <ExternalLink className="w-3 h-3" />
                </a>
            </div>

            <div className="bg-[#0f1011] border border-[#23252a] hover:border-[#0a66c2]/40 rounded-xl p-6 sm:p-8 space-y-6 transition-colors shadow-lg relative overflow-hidden group">
                {/* Subtle Accent Glow */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#0a66c2]/10 blur-3xl pointer-events-none rounded-full group-hover:bg-[#0a66c2]/20 transition-all duration-500" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-b border-[#23252a]/80 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#141516] border border-[#23252a] flex items-center justify-center shrink-0 shadow-inner group-hover:border-[#0a66c2]/50 transition-colors">
                            <LinkedInIcon className="w-6 h-6 text-[#0a66c2]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-semibold text-[#f7f8f8]">{recruiterData.name}</h3>
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#0a66c2]/15 text-[#0a66c2] border border-[#0a66c2]/30">
                                    <CheckCircle2 className="w-2.5 h-2.5" />
                                    Verified Developer
                                </span>
                            </div>
                            <p className="text-xs text-[#8a8f98] mt-0.5">{recruiterData.title}</p>
                            <span className="text-[11px] font-mono text-[#62666d] flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3" />
                                {recruiterData.location}
                            </span>
                        </div>
                    </div>

                    <a
                        href={recruiterData.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#0a66c2] hover:bg-[#004182] text-white text-xs font-medium px-4 py-2 rounded-md transition-all shadow-[0_0_16px_rgba(10,102,194,0.35)] active:scale-95 flex items-center gap-2 shrink-0"
                    >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                        <span>Connect on LinkedIn</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                </div>

                {/* Recruiter Quick Fact Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="bg-[#141516] p-3.5 rounded-lg border border-[#23252a] space-y-1">
                        <span className="text-[10px] font-mono text-[#62666d] uppercase">Total Experience</span>
                        <p className="font-medium text-[#f7f8f8]">{recruiterData.yearsExperience}</p>
                        <span className="text-[10px] text-[#8a8f98] block">Calculated from career start date</span>
                    </div>

                    <div className="bg-[#141516] p-3.5 rounded-lg border border-[#23252a] space-y-1">
                        <span className="text-[10px] font-mono text-[#62666d] uppercase">Current Engagement</span>
                        <p className="font-medium text-[#f7f8f8]">NTT Limited Philippines</p>
                        <span className="text-[10px] text-[#8a8f98] block">Senior Backend Developer</span>
                    </div>

                    <div className="bg-[#141516] p-3.5 rounded-lg border border-[#23252a] space-y-1">
                        <span className="text-[10px] font-mono text-[#62666d] uppercase">Work Authorization</span>
                        <p className="font-medium text-[#f7f8f8]">Remote / B2B / Full-Time</p>
                        <span className="text-[10px] text-[#8a8f98] block">Open to worldwide contracts</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
