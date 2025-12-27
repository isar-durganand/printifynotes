import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-card rounded-2xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-foreground">
              Page {page.pageNumber} Preview
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setShowOriginal(true)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  showOriginal
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                Original
              </button>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <button
                onClick={() => setShowOriginal(false)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  !showOriginal
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                Transformed
              </button>
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Image */}
        <div className="p-4 overflow-auto max-h-[calc(90vh-80px)] flex items-center justify-center bg-muted/50">
          {isLoading && !showOriginal ? (
            <div className="w-full aspect-[3/4] max-w-2xl bg-muted rounded-lg animate-pulse-soft flex items-center justify-center">
              <span className="text-muted-foreground">Applying transformations...</span>
            </div>
          ) : (
            <img
              src={showOriginal ? page.originalImage : (transformedImage || page.originalImage)}
              alt={`Page ${page.pageNumber}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-md"
            />
          )}
        </div>
      </div>
    </div>
  );
}
