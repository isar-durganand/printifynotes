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
            className={`fixed bottom-0 left-0 right-0 z-[9999] transition-all duration-300 ease-out ${
                animating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            role="dialog"
            aria-label="Cookie consent"
            aria-describedby="cookie-consent-description"
        >
            <div className="max-w-4xl mx-auto p-4">
                <div className="rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-2xl shadow-black/30 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Icon */}
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                            <Cookie className="w-5 h-5 text-emerald-500" />
                        </div>

                        {/* Text */}
                        <div className="flex-1" id="cookie-consent-description">
                            <p className="text-sm text-foreground font-medium mb-1">
                                We use cookies to improve your experience
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                We use essential cookies for site functionality and analytics cookies (Google Analytics)
                                to understand how you use our site. We also use advertising cookies (Google AdSense)
                                to show relevant ads. You can accept or reject non-essential cookies.{' '}
                                <Link
                                    to="/privacy"
                                    className="text-emerald-500 hover:underline"
                                >
                                    Read our Privacy Policy
                                </Link>
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                            <button
                                onClick={handleReject}
                                className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                                aria-label="Reject non-essential cookies"
                            >
                                Reject
                            </button>
                            <button
                                onClick={handleAccept}
                                className="flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors font-medium"
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
