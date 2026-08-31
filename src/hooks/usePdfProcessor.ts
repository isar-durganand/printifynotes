import { useState, useCallback, useRef } from 'react';
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
  fileCount: number;
  loadFile: (file: File) => Promise<void>;
  appendFile: (file: File) => Promise<void>;
  loadPdf: (file: File) => Promise<void>;
  reset: () => void;
}

export function usePdfProcessor(): UsePdfProcessorReturn {
  const [pages, setPages] = useState<PageData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fileCount, setFileCount] = useState(0);
  // Track total pages across all loaded files to generate sequential IDs
  const totalPagesRef = useRef(0);
  const fileIndexRef = useRef(0);

  const loadPdf = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setProgress(0);
    setPages([]);
    totalPagesRef.current = 0;
    fileIndexRef.current = 0;

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
          id: `f0-page-${i}`,
          pageNumber: i,
          originalImage: imageDataUrl,
          isSelected: true,
          width: viewport.width,
          height: viewport.height,
        });

        setProgress(Math.round((i / totalPages) * 100));
      }

      totalPagesRef.current = totalPages;
      fileIndexRef.current = 1;
      setPages(loadedPages);
      setFileCount(1);
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
    totalPagesRef.current = 0;
    fileIndexRef.current = 0;

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
      totalPagesRef.current = 1;
      fileIndexRef.current = 1;
      setPages([
        {
          id: 'f0-page-1',
          pageNumber: 1,
          originalImage: imageDataUrl,
          isSelected: true,
          width: img.naturalWidth,
          height: img.naturalHeight,
        },
      ]);
      setFileCount(1);
    } catch (err) {
      console.error('Error loading image:', err);
      setError(err instanceof Error ? err.message : 'Failed to load image');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * appendFile: processes a new file and APPENDS its pages to existing pages[].
   * Page IDs use the file index to avoid collisions.
   * Page numbers continue sequentially from the last existing page.
   */
  const appendFile = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setProgress(0);

    const fileIdx = fileIndexRef.current;
    const startPageNumber = totalPagesRef.current;

    try {
      if (IMAGE_TYPES.has(file.type)) {
        // Append image as a single page
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

        const newPage: PageData = {
          id: `f${fileIdx}-page-1`,
          pageNumber: startPageNumber + 1,
          originalImage: imageDataUrl,
          isSelected: true,
          width: img.naturalWidth,
          height: img.naturalHeight,
        };

        totalPagesRef.current = startPageNumber + 1;
        fileIndexRef.current = fileIdx + 1;
        setPages(prev => [...prev, newPage]);
        setFileCount(prev => prev + 1);
      } else {
        // Append PDF pages
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const totalPages = pdf.numPages;
        const scale = totalPages <= 10 ? 1.5 : totalPages <= 30 ? 1.2 : 1.0;
        const newPages: PageData[] = [];

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) throw new Error('Could not get canvas context');

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;

          const imageDataUrl = canvas.toDataURL('image/jpeg', 0.85);

          newPages.push({
            id: `f${fileIdx}-page-${i}`,
            pageNumber: startPageNumber + i,
            originalImage: imageDataUrl,
            isSelected: true,
            width: viewport.width,
            height: viewport.height,
          });

          setProgress(Math.round((i / totalPages) * 100));
        }

        totalPagesRef.current = startPageNumber + totalPages;
        fileIndexRef.current = fileIdx + 1;
        setPages(prev => [...prev, ...newPages]);
        setFileCount(prev => prev + 1);
      }
    } catch (err) {
      console.error('Error appending file:', err);
      setError(err instanceof Error ? err.message : 'Failed to load file');
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
    setFileCount(0);
    totalPagesRef.current = 0;
    fileIndexRef.current = 0;
  }, []);

  return {
    pages,
    isLoading,
    progress,
    error,
    fileCount,
    loadFile,
    appendFile,
    loadPdf,
    reset,
  };
}
