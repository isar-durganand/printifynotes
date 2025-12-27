import React, { useState } from 'react';
import { FileText, Sparkles } from 'lucide-react';
import { UploadZone } from '@/components/printify/UploadZone';
import { PageGallery } from '@/components/printify/PageGallery';
import { TransformationControls } from '@/components/printify/TransformationControls';
import { CombineOptions } from '@/components/printify/CombineOptions';
import { ExportPanel } from '@/components/printify/ExportPanel';
import { usePdfProcessor } from '@/hooks/usePdfProcessor';
import type { PageData, TransformationSettings, CombineSettings } from '@/types/printify';
import { DEFAULT_TRANSFORMATIONS, DEFAULT_COMBINE_SETTINGS } from '@/types/printify';

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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass border-b border-border/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 glow">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Printify Notes</h1>
              <p className="text-xs text-muted-foreground">Dark → Print-Ready</p>
            </div>
          </div>
          {hasPages && (
            <button
              onClick={handleReset}
              className="glass-button px-4 py-2 rounded-lg text-sm text-foreground/80 hover:text-foreground transition-all duration-300"
            >
              Start Over
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!hasPages ? (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                100% Private • Processed in your browser
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Transform dark notes into{' '}
                <span className="gradient-text glow-text">print-ready PDFs</span>
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Upload your dark-background PDFs and we'll convert them to clean, 
                ink-saving documents perfect for printing.
              </p>
            </div>

            <UploadZone
              onFileSelect={handleFileSelect}
              isLoading={isLoading}
              progress={progress}
            />

            {error && (
              <div className="glass-card p-4 rounded-xl border-destructive/30 text-center">
                <p className="text-destructive">{error}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
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
        )}
      </main>
    </div>
  );
};

export default Index;
