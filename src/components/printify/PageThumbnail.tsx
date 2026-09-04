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
        relative group rounded-[18px] border overflow-hidden transition-all duration-200 cursor-pointer active:scale-[0.97]
        ${page.isSelected 
          ? 'border-accent ring-2 ring-accent bg-accent/5' 
          : 'border-black/[0.08] dark:border-white/[0.1] hover:border-black/20 dark:hover:border-white/25'}
        ${isDragging ? 'opacity-50 scale-95' : ''}
      `}
    >
      {/* Selection overlay */}
      <div className={`absolute inset-0 z-10 pointer-events-none transition-colors ${
        page.isSelected ? 'bg-accent/10' : ''
      }`} />

      {/* Selection indicator */}
      <div className={`absolute top-2.5 right-2.5 z-20 w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
        page.isSelected 
          ? 'bg-accent border-accent text-accent-foreground' 
          : 'bg-background/80 border-black/20 dark:border-white/30 backdrop-blur-md group-hover:border-accent'
      }`}>
        {page.isSelected && <Check className="w-3 h-3 stroke-[3]" />}
      </div>

      <div className="aspect-[3/4] bg-muted/50">
        <img
          src={previewImage}
          alt={`Page ${page.pageNumber}`}
          className={`w-full h-full object-contain ${isLoadingPreview ? 'opacity-50' : ''}`}
        />
      </div>

      {/* Drag handle */}
      <div className="absolute top-2.5 left-2.5 z-20">
        <div 
          className="p-1 rounded-[6px] bg-background/80 backdrop-blur-md cursor-grab active:cursor-grabbing border border-black/[0.06] dark:border-white/[0.08]"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>

      {/* Preview button */}
      <div className="absolute bottom-8 right-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          variant="secondary"
          className="w-7 h-7 rounded-[8px] bg-background/80 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08]"
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
        >
          <Eye className="w-3.5 h-3.5 text-accent" />
        </Button>
      </div>

      <div className="absolute bottom-0 inset-x-0 py-1 px-2 bg-background/90 backdrop-blur-md border-t border-black/[0.06] dark:border-white/[0.08] text-center">
        <span className="text-[11px] font-semibold text-muted-foreground tracking-tight">Page {page.pageNumber}</span>
      </div>
    </div>
  );
}

