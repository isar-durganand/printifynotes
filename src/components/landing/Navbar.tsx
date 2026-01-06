import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const location = useLocation();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    React.useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const isActive = (path: string) => location.pathname === path;

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
                    <Link to="/" className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-emerald-500">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-foreground">Printify Notes</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/about"
                            className={`text-sm transition-colors ${isActive('/about') ? 'text-emerald-500' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            About
                        </Link>
                        <Link
                            to="/blog"
                            className={`text-sm transition-colors ${isActive('/blog') ? 'text-emerald-500' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Blog
                        </Link>
                        <Link
                            to="/contact"
                            className={`text-sm transition-colors ${isActive('/contact') ? 'text-emerald-500' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Contact
                        </Link>
                        <Link to="/#upload-section">
                            <Button size="sm" className="rounded-full px-6 bg-emerald-500 hover:bg-emerald-600">
                                Convert PDF
                            </Button>
                        </Link>
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
                            <Link
                                to="/about"
                                className={`text-sm py-2 ${isActive('/about') ? 'text-emerald-500' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                About
                            </Link>
                            <Link
                                to="/blog"
                                className={`text-sm py-2 ${isActive('/blog') ? 'text-emerald-500' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                Blog
                            </Link>
                            <Link
                                to="/contact"
                                className={`text-sm py-2 ${isActive('/contact') ? 'text-emerald-500' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                Contact
                            </Link>
                            <Link to="/#upload-section">
                                <Button size="sm" className="rounded-full mt-2 w-full bg-emerald-500 hover:bg-emerald-600">
                                    Convert PDF
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};
