import React from 'react';
import {
  Sun,
  Palette,
  LayoutGrid,
  Layers,
  Leaf,
  Lock
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const features = [
  {
    icon: Sun,
    title: 'Smart Color Inversion',
    description: 'Dark backgrounds flip to white automatically. Text stays sharp, images stay intact.',
    large: true,
  },
  {
    icon: LayoutGrid,
    title: 'Multi-Page Layouts',
    description: 'Fit 2, 3, or 4 pages on a single sheet. Print fewer pages, study the same content.',
    large: true,
  },
  {
    icon: Palette,
    title: 'Grayscale Mode',
    description: 'Strip out color for maximum ink savings. Readability stays high.',
  },
  {
    icon: Layers,
    title: 'Page Management',
    description: 'Pick, reorder, and exclude pages before export. No more printing what you don\'t need.',
  },
  {
    icon: Leaf,
    title: 'Up to 60% Less Ink',
    description: 'Optimized color transformations mean your cartridges last dramatically longer.',
  },
  {
    icon: Lock,
    title: 'Completely Private',
    description: 'Your files never leave your browser. Zero server uploads. Zero data collection.',
  },
];

export const FeaturesGrid = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  const largeFeatures = features.filter(f => f.large);
  const smallFeatures = features.filter(f => !f.large);

  return (
    <section className="section-padding relative">
      <div className="container-wide relative z-10">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <span className="glass-pill text-muted-foreground text-xs font-semibold tracking-widest uppercase mb-6">
            What You Get
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Built for Your Print Workflow
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every tool you need to turn dark coaching PDFs into clean, paper-ready documents.
          </p>
        </div>

        {/* Mixed layout: 2 large cards + 4 compact cards */}
        <div
          ref={gridRef}
          className="space-y-5"
        >
          {/* Top row — 2 large feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {largeFeatures.map((feature, index) => (
              <LargeFeatureCard
                key={feature.title}
                {...feature}
                isVisible={gridVisible}
                index={index}
              />
            ))}
          </div>

          {/* Bottom row — 4 compact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {smallFeatures.map((feature, index) => (
              <CompactFeatureCard
                key={feature.title}
                {...feature}
                isVisible={gridVisible}
                index={index + 2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const LargeFeatureCard = ({
  icon: Icon,
  title,
  description,
  isVisible,
  index
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  large?: boolean;
  isVisible: boolean;
  index: number;
}) => (
  <div
    className={`feature-card group scroll-hidden-scale ${isVisible ? 'scroll-visible-scale' : ''} stagger-${index + 1}`}
  >
    <div className="flex items-start gap-5 relative z-10">
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-foreground/[0.04] border border-foreground/[0.06] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-foreground/[0.06] group-hover:scale-[1.04]">
        <Icon className="w-7 h-7 text-foreground/70 group-hover:text-foreground transition-colors duration-[400ms]" />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const CompactFeatureCard = ({
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
  <div
    className={`feature-card group scroll-hidden-scale ${isVisible ? 'scroll-visible-scale' : ''} stagger-${index + 1}`}
  >
    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 relative z-10 bg-foreground/[0.04] border border-foreground/[0.06] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-foreground/[0.06] group-hover:scale-[1.04]">
      <Icon className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors duration-[400ms]" />
    </div>
    <h3 className="text-base font-semibold mb-1.5 relative z-10">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{description}</p>
  </div>
);
