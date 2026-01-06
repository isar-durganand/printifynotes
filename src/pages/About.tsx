import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { FileText, Users, Target, Heart } from 'lucide-react';

const About = () => {
    return (
        <PageLayout
            title="About Us"
            description="Learn about Printify Notes - the free, privacy-focused tool that helps students convert dark-background PDF notes for eco-friendly printing. Built by students, for students."
            keywords="about printify notes, pdf converter team, student tools, india education technology, physics wallah notes converter"
        >
            <section className="mb-12">
                <p className="text-lg text-muted-foreground mb-6">
                    Printify Notes is a free, privacy-focused tool designed to help students and professionals
                    convert dark-background PDF documents into print-friendly formats. Our mission is simple:
                    make printing study materials affordable and eco-friendly.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                    As students ourselves, we faced a common frustration: coaching platforms like Physics Wallah,
                    Unacademy, and Vedantu provide excellent study materials, but their dark-themed PDFs waste
                    enormous amounts of ink when printed.
                </p>
                <p className="text-muted-foreground mb-4">
                    We created Printify Notes to solve this problem. Our tool runs entirely in your browser,
                    ensuring your study materials remain private while you save money on ink and help the environment.
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 rounded-2xl bg-card border border-border">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                        <Target className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                        To make study material printing accessible, affordable, and environmentally responsible
                        for every student in India and beyond.
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

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">What Makes Us Different</h2>
                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                            <FileText className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                            <h4 className="font-medium mb-1">100% Browser-Based</h4>
                            <p className="text-muted-foreground">
                                Your PDFs never leave your device. All processing happens locally using JavaScript.
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                            <Users className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                            <h4 className="font-medium mb-1">Built for Students</h4>
                            <p className="text-muted-foreground">
                                Optimized for NEET, JEE, and board exam preparation materials from all major
                                coaching platforms.
                            </p>
                        </div>
                    </li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Supported Platforms</h2>
                <p className="text-muted-foreground mb-4">
                    Printify Notes works with PDF notes from all major educational platforms including:
                </p>
                <div className="flex flex-wrap gap-3">
                    {['Physics Wallah', 'Unacademy', 'Vedantu', 'BYJU\'S', 'Allen Digital', 'Aakash',
                        'Motion', 'Competishun', 'Etoos', 'Mohit Tyagi', 'Aman Dhattarwal'].map((platform) => (
                            <span
                                key={platform}
                                className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
                            >
                                {platform}
                            </span>
                        ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground">
                    Have feedback or suggestions? We'd love to hear from you! Reach out at{' '}
                    <a href="mailto:hello@printifynotes.com" className="text-emerald-500 hover:underline">
                        hello@printifynotes.com
                    </a>
                </p>
            </section>
        </PageLayout>
    );
};

export default About;
