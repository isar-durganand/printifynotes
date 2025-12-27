import React from 'react';
import { GraduationCap, Code2, Presentation, Palette } from 'lucide-react';

const useCases = [
  {
    icon: GraduationCap,
    title: 'Students',
    description: 'Convert dark-themed lecture slides and notes into printer-friendly documents for studying.',
    color: 'from-purple-500/20 to-transparent',
  },
  {
    icon: Code2,
    title: 'Developers',
    description: 'Transform code screenshots and IDE exports from dark themes into readable printouts.',
    color: 'from-blue-500/20 to-transparent',
  },
  {
    icon: Presentation,
    title: 'Professionals',
    description: 'Convert dark presentations and reports into clean documents for meetings and handouts.',
    color: 'from-green-500/20 to-transparent',
  },
  {
    icon: Palette,
    title: 'Designers',
    description: 'Export dark-mode mockups and designs as print-ready PDFs for client reviews.',
    color: 'from-orange-500/20 to-transparent',
  },
];

export const UseCases = () => {
  return (
    <section className="section-padding bg-card/30">
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm text-glow font-medium mb-4 opacity-0 animate-fade-in">
            WHO IT'S FOR
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 opacity-0 animate-fade-in delay-100">
            Perfect For Everyone
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in delay-200">
            Whether you're a student, developer, or professional — Printify Notes has you covered.
          </p>
        </div>

        {/* Use case cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <UseCaseCard 
              key={useCase.title} 
              {...useCase} 
              delay={index * 100}
            />
          ))}
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
  delay 
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  delay: number;
}) => (
  <div 
    className="feature-card group hover-lift text-center opacity-0 animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} border border-border/50 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-7 h-7 text-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </div>
);