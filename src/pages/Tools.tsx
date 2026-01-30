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
    Sparkles
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

            {/* Features */}
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
                        <FileText className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="font-semibold mb-2">100% Private</h3>
                    <p className="text-sm text-muted-foreground">
                        Files never leave your device. All processing happens locally.
                    </p>
                </div>
                <div>
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                        <Gauge className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="font-semibold mb-2">Fast & Free</h3>
                    <p className="text-sm text-muted-foreground">
                        No limits, no watermarks. Use as much as you need.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
};

export default Tools;

