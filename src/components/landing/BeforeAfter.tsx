import React from 'react';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const BeforeAfter = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: beforeRef, isVisible: beforeVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: afterRef, isVisible: afterVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-wide relative z-10">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <span className="glass-pill text-muted-foreground text-xs font-semibold tracking-widest uppercase mb-6">
            The Difference
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Before and After
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Dark coaching notes become clean, printer-ready documents — instantly.
          </p>
        </div>

        {/* Before/After comparison */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Before */}
            <div
              ref={beforeRef}
              className={`scroll-hidden-left ${beforeVisible ? 'scroll-visible-x' : ''}`}
            >
              <div className="relative group ios-press">
                <div className="relative ios-glass-card rounded-[24px] p-5 md:p-6 border border-border/80">
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <Moon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-muted-foreground">Original Coaching Slide</span>
                  </div>
                  {/* Mock dark PDF */}
                  <div className="aspect-[4/3] rounded-xl bg-[#0d0d12] border border-white/5 p-4 md:p-6 font-mono text-xs overflow-hidden relative z-10 shadow-inner">
                    <div className="space-y-2 text-[#e0e0e0]">
                      <div className="text-[#a78bfa] font-bold">// Dark Mode Lecture Notes</div>
                      <div className="h-2 bg-[#2d2d3a] rounded w-3/4" />
                      <div className="h-2 bg-[#2d2d3a] rounded w-full" />
                      <div className="h-2 bg-[#2d2d3a] rounded w-5/6" />
                      <div className="h-2 bg-[#2d2d3a] rounded w-2/3" />
                      <div className="mt-4 text-[#38bdf8]">function example() {'{'}</div>
                      <div className="pl-4 text-[#4ade80]">"Wastes toner & money"</div>
                      <div className="text-[#38bdf8]">{'}'}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground relative z-10">
                    <span>Pitch-black background</span>
                    <span className="text-rose-400 font-medium">₹2–3 per page wasted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow indicator — clean iOS glass circle */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-11 h-11 rounded-full flex items-center justify-center bg-card/95 backdrop-blur-xl border border-border/80 shadow-md">
                <ArrowRight className="w-4 h-4 text-[#007AFF] relative z-10" />
              </div>
            </div>

            {/* Mobile arrow */}
            <div className="flex md:hidden justify-center -my-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center rotate-90 bg-card/95 backdrop-blur-xl border border-border/80 shadow-md">
                <ArrowRight className="w-4 h-4 text-[#007AFF] relative z-10" />
              </div>
            </div>

            {/* After */}
            <div
              ref={afterRef}
              className={`scroll-hidden-right ${afterVisible ? 'scroll-visible-x' : ''}`}
            >
              <div className="relative group ios-press">
                <div className="relative ios-glass-card rounded-[24px] p-5 md:p-6 border border-[#007AFF]/30">
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <Sun className="w-4 h-4 text-[#007AFF]" />
                    <span className="text-sm font-semibold text-[#007AFF]">Converted with Printify</span>
                  </div>
                  {/* Mock light PDF */}
                  <div className="aspect-[4/3] rounded-xl bg-[#ffffff] border border-black/10 p-4 md:p-6 font-mono text-xs overflow-hidden relative z-10 shadow-sm">
                    <div className="space-y-2 text-[#1a1a2e]">
                      <div className="text-[#7c3aed] font-bold">// Clean Printable Notes</div>
                      <div className="h-2 bg-[#e5e5ea] rounded w-3/4" />
                      <div className="h-2 bg-[#e5e5ea] rounded w-full" />
                      <div className="h-2 bg-[#e5e5ea] rounded w-5/6" />
                      <div className="h-2 bg-[#e5e5ea] rounded w-2/3" />
                      <div className="mt-4 text-[#0284c7]">function example() {'{'}</div>
                      <div className="pl-4 text-[#16a34a]">"Crisp, high contrast"</div>
                      <div className="text-[#0284c7]">{'}'}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground relative z-10">
                    <span>Pure white background</span>
                    <span className="text-emerald-500 font-semibold">Saves 60% ink</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
