import React, { useState } from 'react';
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
} from '@/components/landing';

const Index = () => {
  const { pages, isLoading, progress, error, loadPdf, reset } = usePdfProcessor();
  const [localPages, setLocalPages] = useState<PageData[]>([]);
  const [transformations, setTransformations] = useState<TransformationSettings>(DEFAULT_TRANSFORMATIONS);
  const [combineSettings, setCombineSettings] = useState<CombineSettings>(DEFAULT_COMBINE_SETTINGS);

  const handleFileSelect = async (file: File) => {
    await loadPdf(file);
  };

  React.useEffect(() => {
    if (pages.length > 0) {
      setLocalPages(pages);
    }
  }, [pages]);

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
        <header className="border-b border-border sticky top-0 z-40 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Printify Notes</h1>
                <p className="text-xs text-muted-foreground">Dark → Print-Ready</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Start Over
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Before/After */}
      <BeforeAfter />

      {/* Use Cases */}
      <UseCases />

      {/* Privacy Section */}
      <PrivacySection />

      {/* Upload Section */}
      <section id="upload-section" className="section-padding">
        <div className="container-tight">
          <div className="text-center mb-10">
            <span className="inline-block text-sm text-glow font-medium mb-4">
              GET STARTED
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Ready to Transform?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Upload your PDF and see the magic happen. It's free, private, and takes just seconds.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <UploadZone
              onFileSelect={handleFileSelect}
              isLoading={isLoading}
              progress={progress}
            />

            {error && (
              <div className="mt-6 p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-center">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;