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
        <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
            <nav
                className={`
                    w-full transition-all duration-300
                    ${isScrolled
                        ? 'bg-background/80 backdrop-blur-2xl border-b border-foreground/[0.08] shadow-sm py-3'
                        : 'bg-background/40 backdrop-blur-md border-b border-transparent py-4'
                    }
                `}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group ios-press active:scale-[0.96] transition-transform">
                        <div className="p-2 rounded-xl bg-[#007AFF] text-white shadow-sm transition-transform duration-200 group-hover:scale-[1.05]">
                            <FileText className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-foreground tracking-tight text-base sm:text-lg">Printify Notes</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1.5">
                        <NavItem to="/about" label="About" active={isActive('/about')} />
                        <NavItem
                            to="/tools"
                            label="Tools"
                            active={isActive('/tools') || location.pathname.startsWith('/tools/')}
                            badge="New"
                        />
                        <NavItem
                            to="/blog"
                            label="Blog"
                            active={isActive('/blog') || location.pathname.startsWith('/blog/')}
                        />
                        <NavItem to="/contact" label="Contact" active={isActive('/contact')} />
                        <Link
                            to="/donate"
                            className={`text-sm px-3 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 ios-press active:scale-[0.96] ${isActive('/donate') ? 'text-rose-500 bg-rose-500/10 font-medium' : 'text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5'}`}
                        >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            Donate
                        </Link>

                        <div className="ml-2">
                            <ScrollLink to="/#upload-section">
                                <Button size="sm" className="rounded-xl px-5 bg-[#007AFF] hover:bg-[#007AFF]/90 shadow-sm active:scale-[0.96] transition-all">
                                    Convert PDF
                                </Button>
                            </ScrollLink>
                        </div>
                    </div>

                    {/* Theme toggle + Mobile Menu Button */}
                    <div className="flex items-center gap-2">
                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-all duration-200 ios-press active:scale-[0.96]"
                            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                        >
                            <div className="relative w-4 h-4">
                                {theme === 'dark'
                                    ? <Sun className="w-4 h-4 transition-transform duration-300" />
                                    : <Moon className="w-4 h-4 transition-transform duration-300" />
                                }
                            </div>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-all duration-200 ios-press active:scale-[0.96]"
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu — iOS Sheet-style dropdown */}
            <div
                className={`md:hidden px-4 transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] origin-top ${
                    isMenuOpen
                        ? 'opacity-100 scale-100 translate-y-2'
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
            >
                <div className="rounded-[24px] bg-card/95 backdrop-blur-2xl border border-border/80 p-4 shadow-2xl">
                    <div className="flex flex-col gap-1">
                        <MobileNavItem to="/about" label="About" active={isActive('/about')} />
                        <MobileNavItem
                            to="/tools"
                            label="Tools"
                            active={isActive('/tools') || location.pathname.startsWith('/tools/')}
                            badge="New"
                        />
                        <MobileNavItem
                            to="/blog"
                            label="Blog"
                            active={isActive('/blog') || location.pathname.startsWith('/blog/')}
                        />
                        <MobileNavItem to="/contact" label="Contact" active={isActive('/contact')} />
                        <Link
                            to="/donate"
                            className={`text-sm py-2.5 px-3 rounded-xl transition-all duration-200 flex items-center gap-1.5 ios-press active:scale-[0.96] ${isActive('/donate') ? 'text-rose-500 bg-rose-500/10 font-medium' : 'text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5'}`}
                        >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            Donate
                        </Link>
                        <div className="pt-2 border-t border-border/80 mt-1">
                            <ScrollLink to="/#upload-section">
                                <Button size="sm" className="rounded-xl w-full bg-[#007AFF] hover:bg-[#007AFF]/90 active:scale-[0.96]">
                                    Convert PDF
                                </Button>
                            </ScrollLink>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

/* Desktop nav link */
const NavItem = ({ to, label, active, badge }: { to: string; label: string; active: boolean; badge?: string }) => (
    <Link
        to={to}
        className={`relative text-sm px-3 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 ios-press active:scale-[0.96]
            ${active
                ? 'text-[#007AFF] bg-[#007AFF]/10 font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]'
            }`}
    >
        {label}
        {badge && (
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[#007AFF]/15 text-[#007AFF] rounded-full">
                {badge}
            </span>
        )}
        {active && (
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#007AFF]" />
        )}
    </Link>
);

/* Mobile nav link */
const MobileNavItem = ({ to, label, active, badge }: { to: string; label: string; active: boolean; badge?: string }) => (
    <Link
        to={to}
        className={`text-sm py-2.5 px-3 rounded-xl transition-all duration-200 flex items-center gap-1.5 ios-press active:scale-[0.96]
            ${active
                ? 'text-[#007AFF] bg-[#007AFF]/10 font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]'
            }`}
    >
        {label}
        {badge && (
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[#007AFF]/15 text-[#007AFF] rounded-full">
                {badge}
            </span>
        )}
    </Link>
);
