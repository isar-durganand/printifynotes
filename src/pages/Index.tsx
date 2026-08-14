import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadZone } from '@/components/printify/UploadZone';
import { PageGallery } from '@/components/printify/PageGallery';
import { TransformationControls } from '@/components/printify/TransformationControls';
import { CombineOptions } from '@/components/printify/CombineOptions';
import { ExportPanel } from '@/components/printify/ExportPanel';
import { usePdfProcessor } from '@/hooks/usePdfProcessor';
import type { PageData, TransformationSettings, CombineSettings } from '@/types/printify';
import { DEFAULT_TRANSFORMATIONS, DEFAULT_COMBINE_SETTINGS } from '@/types/printify';

import {
  HeroSection,
  HowItWorks,
  FeaturesGrid,
  BeforeAfter,
  UseCases,
  PrivacySection,
  FAQ,
  Footer,
  JeeCollegeBanner,
  ReviewsSection,
} from '@/components/landing';
import { Navbar } from '@/components/landing/Navbar';
import { StickyUpload } from '@/components/landing/StickyUpload';
import { FloatingCTA } from '@/components/landing/FloatingCTA';
import { FloatingSocial } from '@/components/FloatingSocial';

// Background decoration component
const BackgroundDecorations = () => (
  <>
    {/* Noise overlay */}
    <div className="noise-overlay" />

    {/* Gradient orbs */}
    <div className="gradient-orb gradient-orb-emerald w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] -top-[100px] sm:-top-[200px] -left-[100px] sm:-left-[200px] fixed" />
    <div className="gradient-orb gradient-orb-blue w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] top-[40%] -right-[100px] sm:-right-[150px] fixed animate-float-slow" />
    <div className="gradient-orb gradient-orb-purple w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bottom-[10%] left-[5%] sm:left-[10%] fixed animate-float-medium" />
  </>
);

const Index = () => {
  const { pages, isLoading, progress, error, loadFile, reset } = usePdfProcessor();
  const [localPages, setLocalPages] = useState<PageData[]>([]);
  const [transformations, setTransformations] = useState<TransformationSettings>(DEFAULT_TRANSFORMATIONS);
  const [combineSettings, setCombineSettings] = useState<CombineSettings>(DEFAULT_COMBINE_SETTINGS);

  const handleFileSelect = async (file: File) => {
    await loadFile(file);
  };

  useEffect(() => {
    if (pages.length > 0) {
      setLocalPages(pages);
    }
  }, [pages]);

  // Scroll to top when editor view opens
  useEffect(() => {
    if (localPages.length > 0) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [localPages.length > 0]);

  const handleReset = () => {
    reset();
    setLocalPages([]);
    setTransformations(DEFAULT_TRANSFORMATIONS);
    setCombineSettings(DEFAULT_COMBINE_SETTINGS);
  };

  const hasPages = localPages.length > 0;

  // If user has uploaded pages, show the app interface
  if (hasPages) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-emerald-500 shrink-0">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-semibold text-foreground">Printify Notes</h1>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-secondary border border-border text-xs text-muted-foreground font-medium">
                    {localPages.length} {localPages.length === 1 ? 'page' : 'pages'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Dark → Print-Ready</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-xs shrink-0 text-muted-foreground hover:text-destructive hover:border-destructive/50"
            >
              Start Over
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
              <TransformationControls
                settings={transformations}
                onChange={setTransformations}
              />
              <CombineOptions
                settings={combineSettings}
                onChange={setCombineSettings}
              />
              <ExportPanel
                pages={localPages}
                transformations={transformations}
                combineSettings={combineSettings}
                onReset={handleReset}
              />
            </div>

            <div className="lg:col-span-3 order-1 lg:order-2">
              <PageGallery
                pages={localPages}
                transformations={transformations}
                onPagesChange={setLocalPages}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Landing page
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background decorations */}
      <BackgroundDecorations />

      {/* Floating Navbar */}
      <Navbar />

      {/* Sticky Upload on right side - desktop only */}
      <StickyUpload
        onFileSelect={handleFileSelect}
        isLoading={isLoading}
        progress={progress}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* JEE Mains College Predictor Banner */}
      <JeeCollegeBanner />

      {/* How It Works */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* Features Grid */}
      <section id="features">
        <FeaturesGrid />
      </section>

      {/* Before/After */}
      <BeforeAfter />

      {/* Use Cases */}
      <UseCases />

      {/* Privacy Section */}
      <PrivacySection />

      {/* Upload Section */}
      <section id="upload-section" className="section-padding">
        <div className="container-tight">
          {/* Section header */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-500 mb-4">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Ready to Transform?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              Upload your PDF or image and see the magic happen. Free, private, and instant — no signup needed.
            </p>
          </div>

          {/* Upload card */}
          <div className="max-w-lg mx-auto">
            <div className="rounded-2xl border border-border bg-card p-1">
              <div className="rounded-xl border border-border/60 bg-background p-6 sm:p-8">
                <UploadZone
                  onFileSelect={handleFileSelect}
                  isLoading={isLoading}
                  progress={progress}
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-3 p-4 rounded-xl border border-destructive/40 bg-destructive/10">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* User Reviews */}
      <ReviewsSection />

      {/* Footer */}
      <Footer />

      {/* Floating CTA - mobile only */}
      <div className="lg:hidden">
        <FloatingCTA />
      </div>

      {/* Floating Social - all devices */}
      <FloatingSocial />
    </div>
  );
};

export default Index;