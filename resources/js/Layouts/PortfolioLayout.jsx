import React from 'react';
import { Head } from '@inertiajs/react';

export default function PortfolioLayout({ 
    children,
    title,
    description,
    keywords,
    ogImage,
    canonicalUrl,
    jsonLd,
    recruiterData
}) {
    const metaTitle = title || recruiterData?.seoTitle || 'Warren Dalawampu — Senior Backend Developer & Systems Software Engineer';
    const metaDescription = description || recruiterData?.seoDescription || 'Senior Backend & Systems Software Engineer specializing in high-concurrency gaming engines, C++ hardware integrations, low-latency APIs, and distributed systems.';
    const metaKeywords = keywords || recruiterData?.seoKeywords || 'Warren Dalawampu, Senior Backend Developer, Systems Engineer, Laravel, Node.js, C++, Gaming Kiosks, Distributed Systems, High Concurrency';
    const metaOgImage = ogImage || recruiterData?.ogImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c';
    const currentUrl = typeof window !== 'undefined' ? (canonicalUrl || window.location.href) : (canonicalUrl || 'https://warren.dev');

    // Default Person & WebSite JSON-LD Schema
    const defaultJsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': 'https://warren.dev/#person',
                'name': recruiterData?.name || 'Warren Dalawampu',
                'jobTitle': recruiterData?.title || 'Senior Backend Developer & Systems Software Engineer',
                'description': metaDescription,
                'url': 'https://warren.dev',
                'image': metaOgImage,
                'email': recruiterData?.email || 'warrdev08@gmail.com',
                'telephone': recruiterData?.phone || '+63 956 164 5935',
                'address': {
                    '@type': 'PostalAddress',
                    'addressLocality': 'Pasig City',
                    'addressCountry': 'PH'
                },
                'sameAs': [
                    recruiterData?.github || 'https://github.com/warr-dev',
                    recruiterData?.linkedin || 'https://linkedin.com/in/warr-dev'
                ].filter(Boolean)
            },
            {
                '@type': 'WebSite',
                '@id': 'https://warren.dev/#website',
                'url': 'https://warren.dev',
                'name': 'Warren Dalawampu — Technical Portfolio & Architecture Case Studies',
                'publisher': {
                    '@id': 'https://warren.dev/#person'
                }
            }
        ]
    };

    const activeSchema = jsonLd || defaultJsonLd;

    return (
        <div className="min-h-screen bg-[#010102] text-[#f7f8f8] relative selection:bg-[#5e6ad2] selection:text-white font-sans antialiased flex flex-col justify-between">
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={metaKeywords} />
                <meta name="author" content={recruiterData?.name || "Warren Dalawampu"} />
                <link rel="canonical" href={currentUrl} />

                {/* OpenGraph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={metaOgImage} />
                <meta property="og:site_name" content="Warren Dalawampu Portfolio" />

                {/* Twitter / X */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={currentUrl} />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={metaOgImage} />

                {/* Robots & Crawler Directives */}
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

                {/* Structured Data (JSON-LD) */}
                <script type="application/ld+json">
                    {JSON.stringify(activeSchema)}
                </script>

                <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
            </Head>

            {/* Ambient Background Grid & Radial Glow */}
            <div className="fixed inset-0 grid-pattern opacity-40 pointer-events-none" />
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[450px] glow-accent pointer-events-none" />

            <div className="relative z-10 w-full flex-grow flex flex-col">
                {children}
            </div>
        </div>
    );
}
