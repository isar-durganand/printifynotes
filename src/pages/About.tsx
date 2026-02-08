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
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">About Printify Notes</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Printify Notes is a free, privacy-focused tool designed to help students and professionals
                    convert dark-background PDF documents into print-friendly formats. Our mission is simple:
                    make printing study materials affordable and eco-friendly.
                </p>
            </section>

            {/* Our Story */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
                <div className="p-6 rounded-2xl bg-card border border-border">
                    <p className="text-muted-foreground mb-4">
                        As students ourselves, we faced a common frustration: coaching platforms like Physics Wallah,
                        Unacademy, and Vedantu provide excellent study materials, but their dark-themed PDFs waste
                        enormous amounts of ink when printed. A single chapter could cost ₹50-100 in ink alone!
                    </p>
                    <p className="text-muted-foreground mb-4">
                        We searched for solutions but found that most PDF tools either required uploading files to servers
                        (raising privacy concerns) or charged premium fees for basic features. That's when we decided to
                        build something better.
                    </p>
                    <p className="text-muted-foreground">
                        We created Printify Notes to solve this problem. Our tool runs entirely in your browser,
                        ensuring your study materials remain private while you save money on ink and help the environment.
                        Since launch, we've helped thousands of students print their notes more affordably.
                    </p>
                </div>
            </section>

            {/* Mission and Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <div className="p-6 rounded-2xl bg-card border border-border">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                        <Target className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                        To make study material printing accessible, affordable, and environmentally responsible
                        for every student in India and beyond. We believe quality tools should be free and private.
                    </p>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                        <Heart className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                    <p className="text-muted-foreground">
                        Privacy first, student-focused, and always free. We believe quality tools should be
                        accessible to everyone, regardless of their financial situation.
                    </p>
                </div>
            </div>

            {/* What Makes Us Different */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">What Makes Us Different</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4 p-5 rounded-xl border bg-card">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                            <Shield className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">100% Browser-Based</h4>
                            <p className="text-sm text-muted-foreground">
                                Your PDFs never leave your device. All processing happens locally using JavaScript.
                                Unlike other tools that upload your files to servers, we respect your privacy completely.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 rounded-xl border bg-card">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Built for Students</h4>
                            <p className="text-sm text-muted-foreground">
                                Optimized for NEET, JEE, and board exam preparation materials from all major
                                coaching platforms. We understand what students need.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 rounded-xl border bg-card">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                            <Code className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">No Account Required</h4>
                            <p className="text-sm text-muted-foreground">
                                Just open and use. No registration, no email verification, no login walls.
                                We believe tools should be accessible without barriers.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 rounded-xl border bg-card">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                            <Leaf className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Eco-Friendly</h4>
                            <p className="text-sm text-muted-foreground">
                                By converting dark PDFs to light backgrounds, you save up to 60% on ink.
                                This reduces plastic waste from ink cartridges and saves money.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Section */}
            <section className="mb-16 p-8 rounded-2xl bg-muted/50">
                <h2 className="text-2xl font-semibold mb-6">How Our Technology Works</h2>
                <div className="space-y-4 text-muted-foreground">
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
            <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">Supported Platforms</h2>
                <p className="text-muted-foreground mb-4">
                    Printify Notes works with PDF notes from all major educational platforms including:
                </p>
                <div className="flex flex-wrap gap-3">
                    {['Physics Wallah', 'Unacademy', 'Vedantu', 'BYJU\'S', 'Allen Digital', 'Aakash',
                        'Motion', 'Competishun', 'Etoos', 'Mohit Tyagi', 'Aman Dhattarwal', 'Apni Kaksha'].map((platform) => (
                            <span
                                key={platform}
                                className="px-4 py-2 rounded-full bg-secondary text-sm text-muted-foreground border"
                            >
                                {platform}
                            </span>
                        ))}
                </div>
            </section>

            {/* Impact Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">Our Impact</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-6 rounded-xl border bg-card text-center">
                        <div className="text-3xl font-bold text-emerald-500 mb-1">10,000+</div>
                        <p className="text-sm text-muted-foreground">PDFs Converted</p>
                    </div>
                    <div className="p-6 rounded-xl border bg-card text-center">
                        <div className="text-3xl font-bold text-blue-500 mb-1">5,000+</div>
                        <p className="text-sm text-muted-foreground">Happy Students</p>
                    </div>
                    <div className="p-6 rounded-xl border bg-card text-center">
                        <div className="text-3xl font-bold text-purple-500 mb-1">₹50L+</div>
                        <p className="text-sm text-muted-foreground">Ink Saved</p>
                    </div>
                    <div className="p-6 rounded-xl border bg-card text-center">
                        <div className="text-3xl font-bold text-orange-500 mb-1">100%</div>
                        <p className="text-sm text-muted-foreground">Privacy Protected</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2">Who created Printify Notes?</h3>
                        <p className="text-sm text-muted-foreground">
                            Printify Notes was created by Durganand Ishar, a student and developer who wanted to solve
                            the problem of expensive printing for dark-themed study materials. The project started as a
                            personal tool and grew into a full-featured platform serving thousands of students.
                        </p>
                    </div>
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2">Is Printify Notes really free?</h3>
                        <p className="text-sm text-muted-foreground">
                            Yes, completely free. There are no hidden charges, premium tiers, or paid features.
                            We believe educational tools should be accessible to everyone.
                        </p>
                    </div>
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2">How do you sustain the project?</h3>
                        <p className="text-sm text-muted-foreground">
                            We keep costs minimal by processing everything in your browser (no expensive servers needed)
                            and display non-intrusive advertisements to cover hosting costs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center">
                <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Have feedback or suggestions? We'd love to hear from you! Reach out at{' '}
                    <a href="mailto:isardurganand@gmail.com" className="text-emerald-500 hover:underline">
                        isardurganand@gmail.com
                    </a>
                    {' '}or use our contact form.
                </p>
                <Link to="/contact">
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                        Contact Us
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </section>
        </PageLayout>
    );
};

export default About;
