import React, { useState, useEffect } from 'react';
import { FileDown, Menu, X } from 'lucide-react';

export default function Navbar({ recruiterData }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('recruiter-hub');
    const cvMode = recruiterData?.cvDisplayMode || 'both';
    const showTopBarCv = cvMode === 'both' || cvMode === 'topbar_only';

    const hasSpecializedCapabilities = Array.isArray(recruiterData?.specializedCapabilities) && recruiterData.specializedCapabilities.length > 0;

    const navLinks = [
        { id: 'recruiter-hub', href: '#recruiter-hub', label: 'Recruiter Hub', badge: 'CV' },
        { id: 'experience', href: '#experience', label: 'Experience' },
        { id: 'projects', href: '#projects', label: 'Projects' },
        ...(hasSpecializedCapabilities ? [{ id: 'hardware-systems', href: '#hardware-systems', label: recruiterData?.specializedTitle || 'Hardware & C++' }] : []),
        { id: 'skills', href: '#skills', label: 'Skills' },
        ...(recruiterData?.linkedin && recruiterData?.linkedinEnabled !== false ? [{ id: 'linkedin', href: '#linkedin', label: 'LinkedIn', isLinkedIn: true }] : []),
        { id: 'contact', href: '#contact', label: 'Contact' },
    ];

    const desktopNavLinks = [
        { id: 'recruiter-hub', href: '#recruiter-hub', label: 'Recruiter Hub' },
        { id: 'experience', href: '#experience', label: 'Experience' },
        { id: 'projects', href: '#projects', label: 'Projects' },
        { id: 'skills', href: '#skills', label: 'Skills' },
    ];

    useEffect(() => {
        const sectionIds = navLinks.map(link => link.id);
        
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            // If user scrolled to the very bottom, activate contact
            if (scrollY + windowHeight >= fullHeight - 120) {
                setActiveSection('contact');
                return;
            }

            // Find section currently in the viewport reading zone (top 150px - 350px)
            const targetY = 220;
            let currentActive = null;

            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // If element top is above the target line and bottom is below it
                    if (rect.top <= targetY && rect.bottom > targetY) {
                        currentActive = id;
                        break;
                    }
                    // Or if element top is still slightly below but near top
                    if (rect.top > 0 && rect.top <= targetY + 100 && !currentActive) {
                        currentActive = id;
                    }
                }
            }

            if (currentActive) {
                setActiveSection(currentActive);
            } else if (scrollY < 200) {
                setActiveSection('recruiter-hub');
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasSpecializedCapabilities, recruiterData?.linkedin, recruiterData?.linkedinEnabled]);

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
                <div className="hidden md:flex items-center gap-6 text-xs font-medium">
                    {desktopNavLinks.map((link) => {
                        const isActive = activeSection === link.id;
                        return (
                            <a
                                key={link.id}
                                href={link.href}
                                className={`transition-all duration-200 relative py-1 ${
                                    isActive
                                        ? 'text-[#5e6ad2] font-semibold'
                                        : 'text-[#8a8f98] hover:text-[#f7f8f8]'
                                }`}
                            >
                                <span>{link.label}</span>
                                {isActive && (
                                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#5e6ad2] rounded-full shadow-[0_0_8px_#5e6ad2] animate-in fade-in duration-200" />
                                )}
                            </a>
                        );
                    })}
                </div>

                {/* Direct Actions & Mobile Toggle */}
                <div className="flex items-center gap-2">
                    <a
                        href="#contact"
                        className={`hidden sm:inline-flex text-xs font-medium px-3.5 py-1.5 rounded-md transition-all duration-150 active:scale-95 ${
                            activeSection === 'contact'
                                ? 'bg-[#5e6ad2] text-white ring-2 ring-[#5e6ad2]/50 shadow-[0_0_20px_rgba(94,106,210,0.5)]'
                                : 'bg-[#5e6ad2] hover:bg-[#828fff] text-white shadow-[0_0_16px_rgba(94,106,210,0.35)]'
                        }`}
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
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.id;
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    data-testid={`mobile-nav-${link.href.replace('#', '')}`}
                                    onClick={closeMobileMenu}
                                    className={`px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                                        isActive
                                            ? 'text-[#5e6ad2] bg-[#5e6ad2]/15 border border-[#5e6ad2]/30 font-semibold'
                                            : link.isLinkedIn
                                            ? 'text-[#0a66c2] hover:bg-[#141516]'
                                            : 'text-[#d0d6e0] hover:text-[#f7f8f8] hover:bg-[#141516]'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {isActive && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#5e6ad2] shadow-[0_0_6px_#5e6ad2]" />
                                        )}
                                        <span>{link.label}</span>
                                    </div>
                                    {link.badge && (
                                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                            isActive
                                                ? 'bg-[#5e6ad2] text-white'
                                                : 'bg-[#5e6ad2]/20 text-[#5e6ad2]'
                                        }`}>
                                            {link.badge}
                                        </span>
                                    )}
                                </a>
                            );
                        })}
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
