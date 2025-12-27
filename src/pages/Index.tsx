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
  const { pages, isLoading, progress, loadPdf, reset } = usePdfProcessor();
  const [localPages, setLocalPages] = useState<PageData[]>([]);
  const [transformations, setTransformations] = useState<TransformationSettings>(DEFAULT_TRANSFORMATIONS);
  const [combineSettings, setCombineSettings] = useState<CombineSettings>(DEFAULT_COMBINE_SETTINGS);

  const handleFileSelect = async (file: File) => {
    await loadPdf(file);
  };

  // Sync pages from hook to local state
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 gradient-hero rounded-xl">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Printify Notes</h1>
              <p className="text-xs text-muted-foreground">Dark → Print-Ready</p>
            </div>
          </div>
          {hasPages && (
            <button
              onClick={handleReset}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Start Over
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!hasPages ? (
          /* Upload view */
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                100% Private • Processed in your browser
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Transform dark notes into{' '}
                <span className="text-primary">print-ready PDFs</span>
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
          </div>
        ) : (
          /* Editor view */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
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

            {/* Main content */}
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
