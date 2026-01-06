import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Footer } from '@/components/landing/Footer';
import { FloatingSocial } from '@/components/FloatingSocial';

interface PageLayoutProps {
    title: string;
    description?: string;
    keywords?: string;
    children: React.ReactNode;
}

export const PageLayout = ({ title, description, keywords, children }: PageLayoutProps) => {
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const defaultDescription = `${title} - Printify Notes helps you convert dark PDF notes to print-friendly format. Free, private, and perfect for students.`;
    const defaultKeywords = 'printify notes, pdf converter, dark pdf to light, print physics wallah notes, unacademy notes printer';

    return (
        <>
            <Helmet>
                <title>{title} | Printify Notes</title>
                <meta name="description" content={description || defaultDescription} />
                <meta name="keywords" content={keywords || defaultKeywords} />
                <meta property="og:title" content={`${title} | Printify Notes`} />
                <meta property="og:description" content={description || defaultDescription} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content={`${title} | Printify Notes`} />
                <meta name="twitter:description" content={description || defaultDescription} />
                <link rel="canonical" href={`https://printifynotes.vercel.app${location.pathname}`} />
            </Helmet>

            <div className="min-h-screen bg-background text-foreground">
                {/* Header */}
                <header className="sticky top-0 z-40 py-3 sm:py-4 px-3 sm:px-4">
                    <div className="max-w-4xl mx-auto">
                        <nav className="rounded-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background/90 backdrop-blur-xl shadow-lg shadow-black/20 border border-border">
                            <div className="flex items-center justify-between">
                                <Link to="/" className="flex items-center gap-2 sm:gap-3">
                                    <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-500">
                                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-base sm:text-lg font-semibold text-foreground">Printify Notes</h1>
                                        <p className="text-xs text-muted-foreground hidden sm:block">Dark → Print-Ready</p>
                                    </div>
                                </Link>
                                <Link
                                    to="/"
                                    className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    <span className="hidden xs:inline">Home</span>
                                </Link>
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Content */}
                <main className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">{title}</h1>
                    <div className="prose prose-invert prose-emerald max-w-none prose-sm sm:prose-base">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <Footer />

                {/* Floating Social */}
                <FloatingSocial />
            </div>
        </>
    );
};
