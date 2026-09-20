import React from 'react';

export default function Footer({ recruiterData }) {
    return (
        <footer className="relative z-10 border-t border-[#23252a] bg-[#010102]/80 py-8 px-6">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#62666d]">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#5e6ad2]" />
                    <span>{recruiterData.name} · {recruiterData.phone} · {recruiterData.email}</span>
                </div>
                <div>
                    <span>© {new Date().getFullYear()} Warren Dalawampu. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
