import React, { useState, useCallback, useEffect } from 'react';
import { Upload, FileText, Download, Scissors, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { ReviewModal } from '@/components/printify/ReviewModal';

// Configure worker for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url
).toString();

interface PagePreview {
    pageNumber: number;
    thumbnail: string;
    selected: boolean;
}

export const PdfPageExtractor: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [pages, setPages] = useState<PagePreview[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);
    const [pageRange, setPageRange] = useState('');
    const [showReview, setShowReview] = useState(false);
    const [downloadCount, setDownloadCount] = useState(0);

    // Show review modal 2 seconds after a successful extraction download (once per session)
    useEffect(() => {
        if (downloadCount === 0) return;
        if (sessionStorage.getItem('pn_review_shown')) return;
        const t = setTimeout(() => setShowReview(true), 2000);
        return () => clearTimeout(t);
    }, [downloadCount]);

    const handleFileSelect = useCallback(async (selectedFile: File | null) => {
        if (!selectedFile || selectedFile.type !== 'application/pdf') return;

        setFile(selectedFile);
        setIsLoading(true);
        setPages([]);

        try {
            const arrayBuffer = await selectedFile.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const pageCount = pdf.numPages;

            const previews: PagePreview[] = [];

            for (let i = 1; i <= pageCount; i++) {
                const page = await pdf.getPage(i);
                const scale = 0.3;
                const viewport = page.getViewport({ scale });

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d')!;
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({
                    canvasContext: context,
                    viewport,
                }).promise;

                previews.push({
                    pageNumber: i,
                    thumbnail: canvas.toDataURL('image/jpeg', 0.7),
                    selected: true,
                });
            }

            setPages(previews);
            setPageRange(`1-${pageCount}`);
        } catch (error) {
            console.error('Error loading PDF:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        handleFileSelect(e.dataTransfer.files[0]);
    }, [handleFileSelect]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
    }, []);

    const togglePage = (pageNumber: number) => {
        setPages(prev =>
            prev.map(p =>
                p.pageNumber === pageNumber ? { ...p, selected: !p.selected } : p
            )
        );
    };

    const selectAll = () => {
        setPages(prev => prev.map(p => ({ ...p, selected: true })));
    };

    const deselectAll = () => {
        setPages(prev => prev.map(p => ({ ...p, selected: false })));
    };

    const applyRange = () => {
        if (!pageRange.trim()) return;

        const selectedPages = new Set<number>();
        const parts = pageRange.split(',');

        for (const part of parts) {
            const trimmed = part.trim();
            if (trimmed.includes('-')) {
                const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()));
                if (!isNaN(start) && !isNaN(end)) {
                    for (let i = start; i <= end; i++) {
                        selectedPages.add(i);
                    }
                }
            } else {
                const num = parseInt(trimmed);
                if (!isNaN(num)) {
                    selectedPages.add(num);
                }
            }
        }

        setPages(prev =>
            prev.map(p => ({
                ...p,
                selected: selectedPages.has(p.pageNumber),
            }))
        );
    };

    const extractPages = async () => {
        if (!file) return;

        const selectedPageNumbers = pages
            .filter(p => p.selected)
            .map(p => p.pageNumber - 1); // pdf-lib uses 0-indexed

        if (selectedPageNumbers.length === 0) return;

        setIsExtracting(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const sourcePdf = await PDFDocument.load(arrayBuffer);
            const newPdf = await PDFDocument.create();

            const copiedPages = await newPdf.copyPages(sourcePdf, selectedPageNumbers);
            copiedPages.forEach(page => newPdf.addPage(page));

            const pdfBytes = await newPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = file.name.replace('.pdf', '-extracted.pdf');
            link.click();
            setDownloadCount(c => c + 1);

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error extracting pages:', error);
        } finally {
            setIsExtracting(false);
        }
    };

    const selectedCount = pages.filter(p => p.selected).length;

    const reset = () => {
        setFile(null);
        setPages([]);
        setPageRange('');
    };

    return (
        <>
        <div className="space-y-6">
            {/* Upload Zone */}
            <div className="rounded-[28px] bg-card/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2.5 mb-2">
                    <Scissors className="w-5 h-5 text-accent" />
                    <h3 className="font-bold text-lg tracking-tight">Extract PDF Pages</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                    Select specific pages to extract from your PDF
                </p>

                {!file ? (
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="border-2 border-dashed border-black/[0.1] dark:border-white/[0.12] rounded-[20px] p-8 text-center hover:border-accent/40 hover:bg-accent/5 transition-all cursor-pointer"
                    >
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                            className="hidden"
                            id="extract-upload"
                        />
                        <label htmlFor="extract-upload" className="cursor-pointer block">
                            <div className="w-12 h-12 rounded-[16px] bg-accent/10 flex items-center justify-center mx-auto mb-3 text-accent">
                                <Upload className="w-6 h-6" />
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">
                                Drop a PDF here or <span className="text-accent underline underline-offset-2">browse</span>
                            </p>
                        </label>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 p-4 rounded-[16px] border border-black/[0.06] dark:border-white/[0.08] bg-background/60 backdrop-blur-md">
                        <FileText className="w-8 h-8 text-accent shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate tracking-tight">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {pages.length} pages • {selectedCount} selected
                            </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={reset} className="rounded-[10px] text-xs font-semibold active:scale-[0.94]">
                            Change
                        </Button>
                    </div>
                )}
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="rounded-[28px] bg-card/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] p-10 text-center shadow-sm">
                    <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground font-medium">Loading PDF pages...</p>
                </div>
            )}

            {/* Page Selection */}
            {pages.length > 0 && !isLoading && (
                <div className="rounded-[28px] bg-card/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] p-6 sm:p-8 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h3 className="font-bold text-lg tracking-tight">Select Pages</h3>
                            <p className="text-sm text-muted-foreground">
                                Click pages to toggle selection or use range input
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={selectAll} className="rounded-[10px] text-xs font-semibold active:scale-[0.94]">
                                <Check className="w-3.5 h-3.5 mr-1 text-accent" />
                                All
                            </Button>
                            <Button variant="outline" size="sm" onClick={deselectAll} className="rounded-[10px] text-xs font-semibold active:scale-[0.94]">
                                <X className="w-3.5 h-3.5 mr-1" />
                                None
                            </Button>
                        </div>
                    </div>

                    {/* Range Input */}
                    <div className="flex gap-2.5 mb-6">
                        <div className="flex-1">
                            <Label className="sr-only">Page Range</Label>
                            <Input
                                placeholder="e.g., 1-5, 8, 10-12"
                                value={pageRange}
                                onChange={(e) => setPageRange(e.target.value)}
                                className="rounded-[12px]"
                            />
                        </div>
                        <Button variant="outline" onClick={applyRange} className="rounded-[12px] active:scale-[0.96]">
                            Apply Range
                        </Button>
                    </div>

                    {/* Page Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                        {pages.map((page) => (
                            <button
                                key={page.pageNumber}
                                onClick={() => togglePage(page.pageNumber)}
                                className={`relative aspect-[3/4] rounded-[14px] overflow-hidden border-2 transition-all duration-200 active:scale-[0.95] ${page.selected
                                    ? 'border-accent ring-2 ring-accent/20'
                                    : 'border-transparent opacity-50 hover:opacity-75'
                                    }`}
                            >
                                <img
                                    src={page.thumbnail}
                                    alt={`Page ${page.pageNumber}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md text-foreground text-[11px] py-0.5 text-center font-semibold">
                                    {page.pageNumber}
                                </div>
                                {page.selected && (
                                    <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-sm">
                                        <Check className="w-3 h-3 stroke-[3]" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Extract Button */}
                    <div className="mt-8">
                        <Button
                            onClick={extractPages}
                            disabled={selectedCount === 0 || isExtracting}
                            className="w-full rounded-[14px] bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-sm active:scale-[0.96]"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            {isExtracting ? 'Extracting...' : `Extract ${selectedCount} Pages`}
                        </Button>
                    </div>
                </div>
            )}
        </div>
        {showReview && <ReviewModal onClose={() => setShowReview(false)} />}
    </>
    );
};

