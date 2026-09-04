import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { FileText, Users, Target, Heart, Shield, Code, Leaf, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
    return (
        <PageLayout
            title="About Us - Printify Notes"
            description="Learn about Printify Notes - the free, privacy-focused tool that helps students convert dark-background PDF notes for eco-friendly printing. Built by students, for students."
            keywords="about printify notes, pdf converter team, student tools, india education technology, physics wallah notes converter"
        >
            {/* Hero Section */}
            <section className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold tracking-wide uppercase mb-3">
                    Our Mission
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground">
                    About Printify Notes
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Printify Notes is a free, privacy-focused tool designed to help students and professionals
                    convert dark-background PDF documents into print-friendly formats. Our mission is simple:
                    make printing study materials affordable and eco-friendly.
                </p>
            </section>

            {/* Our Story */}
            <section className="mb-14">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-5 text-foreground">Our Story</h2>
                <div className="p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                        As students ourselves, we faced a common frustration: coaching platforms like Physics Wallah,
                        Unacademy, and Vedantu provide excellent study materials, but their dark-themed PDFs waste
                        enormous amounts of ink when printed. A single chapter could cost ₹50-100 in ink alone!
                    </p>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                        We searched for solutions but found that most PDF tools either required uploading files to servers
                        (raising privacy concerns) or charged premium fees for basic features. That's when we decided to
                        build something better.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        We created Printify Notes to solve this problem. Our tool runs entirely in your browser,
                        ensuring your study materials remain private while you save money on ink and help the environment.
                        Since launch, we've helped thousands of students print their notes more affordably.
                    </p>
                </div>
            </section>

            {/* Meet the Creator */}
            <section className="mb-14">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-5 text-foreground">Meet the Creator</h2>
                <div className="p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start gap-5 mb-6">
                        <div className="w-20 h-20 rounded-[22px] bg-gradient-to-br from-[#007AFF] to-[#0051D5] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#007AFF]/20">
                            <span className="text-white text-2xl font-bold tracking-tight">DI</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold tracking-tight mb-1 text-foreground">Durganand Ishar</h3>
                            <p className="text-sm text-[#007AFF] font-medium mb-1">Founder & Developer, Printify Notes</p>
                            <p className="text-sm text-muted-foreground">BTech CSE (First Year) · Manav Rachna International Institute of Research and Studies (MRIIRS), Faridabad</p>
                            <div className="flex items-center gap-2.5 mt-3.5">
                                <a
                                    href="https://www.linkedin.com/in/durganandishar/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hairline-border text-foreground hover:text-[#007AFF] hover:border-[#007AFF]/40 active:scale-[0.96] transition-all"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href="https://github.com/isar-durganand"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hairline-border text-foreground hover:text-[#007AFF] hover:border-[#007AFF]/40 active:scale-[0.96] transition-all"
                                >
                                    GitHub
                                </a>
                                <a
                                    href="mailto:isardurganand@gmail.com"
                                    className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.08] hairline-border text-foreground hover:text-[#007AFF] hover:border-[#007AFF]/40 active:scale-[0.96] transition-all"
                                >
                                    Email
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3.5 text-muted-foreground text-sm leading-relaxed border-t border-black/[0.08] dark:border-white/[0.1] pt-5">
                        <p>
                            Durganand built Printify Notes out of personal necessity. As a student preparing for competitive
                            exams, he constantly faced the same problem: downloading lecture notes from Physics Wallah and
                            Unacademy, only to find that printing them directly would consume five times more ink than necessary
                            due to their dark backgrounds.
                        </p>
                        <p>
                            Rather than accepting this as a permanent cost, he taught himself web development and built a
                            browser-based tool that could invert PDF colors client-side — meaning no files ever leave your
                            device. What started as a personal script evolved into a full-featured PDF toolkit that now serves
                            students across India.
                        </p>
                        <p>
                            Durganand is currently pursuing his BTech in Computer Science at MRIIRS, Faridabad. He is passionate
                            about building tools that make quality education more accessible and affordable — and believes that
                            the best software solves real problems for real people.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission and Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
                <div className="p-6 sm:p-7 rounded-[28px] bg-card hairline-border shadow-sm">
                    <div className="w-12 h-12 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-4">
                        <Target className="w-6 h-6 text-[#007AFF]" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight mb-2 text-foreground">Our Mission</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        To make study material printing accessible, affordable, and environmentally responsible
                        for every student in India and beyond. We believe quality tools should be free and private.
                    </p>
                </div>

                <div className="p-6 sm:p-7 rounded-[28px] bg-card hairline-border shadow-sm">
                    <div className="w-12 h-12 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center mb-4">
                        <Heart className="w-6 h-6 text-[#007AFF]" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight mb-2 text-foreground">Our Values</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Privacy first, student-focused, and always free. We believe quality tools should be
                        accessible to everyone, regardless of their financial situation.
                    </p>
                </div>
            </div>

            {/* What Makes Us Different */}
            <section className="mb-14">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-5 text-foreground">What Makes Us Different</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-4 p-5 sm:p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center flex-shrink-0">
                            <Shield className="w-5 h-5 text-[#007AFF]" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-1.5">100% Browser-Based</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Your PDFs never leave your device. All processing happens locally using JavaScript.
                                Unlike other tools that upload your files to servers, we respect your privacy completely.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 sm:p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-[#007AFF]" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-1.5">Built for Students</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Optimized for NEET, JEE, and board exam preparation materials from all major
                                coaching platforms. We understand what students need.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 sm:p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center flex-shrink-0">
                            <Code className="w-5 h-5 text-[#007AFF]" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-1.5">No Account Required</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Just open and use. No registration, no email verification, no login walls.
                                We believe tools should be accessible without barriers.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 sm:p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <div className="w-11 h-11 rounded-[14px] bg-[#007AFF]/10 flex items-center justify-center flex-shrink-0">
                            <Leaf className="w-5 h-5 text-[#007AFF]" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-1.5">Eco-Friendly</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                By converting dark PDFs to light backgrounds, you save up to 60% on ink.
                                This reduces plastic waste from ink cartridges and saves money.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Section */}
            <section className="mb-14 p-6 sm:p-8 rounded-[28px] bg-card hairline-border shadow-sm">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-5 text-foreground">How Our Technology Works</h2>
                <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                    <p>
                        <strong className="text-foreground">Client-Side Processing:</strong> When you upload a PDF to Printify Notes,
                        the file is processed entirely within your web browser using modern JavaScript APIs. The file is read into
                        memory, manipulated as needed (inverting colors, merging pages, compressing, etc.), and the result is
                        generated locally.
                    </p>
                    <p>
                        <strong className="text-foreground">No Server Communication:</strong> Unlike most PDF tools that require
                        uploading your files to remote servers, our tools never send your files anywhere. This makes us faster
                        (no upload/download time), more private (your files stay on your device), and usable even with slow internet.
                    </p>
                    <p>
                        <strong className="text-foreground">Modern Web Technologies:</strong> We use technologies like PDF.js for
                        rendering, Canvas API for image manipulation, and pdf-lib for PDF generation. These are all well-established,
                        open-source libraries that run securely in your browser.
                    </p>
                </div>
            </section>

            {/* Supported Platforms */}
            <section className="mb-14">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4 text-foreground">Supported Platforms</h2>
                <p className="text-muted-foreground mb-4 text-sm">
                    Printify Notes works with PDF notes from all major educational platforms including:
                </p>
                <div className="flex flex-wrap gap-2.5">
                    {['Physics Wallah', 'Unacademy', 'Vedantu', 'BYJU\'S', 'Allen Digital', 'Aakash',
                        'Motion', 'Competishun', 'Etoos', 'Mohit Tyagi', 'Aman Dhattarwal', 'Apni Kaksha'].map((platform) => (
                            <span
                                key={platform}
                                className="px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-xs font-medium text-foreground hairline-border shadow-none"
                            >
                                {platform}
                            </span>
                        ))}
                </div>
            </section>

            {/* What We Offer */}
            <section className="mb-14">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-5 text-foreground">What We Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <h3 className="font-semibold text-[#007AFF] mb-2">Dark PDF Conversion</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">Convert dark-background coaching PDFs to print-friendly, light-background format. Designed to help students save ink when printing notes from platforms like Physics Wallah, Unacademy, and Vedantu.</p>
                    </div>
                    <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <h3 className="font-semibold text-[#007AFF] mb-2">Complete PDF Toolkit</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">Merge multiple PDFs, compress large files for email, extract specific pages, and convert images to PDF — all free, all processed locally in your browser.</p>
                    </div>
                    <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <h3 className="font-semibold text-[#007AFF] mb-2">Privacy by Design</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">Every tool runs entirely in your browser. Your files are never uploaded to any server. When you close the tab, all data is gone — true privacy protection.</p>
                    </div>
                    <div className="p-6 rounded-[24px] bg-card hairline-border shadow-sm">
                        <h3 className="font-semibold text-[#007AFF] mb-2">Ink & Paper Savings</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">By converting dark backgrounds to light, students can significantly reduce ink usage when printing. Combined with our multi-page layouts, you save both ink and paper.</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-14">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-5 text-foreground">Frequently Asked Questions</h2>
                <div className="space-y-3.5">
                    <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                        <h3 className="font-semibold text-foreground mb-2">Who created Printify Notes?</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Printify Notes was created by Durganand Ishar, a student and developer who wanted to solve
                            the problem of expensive printing for dark-themed study materials. The project started as a
                            personal tool and grew into a full-featured platform serving thousands of students.
                        </p>
                    </div>
                    <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                        <h3 className="font-semibold text-foreground mb-2">Is Printify Notes really free?</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Yes, completely free. There are no hidden charges, premium tiers, or paid features.
                            We believe educational tools should be accessible to everyone.
                        </p>
                    </div>
                    <div className="p-5 sm:p-6 rounded-[22px] bg-card hairline-border shadow-sm">
                        <h3 className="font-semibold text-foreground mb-2">How do you sustain the project?</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            We keep costs minimal by processing everything in your browser (no expensive servers needed)
                            and display non-intrusive advertisements to cover hosting costs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="p-8 sm:p-10 rounded-[32px] bg-[#007AFF]/5 hairline-border border-[#007AFF]/20 text-center shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-foreground">Get in Touch</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                    Have feedback or suggestions? We'd love to hear from you! Reach out at{' '}
                    <a href="mailto:isardurganand@gmail.com" className="text-[#007AFF] font-medium hover:underline">
                        isardurganand@gmail.com
                    </a>
                    {' '}or use our contact form.
                </p>
                <Link to="/contact">
                    <Button className="rounded-[12px] bg-[#007AFF] hover:bg-[#007AFF]/90 text-white font-semibold px-6 py-2.5 h-auto active:scale-[0.96] transition-transform shadow-md shadow-[#007AFF]/20">
                        Contact Us
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </section>
        </PageLayout>
    );
};

export default About;
