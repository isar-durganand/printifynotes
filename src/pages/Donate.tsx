import React, { useEffect, useRef } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { Heart, Coffee, Server, Code, Sparkles, Gift, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Donate = () => {
    const razorpayRef = useRef<HTMLDivElement>(null);

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

    return (
        <PageLayout
            title="Support Printify Notes"
            description="Help us keep Printify Notes free for everyone. Your donation supports server costs, development, and helps students across India access free PDF tools."
            keywords="donate printify notes, support free pdf tools, help students india, contribute education"
        >
            {/* Hero Section with Donate Button */}
            <section className="mb-16 text-center relative">
                {/* Animated floating hearts */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className="absolute top-0 left-[10%] animate-float-slow opacity-20">
                        <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
                    </div>
                    <div className="absolute top-[20%] right-[15%] animate-float-medium opacity-15">
                        <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
                    </div>
                    <div className="absolute top-[40%] left-[5%] animate-float-medium opacity-10" style={{ animationDelay: '1s' }}>
                        <Sparkles className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="absolute top-[10%] right-[8%] animate-float-slow opacity-15" style={{ animationDelay: '2s' }}>
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                    </div>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium mb-6">
                    <Heart className="w-4 h-4 fill-current" />
                    Support Our Mission
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
                    Help Us Keep Education Free
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                    Printify Notes is and always will be <strong className="text-foreground">100% free</strong> for every student.
                    Your donation helps us cover costs and serve thousands of students across India. 💛
                </p>

                {/* Donate Button — right in the hero for maximum impact */}
                <div className="max-w-sm mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-rose-500/5 via-pink-500/5 to-emerald-500/5 border border-rose-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent rounded-2xl blur-xl" aria-hidden="true" />
                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-4">
                            <Gift className="w-7 h-7 text-rose-400" />
                        </div>
                        <h2 className="text-lg font-semibold mb-1">Donate Now</h2>
                        <p className="text-xs text-muted-foreground mb-5">
                            Secure payment via Razorpay — choose any amount.
                        </p>
                        <div
                            ref={razorpayRef}
                            className="flex justify-center items-center min-h-[80px] [&_form]:scale-125 [&_form]:origin-center"
                            id="razorpay-donate-button"
                        />
                        <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                            🔒 100% Secure • Powered by Razorpay
                        </p>
                    </div>
                </div>
            </section>

            {/* What Your Donation Supports */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-2 text-center">Where Your Donation Goes</h2>
                <p className="text-muted-foreground text-center mb-8 max-w-lg mx-auto">
                    Every contribution directly supports keeping our tools free and accessible.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 rounded-2xl bg-card border border-border hover-lift group">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Server className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Server & Hosting</h3>
                        <p className="text-sm text-muted-foreground">
                            Keeping our servers running so students can access tools 24/7 without interruption.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-border hover-lift group">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Code className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="font-semibold mb-2">New Features</h3>
                        <p className="text-sm text-muted-foreground">
                            Building new PDF tools and improving existing ones to better serve student needs.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border border-border hover-lift group">
                        <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Heart className="w-6 h-6 text-rose-400" />
                        </div>
                        <h3 className="font-semibold mb-2">Keeping It Free</h3>
                        <p className="text-sm text-muted-foreground">
                            Ensuring every student, regardless of financial background, can access quality tools.
                        </p>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="mb-16 p-8 rounded-2xl bg-muted/50 text-center">
                <h2 className="text-2xl font-semibold mb-6">Your Impact Matters</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <div className="text-3xl font-bold text-emerald-400 mb-1">🎓</div>
                        <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground block mb-1">Students Helped</strong>
                            Thousands of NEET & JEE aspirants use our tools every month
                        </p>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-blue-400 mb-1">🌱</div>
                        <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground block mb-1">Ink Saved</strong>
                            Students save significantly on printing costs
                        </p>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-rose-400 mb-1">💰</div>
                        <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground block mb-1">Always Free</strong>
                            No student will ever have to pay for our tools
                        </p>
                    </div>
                </div>
            </section>

            {/* Other Ways to Support */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6 text-center">Other Ways to Support</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="p-6 rounded-2xl bg-card border border-border">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                <Coffee className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Spread the Word</h3>
                                <p className="text-sm text-muted-foreground">
                                    Share Printify Notes with your friends, classmates, and study groups. Word of mouth is our biggest growth driver!
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-card border border-border">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Give Feedback</h3>
                                <p className="text-sm text-muted-foreground">
                                    Tell us what features you'd like to see! Your feedback shapes the future of Printify Notes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Thank You Note */}
            <section className="p-8 rounded-2xl bg-gradient-to-br from-rose-500/5 to-emerald-500/5 border border-rose-500/10 text-center">
                <Heart className="w-8 h-8 text-rose-400 fill-rose-400 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-3">Thank You for Caring</h2>
                <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                    Whether you donate, share, or simply use our tools — you're part of the Printify Notes family.
                    Together, we're making education more affordable for everyone.
                </p>
                <Link to="/contact">
                    <Button variant="outline" className="rounded-full border-rose-500/30 hover:bg-rose-500/10 text-rose-400 hover:text-rose-300">
                        Questions? Contact Us
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
            </section>
        </PageLayout>
    );
};

export default Donate;
