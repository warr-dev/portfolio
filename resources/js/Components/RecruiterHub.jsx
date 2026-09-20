import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function RecruiterHub({ recruiterData }) {
    return (
        <section id="recruiter-hub" className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-[#23252a] pb-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5e6ad2] uppercase tracking-wider mb-1">
                        <span>⚡ Recruiter Fast-Track & Hiring Overview</span>
                    </div>
                    <h2 className="text-lg font-semibold tracking-tight text-[#f7f8f8]">Executive Summary for Technical Recruiters</h2>
                </div>
                <a
                    href={recruiterData.activeCvUrl || recruiterData.cvPdf}
                    download={recruiterData.activeCvFilename || "Warren_Dalawampu_CV_2026.pdf"}
                    className="text-xs font-mono text-[#8a8f98] hover:text-[#5e6ad2] flex items-center gap-1"
                >
                    <span>Download PDF</span>
                    <ArrowDown className="w-3 h-3" />
                </a>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-[#0f1011] border border-[#23252a] p-4 rounded-lg space-y-1">
                    <span className="text-[11px] font-mono text-[#62666d]">Experience</span>
                    <p className="text-xl font-semibold text-[#f7f8f8]">{recruiterData.yearsExperience}</p>
                    <span className="text-[11px] text-[#8a8f98] block">Backend, IoT & Low-Level</span>
                </div>
                <div className="bg-[#0f1011] border border-[#23252a] p-4 rounded-lg space-y-1">
                    <span className="text-[11px] font-mono text-[#62666d]">Current Role</span>
                    <p className="text-base font-semibold text-[#f7f8f8] truncate">Senior Backend Dev</p>
                    <span className="text-[11px] text-[#8a8f98] block">NTT Limited Philippines</span>
                </div>
                <div className="bg-[#0f1011] border border-[#23252a] p-4 rounded-lg space-y-1">
                    <span className="text-[11px] font-mono text-[#62666d]">Education</span>
                    <p className="text-base font-semibold text-[#f7f8f8]">BSIT + MSIT</p>
                    <span className="text-[11px] text-[#8a8f98] block">BatStateU & MinSU</span>
                </div>
                <div className="bg-[#0f1011] border border-[#23252a] p-4 rounded-lg space-y-1">
                    <span className="text-[11px] font-mono text-[#62666d]">Direct Contact</span>
                    <p className="text-xs font-mono text-[#5e6ad2] pt-1 truncate">{recruiterData.phone}</p>
                    <span className="text-[11px] text-[#8a8f98] block truncate">{recruiterData.email}</span>
                </div>
            </div>

            {/* Why Hire Warren Matrix */}
            <div className="bg-[#0f1011] border border-[#23252a] rounded-xl p-6 space-y-5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#d0d6e0]">Key Technical Differentiators</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs leading-relaxed">
                    <div className="space-y-2">
                        <span className="font-mono text-[#5e6ad2]">01 / Casino Gaming & High-Load</span>
                        <p className="text-[#8a8f98]">
                            Built streaming servers and RESTful game APIs in Laravel/Node.js using Protobuf, Redis, and Telescope. Integrated third-party game providers, payment switches (Xendit, UnionBank), and real-time state machines.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <span className="font-mono text-[#5e6ad2]">02 / Bare-Metal Hardware & C++</span>
                        <p className="text-[#8a8f98]">
                            Solely architected a standalone localized casino system from the base Ubuntu OS up: wrote proprietary C++ drivers for bill acceptors, ticket validators, and thermal printers, bridged via WebSocket servers into an Electron client.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <span className="font-mono text-[#5e6ad2]">03 / Infrastructure & DevOps</span>
                        <p className="text-[#8a8f98]">
                            Deep Linux background: self-hosted GitLab + Runners, WireGuard VPNs, Cloudflare Tunnels, Dockerized environments, Portainer, BookStack, automated Telegram notification bots, and automated GitHub webhook deployments.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
