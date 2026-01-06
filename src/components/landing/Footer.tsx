import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Heart } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <footer className="border-t border-border bg-card/30">
      <div
        ref={footerRef}
        className={`container-wide py-12 md:py-16 scroll-hidden ${footerVisible ? 'scroll-visible' : ''}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and tagline */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold">Printify Notes</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transform dark PDFs into print-ready documents. Free, private, and eco-friendly.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="/#how-it-works" className="hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#features" className="hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <Link to="/docs" className="hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <a href="/#faq" className="hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/blog/how-to-print-physics-wallah-notes" className="hover:text-foreground transition-colors">
                  Print PW Notes
                </Link>
              </li>
              <li>
                <Link to="/blog/save-ink-printing-tips" className="hover:text-foreground transition-colors">
                  Ink Saving Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Printify Notes. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for students
          </p>
        </div>
      </div>
    </footer>
  );
};
