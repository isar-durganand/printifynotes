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

  const selectedCount = pages.filter((p) => p.isSelected).length;
  const allSelected = selectedCount === pages.length;

  const handleToggleSelect = useCallback(
    (id: string) => {
      onPagesChange(
        pages.map((page) =>
          page.id === id ? { ...page, isSelected: !page.isSelected } : page
        )
      );
    },
    [pages, onPagesChange]
  );

  const handleSelectAll = useCallback(() => {
    onPagesChange(pages.map((page) => ({ ...page, isSelected: true })));
  }, [pages, onPagesChange]);

  const handleDeselectAll = useCallback(() => {
    onPagesChange(pages.map((page) => ({ ...page, isSelected: false })));
  }, [pages, onPagesChange]);

  const handleDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, targetIndex: number) => {
      e.preventDefault();
      if (draggedIndex === null || draggedIndex === targetIndex) return;

      const newPages = [...pages];
      const [draggedPage] = newPages.splice(draggedIndex, 1);
      newPages.splice(targetIndex, 0, draggedPage);
      onPagesChange(newPages);
      setDraggedIndex(targetIndex);
    },
    [draggedIndex, pages, onPagesChange]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  const handleResetOrder = useCallback(() => {
    const sorted = [...pages].sort((a, b) => a.pageNumber - b.pageNumber);
    onPagesChange(sorted);
  }, [pages, onPagesChange]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-card rounded-xl shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {selectedCount} of {pages.length} pages selected
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={allSelected ? handleDeselectAll : handleSelectAll}
            className="gap-2"
          >
            {allSelected ? (
              <>
                <Square className="w-4 h-4" />
                Deselect All
              </>
            ) : (
              <>
                <CheckSquare className="w-4 h-4" />
                Select All
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetOrder}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Order
          </Button>
        </div>
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {pages.map((page, index) => (
          <div
            key={page.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <PageThumbnail
              page={page}
              transformations={transformations}
              onToggleSelect={handleToggleSelect}
              onPreview={setPreviewPage}
              isDragging={draggedIndex === index}
            />
          </div>
        ))}
      </div>

      {/* Preview modal */}
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
