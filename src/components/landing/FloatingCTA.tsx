import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
    >
      <button
        onClick={scrollToUpload}
        className="flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-accent-foreground bg-accent shadow-[0_8px_30px_rgba(0,122,255,0.35)] hover:shadow-[0_10px_35px_rgba(0,122,255,0.45)] hover:scale-[1.01] active:scale-[0.96] transition-all duration-200"
      >
        <ArrowUp className="w-4 h-4" />
        Start Converting
      </button>
    </div>
  );
};

