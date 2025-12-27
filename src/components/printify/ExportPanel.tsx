import React, { useState, useCallback } from 'react';
import { Download, FileCheck, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { jsPDF } from 'jspdf';
import type { PageData, TransformationSettings, CombineSettings } from '@/types/printify';
import { applyTransformations } from '@/lib/imageTransformations';

interface ExportPanelProps {
  pages: PageData[];
  transformations: TransformationSettings;
  combineSettings: CombineSettings;
  onReset: () => void;
}

export function ExportPanel({
  pages,
  transformations,
  combineSettings,
  onReset,
}: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const selectedPages = pages.filter((p) => p.isSelected);

  const getMarginSize = () => {
    switch (combineSettings.marginSize) {
      case 'small': return 10;
      case 'medium': return 20;
      case 'large': return 30;
      default: return 20;
    }
  };

  const getSpacing = () => {
    switch (combineSettings.spacing) {
      case 'none': return 0;
      case 'small': return 5;
      case 'medium': return 10;
      default: return 5;
    }
  };

  const handleExport = useCallback(async () => {
    if (selectedPages.length === 0) return;

    setIsExporting(true);
    setProgress(0);
    setIsComplete(false);

    try {
      const transformedImages: string[] = [];
      
      for (let i = 0; i < selectedPages.length; i++) {
        const transformed = await applyTransformations(
          selectedPages[i].originalImage,
          transformations
        );
        transformedImages.push(transformed);
        setProgress(Math.round(((i + 1) / selectedPages.length) * 50));
      }

      const isLandscape = combineSettings.orientation === 'landscape';
      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = isLandscape ? 297 : 210;
      const pageHeight = isLandscape ? 210 : 297;
      const margin = getMarginSize();
      const spacing = getSpacing();

      const contentWidth = pageWidth - margin * 2;
      const contentHeight = pageHeight - margin * 2;

      let currentPdfPage = 0;
      const pagesPerSheet = combineSettings.pagesPerSheet;

      for (let i = 0; i < transformedImages.length; i += pagesPerSheet) {
        if (currentPdfPage > 0) {
          pdf.addPage();
        }

        const pagesToPlace = transformedImages.slice(i, i + pagesPerSheet);
        
        for (let j = 0; j < pagesToPlace.length; j++) {
          const img = pagesToPlace[j];
          
          let cellWidth: number, cellHeight: number, x: number, y: number;

          if (pagesPerSheet === 1) {
            cellWidth = contentWidth;
            cellHeight = contentHeight;
            x = margin;
            y = margin;
          } else if (pagesPerSheet === 2) {
            if (isLandscape) {
              cellWidth = (contentWidth - spacing) / 2;
              cellHeight = contentHeight;
              x = margin + (j % 2) * (cellWidth + spacing);
              y = margin;
            } else {
              cellWidth = contentWidth;
              cellHeight = (contentHeight - spacing) / 2;
              x = margin;
              y = margin + (j % 2) * (cellHeight + spacing);
            }
          } else if (pagesPerSheet === 3) {
            // 3 pages: 1 on top, 2 on bottom (portrait) or 2 left, 1 right (landscape)
            if (isLandscape) {
              cellWidth = (contentWidth - spacing * 2) / 3;
              cellHeight = contentHeight;
              x = margin + j * (cellWidth + spacing);
              y = margin;
            } else {
              if (j === 0) {
                cellWidth = contentWidth;
                cellHeight = (contentHeight - spacing) / 2;
                x = margin;
                y = margin;
              } else {
                cellWidth = (contentWidth - spacing) / 2;
                cellHeight = (contentHeight - spacing) / 2;
                x = margin + ((j - 1) % 2) * (cellWidth + spacing);
                y = margin + (contentHeight + spacing) / 2;
              }
            }
          } else {
            // 4 pages: 2x2 grid
            cellWidth = (contentWidth - spacing) / 2;
            cellHeight = (contentHeight - spacing) / 2;
            x = margin + (j % 2) * (cellWidth + spacing);
            y = margin + Math.floor(j / 2) * (cellHeight + spacing);
          }

          const imgElement = new Image();
          await new Promise<void>((resolve) => {
            imgElement.onload = () => resolve();
            imgElement.src = img;
          });

          const imgAspect = imgElement.width / imgElement.height;
          const cellAspect = cellWidth / cellHeight;

          let finalWidth: number, finalHeight: number;
          if (imgAspect > cellAspect) {
            finalWidth = cellWidth;
            finalHeight = cellWidth / imgAspect;
          } else {
            finalHeight = cellHeight;
            finalWidth = cellHeight * imgAspect;
          }

          const offsetX = x + (cellWidth - finalWidth) / 2;
          const offsetY = y + (cellHeight - finalHeight) / 2;

          pdf.addImage(img, 'JPEG', offsetX, offsetY, finalWidth, finalHeight, undefined, 'MEDIUM');
        }

        currentPdfPage++;
        setProgress(50 + Math.round(((i + pagesPerSheet) / transformedImages.length) * 50));
      }

      const timestamp = new Date().toISOString().split('T')[0];
      pdf.save(`printify-notes-${timestamp}.pdf`);
      
      setIsComplete(true);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  }, [selectedPages, transformations, combineSettings]);

  return (
    <div className="border border-border rounded-lg p-4 bg-card space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <Download className="w-4 h-4 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground text-sm">Export PDF</h3>
          <p className="text-xs text-muted-foreground">
            {selectedPages.length} page{selectedPages.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      </div>

      {isComplete ? (
        <div className="text-center py-2 space-y-3">
          <div className="w-10 h-10 mx-auto rounded-full bg-success/20 flex items-center justify-center">
            <FileCheck className="w-5 h-5 text-success" />
          </div>
          <p className="font-medium text-foreground text-sm">Export Complete!</p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={onReset}>
              <RefreshCw className="w-4 h-4 mr-1" />
              New
            </Button>
            <Button size="sm" onClick={() => setIsComplete(false)}>
              <Download className="w-4 h-4 mr-1" />
              Again
            </Button>
          </div>
        </div>
      ) : isExporting ? (
        <div className="py-2 space-y-3">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-center text-muted-foreground">
            {progress < 50 ? 'Transforming...' : 'Generating PDF...'} {progress}%
          </p>
        </div>
      ) : (
        <Button
          onClick={handleExport}
          disabled={selectedPages.length === 0}
          className="w-full"
          size="sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Generate PDF
        </Button>
      )}

      {!isComplete && !isExporting && selectedPages.length === 0 && (
        <p className="text-xs text-center text-muted-foreground">
          Select at least one page
        </p>
      )}
    </div>
  );
}
