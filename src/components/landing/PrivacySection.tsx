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
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/[0.025] rounded-full blur-[120px]" />
      </div>

      <div className="container-tight relative z-10">
        <div
          ref={sectionRef}
          className={`liquid-glass-strong rounded-3xl p-8 md:p-12 lg:p-16 scroll-hidden-scale ${sectionVisible ? 'scroll-visible-scale' : ''}`}
        >
          {/* Top highlight */}
          <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative z-10">
            {/* Left side - Main message */}
            <div className="flex-1 text-center lg:text-left">
              <div className="glass-pill border-emerald-500/20 shadow-[0_4px_24px_rgba(16,185,129,0.08)] mb-6">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-400 font-medium">Privacy First</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
                Your Documents,
                <br />
                <span className="text-muted-foreground">Completely Private</span>
              </h2>

              <p className="text-muted-foreground mb-6 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Unlike online converters, Printify Notes processes everything in your browser.
                Your sensitive documents never leave your device.
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
    className={`flex items-start gap-4 p-4 rounded-xl liquid-glass-subtle scroll-hidden-right ${isVisible ? 'scroll-visible-x' : ''} stagger-${index + 1} transition-all duration-300 hover:bg-white/[0.04]`}
  >
    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/[0.04] border border-white/[0.08]">
      <Icon className="w-5 h-5 text-emerald-400" />
    </div>
    <div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);
