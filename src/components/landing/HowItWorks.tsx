import React from 'react';
import { Upload, Sliders, Download } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Drop your PDF',
    description: 'Drag and drop any dark-background PDF or image. Lecture notes, code screenshots, slides — it all works.',
  },
  {
    icon: Sliders,
    step: '02',
    title: 'Adjust to your liking',
    description: 'Fine-tune inversion, contrast, brightness. Combine multiple pages per sheet to cut paper use in half.',
  },
  {
    icon: Download,
    step: '03',
    title: 'Download and print',
    description: 'Get a clean, ink-saving PDF in seconds. Ready for your printer or for sharing digitally.',
  },
];

export const HowItWorks = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      <div className="container-wide relative z-10">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 md:mb-20 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <span className="glass-pill text-muted-foreground text-xs font-semibold tracking-widest uppercase mb-6">
            Three Steps
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Drop it. Tweak it. Print it.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            No learning curve. No complicated settings. Just upload, adjust, and download.
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
    {/* Connector line — clean, understated */}
    {!isLast && (
      <div className="hidden md:block absolute top-12 left-[60%] right-0 h-px">
        <div className="w-full h-full bg-gradient-to-r from-foreground/10 to-transparent" />
      </div>
    )}

    <div className="feature-card text-center md:text-left group ios-press">
      {/* Icon with oversized step number */}
      <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 bg-[#007AFF]/10 border border-[#007AFF]/20 group-hover:scale-[1.04] group-hover:bg-[#007AFF]/15">
        <Icon className="w-7 h-7 text-[#007AFF]" />
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#007AFF] text-white text-xs font-bold flex items-center justify-center shadow-sm">
          {step}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-3 tracking-tight text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);
