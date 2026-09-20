import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';
import { Check, Trash2, Mail, Calendar, User } from 'lucide-react';

export default function InboxIndex({ messages }) {
    const { post, delete: destroy } = useForm();

    const handleMarkAsRead = (id) => {
        post(`/admin/inbox/${id}/read`, { preserveScroll: true });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this inquiry?')) {
            destroy(`/admin/inbox/${id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Recruiter Inquiries Inbox">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-[#f7f8f8]">Direct Inquiries ({messages.length})</h2>
                    <p className="text-xs text-[#8a8f98]">Messages submitted directly from the live portfolio contact form</p>
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="bg-[#0f1011] border border-[#23252a] rounded-xl p-12 text-center space-y-2">
                    <Mail className="w-8 h-8 text-[#62666d] mx-auto" />
                    <p className="text-xs font-mono text-[#8a8f98]">No contact inquiries in your inbox yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`bg-[#0f1011] border rounded-xl p-6 space-y-3 transition-colors ${
                                msg.read_at ? 'border-[#23252a]' : 'border-[#5e6ad2]/40 bg-[#0f1011]/90 shadow-[0_0_12px_rgba(94,106,210,0.1)]'
                            }`}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#23252a] pb-3">
                                <div className="flex items-center gap-2.5">
                                    <User className="w-4 h-4 text-[#5e6ad2]" />
                                    <span className="text-sm font-semibold text-[#f7f8f8]">{msg.name}</span>
                                    <a href={`mailto:${msg.email}`} className="text-xs font-mono text-[#5e6ad2] hover:underline">
                                        {msg.email}
                                    </a>
                                    {!msg.read_at && (
                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#5e6ad2]/20 text-[#828fff] border border-[#5e6ad2]/40">
                                            New
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-xs font-mono text-[#8a8f98]">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{new Date(msg.created_at).toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1 pl-2">
                                        {!msg.read_at && (
                                            <button
                                                onClick={() => handleMarkAsRead(msg.id)}
                                                className="p-1 text-[#8a8f98] hover:text-emerald-400 hover:bg-[#141516] rounded"
                                                title="Mark as Read"
                                            >
                                                <Check className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(msg.id)}
                                            className="p-1 text-[#8a8f98] hover:text-rose-400 hover:bg-[#141516] rounded"
                                            title="Delete Message"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5 pt-1">
                                <h3 className="text-xs font-medium text-[#d0d6e0] font-mono">Subject: {msg.subject}</h3>
                                <p className="text-xs text-[#8a8f98] leading-relaxed whitespace-pre-line bg-[#141516] p-4 rounded-lg border border-[#23252a]/60">
                                    {msg.message}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
