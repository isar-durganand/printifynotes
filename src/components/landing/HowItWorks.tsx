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
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="container-wide relative z-10">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 md:mb-20 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <span className="inline-block text-sm text-emerald-500 font-medium mb-4">
            SIMPLE PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
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
    {/* Connector line (hidden on mobile and last item) */}
    {!isLast && (
      <div className="hidden md:block absolute top-12 left-[60%] right-0 h-px bg-gradient-to-r from-border to-transparent" />
    )}

    <div className="feature-card text-center md:text-left group">
      {/* Icon with step number */}
      <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-6 group-hover:bg-secondary/80 transition-all duration-300">
        <Icon className="w-7 h-7 text-foreground" />
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
          {step}
        </span>
      </div>

      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);
