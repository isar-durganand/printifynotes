import React, { useState, useCallback } from 'react';
import { Upload, FileText, GripVertical, Trash2, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PDFDocument } from 'pdf-lib';

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

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error merging PDFs:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const totalPages = files.reduce((sum, f) => sum + f.pageCount, 0);

    return (
        <div className="space-y-6">
            {/* Upload Zone */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Upload className="w-5 h-5 text-emerald-500" />
                        Upload PDFs
                    </CardTitle>
                    <CardDescription>
                        Drag and drop multiple PDF files or click to browse
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-emerald-500/50 transition-colors cursor-pointer"
                    >
                        <input
                            type="file"
                            multiple
                            accept=".pdf"
                            onChange={(e) => handleFileSelect(e.target.files)}
                            className="hidden"
                            id="pdf-upload"
                        />
                        <label htmlFor="pdf-upload" className="cursor-pointer">
                            <Plus className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">
                                Drop PDF files here or <span className="text-emerald-500">browse</span>
                            </p>
                        </label>
                    </div>
                </CardContent>
            </Card>

            {/* File List */}
            {files.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Selected Files ({files.length})</CardTitle>
                        <CardDescription>
                            Drag to reorder • Total: {totalPages} pages
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {files.map((file, index) => (
                                <div
                                    key={file.id}
                                    draggable
                                    onDragStart={() => handleDragStart(index)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={(e) => handleDragOverItem(e, index)}
                                    className={`flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors ${draggedIndex === index ? 'opacity-50' : ''
                                        }`}
                                >
                                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                                    <FileText className="w-5 h-5 text-emerald-500" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">{file.pageCount} pages</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFile(file.id)}
                                        className="text-muted-foreground hover:text-destructive"
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
                                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                {isProcessing ? 'Merging...' : `Merge ${files.length} PDFs`}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setFiles([])}
                            >
                                Clear All
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
