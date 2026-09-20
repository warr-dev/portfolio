import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactSection() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <section id="contact" className="space-y-8">
            <div className="flex items-baseline justify-between border-b border-[#23252a] pb-4">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight text-[#f7f8f8]">Initiate Connection</h2>
                    <p className="text-xs text-[#8a8f98] mt-0.5">
                        Direct hiring channel · Available for senior engineering roles & technical consulting
                    </p>
                </div>
            </div>

            <div className="bg-[#0f1011] border border-[#23252a] rounded-xl p-6 sm:p-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-mono text-[#8a8f98]">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Recruiter / Engineering Manager"
                                className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] placeholder-[#62666d] focus:outline-none transition-colors"
                                required
                            />
                            {errors.name && (
                                <p className="text-[11px] text-rose-400 flex items-center gap-1 font-mono">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>{errors.name}</span>
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-mono text-[#8a8f98]">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="manager@company.com"
                                className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] placeholder-[#62666d] focus:outline-none transition-colors"
                                required
                            />
                            {errors.email && (
                                <p className="text-[11px] text-rose-400 flex items-center gap-1 font-mono">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>{errors.email}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#8a8f98]">Subject / Role Inquiry</label>
                        <input
                            type="text"
                            value={data.subject}
                            onChange={(e) => setData('subject', e.target.value)}
                            placeholder="Senior Backend / Full-Stack Engineer Role"
                            className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] placeholder-[#62666d] focus:outline-none transition-colors"
                            required
                        />
                        {errors.subject && (
                            <p className="text-[11px] text-rose-400 flex items-center gap-1 font-mono">
                                <AlertCircle className="w-3 h-3" />
                                <span>{errors.subject}</span>
                            </p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-mono text-[#8a8f98]">Message</label>
                        <textarea
                            rows={4}
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            placeholder="Share role details, scope, team structure, or contract requirements..."
                            className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md px-3.5 py-2 text-xs text-[#f7f8f8] placeholder-[#62666d] focus:outline-none transition-colors resize-none"
                            required
                        />
                        {errors.message && (
                            <p className="text-[11px] text-rose-400 flex items-center gap-1 font-mono">
                                <AlertCircle className="w-3 h-3" />
                                <span>{errors.message}</span>
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] font-mono text-[#62666d]">
                            Delivered directly to warrdev08@gmail.com
                        </span>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#5e6ad2] hover:bg-[#828fff] disabled:opacity-50 text-white text-xs font-medium px-5 py-2.5 rounded-md transition-all duration-150 shadow-[0_0_16px_rgba(94,106,210,0.35)] active:scale-95 flex items-center gap-2"
                        >
                            <Send className="w-3.5 h-3.5" />
                            <span>{processing ? 'Transmitting...' : 'Transmit Inquiry'}</span>
                        </button>
                    </div>
                </form>

                {/* Feedback Toast */}
                {(recentlySuccessful || flash?.success) && (
                    <div className="p-3.5 rounded-md bg-[#141516] border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{flash?.success || 'Message received. Warren will reply promptly within 24 hours.'}</span>
                    </div>
                )}
            </div>
        </section>
    );
}
