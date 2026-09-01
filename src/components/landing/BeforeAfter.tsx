import React from 'react';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const BeforeAfter = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: beforeRef, isVisible: beforeVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: afterRef, isVisible: afterVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/[0.025] rounded-full blur-[120px]" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <span className="glass-pill text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-6">
            See The Difference
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Before & After
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            See how Printify Notes transforms dark PDFs into print-ready documents.
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
              <div className="relative group">
                <div className="relative liquid-glass rounded-2xl p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <Moon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Before</span>
                  </div>
                  {/* Mock dark PDF */}
                  <div className="aspect-[4/3] rounded-xl bg-[#1a1a2e] p-4 md:p-6 font-mono text-xs overflow-hidden relative z-10">
                    <div className="space-y-2 text-[#e0e0e0]">
                      <div className="text-[#9d4edd] font-bold">// Dark Mode Lecture Notes</div>
                      <div className="h-2 bg-[#444] rounded w-3/4" />
                      <div className="h-2 bg-[#444] rounded w-full" />
                      <div className="h-2 bg-[#444] rounded w-5/6" />
                      <div className="h-2 bg-[#444] rounded w-2/3" />
                      <div className="mt-4 text-[#00d9ff]">function example() {'{'}</div>
                      <div className="pl-4 text-[#98c379]">"Impossible to print"</div>
                      <div className="text-[#00d9ff]">{'}'}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground relative z-10">
                    <span>Dark background</span>
                    <span className="text-destructive">High ink usage</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow indicator — glass circle */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_24px_rgba(16,185,129,0.4)]">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Mobile arrow */}
            <div className="flex md:hidden justify-center -my-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center rotate-90 bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* After */}
            <div
              ref={afterRef}
              className={`scroll-hidden-right ${afterVisible ? 'scroll-visible-x' : ''}`}
            >
              <div className="relative group">
                <div className="relative liquid-glass rounded-2xl p-4 md:p-6 glow-border-emerald">
                  {/* Subtle glare / reflection */}
                  <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-emerald-400/[0.04] to-transparent rounded-tr-2xl pointer-events-none z-[1]" />

                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <Sun className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">After</span>
                  </div>
                  {/* Mock light PDF */}
                  <div className="aspect-[4/3] rounded-xl bg-[#fafafa] p-4 md:p-6 font-mono text-xs overflow-hidden relative z-10">
                    <div className="space-y-2 text-[#1a1a2e]">
                      <div className="text-[#6b21a8] font-bold">// Print-Ready Notes</div>
                      <div className="h-2 bg-[#ddd] rounded w-3/4" />
                      <div className="h-2 bg-[#ddd] rounded w-full" />
                      <div className="h-2 bg-[#ddd] rounded w-5/6" />
                      <div className="h-2 bg-[#ddd] rounded w-2/3" />
                      <div className="mt-4 text-[#0369a1]">function example() {'{'}</div>
                      <div className="pl-4 text-[#16a34a]">"Perfect for printing!"</div>
                      <div className="text-[#0369a1]">{'}'}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground relative z-10">
                    <span>Clean background</span>
                    <span className="text-emerald-400 font-medium">60% less ink</span>
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
