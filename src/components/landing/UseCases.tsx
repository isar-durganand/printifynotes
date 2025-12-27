import React from 'react';
import { GraduationCap, Code2, Presentation, Palette, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const useCases = [
  {
    icon: BookOpen,
    title: 'Coaching Students',
    description: 'Print PW, Unacademy, Vedantu, and BYJU\'s notes easily. Convert dark lecture slides to ink-saving printable PDFs for NEET & JEE prep.',
    color: 'from-red-500/20 to-transparent',
  },
  {
    icon: GraduationCap,
    title: 'College Students',
    description: 'Transform dark-themed lecture slides, course materials, and university notes into printer-friendly documents for studying.',
    color: 'from-purple-500/20 to-transparent',
  },
  {
    icon: Code2,
    title: 'Developers',
    description: 'Convert code screenshots and IDE exports from dark themes like VS Code into readable printouts for documentation.',
    color: 'from-blue-500/20 to-transparent',
  },
  {
    icon: Presentation,
    title: 'Professionals',
    description: 'Convert dark presentations, reports, and business documents into clean handouts for meetings and print materials.',
    color: 'from-green-500/20 to-transparent',
  },
  {
    icon: Palette,
    title: 'Designers',
    description: 'Export dark-mode mockups, wireframes, and design files as print-ready PDFs for client reviews and presentations.',
    color: 'from-orange-500/20 to-transparent',
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
          <span className="inline-block text-sm text-glow font-medium mb-4">
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
  color,
  isVisible,
  index
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  isVisible: boolean;
  index: number;
}) => (
  <article 
    className={`feature-card group hover-lift text-center scroll-hidden ${isVisible ? 'scroll-visible' : ''} stagger-${index + 1}`}
  >
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} border border-border/50 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-7 h-7 text-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </article>
);
