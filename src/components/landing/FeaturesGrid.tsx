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
    <section className="section-padding bg-card/30">
      <div className="container-wide">
        {/* Section header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 scroll-hidden ${headerVisible ? 'scroll-visible' : ''}`}
        >
          <span className="inline-block text-sm text-glow font-medium mb-4">
            POWERFUL FEATURES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Packed with features to transform your documents exactly how you need them.
          </p>
        </div>

        {/* Features grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
    className={`feature-card group hover-lift scroll-hidden-scale ${isVisible ? 'scroll-visible-scale' : ''} stagger-${index + 1}`}
  >
    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-glow/20 transition-colors duration-300">
      <Icon className="w-6 h-6 text-foreground group-hover:text-glow transition-colors duration-300" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </div>
);
