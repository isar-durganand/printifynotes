import React, { useState, useCallback, useEffect } from 'react';
import { Download, FileCheck, RefreshCw, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jsPDF } from 'jspdf';
import type { PageData, TransformationSettings, CombineSettings } from '@/types/printify';
import { applyTransformations } from '@/lib/imageTransformations';
import { ReviewModal } from '@/components/printify/ReviewModal';

type ExportQuality = 'medium' | 'high' | 'very-high';

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
  const [exportQuality, setExportQuality] = useState<ExportQuality>('high');
  const [showPageNumbers, setShowPageNumbers] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // Show review modal 2 seconds after export completes (once per session)
  useEffect(() => {
    if (!isComplete) return;
    if (sessionStorage.getItem('pn_review_shown')) return;
    const t = setTimeout(() => setShowReview(true), 2000);
    return () => clearTimeout(t);
  }, [isComplete]);

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

      // Reserve 8mm at the bottom of the content area for the sheet number if enabled
      const sheetNumberSpace = showPageNumbers ? 8 : 0;
      const contentWidth = pageWidth - margin * 2;
      const contentHeight = pageHeight - margin * 2 - sheetNumberSpace;

      // Determine the page background color:
      // When colors are inverted without forceWhiteBackground, margins should be black
      const pageBgColor: [number, number, number] =
        transformations.invertColors && !transformations.forceWhiteBackground
          ? [0, 0, 0]
          : [255, 255, 255];

      // Page number text color: contrasts with background
      const pageNumColor: [number, number, number] =
        transformations.invertColors && !transformations.forceWhiteBackground
          ? [160, 160, 160]
          : [100, 100, 100];

      const fillPageBackground = () => {
        pdf.setFillColor(...pageBgColor);
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      };

      // Fill the background on the first (already created) page
      fillPageBackground();

      let currentPdfPage = 0;
      const pagesPerSheet = combineSettings.pagesPerSheet;

      for (let i = 0; i < transformedImages.length; i += pagesPerSheet) {
        if (currentPdfPage > 0) {
          pdf.addPage();
          fillPageBackground();
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
            // 3 pages: landscape = 3 equal columns; portrait = page 0 top-full-width, pages 1+2 split bottom
            if (isLandscape) {
              cellWidth = (contentWidth - spacing * 2) / 3;
              cellHeight = contentHeight;
              x = margin + j * (cellWidth + spacing);
              y = margin;
            } else {
              // 3 equal rows vertically stacked
              cellWidth = contentWidth;
              cellHeight = (contentHeight - spacing * 2) / 3;
              x = margin;
              y = margin + j * (cellHeight + spacing);
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
          
          // Reserve 4mm at the bottom of the cell for the source page number
          let availableCellHeight = cellHeight;
          if (showPageNumbers && pagesPerSheet > 1) {
            availableCellHeight = cellHeight - 4;
          }

          const cellAspect = cellWidth / availableCellHeight;

          let finalWidth: number, finalHeight: number;
          if (imgAspect > cellAspect) {
            finalWidth = cellWidth;
            finalHeight = cellWidth / imgAspect;
          } else {
            finalHeight = availableCellHeight;
            finalWidth = availableCellHeight * imgAspect;
          }

          const offsetX = x + (cellWidth - finalWidth) / 2;
          const offsetY = y + (availableCellHeight - finalHeight) / 2;

          const compressionLevel = exportQuality === 'medium' ? 'MEDIUM' : exportQuality === 'high' ? 'SLOW' : 'NONE';
          pdf.addImage(img, 'JPEG', offsetX, offsetY, finalWidth, finalHeight, undefined, compressionLevel);

          // Draw a very thin border around the cell slot if the user enabled it
          if (combineSettings.pageBorder) {
            const borderColor: [number, number, number] =
              transformations.invertColors && !transformations.forceWhiteBackground
                ? [80, 80, 80]
                : [180, 180, 180];
            pdf.setDrawColor(...borderColor);
            pdf.setLineWidth(0.2);
            pdf.rect(x, y, cellWidth, cellHeight);
          }

          // Page number for this specific content page (original page number)
          if (showPageNumbers && pagesPerSheet > 1) {
            const contentPageIndex = i + j;
            const sourcePageNum = selectedPages[contentPageIndex]?.pageNumber ?? (contentPageIndex + 1);
            pdf.setFontSize(6);
            pdf.setTextColor(...pageNumColor);
            // Place just below the actual image to avoid floating at the cell border
            const numText = String(sourcePageNum);
            const numX = x + cellWidth / 2;
            const numY = offsetY + finalHeight + 3.2; // ~3mm below the image
            pdf.text(numText, numX, numY, { align: 'center' });
          }
        }

        // Sheet page number — printed at bottom-center of the full output page
        if (showPageNumbers) {
          const sheetNum = currentPdfPage + 1;
          
          // Make it stand out: Bold, larger, and with dashes
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(10);
          
          // Slightly darker/more prominent color than the cell numbers
          const sheetNumColor: [number, number, number] =
            transformations.invertColors && !transformations.forceWhiteBackground
              ? [200, 200, 200]
              : [60, 60, 60];
              
          pdf.setTextColor(...sheetNumColor);
          
          // Place it in the reserved space, neatly below the content area
          const sheetNumY = margin + contentHeight + 6;
          pdf.text(
            `- ${sheetNum} -`,
            pageWidth / 2,
            sheetNumY,
            { align: 'center' }
          );
          
          // Reset font to normal for the next loop
          pdf.setFont('helvetica', 'normal');
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
  }, [selectedPages, transformations, combineSettings, exportQuality, showPageNumbers]);

  return (
    <>
    <div className="rounded-[24px] bg-card/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-black/[0.08] dark:border-white/[0.1] bg-foreground/[0.02] relative">
        <Download className="w-4 h-4 text-accent" />
        <div>
          <h3 className="font-semibold text-foreground text-sm tracking-tight relative z-10">Export PDF</h3>
        </div>
        <span className="ml-auto text-xs text-muted-foreground font-medium relative z-10">
          {selectedPages.length} / {pages.length} pages
        </span>
      </div>

      <div className="p-5 space-y-4">

      {/* Export Quality */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold tracking-tight">Export Quality</Label>
        <Select value={exportQuality} onValueChange={(v) => setExportQuality(v as ExportQuality)}>
          <SelectTrigger className="w-full rounded-[12px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-[16px]">
            <SelectItem value="medium">Medium (smaller file)</SelectItem>
            <SelectItem value="high">High (balanced)</SelectItem>
            <SelectItem value="very-high">Very High (best quality)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Page Numbers Toggle */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="min-w-0">
          <Label htmlFor="page-numbers-toggle" className="text-sm font-semibold cursor-pointer flex items-center gap-1.5 tracking-tight">
            <Hash className="w-3.5 h-3.5 text-muted-foreground" />
            Page Numbers
          </Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Print sheet number at bottom center
          </p>
        </div>
        <Switch
          id="page-numbers-toggle"
          checked={showPageNumbers}
          onCheckedChange={setShowPageNumbers}
        />
      </div>

      {isComplete ? (
        <div className="text-center py-2 space-y-3">
          <div className="w-10 h-10 mx-auto rounded-full bg-success/20 flex items-center justify-center">
            <FileCheck className="w-5 h-5 text-success" />
          </div>
          <p className="font-semibold text-foreground text-sm tracking-tight">Export Complete!</p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={onReset} className="rounded-[12px] active:scale-[0.96]">
              <RefreshCw className="w-4 h-4 mr-1.5" />
              New
            </Button>
            <Button size="sm" onClick={() => setIsComplete(false)} className="rounded-[12px] bg-accent hover:bg-accent/90 text-accent-foreground active:scale-[0.96]">
              <Download className="w-4 h-4 mr-1.5" />
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
          className="w-full rounded-[14px] bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-sm transition-all duration-200 active:scale-[0.96]"
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
    </div>

    {/* Review modal — appears 2s after export completes */}
    {showReview && <ReviewModal onClose={() => setShowReview(false)} />}
  </>
  );
}

