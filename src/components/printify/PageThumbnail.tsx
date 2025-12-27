import React, { useState, useEffect } from 'react';
import { Check, GripVertical, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PageData, TransformationSettings } from '@/types/printify';
import { getTransformationPreview } from '@/lib/imageTransformations';

interface PageThumbnailProps {
  page: PageData;
  transformations: TransformationSettings;
  onToggleSelect: (id: string) => void;
  onPreview: (page: PageData) => void;
  isDragging?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function PageThumbnail({
  page,
  transformations,
  onToggleSelect,
  onPreview,
  isDragging,
}: PageThumbnailProps) {
  const [previewImage, setPreviewImage] = useState<string>(page.originalImage);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const updatePreview = async () => {
      setIsLoadingPreview(true);
      try {
        const transformed = await getTransformationPreview(page.originalImage, transformations, 300);
        if (!cancelled) {
          setPreviewImage(transformed);
        }
      } catch (error) {
        console.error('Failed to generate preview:', error);
        if (!cancelled) {
          setPreviewImage(page.originalImage);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingPreview(false);
        }
      }
    };

    updatePreview();

    return () => {
      cancelled = true;
    };
  }, [page.originalImage, transformations]);

  return (
    <div
      className={cn(
        'group relative glass-card rounded-xl overflow-hidden transition-all duration-300',
        page.isSelected ? 'ring-2 ring-primary glow' : 'hover:ring-1 hover:ring-primary/30',
        isDragging && 'opacity-50 scale-95'
      )}
    >
      <div className="absolute top-2 left-2 z-10 p-1.5 glass rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
        <GripVertical className="w-4 h-4 text-foreground/70" />
      </div>

      <button
        onClick={() => onToggleSelect(page.id)}
        className={cn(
          'absolute top-2 right-2 z-10 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300',
          page.isSelected
            ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground glow'
            : 'glass hover:ring-1 hover:ring-primary/50'
        )}
      >
        {page.isSelected && <Check className="w-4 h-4" />}
      </button>

      <button
        onClick={() => onPreview(page)}
        className="absolute bottom-2 right-2 z-10 p-2 glass rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20"
      >
        <Eye className="w-4 h-4 text-foreground" />
      </button>

      <div className="absolute bottom-2 left-2 z-10 px-2 py-1 glass rounded-lg text-sm font-medium text-foreground">
        {page.pageNumber}
      </div>

      <div
        onClick={() => onToggleSelect(page.id)}
        className="aspect-[3/4] cursor-pointer relative"
      >
        {isLoadingPreview && (
          <div className="absolute inset-0 bg-muted animate-pulse-soft" />
        )}
        <img
          src={previewImage}
          alt={`Page ${page.pageNumber}`}
          className={cn(
            'w-full h-full object-contain bg-muted/50 transition-opacity duration-200',
            isLoadingPreview && 'opacity-50'
          )}
        />
      </div>
    </div>
  );
}
