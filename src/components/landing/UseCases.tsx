import React from 'react';
import { GraduationCap, Code2, Presentation, Palette, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const useCases = [
  {
    icon: BookOpen,
    title: 'NEET & JEE Students',
    description: 'Print PW, Unacademy, Vedantu, and BYJU\'s notes without burning through ink cartridges.',
    platforms: ['Physics Wallah', 'Unacademy', 'Vedantu', 'Allen Digital'],
  },
  {
    icon: GraduationCap,
    title: 'College Students',
    description: 'Turn dark-themed lecture slides and course materials into clean study handouts.',
    platforms: ['University slides', 'Course PDFs', 'Research papers'],
  },
  {
    icon: Code2,
    title: 'Developers',
    description: 'Convert VS Code screenshots and dark IDE exports into readable printed documentation.',
    platforms: ['VS Code', 'IntelliJ', 'Terminal output'],
  },
];

const secondaryUseCases = [
  {
    icon: Presentation,
    label: 'Professionals',
    text: 'Dark presentations to clean handouts',
  },
  {
    icon: Palette,
    label: 'Designers',
    text: 'Dark mockups to print-ready client reviews',
  },
];

export const UseCases = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className="section-padding relative">
      <div className="container-wide relative z-10">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <span className="glass-pill text-muted-foreground text-xs font-semibold tracking-widest uppercase mb-6">
            Who It's For
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Made for Students Who Print
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you're printing Physics Wallah notes or Unacademy slides — we convert them to
            clean, ink-saving PDFs in seconds.
          </p>
        </div>

        {/* Primary cards — 3 larger */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5"
        >
          {useCases.map((useCase, index) => (
            <PrimaryUseCaseCard
              key={useCase.title}
              {...useCase}
              isVisible={cardsVisible}
              index={index}
            />
          ))}
        </div>

        {/* Secondary items — compact inline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {secondaryUseCases.map((item, index) => (
            <SecondaryUseCaseCard
              key={item.label}
              {...item}
              isVisible={cardsVisible}
              index={index + 3}
            />
          ))}
        </div>

        {/* SEO content */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground/60 max-w-3xl mx-auto">
            Also works with notes from Allen Digital, Aakash, Motion, Competishun, Etoos, and any dark-background PDF.
          </p>
        </div>
      </div>
    </section>
  );
};

const PrimaryUseCaseCard = ({
  icon: Icon,
  title,
  description,
  platforms,
  isVisible,
  index
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  platforms: string[];
  isVisible: boolean;
  index: number;
}) => (
  <article
    className={`feature-card group text-center scroll-hidden ios-press ${isVisible ? 'scroll-visible' : ''} stagger-${index + 1}`}
  >
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10 bg-[#007AFF]/10 border border-[#007AFF]/20 transition-all duration-300 group-hover:scale-[1.04] group-hover:bg-[#007AFF]/15">
      <Icon className="w-7 h-7 text-[#007AFF]" />
    </div>
    <h3 className="text-lg font-bold mb-2 relative z-10 tracking-tight text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed relative z-10 mb-4">{description}</p>
    {/* Platform tags */}
    <div className="flex flex-wrap justify-center gap-1.5 relative z-10">
      {platforms.map(p => (
        <span key={p} className="text-[11px] px-2.5 py-1 rounded-full bg-foreground/[0.04] border border-border/60 text-muted-foreground font-medium">
          {p}
        </span>
      ))}
    </div>
  </article>
);

const SecondaryUseCaseCard = ({
  icon: Icon,
  label,
  text,
  isVisible,
  index
}: {
  icon: React.ElementType;
  label: string;
  text: string;
  isVisible: boolean;
  index: number;
}) => (
  <div
    className={`feature-card group flex items-center gap-4 scroll-hidden ios-press ${isVisible ? 'scroll-visible' : ''} stagger-${index + 1}`}
  >
    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative z-10 bg-[#007AFF]/10 border border-[#007AFF]/20 transition-all duration-300 group-hover:scale-[1.04]">
      <Icon className="w-5 h-5 text-[#007AFF]" />
    </div>
    <div className="relative z-10">
      <span className="text-sm font-semibold tracking-tight text-foreground">{label}</span>
      <p className="text-muted-foreground text-xs">{text}</p>
    </div>
  </div>
);
