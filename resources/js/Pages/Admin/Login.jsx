import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: 'warrdev08@gmail.com',
        password: '',
        remember: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[#010102] text-[#f7f8f8] flex items-center justify-center p-4 relative selection:bg-[#5e6ad2] selection:text-white font-sans antialiased">
            <Head title="Admin Login" />

            <div className="fixed inset-0 grid-pattern opacity-40 pointer-events-none" />
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[350px] glow-accent pointer-events-none" />

            <div className="relative z-10 w-full max-w-sm space-y-6">
                <div className="text-center space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-[#0f1011] border border-[#23252a] mx-auto flex items-center justify-center font-mono text-sm font-semibold text-[#5e6ad2]">
                        W
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight text-[#f7f8f8]">Administrative Terminal</h1>
                    <p className="text-xs text-[#8a8f98]">Sign in to manage portfolio contents & settings</p>
                </div>

                <div className="bg-[#0f1011] border border-[#23252a] rounded-xl p-6 shadow-2xl space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-mono text-[#8a8f98]">Email Address</label>
                            <div className="relative">
                                <Mail className="w-3.5 h-3.5 text-[#62666d] absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md pl-9 pr-3.5 py-2 text-xs text-[#f7f8f8] placeholder-[#62666d] focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="text-[11px] text-rose-400 flex items-center gap-1 font-mono">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>{errors.email}</span>
                                </p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-mono text-[#8a8f98]">Password</label>
                            <div className="relative">
                                <Lock className="w-3.5 h-3.5 text-[#62666d] absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#141516] border border-[#23252a] focus:border-[#5e6ad2] rounded-md pl-9 pr-3.5 py-2 text-xs text-[#f7f8f8] placeholder-[#62666d] focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                            {errors.password && (
                                <p className="text-[11px] text-rose-400 flex items-center gap-1 font-mono">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>{errors.password}</span>
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#5e6ad2] hover:bg-[#828fff] disabled:opacity-50 text-white text-xs font-medium py-2.5 rounded-md transition-all duration-150 shadow-[0_0_16px_rgba(94,106,210,0.35)] active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>{processing ? 'Authenticating...' : 'Access Dashboard'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </form>
                </div>

                <div className="text-center">
                    <a href="/" className="text-xs font-mono text-[#62666d] hover:text-[#8a8f98] transition-colors">
                        ← Return to public portfolio
                    </a>
                </div>
            </div>
        </div>
    );
}
