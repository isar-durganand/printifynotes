import React from 'react';
import { Shield, Server, Eye, Lock } from 'lucide-react';

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
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 hero-pattern opacity-50" />
      
      <div className="container-tight relative z-10">
        <div className="glass rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left side - Main message */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-6">
                <Shield className="w-4 h-4 text-success" />
                <span className="text-sm text-success font-medium">Privacy First</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Your Documents,
                <br />
                <span className="gradient-text-glow">Completely Private</span>
              </h2>
              
              <p className="text-muted-foreground mb-6 max-w-md mx-auto lg:mx-0">
                Unlike online converters, Printify Notes processes everything in your browser. 
                Your sensitive documents never leave your device.
              </p>
            </div>

            {/* Right side - Features */}
            <div className="flex-1 w-full">
              <div className="space-y-4">
                {privacyFeatures.map((feature, index) => (
                  <PrivacyFeature 
                    key={feature.title} 
                    {...feature}
                    delay={index * 100}
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
  delay 
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) => (
  <div 
    className="flex items-start gap-4 p-4 rounded-xl bg-background/50 opacity-0 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-success" />
    </div>
    <div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);