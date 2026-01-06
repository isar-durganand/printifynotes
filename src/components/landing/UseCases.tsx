import React from 'react';
import { GraduationCap, Code2, Presentation, Palette, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const useCases = [
  {
    icon: BookOpen,
    title: 'Coaching Students',
    description: 'Print PW, Unacademy, Vedantu, and BYJU\'s notes easily. Convert dark lecture slides to ink-saving printable PDFs for NEET & JEE prep.',
  },
  {
    icon: GraduationCap,
    title: 'College Students',
    description: 'Transform dark-themed lecture slides, course materials, and university notes into printer-friendly documents for studying.',
  },
  {
    icon: Code2,
    title: 'Developers',
    description: 'Convert code screenshots and IDE exports from dark themes like VS Code into readable printouts for documentation.',
  },
  {
    icon: Presentation,
    title: 'Professionals',
    description: 'Convert dark presentations, reports, and business documents into clean handouts for meetings and print materials.',
  },
  {
    icon: Palette,
    title: 'Designers',
    description: 'Export dark-mode mockups, wireframes, and design files as print-ready PDFs for client reviews and presentations.',
  },
];

export const UseCases = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className="section-padding bg-card/30">
      <div className="container-wide">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <span className="inline-block text-sm text-emerald-500 font-medium mb-4">
            WHO IT'S FOR
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Perfect For Students & Professionals
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're printing Physics Wallah notes, Unacademy slides, or dark-mode documents —
            Printify Notes converts them to clean, ink-saving PDFs instantly.
          </p>
        </div>

        {/* Use case cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {useCases.map((useCase, index) => (
            <UseCaseCard
              key={useCase.title}
              {...useCase}
              isVisible={cardsVisible}
              index={index}
            />
          ))}
        </div>

        {/* Additional SEO content */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground/70 max-w-3xl mx-auto">
            Supports notes from all major coaching platforms including Allen Digital, Aakash,
            Motion, Competishun, and more. Works with any dark-background PDF document.
          </p>
        </div>
      </div>
    </section>
  );
};

const UseCaseCard = ({
  icon: Icon,
  title,
  description,
  isVisible,
  index
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  isVisible: boolean;
  index: number;
}) => (
  <article
    className={`feature-card group hover-lift text-center scroll-hidden ${isVisible ? 'scroll-visible' : ''} stagger-${index + 1}`}
  >
    <div className="w-16 h-16 rounded-2xl bg-secondary border border-border/50 flex items-center justify-center mx-auto mb-5 group-hover:bg-secondary/80 group-hover:border-border transition-all duration-300">
      <Icon className="w-7 h-7 text-foreground group-hover:text-emerald-500 transition-colors duration-300" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </article>
);
