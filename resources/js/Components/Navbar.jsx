import React, { useState } from 'react';
import { FileDown, Menu, X } from 'lucide-react';

export default function Navbar({ recruiterData }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const cvMode = recruiterData?.cvDisplayMode || 'both';
    const showTopBarCv = cvMode === 'both' || cvMode === 'topbar_only';

    const hasSpecializedCapabilities = Array.isArray(recruiterData?.specializedCapabilities) && recruiterData.specializedCapabilities.length > 0;

    const navLinks = [
        { href: '#recruiter-hub', label: 'Recruiter Hub', badge: 'CV' },
        { href: '#experience', label: 'Experience' },
        { href: '#projects', label: 'Projects' },
        ...(hasSpecializedCapabilities ? [{ href: '#hardware-systems', label: recruiterData?.specializedTitle || 'Hardware & C++' }] : []),
        { href: '#skills', label: 'Skills' },
        ...(recruiterData?.linkedin ? [{ href: '#linkedin', label: 'LinkedIn', isLinkedIn: true }] : []),
        { href: '#contact', label: 'Contact' },
    ];

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <header className="sticky top-4 z-50 flex flex-col items-center px-4 w-full">
            <nav className="w-full max-w-4xl bg-[#0f1011]/90 backdrop-blur-md border border-[#23252a] rounded-full px-4 sm:px-5 py-2.5 flex items-center justify-between shadow-2xl transition-all">
                {/* Monogram Logo */}
                <a href="#" className="flex items-center gap-2 group">
                    <div className="w-7 h-7 rounded-md bg-[#141516] border border-[#34343a] flex items-center justify-center font-mono text-xs font-semibold text-[#5e6ad2] group-hover:border-[#5e6ad2] transition-colors">
                        W
                    </div>
                    <span className="font-medium text-sm text-[#f7f8f8] tracking-tight">
                        warren<span className="text-[#8a8f98]">.dev</span>
                    </span>
                </a>

                {/* Desktop Navigation Anchors */}
                <div className="hidden md:flex items-center gap-6 text-xs font-medium text-[#8a8f98]">
                    <a href="#recruiter-hub" className="text-[#5e6ad2] hover:text-[#828fff] transition-colors flex items-center gap-1">
                        <span>Recruiter Hub</span>
                    </a>
                    <a href="#experience" className="hover:text-[#f7f8f8] transition-colors">Experience</a>
                    <a href="#projects" className="hover:text-[#f7f8f8] transition-colors">Projects</a>
                    <a href="#skills" className="hover:text-[#f7f8f8] transition-colors">Skills</a>
                </div>

                {/* Direct Actions & Mobile Toggle */}
                <div className="flex items-center gap-2">
                    <a
                        href="#contact"
                        className="hidden sm:inline-flex bg-[#5e6ad2] hover:bg-[#828fff] text-white text-xs font-medium px-3.5 py-1.5 rounded-md transition-all duration-150 shadow-[0_0_16px_rgba(94,106,210,0.35)] active:scale-95"
                    >
                        Get in touch
                    </a>

                    {/* Mobile Hamburger Toggle Button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle navigation menu"
                        className="md:hidden p-1.5 rounded-lg bg-[#141516] border border-[#23252a] text-[#8a8f98] hover:text-[#f7f8f8] hover:border-[#34343a] transition-colors"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-5 h-5 text-[#f7f8f8]" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div data-testid="mobile-menu-drawer" className="md:hidden w-full max-w-4xl mt-2 bg-[#0f1011]/95 backdrop-blur-xl border border-[#23252a] rounded-2xl p-4 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                data-testid={`mobile-nav-${link.href.replace('#', '')}`}
                                onClick={closeMobileMenu}
                                className={`px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                                    link.href === '#recruiter-hub'
                                        ? 'text-[#5e6ad2] bg-[#5e6ad2]/10'
                                        : link.isLinkedIn
                                        ? 'text-[#0a66c2] hover:bg-[#141516]'
                                        : 'text-[#d0d6e0] hover:text-[#f7f8f8] hover:bg-[#141516]'
                                }`}
                            >
                                <span>{link.label}</span>
                                {link.badge && (
                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#5e6ad2]/20 text-[#5e6ad2]">
                                        {link.badge}
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>

                    <div className="pt-2 border-t border-[#23252a] flex flex-col gap-2">
                        {showTopBarCv && (
                            <a
                                href={recruiterData.activeCvUrl || recruiterData.cvPdf}
                                download={recruiterData.activeCvFilename || "Warren_Dalawampu_CV_2026.pdf"}
                                onClick={closeMobileMenu}
                                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#141516] border border-[#23252a] text-xs font-mono text-[#d0d6e0] hover:border-[#5e6ad2] transition-colors"
                            >
                                <FileDown className="w-4 h-4 text-[#5e6ad2]" />
                                <span>Download {recruiterData.activeCv === 'ats_resume' ? 'Resume' : 'CV (2026 PDF)'}</span>
                            </a>
                        )}
                        <a
                            href="#contact"
                            onClick={closeMobileMenu}
                            className="w-full flex items-center justify-center py-2 px-3 rounded-lg bg-[#5e6ad2] hover:bg-[#828fff] text-white text-xs font-medium transition-colors shadow-[0_0_16px_rgba(94,106,210,0.3)]"
                        >
                            Get in touch
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
