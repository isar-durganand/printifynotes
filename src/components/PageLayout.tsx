import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
}

export const PageLayout = ({ title, children }: PageLayoutProps) => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="border-b border-border sticky top-0 z-40 bg-background/80 backdrop-blur-xl">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-foreground">Printify Notes</h1>
                            <p className="text-xs text-muted-foreground">Dark → Print-Ready</p>
                        </div>
                    </Link>
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">{title}</h1>
                <div className="prose prose-invert prose-emerald max-w-none">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border mt-16">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                        <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
                        <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
                        <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                        <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
                    </div>
                    <p className="text-center text-muted-foreground text-sm mt-6">
                        © {new Date().getFullYear()} Printify Notes. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};
