import React from 'react';
import { Shield, Server, Eye, Lock } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const privacyFeatures = [
  {
    icon: Server,
    title: 'No Server Uploads',
    description: 'Your files are processed entirely in your browser. Nothing is sent to external servers.',
  },
  {
    icon: Eye,
    title: 'No Tracking',
    description: 'We don\'t track your documents, usage patterns, or any personal information.',
  },
  {
    icon: Lock,
    title: 'Your Data Stays Yours',
    description: 'Files are processed locally and never stored. Close the tab and it\'s gone.',
  },
];

export const PrivacySection = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-tight relative z-10">
        <div
          ref={sectionRef}
          className={`liquid-glass-elevated rounded-[28px] md:rounded-[32px] p-8 md:p-12 lg:p-14 border border-black/[0.08] dark:border-white/[0.1] shadow-sm scroll-hidden-scale ${sectionVisible ? 'scroll-visible-scale' : ''}`}
        >
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative z-10">
            {/* Left side - Main message */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">Privacy First</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-[-0.022em]">
                Your Documents,
                <br />
                <span className="text-muted-foreground">Completely Private</span>
              </h2>

              <p className="text-muted-foreground mb-6 max-w-md mx-auto lg:mx-0 leading-relaxed text-[15px]">
                Unlike online converters that upload your files to a server, Printify Notes
                processes everything right here in your browser. Your sensitive documents
                never leave your device.
              </p>
            </div>

            {/* Right side - Features */}
            <div ref={featuresRef} className="flex-1 w-full">
              <div className="space-y-3">
                {privacyFeatures.map((feature, index) => (
                  <PrivacyFeature
                    key={feature.title}
                    {...feature}
                    isVisible={featuresVisible}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PrivacyFeature = ({
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
    className={`flex items-start gap-4 p-4.5 rounded-[18px] bg-background/60 dark:bg-muted/40 border border-black/[0.06] dark:border-white/[0.08] scroll-hidden-right ${isVisible ? 'scroll-visible-x' : ''} stagger-${index + 1} transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-foreground/[0.03] active:scale-[0.98]`}
  >
    <div className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 bg-accent/10 border border-accent/20">
      <Icon className="w-5 h-5 text-accent" />
    </div>
    <div>
      <h4 className="font-semibold mb-1 text-[15px] tracking-tight">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

