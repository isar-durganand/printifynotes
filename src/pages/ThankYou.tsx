import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { Heart, Home, ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThankYou = () => {
    return (
        <PageLayout
            title="Thank You!"
            description="Thank you for your generous donation to Printify Notes. Your support helps us keep free PDF tools available for students across India."
            keywords="thank you donation, printify notes support, student tools donation"
            noIndex={true}
        >
            {/* Main Thank You Section */}
            <section className="text-center py-8 sm:py-12 relative max-w-2xl mx-auto">
                {/* Animated decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className="absolute top-[5%] left-[8%] animate-float-slow" style={{ animationDelay: '0s' }}>
                        <Sparkles className="w-5 h-5 text-amber-400/30" />
                    </div>
                    <div className="absolute top-[15%] right-[12%] animate-float-medium" style={{ animationDelay: '0.5s' }}>
                        <Star className="w-4 h-4 text-[#007AFF]/25 fill-[#007AFF]/20" />
                    </div>
                    <div className="absolute top-[35%] left-[5%] animate-float-slow" style={{ animationDelay: '1.5s' }}>
                        <Heart className="w-3 h-3 text-rose-400/20 fill-rose-400/20" />
                    </div>
                    <div className="absolute top-[25%] right-[6%] animate-float-medium" style={{ animationDelay: '2s' }}>
                        <Sparkles className="w-4 h-4 text-pink-400/25" />
                    </div>
                    <div className="absolute bottom-[30%] left-[12%] animate-float-medium" style={{ animationDelay: '1s' }}>
                        <Star className="w-3 h-3 text-amber-400/20 fill-amber-400/20" />
                    </div>
                    <div className="absolute bottom-[20%] right-[10%] animate-float-slow" style={{ animationDelay: '0.8s' }}>
                        <Heart className="w-4 h-4 text-rose-300/20 fill-rose-300/20" />
                    </div>
                </div>

                {/* Animated Heart Icon */}
                <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-500/10 animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="absolute inset-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-500/5 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />

                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[28px] bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/30 flex items-center justify-center shadow-lg shadow-rose-500/10">
                        <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500 fill-rose-500" style={{ animation: 'heartbeat 1.5s ease-in-out infinite' }} />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                    You're Amazing! 🎉
                </h1>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4 text-foreground">
                    Thank You for Your Generosity
                </h2>

                <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-3 leading-relaxed">
                    Your donation means the <strong className="text-foreground">world</strong> to us.
                    Because of generous people like you, thousands of students can continue using
                    Printify Notes <strong className="text-foreground">completely free</strong>.
                </p>

                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
                    You haven't just donated money — you've invested in a student's future.
                    That's truly priceless. 💛
                </p>

                {/* Warm card */}
                <div className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-br from-rose-500/5 via-pink-500/5 to-amber-500/5 hairline-border border-rose-500/20 mb-8 shadow-sm">
                    <p className="text-base sm:text-lg italic text-muted-foreground leading-relaxed">
                        "Education is the most powerful weapon which you can use to change the world."
                    </p>
                    <p className="text-sm text-rose-500 mt-2.5 font-semibold">— Nelson Mandela</p>
                    <div className="mt-4 pt-4 border-t border-rose-500/10">
                        <p className="text-xs text-muted-foreground">
                            Your support is helping us put this belief into action, one student at a time.
                        </p>
                    </div>
                </div>

                {/* What happens next */}
                <div className="p-6 sm:p-7 rounded-[26px] bg-card hairline-border mb-8 shadow-sm text-left">
                    <h3 className="font-bold tracking-tight mb-4 text-center text-foreground">What Your Support Enables</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                        <li className="flex items-start gap-3">
                            <span className="text-[#007AFF] font-bold mt-0.5">✓</span>
                            <span>Free PDF conversion tools for all students</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#007AFF] font-bold mt-0.5">✓</span>
                            <span>New features and improvements regularly</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#007AFF] font-bold mt-0.5">✓</span>
                            <span>Fast, reliable servers available 24/7</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#007AFF] font-bold mt-0.5">✓</span>
                            <span>Privacy-first tools that respect student data</span>
                        </li>
                    </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link to="/">
                        <Button className="rounded-[12px] px-6 h-11 bg-[#007AFF] hover:bg-[#007AFF]/90 text-white font-semibold active:scale-[0.96] transition-transform shadow-md shadow-[#007AFF]/20">
                            <Home className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                    <Link to="/tools">
                        <Button variant="outline" className="rounded-[12px] px-6 h-11 active:scale-[0.96] transition-transform font-semibold">
                            Explore Tools
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>

                {/* Share message */}
                <p className="text-xs text-muted-foreground mt-8 max-w-sm mx-auto">
                    Know someone who'd love free PDF tools? Share Printify Notes with them! 🙌
                </p>
            </section>

            {/* Heartbeat animation */}
            <style>{`
                @keyframes heartbeat {
                    0%, 100% { transform: scale(1); }
                    15% { transform: scale(1.15); }
                    30% { transform: scale(1); }
                    45% { transform: scale(1.1); }
                    60% { transform: scale(1); }
                }
            `}</style>
        </PageLayout>
    );
};

export default ThankYou;
