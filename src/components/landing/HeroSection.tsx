import React from 'react';
import { ArrowDown, Shield, Zap, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center hero-pattern overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-glow/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow-muted/10 rounded-full blur-3xl animate-float delay-500" />

      <div className="container-tight relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 opacity-0 animate-fade-in">
          <Shield className="w-4 h-4 text-glow" />
          <span className="text-sm text-muted-foreground">100% Private • Browser-Based</span>
        </div>

        {/* Main heading - SEO optimized */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 opacity-0 animate-fade-in delay-100">
          Convert Dark PDF Notes
          <br />
          <span className="gradient-text-glow">For Easy Printing</span>
        </h1>

        {/* Subheading - SEO optimized with keywords */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 opacity-0 animate-fade-in delay-200">
          Transform dark-background lecture notes from PW, Unacademy, Vedantu, and other coaching platforms 
          into clean, ink-saving PDFs. Perfect for NEET & JEE preparation notes.
        </p>

        {/* Secondary description for more SEO content */}
        <p className="text-base text-muted-foreground/80 max-w-xl mx-auto mb-10 opacity-0 animate-fade-in delay-250">
          No uploads to servers, no accounts needed — convert dark notes to light instantly in your browser.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fade-in delay-300">
          <Button 
            size="lg" 
            onClick={scrollToUpload}
            className="btn-glow text-base px-8 py-6 glow-sm hover:glow-md transition-shadow"
          >
            Start Converting — Free
            <ArrowDown className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-base px-8 py-6"
          >
            See How It Works
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-0 animate-fade-in delay-400">
          <TrustBadge icon={Shield} text="No Data Uploads" />
          <TrustBadge icon={Zap} text="Instant Processing" />
          <TrustBadge icon={Eye} text="No Account Needed" />
        </div>

        {/* SEO-friendly hidden text for search engines */}
        <div className="sr-only">
          <h2>Print Physics Wallah Notes | Print Unacademy Slides | Dark to Light PDF Converter</h2>
          <p>
            Printify Notes is the best free tool to convert dark background PDFs to print-friendly documents.
            Perfect for students who want to print their coaching notes from Physics Wallah (PW), Unacademy, 
            Vedantu, BYJU'S, Allen Digital, and other online learning platforms. Convert dark lecture slides, 
            NEET preparation notes, JEE study material, and coaching PDFs to ink-saving printable format.
            Works with all dark-themed PDFs including code screenshots, IDE exports, and presentation slides.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-600">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

const TrustBadge = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <div className="flex items-center gap-2 text-muted-foreground">
    <Icon className="w-4 h-4 text-glow" />
    <span className="text-sm">{text}</span>
  </div>
);
