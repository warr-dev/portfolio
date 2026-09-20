import React from 'react';
import { Cpu, Terminal, CircuitBoard, Server, Radio, Wrench, Shield, Database } from 'lucide-react';

const ICON_MAP = {
    Cpu,
    Terminal,
    CircuitBoard,
    Server,
    Radio,
    Wrench,
    Shield,
    Database,
};

export default function HardwareSection({ recruiterData }) {
    const capabilities = recruiterData?.specializedCapabilities;
    
    // Don't render the section if there are no entries
    if (!Array.isArray(capabilities) || capabilities.length === 0) {
        return null;
    }

    const title = recruiterData?.specializedTitle || 'Hardware I/O, C++ & Edge Engineering';
    const subtitle = recruiterData?.specializedSubtitle || 'Physical to Cloud';

    return (
        <section id="hardware-systems" className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-[#23252a] pb-4">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5e6ad2] uppercase tracking-wider mb-1">
                        <span>Specialized Capability</span>
                    </div>
                    <h2 className="text-lg font-semibold tracking-tight text-[#f7f8f8]">{title}</h2>
                </div>
                {subtitle && <span className="font-mono text-xs text-[#62666d]">{subtitle}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {capabilities.map((item, index) => {
                    const IconComponent = ICON_MAP[item.icon] || Cpu;
                    return (
                        <div key={index} className="bg-[#0f1011] border border-[#23252a] p-6 rounded-xl space-y-3">
                            <div className="w-8 h-8 rounded-lg bg-[#141516] border border-[#23252a] flex items-center justify-center text-[#5e6ad2]">
                                <IconComponent className="w-4 h-4" />
                            </div>
                            <h3 className="text-sm font-semibold text-[#f7f8f8]">{item.title}</h3>
                            <p className="text-xs text-[#8a8f98] leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
