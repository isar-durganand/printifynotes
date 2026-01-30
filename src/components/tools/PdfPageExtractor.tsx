import React, { useState, useCallback } from 'react';
import { Upload, FileText, Download, Scissors, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';

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
        <div className="space-y-6">
            {/* Upload Zone */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Scissors className="w-5 h-5 text-emerald-500" />
                        Extract PDF Pages
                    </CardTitle>
                    <CardDescription>
                        Select specific pages to extract from your PDF
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!file ? (
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-emerald-500/50 transition-colors cursor-pointer"
                        >
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                                className="hidden"
                                id="extract-upload"
                            />
                            <label htmlFor="extract-upload" className="cursor-pointer">
                                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">
                                    Drop a PDF here or <span className="text-emerald-500">browse</span>
                                </p>
                            </label>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                            <FileText className="w-8 h-8 text-emerald-500" />
                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{file.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {pages.length} pages • {selectedCount} selected
                                </p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={reset}>
                                Change
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Loading */}
            {isLoading && (
                <Card>
                    <CardContent className="py-8 text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
                        <p className="text-muted-foreground">Loading PDF pages...</p>
                    </CardContent>
                </Card>
            )}

            {/* Page Selection */}
            {pages.length > 0 && !isLoading && (
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <CardTitle>Select Pages</CardTitle>
                                <CardDescription>
                                    Click pages to toggle selection or use range input
                                </CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={selectAll}>
                                    <Check className="w-4 h-4 mr-1" />
                                    All
                                </Button>
                                <Button variant="outline" size="sm" onClick={deselectAll}>
                                    <X className="w-4 h-4 mr-1" />
                                    None
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Range Input */}
                        <div className="flex gap-2 mb-6">
                            <div className="flex-1">
                                <Label className="sr-only">Page Range</Label>
                                <Input
                                    placeholder="e.g., 1-5, 8, 10-12"
                                    value={pageRange}
                                    onChange={(e) => setPageRange(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" onClick={applyRange}>
                                Apply Range
                            </Button>
                        </div>

                        {/* Page Grid */}
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                            {pages.map((page) => (
                                <button
                                    key={page.pageNumber}
                                    onClick={() => togglePage(page.pageNumber)}
                                    className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${page.selected
                                        ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                                        : 'border-transparent opacity-50 hover:opacity-75'
                                        }`}
                                >
                                    <img
                                        src={page.thumbnail}
                                        alt={`Page ${page.pageNumber}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs py-1 text-center">
                                        {page.pageNumber}
                                    </div>
                                    {page.selected && (
                                        <div className="absolute top-1 right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Extract Button */}
                        <div className="mt-6">
                            <Button
                                onClick={extractPages}
                                disabled={selectedCount === 0 || isExtracting}
                                className="w-full bg-emerald-500 hover:bg-emerald-600"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                {isExtracting ? 'Extracting...' : `Extract ${selectedCount} Pages`}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
