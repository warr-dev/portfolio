import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { Mail, FolderGit2, Briefcase, Layers, ArrowRight } from 'lucide-react';

export default function Dashboard({ metrics, recentMessages }) {
    return (
        <AdminLayout title="Overview & Analytics">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0f1011] border border-[#23252a] p-5 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[#8a8f98]">
                        <span className="text-xs font-mono">Unread Inquiries</span>
                        <Mail className="w-4 h-4 text-[#5e6ad2]" />
                    </div>
                    <p className="text-2xl font-semibold text-[#f7f8f8]">{metrics.unreadMessages}</p>
                    <span className="text-[11px] text-[#8a8f98] block">From recruiters & clients</span>
                </div>

                <div className="bg-[#0f1011] border border-[#23252a] p-5 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[#8a8f98]">
                        <span className="text-xs font-mono">Featured Projects</span>
                        <FolderGit2 className="w-4 h-4 text-[#5e6ad2]" />
                    </div>
                    <p className="text-2xl font-semibold text-[#f7f8f8]">{metrics.totalProjects}</p>
                    <span className="text-[11px] text-[#8a8f98] block">Live showcased items</span>
                </div>

                <div className="bg-[#0f1011] border border-[#23252a] p-5 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[#8a8f98]">
                        <span className="text-xs font-mono">Career Milestones</span>
                        <Briefcase className="w-4 h-4 text-[#5e6ad2]" />
                    </div>
                    <p className="text-2xl font-semibold text-[#f7f8f8]">{metrics.totalExperiences}</p>
                    <span className="text-[11px] text-[#8a8f98] block">Timeline entries</span>
                </div>

                <div className="bg-[#0f1011] border border-[#23252a] p-5 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[#8a8f98]">
                        <span className="text-xs font-mono">Skill Groupings</span>
                        <Layers className="w-4 h-4 text-[#5e6ad2]" />
                    </div>
                    <p className="text-2xl font-semibold text-[#f7f8f8]">{metrics.totalSkills}</p>
                    <span className="text-[11px] text-[#8a8f98] block">Arsenal categories</span>
                </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-[#0f1011] border border-[#23252a] rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#23252a] pb-3">
                    <div className="space-y-0.5">
                        <h2 className="text-sm font-semibold text-[#f7f8f8]">Recent Inquiries</h2>
                        <p className="text-xs text-[#8a8f98]">Direct recruiter & client contacts transmitted via portfolio</p>
                    </div>
                    <Link
                        href="/admin/inbox"
                        className="text-xs font-mono text-[#5e6ad2] hover:text-[#828fff] flex items-center gap-1 transition-colors"
                    >
                        <span>View all</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {recentMessages.length === 0 ? (
                    <p className="text-xs font-mono text-[#62666d] py-4 text-center">No inquiries logged yet.</p>
                ) : (
                    <div className="divide-y divide-[#23252a]/60">
                        {recentMessages.map((msg) => (
                            <div key={msg.id} className="py-3 flex items-start justify-between gap-4">
                                <div className="space-y-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-[#f7f8f8]">{msg.name}</span>
                                        <span className="text-[11px] font-mono text-[#8a8f98]">({msg.email})</span>
                                        {!msg.read_at && (
                                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#5e6ad2]/20 text-[#828fff] border border-[#5e6ad2]/40">
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-[#d0d6e0] font-medium truncate">{msg.subject}</p>
                                    <p className="text-xs text-[#8a8f98] line-clamp-1">{msg.message}</p>
                                </div>
                                <span className="text-[11px] font-mono text-[#62666d] shrink-0">
                                    {new Date(msg.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
