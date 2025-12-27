import React, { useState, useCallback } from 'react';
import { CheckSquare, Square, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageThumbnail } from './PageThumbnail';
import { PagePreviewModal } from './PagePreviewModal';
import type { PageData, TransformationSettings } from '@/types/printify';

interface PageGalleryProps {
  pages: PageData[];
  transformations: TransformationSettings;
  onPagesChange: (pages: PageData[]) => void;
}

export function PageGallery({ pages, transformations, onPagesChange }: PageGalleryProps) {
  const [previewPage, setPreviewPage] = useState<PageData | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleToggleSelect = useCallback((pageId: string) => {
    onPagesChange(
      pages.map((p) => (p.id === pageId ? { ...p, isSelected: !p.isSelected } : p))
    );
  }, [pages, onPagesChange]);

  const handleSelectAll = useCallback(() => {
    onPagesChange(pages.map((p) => ({ ...p, isSelected: true })));
  }, [pages, onPagesChange]);

  const handleDeselectAll = useCallback(() => {
    onPagesChange(pages.map((p) => ({ ...p, isSelected: false })));
  }, [pages, onPagesChange]);

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newPages = [...pages];
    const [draggedPage] = newPages.splice(draggedIndex, 1);
    newPages.splice(index, 0, draggedPage);
    onPagesChange(newPages);
    setDraggedIndex(index);
  }, [draggedIndex, pages, onPagesChange]);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  const handleResetOrder = useCallback(() => {
    const sorted = [...pages].sort((a, b) => a.pageNumber - b.pageNumber);
    onPagesChange(sorted);
  }, [pages, onPagesChange]);

  const selectedCount = pages.filter((p) => p.isSelected).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {selectedCount} of {pages.length} selected
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleSelectAll}>
            <CheckSquare className="w-4 h-4 mr-1" />
            All
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDeselectAll}>
            <Square className="w-4 h-4 mr-1" />
            None
          </Button>
          <Button variant="ghost" size="sm" onClick={handleResetOrder}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {pages.map((page, index) => (
          <PageThumbnail
            key={page.id}
            page={page}
            transformations={transformations}
            onToggleSelect={() => handleToggleSelect(page.id)}
            onPreview={() => setPreviewPage(page)}
            isDragging={draggedIndex === index}
            dragHandleProps={{
              draggable: true,
              onDragStart: () => handleDragStart(index),
              onDragOver: (e: React.DragEvent) => handleDragOver(e, index),
              onDragEnd: handleDragEnd,
            }}
          />
        ))}
      </div>

      {previewPage && (
        <PagePreviewModal
          page={previewPage}
          transformations={transformations}
          onClose={() => setPreviewPage(null)}
        />
      )}
    </div>
  );
}
