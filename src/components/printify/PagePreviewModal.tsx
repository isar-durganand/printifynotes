import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PageData, TransformationSettings } from '@/types/printify';
import { applyTransformations } from '@/lib/imageTransformations';

interface PagePreviewModalProps {
  page: PageData;
  transformations: TransformationSettings;
  onClose: () => void;
}

export function PagePreviewModal({ page, transformations, onClose }: PagePreviewModalProps) {
  const [showOriginal, setShowOriginal] = useState(false);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const generatePreview = async () => {
      setIsLoading(true);
      try {
        const result = await applyTransformations(page.originalImage, transformations);
        if (!cancelled) {
          setTransformedImage(result);
        }
      } catch (error) {
        console.error('Failed to apply transformations:', error);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    generatePreview();

    return () => {
      cancelled = true;
    };
  }, [page.originalImage, transformations]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-foreground">
              Page {page.pageNumber} Preview
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setShowOriginal(true)}
                className={`px-3 py-1.5 rounded-lg transition-all duration-300 ${
                  showOriginal
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                    : 'glass-button text-muted-foreground hover:text-foreground'
                }`}
              >
                Original
              </button>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <button
                onClick={() => setShowOriginal(false)}
                className={`px-3 py-1.5 rounded-lg transition-all duration-300 ${
                  !showOriginal
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
                    : 'glass-button text-muted-foreground hover:text-foreground'
                }`}
              >
                Transformed
              </button>
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-primary/20">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 overflow-auto max-h-[calc(90vh-80px)] flex items-center justify-center bg-muted/30">
          {isLoading && !showOriginal ? (
            <div className="w-full aspect-[3/4] max-w-2xl glass-card rounded-lg animate-pulse-soft flex items-center justify-center">
              <span className="text-muted-foreground">Applying transformations...</span>
            </div>
          ) : (
            <img
              src={showOriginal ? page.originalImage : (transformedImage || page.originalImage)}
              alt={`Page ${page.pageNumber}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-glass"
            />
          )}
        </div>
      </div>
    </div>
  );
}
