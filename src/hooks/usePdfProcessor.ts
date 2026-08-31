import { useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import type { PageData } from '@/types/printify';

// Configure the worker using import.meta.url for proper bundler resolution
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

interface UsePdfProcessorReturn {
  pages: PageData[];
  isLoading: boolean;
  progress: number;
  error: string | null;
  loadFile: (file: File) => Promise<void>;
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

      // Adaptive scale: high quality for small PDFs, faster for large ones
      const scale = totalPages <= 10 ? 1.5 : totalPages <= 30 ? 1.2 : 1.0;

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);

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

        // Use JPEG for smaller file size
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.85);

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

  const loadImage = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setProgress(0);
    setPages([]);

    try {
      const objectUrl = URL.createObjectURL(file);

      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Failed to load image'));
        image.src = objectUrl;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const context = canvas.getContext('2d');
      if (!context) throw new Error('Could not get canvas context');

      context.drawImage(img, 0, 0);
      URL.revokeObjectURL(objectUrl);

      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.92);

      setProgress(100);
      setPages([
        {
          id: 'page-1',
          pageNumber: 1,
          originalImage: imageDataUrl,
          isSelected: true,
          width: img.naturalWidth,
          height: img.naturalHeight,
        },
      ]);
    } catch (err) {
      console.error('Error loading image:', err);
      setError(err instanceof Error ? err.message : 'Failed to load image');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /** Unified entry: routes to loadPdf or loadImage based on file type */
  const loadFile = useCallback(
    async (file: File) => {
      if (IMAGE_TYPES.has(file.type)) {
        await loadImage(file);
      } else {
        await loadPdf(file);
      }
    },
    [loadPdf, loadImage]
  );

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
    loadFile,
    loadPdf,
    reset,
  };
}
