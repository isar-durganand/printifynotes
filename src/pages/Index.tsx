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
    <div className="min-h-screen bg-background dark">
      <header className="border-b border-border sticky top-0 z-40 bg-background">
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
          {hasPages && (
            <Button variant="outline" size="sm" onClick={handleReset}>
              Start Over
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!hasPages ? (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                100% Private • Processed in your browser
              </p>
              <h2 className="text-2xl font-semibold text-foreground">
                Transform dark notes into print-ready PDFs
              </h2>
              <p className="text-muted-foreground text-sm">
                Upload your dark-background PDFs and convert them to clean, ink-saving documents.
              </p>
            </div>

            <UploadZone
              onFileSelect={handleFileSelect}
              isLoading={isLoading}
              progress={progress}
            />

            {error && (
              <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-center">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
          </div>
        ) : (
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
        )}
      </main>
    </div>
  );
};

export default Index;
