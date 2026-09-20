import React from 'react';
import { Head } from '@inertiajs/react';

export default function PortfolioLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#010102] text-[#f7f8f8] relative selection:bg-[#5e6ad2] selection:text-white font-sans antialiased flex flex-col justify-between">
            <Head>
                <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
            </Head>

            {/* Ambient Background Grid & Radial Glow */}
            <div className="fixed inset-0 grid-pattern opacity-40 pointer-events-none" />
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[450px] glow-accent pointer-events-none" />

            <div className="relative z-10 w-full flex-grow flex flex-col">
                {children}
            </div>
        </div>
    );
}
