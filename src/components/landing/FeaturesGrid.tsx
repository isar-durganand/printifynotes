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
    title: 'Smart Inversion',
    description: 'Automatically invert dark backgrounds to white while preserving text and image quality.',
  },
  {
    icon: Palette,
    title: 'Grayscale Mode',
    description: 'Convert to grayscale for maximum ink savings without losing readability.',
  },
  {
    icon: LayoutGrid,
    title: 'Multi-Page Layouts',
    description: 'Combine 2, 3, or 4 pages per sheet to save paper and create handouts.',
  },
  {
    icon: Layers,
    title: 'Page Management',
    description: 'Select, reorder, and exclude specific pages before export.',
  },
  {
    icon: Leaf,
    title: 'Ink Saving',
    description: 'Reduce ink usage by up to 60% with optimized color transformations.',
  },
  {
    icon: Lock,
    title: '100% Private',
    description: 'Your files never leave your browser. All processing happens locally.',
  },
];

export const FeaturesGrid = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="section-padding relative">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-cyan-500/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-emerald-500/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="container-wide relative z-10">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <span className="glass-pill text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-6">
            Powerful Features
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Packed with features to transform your documents exactly how you need them.
          </p>
        </div>

        {/* Features grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              isVisible={gridVisible}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({
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
    className={`feature-card group prismatic-border scroll-hidden-scale ${isVisible ? 'scroll-visible-scale' : ''} stagger-${index + 1}`}
  >
    {/* Icon container — frosted glass */}
    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10 bg-white/[0.04] border border-white/[0.08] transition-all duration-400 group-hover:bg-emerald-500/[0.08] group-hover:border-emerald-500/20 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]">
      <Icon className="w-6 h-6 text-foreground group-hover:text-emerald-400 transition-colors duration-300" />
    </div>
    <h3 className="text-lg font-semibold mb-2 relative z-10">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{description}</p>
  </div>
);
