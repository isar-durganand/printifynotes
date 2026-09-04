import React from 'react';
import { Shield, Server, Eye, Lock, CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const privacyFeatures = [
  {
    icon: Server,
    badge: '100% In-Browser',
    title: 'No Server Uploads',
    description: 'Your files are processed entirely in your browser. Nothing is sent to external servers.',
    colorClasses: {
      bg: 'bg-[#007AFF]/10 dark:bg-[#0A84FF]/15',
      border: 'border-[#007AFF]/25 dark:border-[#0A84FF]/30',
      text: 'text-[#007AFF] dark:text-[#0A84FF]',
    },
  },
  {
    icon: Eye,
    badge: 'Zero Telemetry',
    title: 'No Tracking or Logs',
    description: "We don't track your documents, usage patterns, or any personal information.",
    colorClasses: {
      bg: 'bg-[#5856D6]/10 dark:bg-[#5E5CE6]/15',
      border: 'border-[#5856D6]/25 dark:border-[#5E5CE6]/30',
      text: 'text-[#5856D6] dark:text-[#5E5CE6]',
    },
  },
  {
    icon: Lock,
    badge: 'Auto-Purged',
    title: 'Your Data Stays Yours',
    description: 'Files are processed locally and never stored. Close the tab and everything is gone.',
    colorClasses: {
      bg: 'bg-[#34C759]/10 dark:bg-[#30D158]/15',
      border: 'border-[#34C759]/25 dark:border-[#30D158]/30',
      text: 'text-[#34C759] dark:text-[#30D158]',
    },
  },
];

export const PrivacySection = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={sectionRef}
          className={`relative rounded-[28px] md:rounded-[36px] p-7 sm:p-10 md:p-12 lg:p-14 bg-card/95 dark:bg-[#18181B]/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.12] shadow-2xl overflow-hidden scroll-hidden-scale ${sectionVisible ? 'scroll-visible-scale' : ''}`}
        >
          {/* Top specular hairline highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 dark:via-white/30 to-transparent pointer-events-none" />

          {/* Ambient luminous glow pools */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#007AFF]/10 dark:bg-[#0A84FF]/12 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#34C759]/5 dark:bg-[#30D158]/8 blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 relative z-10">
            {/* Left side - Main message */}
            <div className="flex-1 text-center lg:text-left">
              {/* Apple Privacy Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#007AFF]/10 dark:bg-[#0A84FF]/15 border border-[#007AFF]/25 dark:border-[#0A84FF]/30 mb-6 shadow-sm">
                <Shield className="w-4 h-4 text-[#007AFF] dark:text-[#0A84FF]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#007AFF] dark:text-[#0A84FF]">
                  Privacy First Architecture
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold mb-4 tracking-[-0.022em] leading-[1.12]">
                <span className="text-foreground">Your Documents,</span>
                <br />
                <span className="text-[#007AFF] dark:text-[#0A84FF]">
                  Completely Private.
                </span>
              </h2>

              {/* Description */}
              <p className="text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed text-[15px] sm:text-base font-normal">
                Unlike online converters that upload your files to external cloud servers, Printify Notes
                processes everything right here in your browser. Your sensitive documents, coaching notes,
                and PDFs never leave your device.
              </p>

              {/* Apple Trust Signals */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.04] dark:border-white/[0.06] text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse" />
                  <span>100% In-Browser</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.04] dark:border-white/[0.06] text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759]" />
                  <span>Zero Cloud Uploads</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.04] dark:border-white/[0.06] text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759]" />
                  <span>Auto Memory Purge</span>
                </div>
              </div>
            </div>

            {/* Right side - Features */}
            <div ref={featuresRef} className="flex-1 w-full">
              <div className="space-y-3.5">
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

interface PrivacyFeatureProps {
  icon: React.ElementType;
  badge: string;
  title: string;
  description: string;
  colorClasses: {
    bg: string;
    border: string;
    text: string;
  };
  isVisible: boolean;
  index: number;
}

const PrivacyFeature = ({
  icon: Icon,
  badge,
  title,
  description,
  colorClasses,
  isVisible,
  index,
}: PrivacyFeatureProps) => (
  <div
    className={`group relative flex items-start gap-4 p-4.5 sm:p-5 rounded-[20px] sm:rounded-[22px] bg-black/[0.02] dark:bg-white/[0.04] hover:bg-black/[0.04] dark:hover:bg-white/[0.07] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#007AFF]/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] shadow-sm overflow-hidden scroll-hidden-right ${isVisible ? 'scroll-visible-x' : ''} stagger-${index + 1}`}
  >
    {/* Ambient corner light on hover */}
    <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-[#007AFF]/0 group-hover:bg-[#007AFF]/5 transition-colors duration-300 blur-2xl pointer-events-none" />

    {/* Apple Squircle Icon Badge */}
    <div
      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] flex items-center justify-center flex-shrink-0 ${colorClasses.bg} border ${colorClasses.border} ${colorClasses.text} transition-transform duration-300 group-hover:scale-105 shadow-sm relative z-10`}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>

    {/* Text Content */}
    <div className="relative z-10 flex-1 min-w-0">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h4 className="font-bold text-[15px] sm:text-[16px] tracking-tight text-foreground">
          {title}
        </h4>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.06] text-muted-foreground border border-black/[0.04] dark:border-white/[0.06] shrink-0">
          {badge}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);
