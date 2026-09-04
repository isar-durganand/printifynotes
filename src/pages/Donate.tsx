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
            {/* Ambient Background Lights */}
            <div className="relative isolate overflow-hidden -mx-4 px-4 sm:-mx-8 sm:px-8 pt-4 pb-20">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[480px] bg-accent/15 rounded-full blur-[100px] -z-10 pointer-events-none" />

                {/* ═══════════════════════════════════════════════════ */}
                {/* 1. HERO SECTION: Apple-grade Fluid Header           */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="text-center max-w-3xl mx-auto pt-6 pb-12 sm:pt-10 sm:pb-16 relative">
                    
                    {/* Dynamic live status pill */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] text-xs font-semibold text-foreground mb-8 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>100% Free • Zero Ads Forever • Built for Students</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.022em] mb-6 leading-[1.12]">
                        Keep Printify Notes{' '}
                        <span className="text-accent">
                            Free for Everyone
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
                        Printify Notes was built by a student to save thousands of aspirants from wasting money on dark ink printouts. We don&apos;t run spammy ads or lock features behind paywalls. Your contribution keeps our servers running smoothly.
                    </p>

                    {/* Quick trust metrics row */}
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card/60 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1]">
                            <ShieldCheck className="w-4 h-4 text-accent" />
                            <span className="font-medium">100% Secure via Razorpay</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card/60 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1]">
                            <GraduationCap className="w-4 h-4 text-accent" />
                            <span className="font-medium">Helping NEET & JEE aspirants</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card/60 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.1]">
                            <Leaf className="w-4 h-4 text-emerald-500" />
                            <span className="font-medium">Saves paper & printer ink</span>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════ */}
                {/* 2. THE LIQUID GLASS PAYMENT TERMINAL                */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="max-w-xl mx-auto mb-20">
                    <div className="rounded-[32px] bg-card/85 backdrop-blur-2xl p-6 sm:p-9 relative overflow-hidden border border-black/[0.08] dark:border-white/[0.1] shadow-xl">
                        <div className="relative z-10 text-center">
                            
                            {/* Card badge */}
                            <div className="w-14 h-14 rounded-[20px] bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-5 shadow-sm">
                                <Heart className="w-7 h-7 text-accent fill-accent/20" />
                            </div>

                            <h2 className="text-2xl font-bold tracking-[-0.022em] mb-2">
                                Choose an Amount
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                                Select an amount below to support our server infrastructure
                            </p>

                            {/* iOS Fluid Segmented Selector */}
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 p-1.5 rounded-[18px] bg-muted/60 border border-black/[0.06] dark:border-white/[0.08] mb-5">
                                {PRESET_AMOUNTS.map((preset) => {
                                    const isSelected = selectedAmount === preset.value;
                                    return (
                                        <button
                                            key={preset.label}
                                            type="button"
                                            onClick={() => setSelectedAmount(preset.value as number | 'custom')}
                                            className={`
                                                relative py-2.5 px-2 rounded-[12px] text-sm font-semibold transition-all duration-200 active:scale-[0.95]
                                                ${isSelected 
                                                    ? 'bg-accent text-accent-foreground shadow-sm' 
                                                    : 'text-muted-foreground hover:text-foreground hover:bg-background/40'
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
                                <div className="mb-5 animate-scale-in">
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
                                            className="w-full pl-9 pr-4 py-3 text-center text-lg font-bold rounded-[14px] bg-background/80 border border-black/[0.1] dark:border-white/[0.15] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Dynamic note explaining what this amount helps with */}
                            <div className="min-h-[40px] flex items-center justify-center mb-6">
                                <p className="text-xs sm:text-sm text-foreground/80 transition-all duration-300 px-4 py-1.5 rounded-full bg-background/60 border border-black/[0.06] dark:border-white/[0.08]">
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
                            <div className="mt-5 pt-4 border-t border-black/[0.08] dark:border-white/[0.1] flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-muted-foreground gap-2">
                                <div className="flex items-center gap-1.5">
                                    <Lock className="w-3.5 h-3.5 text-accent" />
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
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.022em] mb-3">
                            Where Does Your Money Go?
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                            We believe in complete transparency. Every single rupee goes directly into keeping the service live and fast.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Box 1 */}
                        <div className="rounded-[24px] bg-card/80 backdrop-blur-xl p-6 border border-black/[0.08] dark:border-white/[0.1] shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200">
                            <div>
                                <div className="w-11 h-11 rounded-[14px] bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 text-accent">
                                    <Server className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-base mb-2 tracking-tight">Hosting & Bandwidth</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Delivering high-performance PDF rendering engines to thousands of students every day without lag or downtime.
                                </p>
                            </div>
                            <div className="mt-5 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] text-xs text-muted-foreground flex items-center justify-between">
                                <span>Share of expenses</span>
                                <span className="font-semibold text-foreground">~50%</span>
                            </div>
                        </div>

                        {/* Box 2 */}
                        <div className="rounded-[24px] bg-card/80 backdrop-blur-xl p-6 border border-black/[0.08] dark:border-white/[0.1] shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200">
                            <div>
                                <div className="w-11 h-11 rounded-[14px] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-500">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-base mb-2 tracking-tight">Zero Ads & Privacy</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    We refuse to monetize student notes with intrusive advertising, trackers, or selling user data. Your donation preserves that principle.
                                </p>
                            </div>
                            <div className="mt-5 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] text-xs text-muted-foreground flex items-center justify-between">
                                <span>Commitment</span>
                                <span className="font-semibold text-emerald-500">100% Clean UI</span>
                            </div>
                        </div>

                        {/* Box 3 */}
                        <div className="rounded-[24px] bg-card/80 backdrop-blur-xl p-6 border border-black/[0.08] dark:border-white/[0.1] shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200">
                            <div>
                                <div className="w-11 h-11 rounded-[14px] bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 text-accent">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-base mb-2 tracking-tight">Tool Improvements</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Continuous development of new tools — such as PDF merging, smart compression, and page extractors — built for Indian students.
                                </p>
                            </div>
                            <div className="mt-5 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] text-xs text-muted-foreground flex items-center justify-between">
                                <span>Updates</span>
                                <span className="font-semibold text-accent">Always Free</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════ */}
                {/* 4. CREATOR'S PERSONAL NOTE                           */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="max-w-3xl mx-auto mb-20">
                    <div className="rounded-[28px] bg-card/80 backdrop-blur-xl p-7 sm:p-9 border border-black/[0.08] dark:border-white/[0.1] shadow-sm">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-5">
                            <div className="w-14 h-14 rounded-[18px] bg-accent text-accent-foreground flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                                DI
                            </div>
                            <div>
                                <h3 className="text-lg font-bold tracking-tight">A Note from Durganand</h3>
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

                        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/[0.08] dark:border-white/[0.1]">
                            <a
                                href="https://www.linkedin.com/in/durganandishar/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full bg-foreground/[0.04] hover:bg-foreground/[0.08] active:scale-[0.95] text-foreground transition-all border border-black/[0.06] dark:border-white/[0.08] font-medium"
                            >
                                <span>Connect on LinkedIn</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-1 text-xs px-3.5 py-1.5 rounded-full bg-foreground/[0.04] hover:bg-foreground/[0.08] active:scale-[0.95] text-muted-foreground hover:text-foreground transition-all border border-black/[0.06] dark:border-white/[0.08] font-medium"
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
                            className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-card/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] text-sm font-semibold text-foreground shadow-sm active:scale-[0.95] transition-all duration-200"
                        >
                            <Heart className="w-5 h-5 text-red-500 fill-red-500 group-hover:scale-125 transition-transform duration-200" />
                            <span>Tap to Send Love</span>
                            <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-mono font-bold">
                                {heartCount}
                            </span>
                        </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 font-medium">
                        Can&apos;t donate? Tap to cheer us on! It means the world to us.
                    </p>
                </section>

                {/* ═══════════════════════════════════════════════════ */}
                {/* 6. STRAIGHTFORWARD FAQ (iOS Grouped Accordion)      */}
                {/* ═══════════════════════════════════════════════════ */}
                <section className="max-w-3xl mx-auto mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold tracking-[-0.022em] mb-2">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Quick answers about donations and privacy
                        </p>
                    </div>

                    <div className="rounded-[24px] bg-card/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] divide-y divide-black/[0.06] dark:divide-white/[0.08] overflow-hidden shadow-sm">
                        {FAQS.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div key={faq.question} className="transition-colors">
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground focus:outline-none active:bg-foreground/[0.03] transition-colors"
                                    >
                                        <span>{faq.question}</span>
                                        <ChevronDown 
                                            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-foreground' : ''}`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed animate-fade-in">
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
                    <div className="p-7 sm:p-9 rounded-[28px] bg-card/70 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] shadow-sm text-center">
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2">
                            Spread the Word to Friends & Study Groups
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto mb-6">
                            Know someone preparing for NEET, JEE, or semester exams? Sharing Printify Notes helps them save hundreds on printouts.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={handleShare}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-accent text-accent-foreground text-xs sm:text-sm font-semibold active:scale-[0.96] transition-transform duration-200 shadow-sm"
                            >
                                {hasCopiedShare ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        <span>Link Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Share2 className="w-4 h-4" />
                                        <span>Copy Link to Share</span>
                                    </>
                                )}
                            </button>
                            <Link to="/contact">
                                <Button variant="outline" className="rounded-[12px] text-xs sm:text-sm h-10 border-black/[0.08] dark:border-white/[0.1] active:scale-[0.96]">
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
