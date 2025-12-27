import React from 'react';
import { FileText, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container-wide py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">Printify Notes</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Transform dark PDFs into print-ready documents.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a 
              href="#how-it-works" 
              className="hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a 
              href="#upload-section" 
              className="hover:text-foreground transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Printify Notes. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for print lovers
          </p>
        </div>
      </div>
    </footer>
  );
};