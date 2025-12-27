import React, { useState, useCallback } from 'react';
import { Download, Loader2, FileCheck, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      // Apply transformations to all selected pages
      const transformedImages: string[] = [];
      
      for (let i = 0; i < selectedPages.length; i++) {
        const transformed = await applyTransformations(
          selectedPages[i].originalImage,
          transformations
        );
        transformedImages.push(transformed);
        setProgress(Math.round(((i + 1) / selectedPages.length) * 50));
      }

      // Create PDF
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
            // 2 pages stacked vertically in portrait, side by side in landscape
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
          } else {
            // 4 pages in 2x2 grid
            cellWidth = (contentWidth - spacing) / 2;
            cellHeight = (contentHeight - spacing) / 2;
            x = margin + (j % 2) * (cellWidth + spacing);
            y = margin + Math.floor(j / 2) * (cellHeight + spacing);
          }

          // Load image to get dimensions
          const imgElement = new Image();
          await new Promise<void>((resolve) => {
            imgElement.onload = () => resolve();
            imgElement.src = img;
          });

          // Calculate aspect ratio fit
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

          // Center in cell
          const offsetX = x + (cellWidth - finalWidth) / 2;
          const offsetY = y + (cellHeight - finalHeight) / 2;

          pdf.addImage(img, 'PNG', offsetX, offsetY, finalWidth, finalHeight);
        }

        currentPdfPage++;
        setProgress(50 + Math.round(((i + pagesPerSheet) / transformedImages.length) * 50));
      }

      // Download
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
    <div className="bg-card rounded-xl p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Download className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Export PDF</h3>
          <p className="text-sm text-muted-foreground">
            {selectedPages.length} page{selectedPages.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      </div>

      {isComplete ? (
        <div className="text-center py-4">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-success/10 flex items-center justify-center">
            <FileCheck className="w-6 h-6 text-success" />
          </div>
          <p className="font-medium text-foreground mb-1">Export Complete!</p>
          <p className="text-sm text-muted-foreground mb-4">
            Your printable PDF has been downloaded
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Start New
            </Button>
            <Button size="sm" onClick={() => setIsComplete(false)} className="gap-2">
              <Download className="w-4 h-4" />
              Export Again
            </Button>
          </div>
        </div>
      ) : isExporting ? (
        <div className="text-center py-4">
          <div className="relative w-16 h-16 mx-auto mb-3">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeDasharray={`${progress * 2.51} 251`}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-foreground">{progress}%</span>
            </div>
          </div>
          <p className="font-medium text-foreground">
            {progress < 50 ? 'Applying transformations...' : 'Generating PDF...'}
          </p>
        </div>
      ) : (
        <Button
          onClick={handleExport}
          disabled={selectedPages.length === 0}
          className="w-full gap-2"
          size="lg"
        >
          <Download className="w-5 h-5" />
          Generate Printable PDF
        </Button>
      )}

      {!isComplete && !isExporting && selectedPages.length === 0 && (
        <p className="text-sm text-center text-muted-foreground">
          Select at least one page to export
        </p>
      )}
    </div>
  );
}
