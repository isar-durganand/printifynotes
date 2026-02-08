import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Merge,
    Image,
    Gauge,
    Scissors,
    FileText,
    ArrowRight,
    Sparkles,
    Shield,
    Zap,
    Users,
    GraduationCap,
    Briefcase,
    Check
} from 'lucide-react';

const tools = [
    {
        title: 'PDF Merger',
        description: 'Combine multiple PDF files into a single document. Drag to reorder pages before merging.',
        icon: Merge,
        href: '/tools/merge-pdf',
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        highlightColor: 'shadow-blue-500/30',
    },
    {
        title: 'Image to PDF',
        description: 'Convert multiple images (JPG, PNG, WebP) into a single PDF. Choose page size and orientation.',
        icon: Image,
        href: '/tools/image-to-pdf',
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        highlightColor: 'shadow-purple-500/30',
    },
    {
        title: 'PDF Compressor',
        description: 'Reduce PDF file size without losing quality. Perfect for email attachments and faster sharing.',
        icon: Gauge,
        href: '/tools/compress-pdf',
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        highlightColor: 'shadow-orange-500/30',
    },
    {
        title: 'PDF Page Extractor',
        description: 'Select and extract specific pages from a PDF. Create a new document with only the pages you need.',
        icon: Scissors,
        href: '/tools/extract-pages',
        color: 'text-pink-500',
        bgColor: 'bg-pink-500/10',
        highlightColor: 'shadow-pink-500/30',
    },
    {
        title: 'Dark PDF Converter',
        description: 'Convert dark-themed PDFs to light backgrounds for printing. Save up to 60% on ink costs.',
        icon: FileText,
        href: '/',
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        highlightColor: 'shadow-emerald-500/30',
        featured: true,
    },
];

const Tools: React.FC = () => {
    const [animatedIndex, setAnimatedIndex] = useState(-1);
    const [showHighlight, setShowHighlight] = useState(true);

    useEffect(() => {
        // Staggered animation on mount
        const timers: NodeJS.Timeout[] = [];
        tools.forEach((_, index) => {
            const timer = setTimeout(() => {
                setAnimatedIndex(index);
            }, index * 150);
            timers.push(timer);
        });

        // Remove highlight effect after animation completes
        const highlightTimer = setTimeout(() => {
            setShowHighlight(false);
        }, tools.length * 150 + 1000);
        timers.push(highlightTimer);

        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    return (
        <PageLayout
            title="Free PDF Tools Online - Merge, Compress, Convert, Extract"
            description="Free online PDF tools for students and professionals. Merge PDFs, compress files, convert images to PDF, extract pages, convert dark notes to printable format. No signup, 100% private, works in browser."
            keywords="free pdf tools, online pdf editor, pdf merger, pdf compressor, image to pdf, pdf page extractor, pdf converter, student tools, free pdf tools india, ilovepdf alternative, smallpdf alternative, pdf tools no signup"
        >
            {/* Hero */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium mb-6 animate-pulse">
                    <Sparkles className="w-4 h-4" />
                    100% Free & Private
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    PDF Tools for Students
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    All tools work directly in your browser. No file uploads to servers,
                    no account required. Your documents stay on your device.
                </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool, index) => (
                    <Link key={tool.href} to={tool.href}>
                        <Card
                            className={`h-full transition-all duration-500 group
                                ${tool.featured ? 'border-emerald-500/30 bg-emerald-500/5' : ''}
                                ${animatedIndex >= index
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-4'}
                                ${showHighlight && animatedIndex >= index
                                    ? `shadow-xl ${tool.highlightColor} border-2 border-opacity-50 scale-[1.02]`
                                    : 'hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5'}
                            `}
                            style={{
                                transitionDelay: showHighlight ? `${index * 150}ms` : '0ms'
                            }}
                        >
                            <CardHeader>
                                <div className={`w-12 h-12 rounded-xl ${tool.bgColor} flex items-center justify-center mb-4 transition-transform duration-300 ${showHighlight && animatedIndex >= index ? 'scale-110' : ''}`}>
                                    <tool.icon className={`w-6 h-6 ${tool.color}`} />
                                </div>
                                <CardTitle className="flex items-center gap-2">
                                    {tool.title}
                                    {tool.featured && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                                            Popular
                                        </span>
                                    )}
                                    {!tool.featured && showHighlight && animatedIndex >= index && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500 text-white animate-pulse">
                                            New!
                                        </span>
                                    )}
                                </CardTitle>
                                <CardDescription>{tool.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button variant="ghost" className="p-0 h-auto text-emerald-500 group-hover:text-emerald-600">
                                    Use Tool
                                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Key Features */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                <div>
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="font-semibold mb-2">No Sign-up Required</h3>
                    <p className="text-sm text-muted-foreground">
                        Jump straight in. No account creation or email verification.
                    </p>
                </div>
                <div>
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="font-semibold mb-2">100% Private</h3>
                    <p className="text-sm text-muted-foreground">
                        Files never leave your device. All processing happens locally.
                    </p>
                </div>
                <div>
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="font-semibold mb-2">Fast & Free</h3>
                    <p className="text-sm text-muted-foreground">
                        No limits, no watermarks. Use as much as you need.
                    </p>
                </div>
            </div>

            {/* What Can You Do Section */}
            <div className="mt-20">
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">What Can You Do With These PDF Tools?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Our comprehensive suite of PDF tools covers all your document needs, from combining files to optimizing for sharing.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-card border border-border">
                        <h3 className="text-lg font-semibold mb-3">📚 Study Material Management</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>Combine chapter-wise PDFs into complete study guides</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>Extract specific topics from large textbooks</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>Convert dark-themed notes for affordable printing</span>
                            </li>
                        </ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border border-border">
                        <h3 className="text-lg font-semibold mb-3">💼 Professional Documents</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>Merge contracts, proposals, and reports into single files</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>Compress large documents for email attachments</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>Create PDF portfolios from images and screenshots</span>
                            </li>
                        </ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border border-border">
                        <h3 className="text-lg font-semibold mb-3">📱 Mobile & Tablet Friendly</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>Works on any device with a modern web browser</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>Convert phone photos to PDFs on the go</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>Quick document fixes without installing apps</span>
                            </li>
                        </ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border border-border">
                        <h3 className="text-lg font-semibold mb-3">🔒 Privacy Protection</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>Confidential documents stay on your device</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>No cloud storage or third-party access</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>Process sensitive legal and financial documents safely</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Who Uses These Tools */}
            <div className="mt-20 p-8 rounded-2xl bg-muted/50">
                <h2 className="text-2xl font-bold mb-8 text-center">Who Uses Our PDF Tools?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                            <GraduationCap className="w-7 h-7 text-blue-500" />
                        </div>
                        <h3 className="font-semibold mb-1">Students</h3>
                        <p className="text-sm text-muted-foreground">
                            JEE, NEET, and board exam preparation with organized study materials
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
                            <Users className="w-7 h-7 text-purple-500" />
                        </div>
                        <h3 className="font-semibold mb-1">Teachers</h3>
                        <p className="text-sm text-muted-foreground">
                            Creating course materials and combining resources for classes
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-3">
                            <Briefcase className="w-7 h-7 text-orange-500" />
                        </div>
                        <h3 className="font-semibold mb-1">Professionals</h3>
                        <p className="text-sm text-muted-foreground">
                            Managing business documents, proposals, and client files
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                            <FileText className="w-7 h-7 text-emerald-500" />
                        </div>
                        <h3 className="font-semibold mb-1">Researchers</h3>
                        <p className="text-sm text-muted-foreground">
                            Compiling research papers and organizing academic literature
                        </p>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-20">
                <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2">Are these tools really free?</h3>
                        <p className="text-sm text-muted-foreground">
                            Yes, completely free with no hidden charges. We don't have premium tiers or paid features. All tools work fully without any payment or subscription.
                        </p>
                    </div>
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2">Do you store my files?</h3>
                        <p className="text-sm text-muted-foreground">
                            No. All processing happens in your browser using JavaScript. Your files never leave your device and are never uploaded to any server. When you close the tab, everything is gone.
                        </p>
                    </div>
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2">Is there a file size limit?</h3>
                        <p className="text-sm text-muted-foreground">
                            Since processing happens on your device, the limit depends on your device's memory. Most devices can handle files up to 50-100MB easily. For very large files, try splitting them first.
                        </p>
                    </div>
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2">Do I need to create an account?</h3>
                        <p className="text-sm text-muted-foreground">
                            No account required! Just open the tool and start using it. We believe tools should be accessible without barriers like registrations or email verification.
                        </p>
                    </div>
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2">Will the output have watermarks?</h3>
                        <p className="text-sm text-muted-foreground">
                            Never. Your output PDFs are clean without any watermarks, logos, or branding. The files you create are entirely yours.
                        </p>
                    </div>
                    <div className="p-5 rounded-xl border bg-card">
                        <h3 className="font-semibold mb-2">Which browsers are supported?</h3>
                        <p className="text-sm text-muted-foreground">
                            All modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend Chrome or Firefox for the best experience. Works on both desktop and mobile.
                        </p>
                    </div>
                </div>
            </div>

            {/* Comparison with alternatives */}
            <div className="mt-20 p-8 rounded-2xl border bg-card">
                <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Printify Notes Over Other PDF Tools?</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4">Feature</th>
                                <th className="text-center py-3 px-4 text-emerald-500">Printify Notes</th>
                                <th className="text-center py-3 px-4 text-muted-foreground">Other Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-3 px-4">Privacy (No Upload)</td>
                                <td className="text-center py-3 px-4">✅</td>
                                <td className="text-center py-3 px-4">❌</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 px-4">Completely Free</td>
                                <td className="text-center py-3 px-4">✅</td>
                                <td className="text-center py-3 px-4">Limited</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 px-4">No Account Required</td>
                                <td className="text-center py-3 px-4">✅</td>
                                <td className="text-center py-3 px-4">❌</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 px-4">No Watermarks</td>
                                <td className="text-center py-3 px-4">✅</td>
                                <td className="text-center py-3 px-4">Free tier has</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-3 px-4">Dark PDF Conversion</td>
                                <td className="text-center py-3 px-4">✅</td>
                                <td className="text-center py-3 px-4">❌</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4">Works Offline</td>
                                <td className="text-center py-3 px-4">✅ (after load)</td>
                                <td className="text-center py-3 px-4">❌</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CTA Section */}
            <div className="mt-20 text-center p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    Choose a tool above and start working with your PDFs. No signup, no uploads, just results.
                </p>
                <Link to="/">
                    <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
                        Try Dark PDF Converter
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </div>
        </PageLayout>
    );
};

export default Tools;
