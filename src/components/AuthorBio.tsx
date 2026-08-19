import React from 'react';

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
);

const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

interface AuthorBioProps {
    publishDate: string;
    updateDate?: string;
}

export const AuthorBio: React.FC<AuthorBioProps> = ({ publishDate, updateDate }) => {
    return (
        <div
            className="mt-12 pt-8 border-t border-border"
            itemScope
            itemType="https://schema.org/Person"
        >
            <div className="flex flex-col sm:flex-row items-start gap-4 p-6 rounded-2xl bg-card border border-border">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl font-bold" aria-hidden="true">DI</span>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground" itemProp="name">
                            Durganand Ishar
                        </h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium w-fit">
                            Author & Developer
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed" itemProp="description">
                        Durganand Ishar is a first-year BTech Computer Science student at Manav Rachna
                        International Institute of Research and Studies (MRIIRS), Faridabad. He created
                        Printify Notes to solve a real problem he faced as a student — the high ink cost
                        of printing dark-themed coaching notes from platforms like Physics Wallah and
                        Unacademy. The tool now helps thousands of NEET and JEE aspirants across India
                        save money on printing their study materials.
                    </p>

                    {/* Dates */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5">
                            Published:{' '}
                            <time dateTime={publishDate} itemProp="datePublished">
                                {publishDate}
                            </time>
                        </span>
                        {updateDate && (
                            <span className="flex items-center gap-1.5">
                                Updated:{' '}
                                <time dateTime={updateDate} itemProp="dateModified">
                                    {updateDate}
                                </time>
                            </span>
                        )}
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-2">
                        <a
                            href="https://www.linkedin.com/in/durganandishar/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-emerald-500 transition-all"
                            title="LinkedIn"
                            itemProp="sameAs"
                        >
                            <LinkedInIcon />
                        </a>
                        <a
                            href="https://github.com/isar-durganand"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-emerald-500 transition-all"
                            title="GitHub"
                            itemProp="sameAs"
                        >
                            <GitHubIcon />
                        </a>
                        <a
                            href="https://x.com/Durganand_07"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-emerald-500 transition-all"
                            title="X (Twitter)"
                            itemProp="sameAs"
                        >
                            <XIcon />
                        </a>
                    </div>
                    <meta itemProp="url" content="https://www.printifynotes.in/about" />
                </div>
            </div>
            {/* Person schema for Google E-E-A-T */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Durganand Ishar",
                "url": "https://www.printifynotes.in/about",
                "jobTitle": "Student Developer & Creator of Printify Notes",
                "description": "First-year BTech CSE student at MRIIRS, Faridabad. Creator of Printify Notes, a free PDF tool used by thousands of NEET and JEE students across India.",
                "alumniOf": {
                    "@type": "EducationalOrganization",
                    "name": "Manav Rachna International Institute of Research and Studies (MRIIRS)",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Faridabad",
                        "addressCountry": "IN"
                    }
                },
                "sameAs": [
                    "https://www.linkedin.com/in/durganandishar/",
                    "https://github.com/isar-durganand",
                    "https://x.com/Durganand_07"
                ],
                "knowsAbout": ["PDF tools", "Web development", "Student productivity", "NEET preparation", "JEE preparation"]
            }) }} />
        </div>
    );
};
