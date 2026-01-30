import React, { useState, useCallback } from 'react';
import { Upload, FileText, Download, Gauge, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { PDFDocument } from 'pdf-lib';

interface CompressionResult {
    originalSize: number;
    compressedSize: number;
    savings: number;
}

export const PdfCompressor: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [quality, setQuality] = useState([70]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<CompressionResult | null>(null);
    const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);

    const handleFileSelect = useCallback(async (selectedFile: File | null) => {
        if (!selectedFile || selectedFile.type !== 'application/pdf') return;
        setFile(selectedFile);
        setResult(null);
        setCompressedBlob(null);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        handleFileSelect(droppedFile);
    }, [handleFileSelect]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
    }, []);

    const formatSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const compressPdf = async () => {
        if (!file) return;

        setIsProcessing(true);
        setProgress(0);

        try {
            const arrayBuffer = await file.arrayBuffer();
            setProgress(20);

            const pdfDoc = await PDFDocument.load(arrayBuffer);
            setProgress(40);

            // Create a new PDF with optimized settings
            const compressedPdf = await PDFDocument.create();
            const pages = await compressedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());

            setProgress(60);

            pages.forEach(page => {
                compressedPdf.addPage(page);
            });

            setProgress(80);

            // Save with compression options
            const compressedBytes = await compressedPdf.save({
                useObjectStreams: true,
                addDefaultPage: false,
            });

            setProgress(100);

            const originalSize = file.size;
            const compressedSize = compressedBytes.length;
            const savings = Math.round(((originalSize - compressedSize) / originalSize) * 100);

            const blob = new Blob([compressedBytes], { type: 'application/pdf' });
            setCompressedBlob(blob);
            setResult({
                originalSize,
                compressedSize,
                savings: Math.max(0, savings),
            });
        } catch (error) {
            console.error('Error compressing PDF:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadCompressed = () => {
        if (!compressedBlob || !file) return;

        const url = URL.createObjectURL(compressedBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.name.replace('.pdf', '-compressed.pdf');
        link.click();
        URL.revokeObjectURL(url);
    };

    const reset = () => {
        setFile(null);
        setResult(null);
        setCompressedBlob(null);
        setProgress(0);
    };

    return (
        <div className="space-y-6">
            {/* Upload Zone */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Gauge className="w-5 h-5 text-emerald-500" />
                        Compress PDF
                    </CardTitle>
                    <CardDescription>
                        Reduce PDF file size while maintaining quality
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
                                id="compress-upload"
                            />
                            <label htmlFor="compress-upload" className="cursor-pointer">
                                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">
                                    Drop a PDF here or <span className="text-emerald-500">browse</span>
                                </p>
                            </label>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                                <FileText className="w-8 h-8 text-emerald-500" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{file.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Original size: {formatSize(file.size)}
                                    </p>
                                </div>
                                <Button variant="ghost" size="sm" onClick={reset}>
                                    Change
                                </Button>
                            </div>

                            {/* Quality Slider */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label>Compression Quality</Label>
                                    <span className="text-sm text-muted-foreground">{quality[0]}%</span>
                                </div>
                                <Slider
                                    value={quality}
                                    onValueChange={setQuality}
                                    min={10}
                                    max={100}
                                    step={10}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Maximum Compression</span>
                                    <span>Best Quality</span>
                                </div>
                            </div>

                            {/* Progress */}
                            {isProcessing && (
                                <div className="space-y-2">
                                    <Progress value={progress} className="w-full" />
                                    <p className="text-sm text-center text-muted-foreground">
                                        Compressing... {progress}%
                                    </p>
                                </div>
                            )}

                            {/* Result */}
                            {result && (
                                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm">Original Size</span>
                                        <span className="font-medium">{formatSize(result.originalSize)}</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm">Compressed Size</span>
                                        <span className="font-medium text-emerald-500">{formatSize(result.compressedSize)}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-emerald-500/20">
                                        <span className="text-sm font-medium">Savings</span>
                                        <span className="font-bold text-emerald-500">{result.savings}%</span>
                                    </div>
                                </div>
                            )}

                            {result?.savings === 0 && (
                                <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                    <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                                        This PDF is already well-optimized. Compression may not reduce file size significantly.
                                    </p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3">
                                {!result ? (
                                    <Button
                                        onClick={compressPdf}
                                        disabled={isProcessing}
                                        className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                                    >
                                        <Gauge className="w-4 h-4 mr-2" />
                                        {isProcessing ? 'Compressing...' : 'Compress PDF'}
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            onClick={downloadCompressed}
                                            className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Compressed
                                        </Button>
                                        <Button variant="outline" onClick={reset}>
                                            Start Over
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
