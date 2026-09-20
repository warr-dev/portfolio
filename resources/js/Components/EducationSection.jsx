import React from 'react';
import { Award, GraduationCap } from 'lucide-react';

export default function EducationSection({ education }) {
    return (
        <section className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-[#23252a] pb-4">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight text-[#f7f8f8]">Education & Accolades</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {education && education.map((edu, idx) => (
                    <div key={idx} className="bg-[#0f1011] border border-[#23252a] p-5 rounded-lg space-y-2">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-[#5e6ad2]" />
                            <span className="text-xs font-mono text-[#5e6ad2]">{edu.degree}</span>
                        </div>
                        <p className="text-sm font-semibold text-[#f7f8f8]">{edu.institution}</p>
                        <p className="text-xs text-[#8a8f98]">{edu.period}</p>
                        {edu.honors && (
                            <div className="flex items-center gap-1.5 pt-1 text-xs text-[#5e6ad2]">
                                <Award className="w-3.5 h-3.5" />
                                <span>{edu.honors}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
