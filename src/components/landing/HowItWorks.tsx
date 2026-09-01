import React from 'react';
import { Upload, Sliders, Download } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload Your PDF',
    description: 'Drag & drop or click to upload any dark-background PDF. Works with lecture notes, code screenshots, and more.',
  },
  {
    icon: Sliders,
    step: '02',
    title: 'Customize Settings',
    description: 'Adjust inversion, contrast, and brightness. Combine multiple pages per sheet to save paper.',
  },
  {
    icon: Download,
    step: '03',
    title: 'Export & Print',
    description: 'Download your print-ready PDF instantly. Perfect for ink-saving prints or digital sharing.',
  },
];

export const HowItWorks = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 md:mb-20 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <span className="glass-pill text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-6">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Transform your dark PDFs in three simple steps. No learning curve, no complications.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12"
        >
          {steps.map((step, index) => (
            <StepCard
              key={step.step}
              {...step}
              isLast={index === steps.length - 1}
              isVisible={stepsVisible}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const StepCard = ({
  icon: Icon,
  step,
  title,
  description,
  isLast,
  isVisible,
  index
}: {
  icon: React.ElementType;
  step: string;
  title: string;
  description: string;
  isLast: boolean;
  isVisible: boolean;
  index: number;
}) => (
  <div
    className={`relative scroll-hidden ${isVisible ? 'scroll-visible' : ''} stagger-${index + 1}`}
  >
    {/* Connector line — gradient glow */}
    {!isLast && (
      <div className="hidden md:block absolute top-12 left-[60%] right-0 h-px">
        <div className="w-full h-full bg-gradient-to-r from-emerald-500/30 via-cyan-500/20 to-transparent" />
        <div className="w-1/2 h-[1px] bg-gradient-to-r from-emerald-500/10 to-transparent blur-[2px] mt-[-1px]" />
      </div>
    )}

    <div className="feature-card text-center md:text-left group prismatic-border">
      {/* Icon with step number */}
      <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-400 bg-white/[0.04] border border-white/[0.08] group-hover:bg-emerald-500/[0.08] group-hover:border-emerald-500/20 group-hover:shadow-[0_0_24px_rgba(16,185,129,0.1)]">
        <Icon className="w-7 h-7 text-foreground group-hover:text-emerald-400 transition-colors duration-300" />
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.4)]">
          {step}
        </span>
      </div>

      <h3 className="text-xl font-semibold mb-3 relative z-10">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{description}</p>
    </div>
  </div>
);
