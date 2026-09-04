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
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-card/95 backdrop-blur-2xl border-t sm:border border-border/80 rounded-t-[32px] sm:rounded-[32px] max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col ios-bottom-sheet">
        {/* iOS Handlebar on mobile */}
        <div className="ios-handlebar sm:hidden" onClick={onClose} />

        <div className="flex items-center justify-between p-4 border-b border-border/80">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold tracking-tight">Page {page.pageNumber}</span>
            {/* iOS Segmented Control */}
            <div className="flex p-1 rounded-xl bg-foreground/[0.06] border border-border/60">
              <button
                type="button"
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ios-press active:scale-[0.96] ${
                  !showOriginal
                    ? 'bg-[#007AFF] text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setShowOriginal(false)}
              >
                Transformed
              </button>
              <button
                type="button"
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ios-press active:scale-[0.96] ${
                  showOriginal
                    ? 'bg-[#007AFF] text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setShowOriginal(true)}
              >
                Original
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all ios-press active:scale-[0.96]"
            aria-label="Close preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 flex items-center justify-center bg-background/50 max-h-[75vh] overflow-auto">
          {isLoading && !showOriginal ? (
            <div className="text-muted-foreground text-sm flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-[#007AFF] border-t-transparent rounded-full animate-spin" />
              Processing page...
            </div>
          ) : (
            <img
              src={showOriginal ? page.originalImage : (transformedImage || page.originalImage)}
              alt={`Page ${page.pageNumber}`}
              className="max-w-full max-h-[68vh] object-contain rounded-xl shadow-md border border-border/40"
            />
          )}
        </div>
      </div>
    </div>
  );
}
