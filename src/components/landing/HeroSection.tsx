import React from 'react';
import { ArrowDown } from 'lucide-react';

/* Minimal inline SVG icons — clean, precise vectors (no emoji, no Lucide clutter) */
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <path d="M5 8.5L7 10.5L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const HeroSection = () => {
  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Gradient mesh background — rendered by parent */}
      <div className="gradient-mesh" />

      <div className="container-tight relative z-10 text-center">
        {/* Main heading — strict iOS typographic hierarchy & tight tracking */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-6 opacity-0 animate-fade-in delay-100 tracking-[-0.022em]">
          <span className="text-foreground">
            Your dark PDFs,
          </span>
          <br />
          <span className="text-muted-foreground">
            ready for paper.
          </span>
        </h1>

        {/* Subheading — clear, human, generous line-height */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in delay-200 leading-relaxed font-normal">
          Convert dark-background lecture notes from PW, Unacademy, Vedantu, and other coaching platforms
          into clean, ink-saving PDFs — right in your browser. No uploads, no signups.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14 opacity-0 animate-fade-in delay-300">
          <button
            onClick={scrollToUpload}
            className="btn-glass-primary flex items-center justify-center gap-2 text-base px-7 py-3.5 rounded-xl bg-[#007AFF] hover:bg-[#007AFF]/90 text-white shadow-md active:scale-[0.96] transition-all"
          >
            Start Converting — It&apos;s Free
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-glass-outline flex items-center justify-center gap-2 text-base px-6 py-3.5 rounded-xl active:scale-[0.96] transition-all"
          >
            See How It Works
          </button>
        </div>

        {/* Trust signals — clean, minimal glass chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3.5 opacity-0 animate-fade-in delay-400">
          <TrustBadge text="100% Private — No Data Leaves Your Device" />
          <TrustBadge text="Instant In-Browser Engine" />
          <TrustBadge text="No Account Needed" />
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

      {/* Scroll indicator — minimal */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-600">
        <div className="w-6 h-10 rounded-full border border-foreground/[0.15] flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-foreground/30 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

const TrustBadge = ({ text }: { text: string }) => (
  <div className="glass-pill text-muted-foreground transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-foreground/[0.04]">
    <CheckIcon />
    <span className="text-xs font-medium">{text}</span>
  </div>
);
