import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'printifynotes_cookie_consent';

type ConsentStatus = 'accepted' | 'rejected' | null;

export const CookieConsent: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus;
        if (!stored) {
            // Small delay so banner slides in smoothly after page load
            const timer = setTimeout(() => {
                setVisible(true);
                requestAnimationFrame(() => setAnimating(true));
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
        setAnimating(false);
        setTimeout(() => setVisible(false), 300);
    };

    const handleReject = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
        setAnimating(false);
        setTimeout(() => setVisible(false), 300);
    };

    if (!visible) return null;

    return (
        <div
            className={`fixed bottom-4 left-0 right-0 z-[9999] px-4 transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                animating ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'
            }`}
            role="dialog"
            aria-label="Cookie consent"
            aria-describedby="cookie-consent-description"
        >
            <div className="max-w-3xl mx-auto">
                <div className="rounded-[24px] bg-card/95 backdrop-blur-2xl border border-border/80 shadow-2xl p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Icon */}
                        <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center flex-shrink-0">
                            <Cookie className="w-5 h-5" />
                        </div>

                        {/* Text */}
                        <div className="flex-1" id="cookie-consent-description">
                            <p className="text-sm text-foreground font-semibold mb-0.5 tracking-tight">
                                We respect your privacy
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                We use essential cookies for site functionality and analytics to understand usage. All PDF operations remain 100% in your browser. You can customize preferences anytime.{' '}
                                <Link
                                    to="/privacy"
                                    className="text-[#007AFF] hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                            <button
                                onClick={handleReject}
                                className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm rounded-xl border border-border/80 text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] transition-all ios-press active:scale-[0.96]"
                                aria-label="Reject non-essential cookies"
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleAccept}
                                className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm rounded-xl bg-[#007AFF] text-white hover:bg-[#007AFF]/90 shadow-sm transition-all font-medium ios-press active:scale-[0.96]"
                                aria-label="Accept all cookies"
                            >
                                Accept All
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
