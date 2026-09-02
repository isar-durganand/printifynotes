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
        className="flex items-center gap-3 px-10 py-4 rounded-2xl text-base font-semibold text-white bg-[hsl(var(--accent-highlight))] border-t border-l border-white/20 border-b border-r border-black/5 shadow-[0_8px_32px_rgba(var(--accent-rgb),0.2),0_2px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_rgba(var(--accent-rgb),0.25),0_4px_10px_rgba(0,0,0,0.1)] hover:translate-y-[-2px] hover:scale-[1.02] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <ArrowUp className="w-5 h-5" />
        Start Converting
      </button>
    </div>
  );
};
