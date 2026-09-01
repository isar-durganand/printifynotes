import React from 'react';
import { ArrowDown, Shield, Zap, Eye } from 'lucide-react';

export const HeroSection = () => {
  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Gradient mesh background */}
      <div className="gradient-mesh" />

      {/* Aurora light streak */}
      <div className="aurora-streak" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-[0.08]" />

      <div className="container-tight relative z-10 text-center">
        {/* Badge — liquid glass pill
        <div className="glass-pill mb-8 opacity-0 animate-fade-in border-emerald-500/[0.15] shadow-[0_4px_24px_rgba(16,185,129,0.08)]">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-muted-foreground">100% Private · Browser-Based</span>
        </div>
        */}
        {/* Main heading */}

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 opacity-0 animate-fade-in delay-100 tracking-tight">
          <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            Convert Dark PDF Notes
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
            For Easy Printing
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 opacity-0 animate-fade-in delay-200 leading-relaxed">
          Transform dark-background lecture notes from PW, Unacademy, Vedantu, and other coaching platforms
          into clean, ink-saving PDFs. Perfect for NEET & JEE preparation notes.
        </p>

        {/* CTA Buttons — glass styled */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fade-in delay-300">
          <button
            onClick={scrollToUpload}
            className="btn-glass-emerald flex items-center gap-2"
          >
            Start Converting — Free
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-glass-outline flex items-center gap-2"
          >
            See How It Works
          </button>
        </div>

        {/* Trust badges — glass pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 opacity-0 animate-fade-in delay-400">
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
            Vedantu, BYJU'S, Allen Digital, Aakash, Etoos, Competishun, and other online learning platforms.
            Convert dark lecture slides, NEET preparation notes, JEE study material, Class 11 notes, Class 12 notes,
            Board exam preparation material, and coaching PDFs to ink-saving printable format.
            Works with all dark-themed PDFs including code screenshots, IDE exports, and presentation slides.
          </p>
          <h3>Popular Searches We Help With</h3>
          <ul>
            <li>How to print PW notes without wasting ink</li>
            <li>Convert Physics Wallah dark PDF to white background</li>
            <li>Print Unacademy slides easily</li>
            <li>Unacademy dark mode PDF to printable</li>
            <li>Vedantu notes printer online</li>
            <li>BYJU'S PDF background remover</li>
            <li>Allen digital notes converter</li>
            <li>Aakash online class notes printer</li>
            <li>NEET preparation notes printer</li>
            <li>JEE Main notes dark to light</li>
            <li>JEE Advanced study material printer</li>
            <li>Save ink printing coaching notes</li>
            <li>Free dark PDF to light converter</li>
            <li>Remove black background from PDF</li>
            <li>Invert PDF colors for printing</li>
            <li>Online PDF background color changer</li>
            <li>Best tool to print dark mode PDFs</li>
            <li>Convert coaching slides for printing</li>
            <li>Class 12 Physics notes printer</li>
            <li>Class 12 Chemistry notes printer</li>
            <li>Class 12 Biology notes printer</li>
            <li>Class 11 notes dark to light</li>
            <li>CBSE notes printer online</li>
            <li>NCERT PDF converter</li>
            <li>Mohit Tyagi notes printer</li>
            <li>Aman Dhattarwal notes converter</li>
            <li>Competishun PDF printer</li>
            <li>Etoos lectures PDF converter</li>
            <li>Medical entrance exam notes</li>
            <li>Engineering entrance exam notes</li>
            <li>Board exam preparation PDF tool</li>
            <li>Eco-friendly PDF printing</li>
            <li>Browser-based PDF converter</li>
            <li>Private PDF converter no upload</li>
            <li>Offline PDF background remover</li>
          </ul>
        </div>
      </div>

      {/* Scroll indicator — refined glass */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-600">
        <div className="w-7 h-11 rounded-full border border-white/[0.15] flex items-start justify-center p-2 shadow-[0_0_16px_rgba(255,255,255,0.03)]">
          <div className="w-1.5 h-3 bg-emerald-400/60 rounded-full animate-bounce shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
        </div>
      </div>
    </section>
  );
};

const TrustBadge = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <div className="glass-pill text-muted-foreground hover:border-emerald-500/20 transition-all duration-300">
    <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
    <span className="text-xs font-medium">{text}</span>
  </div>
);
