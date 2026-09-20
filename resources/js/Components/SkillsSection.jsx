import React from 'react';

export default function SkillsSection({ skills }) {
    return (
        <section id="skills" className="space-y-8">
            <div className="flex items-baseline justify-between border-b border-[#23252a] pb-4">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight text-[#f7f8f8]">Technical Arsenal</h2>
                    <p className="text-xs text-[#8a8f98] mt-0.5">Comprehensive competencies extracted from 6+ years production development</p>
                </div>
                <span className="font-mono text-xs text-[#62666d]">Stack & Tools</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skillGroup) => (
                    <div key={skillGroup.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-mono uppercase tracking-wider text-[#62666d]">
                                {skillGroup.category}
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skillGroup.items && skillGroup.items.map((item, idx) => {
                                const name = typeof item === 'string' ? item : (item?.name || '');
                                const level = typeof item === 'object' && item?.level ? Number(item.level) : 5;

                                return (
                                    <div
                                        key={idx}
                                        className="group inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0f1011] hover:bg-[#141516] border border-[#23252a] hover:border-[#383b42] text-xs font-mono text-[#d0d6e0] transition-all duration-200 shadow-sm"
                                    >
                                        <span className="font-medium text-[#f7f8f8]">{name}</span>
                                        <div className="inline-flex items-center gap-0.5" title={`${level}/5 stars`}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg
                                                    key={star}
                                                    className={`w-2.5 h-2.5 ${
                                                        star <= level
                                                            ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.3)]'
                                                            : 'text-[#2e3138] fill-[#23252a]'
                                                    }`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
