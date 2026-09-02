import React, { useState, useCallback, useEffect } from 'react';
import { Upload, FileText, Download, Gauge, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import * as pdfjsLib from 'pdfjs-dist';
import { jsPDF } from 'jspdf';
import { ReviewModal } from '@/components/printify/ReviewModal';

// Configure pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url
).toString();

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
    const [showReview, setShowReview] = useState(false);

    // Show review modal 2 seconds after compression result appears (once per session)
    useEffect(() => {
        if (!result) return;
        if (sessionStorage.getItem('pn_review_shown')) return;
        const t = setTimeout(() => setShowReview(true), 2000);
        return () => clearTimeout(t);
    }, [result]);

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

    /**
     * Real compression: render each PDF page to canvas via pdf.js,
     * then re-encode as JPEG at the chosen quality level, and bundle
     * into a new PDF with jsPDF. The quality slider (10–100%) directly
     * controls JPEG quality, giving a visible file-size reduction.
     */
    const compressPdf = async () => {
        if (!file) return;

        setIsProcessing(true);
        setProgress(0);

        try {
            const arrayBuffer = await file.arrayBuffer();
            setProgress(5);

            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const totalPages = pdf.numPages;
            const jpegQuality = quality[0] / 100; // 0.1 to 1.0

            // Render scale: lower quality → lower scale (faster, smaller)
            const renderScale = jpegQuality > 0.7 ? 1.5 : jpegQuality > 0.4 ? 1.2 : 1.0;

            // Render the first page to detect orientation
            const firstPage = await pdf.getPage(1);
            const firstViewport = firstPage.getViewport({ scale: renderScale });
            const isLandscape = firstViewport.width > firstViewport.height;

            const jspdf = new jsPDF({
                orientation: isLandscape ? 'landscape' : 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pdfWidth = isLandscape ? 297 : 210;
            const pdfHeight = isLandscape ? 210 : 297;

            for (let i = 1; i <= totalPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: renderScale });

                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const ctx = canvas.getContext('2d');
                if (!ctx) throw new Error('Canvas context unavailable');

                await page.render({ canvasContext: ctx, viewport }).promise;

                // Re-encode at chosen JPEG quality — this is the real compression
                const imgData = canvas.toDataURL('image/jpeg', jpegQuality);

                if (i > 1) jspdf.addPage();

                // Fit the image to the A4 page preserving aspect ratio
                const imgAspect = viewport.width / viewport.height;
                const pageAspect = pdfWidth / pdfHeight;
                let w = pdfWidth, h = pdfHeight;
                if (imgAspect > pageAspect) { h = pdfWidth / imgAspect; }
                else { w = pdfHeight * imgAspect; }
                const x = (pdfWidth - w) / 2;
                const y = (pdfHeight - h) / 2;

                jspdf.addImage(imgData, 'JPEG', x, y, w, h);

                setProgress(Math.round((i / totalPages) * 90) + 5);
            }

            const compressedBytes = jspdf.output('arraybuffer');
            setProgress(100);

            const originalSize = file.size;
            const compressedSize = compressedBytes.byteLength;
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
        <>
        <div className="space-y-6">
            {/* Upload Zone */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Gauge className="w-5 h-5 text-[hsl(var(--accent-highlight))]" />
                        Compress PDF
                    </CardTitle>
                    <CardDescription>
                        Reduce PDF file size by re-encoding at your chosen quality level
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!file ? (
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-[hsl(var(--accent-highlight)/0.4)] transition-colors cursor-pointer"
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
                                    Drop a PDF here or <span className="text-[hsl(var(--accent-highlight))]">browse</span>
                                </p>
                            </label>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                                <FileText className="w-8 h-8 text-[hsl(var(--accent-highlight))]" />
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
                                    onValueChange={(v) => { setQuality(v); setResult(null); setCompressedBlob(null); }}
                                    min={10}
                                    max={95}
                                    step={5}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Maximum Compression (smallest file)</span>
                                    <span>Best Quality (larger file)</span>
                                </div>
                                <p className="text-xs text-muted-foreground italic">
                                    Lower quality = smaller file size. Recommended: 50–70% for study notes.
                                </p>
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
                                <div className="p-4 rounded-lg bg-[hsl(var(--accent-highlight))]/10 border border-[hsl(var(--accent-highlight)/0.15)]">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm">Original Size</span>
                                        <span className="font-medium">{formatSize(result.originalSize)}</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm">Compressed Size</span>
                                        <span className="font-medium text-[hsl(var(--accent-highlight))]">{formatSize(result.compressedSize)}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-[hsl(var(--accent-highlight)/0.15)]">
                                        <span className="text-sm font-medium">Space Saved</span>
                                        <span className="font-bold text-[hsl(var(--accent-highlight))]">{result.savings}%</span>
                                    </div>
                                </div>
                            )}

                            {result?.savings === 0 && (
                                <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                    <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                                        The compressed file is similar in size. Try a lower quality setting for more savings.
                                    </p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3">
                                {!result ? (
                                    <Button
                                        onClick={compressPdf}
                                        disabled={isProcessing}
                                        className="flex-1 bg-[hsl(var(--accent-highlight))] hover:bg-[hsl(var(--accent-highlight)/0.9)]"
                                    >
                                        <Gauge className="w-4 h-4 mr-2" />
                                        {isProcessing ? 'Compressing...' : 'Compress PDF'}
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            onClick={downloadCompressed}
                                            className="flex-1 bg-[hsl(var(--accent-highlight))] hover:bg-[hsl(var(--accent-highlight)/0.9)]"
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
        {showReview && <ReviewModal onClose={() => setShowReview(false)} />}
    </>
    );
};
