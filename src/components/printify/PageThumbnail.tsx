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
  dragHandleProps,
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
        'group relative bg-card rounded-xl overflow-hidden transition-all duration-200 shadow-sm',
        page.isSelected ? 'ring-2 ring-primary shadow-md' : 'hover:shadow-md',
        isDragging && 'opacity-50 scale-95'
      )}
    >
      {/* Drag handle */}
      <div
        {...dragHandleProps}
        className="absolute top-2 left-2 z-10 p-1.5 bg-background/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Selection checkbox */}
      <button
        onClick={() => onToggleSelect(page.id)}
        className={cn(
          'absolute top-2 right-2 z-10 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200',
          page.isSelected
            ? 'bg-primary text-primary-foreground'
            : 'bg-background/80 backdrop-blur-sm border border-border hover:border-primary'
        )}
      >
        {page.isSelected && <Check className="w-4 h-4" />}
      </button>

      {/* Preview button */}
      <button
        onClick={() => onPreview(page)}
        className="absolute bottom-2 right-2 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
      >
        <Eye className="w-4 h-4 text-foreground" />
      </button>

      {/* Page number */}
      <div className="absolute bottom-2 left-2 z-10 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-lg text-sm font-medium text-foreground">
        {page.pageNumber}
      </div>

      {/* Thumbnail image */}
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
            'w-full h-full object-contain bg-muted transition-opacity duration-200',
            isLoadingPreview && 'opacity-50'
          )}
        />
      </div>
    </div>
  );
}
