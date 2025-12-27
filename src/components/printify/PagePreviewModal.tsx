import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
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

    applyTransformations(page.originalImage, transformations)
      .then((result) => {
        if (!cancelled) {
          setTransformedImage(result);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

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
      className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card border border-border rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Page {page.pageNumber}</span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant={showOriginal ? 'secondary' : 'default'}
                onClick={() => setShowOriginal(false)}
              >
                Transformed
              </Button>
              <Button
                size="sm"
                variant={showOriginal ? 'default' : 'secondary'}
                onClick={() => setShowOriginal(true)}
              >
                Original
              </Button>
            </div>
          </div>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4 flex items-center justify-center bg-muted max-h-[70vh] overflow-auto">
          {isLoading && !showOriginal ? (
            <div className="text-muted-foreground text-sm">Loading...</div>
          ) : (
            <img
              src={showOriginal ? page.originalImage : (transformedImage || page.originalImage)}
              alt={`Page ${page.pageNumber}`}
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}
