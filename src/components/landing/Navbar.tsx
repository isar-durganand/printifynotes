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
                    rounded-2xl px-5 py-3.5 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isScrolled
                        ? 'liquid-glass-elevated'
                        : 'liquid-glass'
                    }
                `}
            >
                <div className="relative z-10 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="p-1.5 rounded-xl bg-[hsl(var(--accent-highlight))] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-foreground tracking-tight">Printify Notes</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
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
                            className={`text-sm px-3 py-2 rounded-xl transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-1.5 ${isActive('/donate') ? 'text-rose-400 bg-rose-400/10' : 'text-rose-400/80 hover:text-rose-400 hover:bg-rose-400/5'}`}
                        >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            Donate
                        </Link>

                        <div className="ml-2">
                            <ScrollLink to="/#upload-section">
                                <Button size="sm" className="rounded-xl px-5 bg-[hsl(var(--accent-highlight))] hover:bg-[hsl(var(--accent-highlight)/0.9)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] border-t border-l border-white/20 border-b border-r border-black/5">
                                    Convert PDF
                                </Button>
                            </ScrollLink>
                        </div>
                    </div>

                    {/* Theme toggle + Mobile Menu Button */}
                    <div className="flex items-center gap-1.5">
                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                        >
                            <div className="relative w-4 h-4">
                                {theme === 'dark'
                                    ? <Sun className="w-4 h-4 transition-transform duration-500 rotate-0" />
                                    : <Moon className="w-4 h-4 transition-transform duration-500 rotate-0" />
                                }
                            </div>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu — glass dropdown */}
            <div
                className={`md:hidden mt-2 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
                    isMenuOpen
                        ? 'opacity-100 scale-y-100 translate-y-0'
                        : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
                }`}
            >
                <div className="rounded-2xl liquid-glass-elevated px-4 py-4">
                    <div className="relative z-10 flex flex-col gap-1">
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
                            className={`text-sm py-2.5 px-3 rounded-xl transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-1.5 ${isActive('/donate') ? 'text-rose-400 bg-rose-400/10' : 'text-rose-400/80 hover:text-rose-400 hover:bg-rose-400/5'}`}
                        >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            Donate
                        </Link>
                        <div className="pt-2 border-t border-foreground/[0.06] mt-1">
                            <ScrollLink to="/#upload-section">
                                <Button size="sm" className="rounded-xl w-full bg-[hsl(var(--accent-highlight))] hover:bg-[hsl(var(--accent-highlight)/0.9)] border-t border-l border-white/20 border-b border-r border-black/5">
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
        className={`relative text-sm px-3 py-2 rounded-xl transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-1.5
            ${active
                ? 'text-[hsl(var(--accent-highlight))] bg-[hsl(var(--accent-highlight)/0.08)]'
                : 'text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]'
            }`}
    >
        {active && (
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[hsl(var(--accent-highlight))]" />
        )}
        {label}
        {badge && (
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-foreground/10 text-foreground/70 rounded-full">
                {badge}
            </span>
        )}
    </Link>
);

/* Mobile nav link */
const MobileNavItem = ({ to, label, active, badge }: { to: string; label: string; active: boolean; badge?: string }) => (
    <Link
        to={to}
        className={`text-sm py-2.5 px-3 rounded-xl transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center gap-1.5
            ${active
                ? 'text-[hsl(var(--accent-highlight))] bg-[hsl(var(--accent-highlight)/0.08)]'
                : 'text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]'
            }`}
    >
        {label}
        {badge && (
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-foreground/10 text-foreground/70 rounded-full">
                {badge}
            </span>
        )}
    </Link>
);
