import React, { useState, useEffect, useRef } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { 
    Heart, 
    Server, 
    ShieldCheck, 
    Sparkles, 
    ArrowRight, 
    Check, 
    Share2, 
    ChevronDown, 
    Lock, 
    ExternalLink,
    GraduationCap,
    Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingHeart {
    id: number;
    x: number;
    color: string;
}

const PRESET_AMOUNTS = [
    { value: 50, label: '₹50', description: 'Covers edge bandwidth and daily asset delivery' },
    { value: 100, label: '₹100', description: 'Helps cover server uptime during busy weeks' },
    { value: 250, label: '₹250', description: 'Supports high traffic during peak exam months' },
    { value: 500, label: '₹500', description: 'Goes a long way toward our yearly infrastructure bill' },
    { value: 'custom', label: 'Custom', description: 'Enter any amount you are comfortable with' }
];

const FAQS = [
    {
        question: 'Can I donate using UPI (Google Pay, PhonePe, Paytm)?',
        answer: 'Yes! When you click the Razorpay button, a secure window opens with instant UPI options (Google Pay, PhonePe, Paytm, BHIM), plus Credit/Debit cards and Netbanking.'
    },
    {
        question: 'Do you store any of my payment information?',
        answer: 'Never. All payment processing is securely managed by Razorpay with end-to-end 256-bit encryption. Printify Notes never sees or stores your bank or card details.'
    },
    {
        question: 'Will Printify Notes ever become a paid tool?',
        answer: 'No. Printify Notes is committed to remaining 100% free and ad-free for students. Donations simply help offset the hosting, domain, and server bills.'
    },
    {
        question: 'How else can I help if I cannot donate?',
        answer: 'Sharing Printify Notes with classmates, study groups, or on social media helps tremendously. Word of mouth is how most students find this tool!'
    }
];

const Donate = () => {
    const razorpayRef = useRef<HTMLDivElement>(null);
    const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(100);
    const [customValue, setCustomValue] = useState<string>('200');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [hearts, setHearts] = useState<FloatingHeart[]>([]);
    const [heartCount, setHeartCount] = useState<number>(342);
    const [hasCopiedShare, setHasCopiedShare] = useState<boolean>(false);

    useEffect(() => {
        // Load Razorpay payment button script
        if (razorpayRef.current) {
            const existingScript = razorpayRef.current.querySelector('script');
            if (!existingScript) {
                const form = document.createElement('form');
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
                script.setAttribute('data-payment_button_id', 'pl_STOGSOe2hH7fff');
                script.async = true;
                form.appendChild(script);
                razorpayRef.current.appendChild(form);
            }
        }
    }, []);

    // Handle heart animation
    const handleAddHeart = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const randomX = Math.floor(Math.random() * (rect.width - 20));
        const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#38bdf8'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const newHeart: FloatingHeart = {
            id: Date.now() + Math.random(),
            x: randomX,
            color: randomColor
        };

        setHearts(prev => [...prev.slice(-12), newHeart]);
        setHeartCount(prev => prev + 1);

        setTimeout(() => {
            setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 1400);
    };

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText('https://www.printifynotes.in/donate');
            setHasCopiedShare(true);
            setTimeout(() => setHasCopiedShare(false), 2500);
        }
    };

    const currentPreset = PRESET_AMOUNTS.find(p => p.value === selectedAmount);

    return (
        <PageLayout
            title="Support Printify Notes"
            description="Help keep Printify Notes free and ad-free for students across India. Your support covers server, hosting, and domain costs."
            keywords="donate printify notes, support free pdf tools, student tools india, contribute education"
            hideDefaultTitle={true}
            noProse={true}
            maxWidth="max-w-5xl"
        >
            {/* Ambient Liquid Glass Orbs (Refractive background lights) */}
            <div className="relative isolate overflow-hidden -mx-4 px-4 sm:-mx-8 sm:px-8 pt-4 pb-20">
                {/* Floating ambient glow orbs */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[480px] bg-gradient-to-tr from-rose-500/20 via-pink-500/15 to-teal-400/20 rounded-full blur-[90px] -z-10 pointer-events-none animate-liquid-glow" />
                <div className="absolute top-80 -right-20 w-[260px] sm:w-[380px] h-[260px] sm:h-[380px] bg-gradient-to-bl from-teal-500/15 via-sky-500/10 to-transparent rounded-full blur-[80px] -z-10 pointer-events-none" />
                <div className="absolute top-[650px] -left-20 w-[300px] h-[300px] bg-rose-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

                {/* ═══════════════════════════════════════════════════ */}
                {/* 1. HERO SECTION: Apple-grade Fluid Header           */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="text-center max-w-3xl mx-auto pt-6 pb-12 sm:pt-10 sm:pb-16 relative">
                    
                    {/* Dynamic Island style live status pill */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full liquid-glass text-xs sm:text-sm font-medium text-foreground/90 mb-8 border border-white/10 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>100% Free • Zero Ads Forever • Built for Students</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.15]">
                        Keep Printify Notes{' '}
                        <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-teal-300 bg-clip-text text-transparent">
                            Free for Everyone
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
                        Printify Notes was built by a student to save thousands of aspirants from wasting money on dark ink printouts. We don&apos;t run spammy ads or lock features behind paywalls. Your contribution keeps our servers running smoothly.
                    </p>

                    {/* Quick trust metrics row */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/[0.03] border border-white/5">
                            <ShieldCheck className="w-4 h-4 text-teal-400" />
                            <span>100% Secure via Razorpay</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/[0.03] border border-white/5">
                            <GraduationCap className="w-4 h-4 text-rose-400" />
                            <span>Helping NEET & JEE aspirants</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/[0.03] border border-white/5">
                            <Leaf className="w-4 h-4 text-emerald-400" />
                            <span>Saves paper & printer ink</span>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════ */}
                {/* 2. THE LIQUID GLASS PAYMENT TERMINAL                */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="max-w-xl mx-auto mb-20">
                    <div className="ios-glass-card p-6 sm:p-9 relative overflow-hidden border border-white/10 shadow-2xl">
                        {/* Inner specular gloss line */}
                        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                        
                        <div className="relative z-10 text-center">
                            
                            {/* Card badge */}
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-rose-500/15 via-rose-500/10 to-transparent border border-rose-500/20 flex items-center justify-center mx-auto mb-5 shadow-inner">
                                <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-rose-400 fill-rose-400/20" />
                            </div>

                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                                Choose an Amount
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                                Select an amount below to support our server infrastructure
                            </p>

                            {/* iOS Fluid Segmented Selector */}
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 p-1.5 rounded-2xl bg-black/20 dark:bg-white/[0.03] border border-white/5 mb-4">
                                {PRESET_AMOUNTS.map((preset) => {
                                    const isSelected = selectedAmount === preset.value;
                                    return (
                                        <button
                                            key={preset.label}
                                            type="button"
                                            onClick={() => setSelectedAmount(preset.value as number | 'custom')}
                                            className={`
                                                relative py-2.5 px-2 rounded-xl text-sm font-semibold transition-all duration-300 ios-tap-spring
                                                ${isSelected 
                                                    ? 'bg-gradient-to-b from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/30 scale-[1.02]' 
                                                    : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                                                }
                                            `}
                                        >
                                            {preset.label}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Custom Amount input if selected */}
                            {selectedAmount === 'custom' && (
                                <div className="mb-4 animate-scale-in">
                                    <div className="relative max-w-xs mx-auto">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-lg">
                                            ₹
                                        </span>
                                        <input
                                            type="number"
                                            min="10"
                                            step="10"
                                            value={customValue}
                                            onChange={(e) => setCustomValue(e.target.value)}
                                            placeholder="Enter amount"
                                            className="w-full pl-9 pr-4 py-3 text-center text-lg font-bold rounded-xl bg-background/50 border border-border focus:border-rose-500/50 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Dynamic note explaining what this amount helps with */}
                            <div className="min-h-[40px] flex items-center justify-center mb-6">
                                <p className="text-xs sm:text-sm text-foreground/80 transition-all duration-300 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
                                    💡 {selectedAmount === 'custom' 
                                        ? `₹${customValue || '0'} directly helps cover hosting & edge bandwidth.`
                                        : currentPreset?.description
                                    }
                                </p>
                            </div>

                            {/* Official Razorpay Checkout Container */}
                            <div className="pt-2 pb-1">
                                <div
                                    ref={razorpayRef}
                                    className="flex justify-center items-center min-h-[75px] [&_form]:scale-115 sm:[&_form]:scale-125 [&_form]:origin-center transition-transform"
                                    id="razorpay-donate-button"
                                />
                            </div>

                            {/* Payment method trust line */}
                            <div className="mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-muted-foreground gap-2">
                                <div className="flex items-center gap-1.5">
                                    <Lock className="w-3.5 h-3.5 text-teal-400" />
                                    <span>256-Bit SSL Encrypted Checkout</span>
                                </div>
                                <div>
                                    <span>Supports UPI, Cards & Netbanking</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════ */}
                {/* 3. TRANSPARENT FUND ALLOCATION                      */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="max-w-4xl mx-auto mb-20">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                            Where Does Your Money Go?
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                            We believe in complete transparency. Every single rupee goes directly into keeping the service live and fast.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Box 1 */}
                        <div className="ios-glass-card p-6 border border-white/10 flex flex-col justify-between">
                            <div>
                                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                                    <Server className="w-5 h-5" />
                                </div>
                                <h3 className="font-semibold text-base mb-2">Hosting & Bandwidth</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Delivering high-performance PDF rendering engines to thousands of students every day without lag or downtime.
                                </p>
                            </div>
                            <div className="mt-5 pt-4 border-t border-white/5 text-xs text-muted-foreground flex items-center justify-between">
                                <span>Share of expenses</span>
                                <span className="font-semibold text-foreground">~50%</span>
                            </div>
                        </div>

                        {/* Box 2 */}
                        <div className="ios-glass-card p-6 border border-white/10 flex flex-col justify-between">
                            <div>
                                <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4 text-teal-400">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <h3 className="font-semibold text-base mb-2">Zero Ads & Privacy</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    We refuse to monetize student notes with intrusive advertising, trackers, or selling user data. Your donation preserves that principle.
                                </p>
                            </div>
                            <div className="mt-5 pt-4 border-t border-white/5 text-xs text-muted-foreground flex items-center justify-between">
                                <span>Commitment</span>
                                <span className="font-semibold text-teal-400">100% Clean UI</span>
                            </div>
                        </div>

                        {/* Box 3 */}
                        <div className="ios-glass-card p-6 border border-white/10 flex flex-col justify-between">
                            <div>
                                <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4 text-rose-400">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <h3 className="font-semibold text-base mb-2">Tool Improvements</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Continuous development of new tools — such as PDF merging, smart compression, and page extractors — built for Indian students.
                                </p>
                            </div>
                            <div className="mt-5 pt-4 border-t border-white/5 text-xs text-muted-foreground flex items-center justify-between">
                                <span>Updates</span>
                                <span className="font-semibold text-rose-400">Always Free</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════ */}
                {/* 4. CREATOR'S PERSONAL NOTE (Clean, Authentic)       */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="max-w-3xl mx-auto mb-20">
                    <div className="ios-glass-card p-7 sm:p-9 relative overflow-hidden border border-white/10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-5">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
                                DI
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">A Note from Durganand</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    Founder & Developer • First-year CSE Student, MRIIRS Faridabad
                                </p>
                            </div>
                        </div>

                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                            &ldquo;I created Printify Notes because coaching platforms upload lecture slides with pitch-black backgrounds. Printing a 40-page chapter often cost students ₹80–100 just in black toner.
                        </p>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                            My promise has always been simple: keep this tool fast, private, and 100% free for any student who needs it. If this project helped you save even a fraction of your study budget, thank you for considering supporting it.&rdquo;
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
                            <a
                                href="https://www.linkedin.com/in/durganandishar/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-foreground transition-colors border border-white/5"
                            >
                                <span>Connect on LinkedIn</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-muted-foreground hover:text-foreground transition-colors border border-white/5"
                            >
                                <span>Read our full story</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════ */}
                {/* 5. DELIGHTFUL MICRO-INTERACTION: Tap to Send Love    */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="max-w-md mx-auto mb-20 text-center relative">
                    <div className="relative inline-block">
                        {/* Spawning floating hearts */}
                        {hearts.map(heart => (
                            <div
                                key={heart.id}
                                className="absolute bottom-10 animate-float-heart z-20 pointer-events-none"
                                style={{ left: `${heart.x}px` }}
                            >
                                <Heart
                                    className="w-5 h-5 drop-shadow-md"
                                    style={{ fill: heart.color, color: heart.color }}
                                />
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddHeart}
                            className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full liquid-glass-interactive border border-rose-500/20 text-sm font-semibold text-foreground shadow-md ios-tap-spring"
                        >
                            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform duration-300" />
                            <span>Tap to Send Love</span>
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 text-xs font-mono">
                                {heartCount}
                            </span>
                        </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        Can&apos;t donate? Tap to cheer us on! It means the world to us.
                    </p>
                </section>

                {/* ═══════════════════════════════════════════════════ */}
                {/* 6. STRAIGHTFORWARD FAQ (Liquid Accordion)           */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="max-w-3xl mx-auto mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold tracking-tight mb-2">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Quick answers about donations and privacy
                        </p>
                    </div>

                    <div className="space-y-3">
                        {FAQS.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={faq.question}
                                    className="ios-glass-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-medium text-sm sm:text-base text-foreground focus:outline-none"
                                    >
                                        <span>{faq.question}</span>
                                        <ChevronDown 
                                            className={`w-4 h-4 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-foreground' : ''}`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed animate-fade-in border-t border-white/[0.04]">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════ */}
                {/* 7. SHARE BANNER: Other ways to help                 */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="max-w-3xl mx-auto">
                    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-500/5 via-pink-500/5 to-teal-500/5 border border-white/10 text-center">
                        <h3 className="text-lg sm:text-xl font-bold mb-2">
                            Spread the Word to Friends & Study Groups
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto mb-6">
                            Know someone preparing for NEET, JEE, or semester exams? Sharing Printify Notes helps them save hundreds on printouts.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={handleShare}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl liquid-glass text-xs sm:text-sm font-semibold hover:bg-white/[0.08] transition-all ios-tap-spring border border-white/10"
                            >
                                {hasCopiedShare ? (
                                    <>
                                        <Check className="w-4 h-4 text-emerald-400" />
                                        <span>Link Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Share2 className="w-4 h-4 text-foreground/80" />
                                        <span>Copy Link to Share</span>
                                    </>
                                )}
                            </button>
                            <Link to="/contact">
                                <Button variant="outline" className="rounded-xl text-xs sm:text-sm h-10 border-white/10">
                                    Have feedback or ideas? Contact us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </PageLayout>
    );
};

export default Donate;
