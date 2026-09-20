import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Settings, 
    FolderGit2, 
    Briefcase, 
    Layers, 
    Mail, 
    LogOut, 
    ExternalLink, 
    CheckCircle2,
    Menu,
    X
} from 'lucide-react';

export default function AdminLayout({ title, children }) {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const { url } = usePage();
    const { auth, flash } = usePage().props;

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
        { name: 'Site Settings', href: '/admin/settings', icon: Settings },
        { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
        { name: 'Experience', href: '/admin/experience', icon: Briefcase },
        { name: 'Skills Arsenal', href: '/admin/skills', icon: Layers },
        { name: 'Inbox', href: '/admin/inbox', icon: Mail },
    ];

    const isActive = (item) => {
        if (item.exact) return url === item.href;
        return url.startsWith(item.href);
    };

    const closeMobileNav = () => setMobileNavOpen(false);

    return (
        <div className="min-h-screen bg-[#010102] text-[#f7f8f8] font-sans antialiased flex flex-col md:flex-row selection:bg-[#5e6ad2] selection:text-white">
            
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-[#0f1011] border-r border-[#23252a] flex-col justify-between shrink-0 sticky top-0 h-screen">
                <div className="p-5 space-y-6">
                    {/* Brand */}
                    <div className="flex items-center justify-between">
                        <Link href="/admin" className="flex items-center gap-2 group">
                            <div className="w-7 h-7 rounded-md bg-[#141516] border border-[#34343a] flex items-center justify-center font-mono text-xs font-semibold text-[#5e6ad2] group-hover:border-[#5e6ad2] transition-colors">
                                W
                            </div>
                            <span className="font-medium text-sm text-[#f7f8f8] tracking-tight">
                                warren<span className="text-[#8a8f98]">.admin</span>
                            </span>
                        </Link>
                        <a
                            href="/"
                            target="_blank"
                            className="text-[#8a8f98] hover:text-[#f7f8f8] p-1.5 rounded-md hover:bg-[#141516] transition-colors"
                            title="View Live Portfolio"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const active = isActive(item);
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                                        active
                                            ? 'bg-[#141516] text-[#f7f8f8] border border-[#34343a] shadow-sm'
                                            : 'text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#141516]/50'
                                    }`}
                                >
                                    <Icon className={`w-4 h-4 ${active ? 'text-[#5e6ad2]' : 'text-[#8a8f98]'}`} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* User & Logout */}
                <div className="p-4 border-t border-[#23252a] flex items-center justify-between">
                    <div className="truncate pr-2">
                        <p className="text-xs font-medium text-[#f7f8f8] truncate">{auth?.user?.name || 'Warren'}</p>
                        <p className="text-[10px] font-mono text-[#8a8f98] truncate">{auth?.user?.email}</p>
                    </div>
                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        className="p-2 text-[#8a8f98] hover:text-rose-400 hover:bg-[#141516] rounded-md transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-4 h-4" />
                    </Link>
                </div>
            </aside>

            {/* Mobile Header Bar with Hamburger */}
            <div className="md:hidden sticky top-0 z-40 bg-[#0f1011]/95 backdrop-blur-md border-b border-[#23252a] px-4 h-14 flex items-center justify-between">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-[#141516] border border-[#34343a] flex items-center justify-center font-mono text-xs font-semibold text-[#5e6ad2]">
                        W
                    </div>
                    <span className="font-medium text-sm text-[#f7f8f8] tracking-tight">
                        warren<span className="text-[#8a8f98]">.admin</span>
                    </span>
                </Link>

                <div className="flex items-center gap-2">
                    <a
                        href="/"
                        target="_blank"
                        className="text-[#8a8f98] hover:text-[#f7f8f8] p-1.5 rounded-md hover:bg-[#141516] transition-colors"
                        title="View Live Portfolio"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                        type="button"
                        onClick={() => setMobileNavOpen(!mobileNavOpen)}
                        aria-label="Toggle navigation drawer"
                        className="p-1.5 rounded-lg bg-[#141516] border border-[#23252a] text-[#8a8f98] hover:text-[#f7f8f8] transition-colors"
                    >
                        {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer / Modal */}
            {mobileNavOpen && (
                <div data-testid="admin-mobile-drawer" className="md:hidden fixed inset-x-0 top-14 bottom-0 z-50 bg-[#010102]/95 backdrop-blur-xl border-b border-[#23252a] p-5 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="space-y-4">
                        <span className="text-[10px] font-mono text-[#5e6ad2] uppercase tracking-wider block border-b border-[#23252a] pb-2">
                            Admin Navigation
                        </span>
                        <nav className="space-y-1">
                            {navItems.map((item) => {
                                const active = isActive(item);
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        data-testid={`admin-mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        onClick={closeMobileNav}
                                        className={`flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs font-medium transition-colors ${
                                            active
                                                ? 'bg-[#141516] text-[#f7f8f8] border border-[#34343a] shadow-sm'
                                                : 'text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#141516]/50'
                                        }`}
                                    >
                                        <Icon className={`w-4 h-4 ${active ? 'text-[#5e6ad2]' : 'text-[#8a8f98]'}`} />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="pt-4 border-t border-[#23252a] flex items-center justify-between">
                        <div className="truncate pr-2">
                            <p className="text-xs font-medium text-[#f7f8f8] truncate">{auth?.user?.name || 'Warren'}</p>
                            <p className="text-[10px] font-mono text-[#8a8f98] truncate">{auth?.user?.email}</p>
                        </div>
                        <Link
                            href="/admin/logout"
                            method="post"
                            as="button"
                            onClick={closeMobileNav}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </Link>
                    </div>
                </div>
            )}

            {/* Main Admin Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Desktop Top bar */}
                <header className="hidden md:flex h-14 border-b border-[#23252a] px-6 items-center justify-between bg-[#010102]/60 backdrop-blur-md sticky top-0 z-30">
                    <h1 className="text-sm font-semibold text-[#f7f8f8] tracking-tight">{title}</h1>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[11px] font-mono text-[#8a8f98]">Admin Active</span>
                    </div>
                </header>

                {/* Content */}
                <main className="p-4 sm:p-6 md:p-8 flex-1 max-w-6xl w-full mx-auto space-y-6">
                    {flash?.success && (
                        <div className="p-3.5 rounded-lg bg-[#0f1011] border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{flash.success}</span>
                        </div>
                    )}
                    {children}
                </main>
            </div>

        </div>
    );
}
