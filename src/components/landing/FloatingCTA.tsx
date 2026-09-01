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
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
    >
      <button
        onClick={scrollToUpload}
        className="flex items-center gap-3 px-10 py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 border border-emerald-400/30 shadow-[0_8px_40px_rgba(16,185,129,0.35),0_0_0_0.5px_rgba(255,255,255,0.1)_inset] hover:shadow-[0_12px_50px_rgba(16,185,129,0.45),0_0_0_0.5px_rgba(255,255,255,0.15)_inset] hover:translate-y-[-2px] transition-all duration-300"
      >
        <ArrowUp className="w-5 h-5" />
        Start Converting
      </button>
    </div>
  );
};
