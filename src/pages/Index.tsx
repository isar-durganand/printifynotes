import React, { useState, useEffect, useRef } from 'react';
import { FileText, FilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadZone } from '@/components/printify/UploadZone';
import { PageGallery } from '@/components/printify/PageGallery';
import { TransformationControls } from '@/components/printify/TransformationControls';
import { CombineOptions } from '@/components/printify/CombineOptions';
import { ExportPanel } from '@/components/printify/ExportPanel';
import { usePdfProcessor } from '@/hooks/usePdfProcessor';
import { useUndoRedo } from '@/hooks/useUndoRedo';
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
  ReviewsSection,
} from '@/components/landing';
import { Navbar } from '@/components/landing/Navbar';
import { StickyUpload } from '@/components/landing/StickyUpload';
import { FloatingCTA } from '@/components/landing/FloatingCTA';
import { FloatingSocial } from '@/components/FloatingSocial';

// Liquid gradient mesh background
const GradientMesh = () => (
  <div className="gradient-mesh" />
);

const ACCEPTED_TYPES = '.pdf,.jpg,.jpeg,.png,.webp,.gif';

const Index = () => {
  const { pages, isLoading, progress, error, fileCount, loadFile, appendFile, reset } = usePdfProcessor();
  const [localPages, setLocalPages] = useState<PageData[]>([]);
  const {
    state: transformations,
    set: setTransformations,
    undo: undoTransformations,
    redo: redoTransformations,
    canUndo,
    canRedo,
  } = useUndoRedo<TransformationSettings>(DEFAULT_TRANSFORMATIONS);
  const [combineSettings, setCombineSettings] = useState<CombineSettings>(DEFAULT_COMBINE_SETTINGS);
  const [isAppending, setIsAppending] = useState(false);
  const appendInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelect = async (files: File[]) => {
    if (files.length === 0) return;
    await loadFile(files[0]);
    for (let i = 1; i < files.length; i++) {
      await appendFile(files[i]);
    }
  };

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

  /** Handle additional file(s) appended in the editor */
  const handleAppendFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsAppending(true);
    for (const file of files) {
      await appendFile(file);
    }
    setIsAppending(false);

    // Reset input so the same file can be added again if needed
    if (appendInputRef.current) appendInputRef.current.value = '';
  };

  /** When pages update from appending, sync localPages */
  useEffect(() => {
    if (pages.length > localPages.length) {
      setLocalPages(pages);
    }
  }, [pages]);

  const hasPages = localPages.length > 0;

  // If user has uploaded pages, show the app interface
  if (hasPages) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Hidden input for appending more files */}
        <input
          ref={appendInputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          multiple
          onChange={handleAppendFiles}
          className="hidden"
          id="append-files-input"
        />

        <header className="border-b border-white/[0.06] sticky top-0 z-40 liquid-glass-strong">
          {/* Top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.3)] shrink-0">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-semibold text-foreground">Printify Notes</h1>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-muted-foreground font-medium">
                    {localPages.length} {localPages.length === 1 ? 'page' : 'pages'}
                  </span>
                  {fileCount > 1 && (
                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/20 text-xs text-emerald-400 font-medium">
                      {fileCount} files
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Dark → Print-Ready</p>
              </div>
            </div>

            {/* Right-side header actions */}
            <div className="flex items-center gap-2">
              {/* Add More Files button */}
              <Button
                variant="outline"
                size="sm"
                disabled={isAppending || isLoading}
                onClick={() => appendInputRef.current?.click()}
                className="text-xs shrink-0 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/[0.08] hover:border-emerald-500/50 transition-all duration-300 rounded-xl"
              >
                <FilePlus className="w-3.5 h-3.5 mr-1.5" />
                {isAppending ? 'Loading…' : 'Add More Files'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="text-xs shrink-0 text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-all duration-300 rounded-xl"
              >
                Start Over
              </Button>
            </div>
          </div>

          {/* Append progress bar */}
          {(isAppending || isLoading) && progress > 0 && progress < 100 && (
            <div className="h-0.5 bg-white/[0.04]">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-200 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </header>

        <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
              <TransformationControls
                settings={transformations}
                onChange={setTransformations}
                onUndo={undoTransformations}
                onRedo={redoTransformations}
                canUndo={canUndo}
                canRedo={canRedo}
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
      {/* Liquid gradient mesh background */}
      <GradientMesh />

      {/* Floating Navbar */}
      <Navbar />

      {/* Sticky Upload on right side - desktop only */}
      <StickyUpload
        onFileSelect={handleFileSelect}
        onFilesSelect={handleFilesSelect}
        isLoading={isLoading}
        progress={progress}
      />

      {/* Hero Section */}
      <HeroSection />


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

      {/* Upload Section — liquid glass framing */}
      <section id="upload-section" className="section-padding">
        <div className="container-tight">
          {/* Section header */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="glass-pill text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-6">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Ready to Transform?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              Upload one or multiple PDFs or images and see the magic happen. Free, private, and instant — no signup needed.
            </p>
          </div>

          {/* Upload card — liquid glass */}
          <div className="max-w-lg mx-auto">
            <div className="rounded-2xl liquid-glass-strong p-1">
              {/* Top highlight */}
              <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/[0.1] to-transparent pointer-events-none" />
              
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-6 sm:p-8 relative z-10">
                <UploadZone
                  onFileSelect={handleFileSelect}
                  onFilesSelect={handleFilesSelect}
                  isLoading={isLoading}
                  progress={progress}
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/[0.06] backdrop-blur-sm">
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