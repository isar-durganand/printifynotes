import { useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import type { PageData } from '@/types/printify';

// Use the worker from unpkg CDN with proper CORS support
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs';

interface UsePdfProcessorReturn {
  pages: PageData[];
  isLoading: boolean;
  progress: number;
  error: string | null;
  loadPdf: (file: File) => Promise<void>;
  reset: () => void;
}

export function usePdfProcessor(): UsePdfProcessorReturn {
  const [pages, setPages] = useState<PageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loadPdf = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setProgress(0);
    setPages([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const loadedPages: PageData[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        
        // Render at 2x scale for quality
        const scale = 2;
        const viewport = page.getViewport({ scale });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) {
          throw new Error('Could not get canvas context');
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        const imageDataUrl = canvas.toDataURL('image/png');

        loadedPages.push({
          id: `page-${i}`,
          pageNumber: i,
          originalImage: imageDataUrl,
          isSelected: true,
          width: viewport.width,
          height: viewport.height,
        });

        setProgress(Math.round((i / totalPages) * 100));
      }

      setPages(loadedPages);
    } catch (err) {
      console.error('Error loading PDF:', err);
      setError(err instanceof Error ? err.message : 'Failed to load PDF');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setPages([]);
    setProgress(0);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    pages,
    isLoading,
    progress,
    error,
    loadPdf,
    reset,
  };
}
