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
      className={`
        relative group rounded-lg border overflow-hidden cursor-move transition-all
        ${page.isSelected ? 'border-primary ring-1 ring-primary' : 'border-border'}
        ${isDragging ? 'opacity-50 scale-95' : ''}
      `}
    >
      <div className="aspect-[3/4] bg-muted">
        <img
          src={previewImage}
          alt={`Page ${page.pageNumber}`}
          className={`w-full h-full object-contain ${isLoadingPreview ? 'opacity-50' : ''}`}
        />
      </div>

      <div className="absolute top-1 left-1">
        <div className="p-1 rounded bg-background/80">
          <GripVertical className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>

      <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          variant={page.isSelected ? 'default' : 'secondary'}
          className="w-6 h-6"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect();
          }}
        >
          <Check className="w-3 h-3" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="w-6 h-6"
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
        >
          <Eye className="w-3 h-3" />
        </Button>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-1 bg-background/80 text-center">
        <span className="text-xs text-muted-foreground">Page {page.pageNumber}</span>
      </div>
    </div>
  );
}
