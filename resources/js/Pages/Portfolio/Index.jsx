import React from 'react';
import PortfolioLayout from '@/Layouts/PortfolioLayout';
import Navbar from '@/Components/Navbar';
import Hero from '@/Components/Hero';
import RecruiterHub from '@/Components/RecruiterHub';
import ExperienceSection from '@/Components/ExperienceSection';
import ProjectsSection from '@/Components/ProjectsSection';
import HardwareSection from '@/Components/HardwareSection';
import SkillsSection from '@/Components/SkillsSection';
import EducationSection from '@/Components/EducationSection';
import LinkedInSection from '@/Components/LinkedInSection';
import ContactSection from '@/Components/ContactSection';
import Footer from '@/Components/Footer';

export default function PortfolioIndex({ projects, experiences, skills, recruiterData }) {
    return (
        <PortfolioLayout>
            <Navbar recruiterData={recruiterData} />

            <main className="relative z-10 max-w-4xl mx-auto px-6 pt-16 pb-24 space-y-28">
                <Hero recruiterData={recruiterData} />
                <RecruiterHub recruiterData={recruiterData} />
                <ExperienceSection experiences={experiences} />
                <ProjectsSection projects={projects} />
                <HardwareSection recruiterData={recruiterData} />
                <SkillsSection skills={skills} />
                <EducationSection education={recruiterData.education} />
                <LinkedInSection recruiterData={recruiterData} />
                <ContactSection />
            </main>

            <Footer recruiterData={recruiterData} />
        </PortfolioLayout>
    );
}
