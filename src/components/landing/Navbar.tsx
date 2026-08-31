import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Menu, X, Heart, Sun, Moon } from 'lucide-react';
import { ScrollLink } from '@/components/ui/ScrollLink';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

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
                            to="/tools"
                            className={`text-sm transition-colors flex items-center gap-1.5 ${isActive('/tools') || location.pathname.startsWith('/tools/') ? 'text-emerald-500' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Tools
                            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-500 text-white rounded-full animate-pulse">
                                New
                            </span>
                        </Link>
                        <Link
                            to="/blog"
                            className={`text-sm transition-colors ${isActive('/blog') || location.pathname.startsWith('/blog/') ? 'text-emerald-500' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Blog
                        </Link>
                        <Link
                            to="/contact"
                            className={`text-sm transition-colors ${isActive('/contact') ? 'text-emerald-500' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Contact
                        </Link>
                        <Link
                            to="/donate"
                            className={`text-sm transition-colors flex items-center gap-1 ${isActive('/donate') ? 'text-rose-400' : 'text-rose-400/80 hover:text-rose-400'}`}
                        >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            Donate
                        </Link>
                        <ScrollLink to="/#upload-section">
                            <Button size="sm" className="rounded-full px-6 bg-emerald-500 hover:bg-emerald-600">
                                Convert PDF
                            </Button>
                        </ScrollLink>
                    </div>

                    {/* Theme toggle + Mobile Menu Button */}
                    <div className="flex items-center gap-2">
                        {/* Theme toggle — desktop & mobile */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
                            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                        >
                            {theme === 'dark'
                                ? <Sun className="w-4 h-4" />
                                : <Moon className="w-4 h-4" />
                            }
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu — rendered OUTSIDE the pill nav to avoid breaking its shape */}
            {isMenuOpen && (
                <div className="md:hidden mt-2 rounded-2xl bg-background/95 backdrop-blur-xl border border-border shadow-xl shadow-black/20 px-4 py-4">
                    <div className="flex flex-col gap-1">
                        <Link
                            to="/about"
                            className={`text-sm py-2.5 px-3 rounded-xl transition-colors ${isActive('/about') ? 'text-emerald-500 bg-emerald-500/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                        >
                            About
                        </Link>
                        <Link
                            to="/tools"
                            className={`text-sm py-2.5 px-3 rounded-xl transition-colors flex items-center gap-1.5 ${isActive('/tools') || location.pathname.startsWith('/tools/') ? 'text-emerald-500 bg-emerald-500/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                        >
                            Tools
                            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-500 text-white rounded-full animate-pulse">
                                New
                            </span>
                        </Link>
                        <Link
                            to="/blog"
                            className={`text-sm py-2.5 px-3 rounded-xl transition-colors ${isActive('/blog') || location.pathname.startsWith('/blog/') ? 'text-emerald-500 bg-emerald-500/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                        >
                            Blog
                        </Link>
                        <Link
                            to="/contact"
                            className={`text-sm py-2.5 px-3 rounded-xl transition-colors ${isActive('/contact') ? 'text-emerald-500 bg-emerald-500/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                        >
                            Contact
                        </Link>
                        <Link
                            to="/donate"
                            className={`text-sm py-2.5 px-3 rounded-xl transition-colors flex items-center gap-1 ${isActive('/donate') ? 'text-rose-400 bg-rose-400/10' : 'text-rose-400/80 hover:text-rose-400 hover:bg-rose-400/10'}`}
                        >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            Donate
                        </Link>
                        <div className="pt-2 border-t border-border mt-1">
                            <ScrollLink to="/#upload-section">
                                <Button size="sm" className="rounded-full w-full bg-emerald-500 hover:bg-emerald-600">
                                    Convert PDF
                                </Button>
                            </ScrollLink>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
