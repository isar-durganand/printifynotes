import React, { useState, useEffect } from 'react';
import { Check, Eye, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PageData, TransformationSettings } from '@/types/printify';
import { getTransformationPreview } from '@/lib/imageTransformations';

interface PageThumbnailProps {
  page: PageData;
  transformations: TransformationSettings;
  onToggleSelect: () => void;
  onPreview: () => void;
  isDragging: boolean;
  dragHandleProps: {
    draggable: boolean;
    onDragStart: () => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragEnd: () => void;
  };
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
    setIsLoadingPreview(true);

    getTransformationPreview(page.originalImage, transformations, 150)
      .then((preview) => {
        if (!cancelled) {
          setPreviewImage(preview);
          setIsLoadingPreview(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsLoadingPreview(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [page.originalImage, transformations]);

  return (
    <div
      {...dragHandleProps}
      onClick={onToggleSelect}
      className={`
        relative group rounded-lg border overflow-hidden transition-all cursor-pointer
        ${page.isSelected 
          ? 'border-primary ring-2 ring-primary bg-primary/5' 
          : 'border-border hover:border-muted-foreground/50'}
        ${isDragging ? 'opacity-50 scale-95' : ''}
      `}
    >
      {/* Selection overlay */}
      <div className={`absolute inset-0 z-10 pointer-events-none transition-colors ${
        page.isSelected ? 'bg-primary/10' : ''
      }`} />

      {/* Selection indicator */}
      <div className={`absolute top-2 right-2 z-20 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
        page.isSelected 
          ? 'bg-primary border-primary' 
          : 'bg-background/80 border-muted-foreground/40 group-hover:border-muted-foreground'
      }`}>
        {page.isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
      </div>

      <div className="aspect-[3/4] bg-muted">
        <img
          src={previewImage}
          alt={`Page ${page.pageNumber}`}
          className={`w-full h-full object-contain ${isLoadingPreview ? 'opacity-50' : ''}`}
        />
      </div>

      {/* Drag handle */}
      <div className="absolute top-2 left-2 z-20">
        <div 
          className="p-1 rounded bg-background/80 cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>

      {/* Preview button */}
      <div className="absolute bottom-8 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          variant="secondary"
          className="w-7 h-7"
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
        >
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-1.5 bg-background/90 text-center">
        <span className="text-xs font-medium text-muted-foreground">Page {page.pageNumber}</span>
      </div>
    </div>
  );
}
