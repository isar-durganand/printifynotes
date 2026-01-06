import React from 'react';
import { FileText, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
            <nav
                className={`
          rounded-full px-4 py-3 transition-all duration-300
          ${isScrolled
                        ? 'bg-background/90 backdrop-blur-xl shadow-lg shadow-black/20 border border-border'
                        : 'bg-background/60 backdrop-blur-md border border-border/50'
                    }
        `}
            >
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-emerald-500">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-foreground">Printify Notes</span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <button
                            onClick={() => scrollToSection('how-it-works')}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            How It Works
                        </button>
                        <button
                            onClick={() => scrollToSection('features')}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollToSection('faq')}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            FAQ
                        </button>
                        <Button
                            size="sm"
                            onClick={() => scrollToSection('upload-section')}
                            className="rounded-full px-6"
                        >
                            Convert PDF
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-border">
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => scrollToSection('how-it-works')}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left py-2"
                            >
                                How It Works
                            </button>
                            <button
                                onClick={() => scrollToSection('features')}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left py-2"
                            >
                                Features
                            </button>
                            <button
                                onClick={() => scrollToSection('faq')}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left py-2"
                            >
                                FAQ
                            </button>
                            <Button
                                size="sm"
                                onClick={() => scrollToSection('upload-section')}
                                className="rounded-full mt-2"
                            >
                                Convert PDF
                            </Button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};
