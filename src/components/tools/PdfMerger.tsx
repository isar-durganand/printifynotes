import React, { useState, useCallback, useEffect } from 'react';
import { Upload, FileText, GripVertical, Trash2, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PDFDocument } from 'pdf-lib';
import { ReviewModal } from '@/components/printify/ReviewModal';

interface PdfFile {
    id: string;
    file: File;
    name: string;
    pageCount: number;
}

export const PdfMerger: React.FC = () => {
    const [files, setFiles] = useState<PdfFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [showReview, setShowReview] = useState(false);
    const [downloadCount, setDownloadCount] = useState(0);

    // Show review modal 2 seconds after a successful download (once per session)
    useEffect(() => {
        if (downloadCount === 0) return;
        if (sessionStorage.getItem('pn_review_shown')) return;
        const t = setTimeout(() => setShowReview(true), 2000);
        return () => clearTimeout(t);
    }, [downloadCount]);

    const handleFileSelect = useCallback(async (selectedFiles: FileList | null) => {
        if (!selectedFiles) return;

        const newFiles: PdfFile[] = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            if (file.type === 'application/pdf') {
                try {
                    const arrayBuffer = await file.arrayBuffer();
                    const pdfDoc = await PDFDocument.load(arrayBuffer);
                    newFiles.push({
                        id: `${Date.now()}-${i}`,
                        file,
                        name: file.name,
                        pageCount: pdfDoc.getPageCount(),
                    });
                } catch (error) {
                    console.error(`Error loading ${file.name}:`, error);
                }
            }
        }
        setFiles(prev => [...prev, ...newFiles]);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        handleFileSelect(e.dataTransfer.files);
    }, [handleFileSelect]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
    }, []);

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleDragOverItem = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newFiles = [...files];
        const draggedFile = newFiles[draggedIndex];
        newFiles.splice(draggedIndex, 1);
        newFiles.splice(index, 0, draggedFile);
        setFiles(newFiles);
        setDraggedIndex(index);
    };

    const mergePdfs = async () => {
        if (files.length < 2) return;

        setIsProcessing(true);
        try {
            const mergedPdf = await PDFDocument.create();

            for (const pdfFile of files) {
                const arrayBuffer = await pdfFile.file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach(page => mergedPdf.addPage(page));
            }

            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'merged-document.pdf';
            link.click();
            setDownloadCount(c => c + 1);

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error merging PDFs:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const totalPages = files.reduce((sum, f) => sum + f.pageCount, 0);

    return (
        <>
        <div className="space-y-6">
            {/* Upload Zone */}
            <div className="rounded-[28px] bg-card/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2.5 mb-2">
                    <Upload className="w-5 h-5 text-accent" />
                    <h3 className="font-bold text-lg tracking-tight">Upload PDFs</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                    Drag and drop multiple PDF files or click to browse
                </p>

                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-black/[0.1] dark:border-white/[0.12] rounded-[20px] p-8 text-center hover:border-accent/40 hover:bg-accent/5 transition-all cursor-pointer"
                >
                    <input
                        type="file"
                        multiple
                        accept=".pdf"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="hidden"
                        id="pdf-upload"
                    />
                    <label htmlFor="pdf-upload" className="cursor-pointer block">
                        <div className="w-12 h-12 rounded-[16px] bg-accent/10 flex items-center justify-center mx-auto mb-3 text-accent">
                            <Plus className="w-6 h-6" />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                            Drop PDF files here or <span className="text-accent underline underline-offset-2">browse</span>
                        </p>
                    </label>
                </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="rounded-[28px] bg-card/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] p-6 sm:p-8 shadow-sm">
                    <div className="mb-5">
                        <h3 className="font-bold text-lg tracking-tight">Selected Files ({files.length})</h3>
                        <p className="text-sm text-muted-foreground">
                            Drag to reorder • Total: {totalPages} pages
                        </p>
                    </div>

                    <div className="space-y-2.5">
                        {files.map((file, index) => (
                            <div
                                key={file.id}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragEnd={handleDragEnd}
                                onDragOver={(e) => handleDragOverItem(e, index)}
                                className={`flex items-center gap-3 p-3.5 rounded-[16px] border border-black/[0.06] dark:border-white/[0.08] bg-background/60 backdrop-blur-md hover:bg-foreground/[0.03] transition-colors ${draggedIndex === index ? 'opacity-50' : ''}`}
                            >
                                <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab shrink-0" />
                                <FileText className="w-5 h-5 text-accent shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate tracking-tight">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">{file.pageCount} pages</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFile(file.id)}
                                    className="w-8 h-8 rounded-[10px] text-muted-foreground hover:text-destructive active:scale-[0.92]"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Button
                            onClick={mergePdfs}
                            disabled={files.length < 2 || isProcessing}
                            className="flex-1 rounded-[14px] bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-sm active:scale-[0.96]"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            {isProcessing ? 'Merging...' : `Merge ${files.length} PDFs`}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setFiles([])}
                            className="rounded-[14px] border-black/[0.08] dark:border-white/[0.1] active:scale-[0.96]"
                        >
                            Clear All
                        </Button>
                    </div>
                </div>
            )}
        </div>
        {showReview && <ReviewModal onClose={() => setShowReview(false)} />}
    </>
    );
};

