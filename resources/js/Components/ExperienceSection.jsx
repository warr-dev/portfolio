import React from 'react';

export default function ExperienceSection({ experiences }) {
    return (
        <section id="experience" className="space-y-8">
            <div className="flex items-baseline justify-between border-b border-[#23252a] pb-4">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight text-[#f7f8f8]">Professional Experience</h2>
                    <p className="text-xs text-[#8a8f98] mt-0.5">Chronological trajectory of technical leadership and hands-on execution</p>
                </div>
                <span className="font-mono text-xs text-[#62666d]">2019 — Present</span>
            </div>

            <div className="relative pl-6 space-y-12 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#23252a]">
                {experiences.map((exp, index) => (
                    <div key={exp.id || index} className="relative space-y-3">
                        {/* Node marker */}
                        <div
                            className={`absolute -left-[27px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#010102] ${
                                exp.is_current ? 'bg-[#5e6ad2] shadow-[0_0_8px_#5e6ad2]' : 'bg-[#34343a]'
                            }`}
                        />

                        {/* Title & Date */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-semibold text-[#f7f8f8]">{exp.role}</h3>
                                {exp.is_current && (
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5e6ad2]/15 text-[#828fff] border border-[#5e6ad2]/30">
                                        Current
                                    </span>
                                )}
                            </div>
                            <span className="text-xs font-mono text-[#8a8f98]">{exp.period}</span>
                        </div>

                        {/* Company & Location */}
                        <p className="text-xs font-mono text-[#5e6ad2]">
                            {exp.company} {exp.location && <span className="text-[#8a8f98]">· {exp.location}</span>}
                        </p>

                        {/* Impact Points */}
                        <ul className="text-xs text-[#8a8f98] leading-relaxed space-y-2 list-disc list-inside">
                            {exp.bullet_points && exp.bullet_points.map((point, pIdx) => (
                                <li key={pIdx}>{point}</li>
                            ))}
                        </ul>

                        {/* Technology Pills */}
                        {exp.technologies && exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {exp.technologies.map((tech, tIdx) => (
                                    <span
                                        key={tIdx}
                                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141516] text-[#8a8f98] border border-[#23252a]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
