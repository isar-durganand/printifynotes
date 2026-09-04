import React, { useState, useCallback, useEffect } from 'react';
import { Upload, Image as ImageIcon, Trash2, Download, GripVertical, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import jsPDF from 'jspdf';
import { ReviewModal } from '@/components/printify/ReviewModal';

interface ImageFile {
    id: string;
    file: File;
    name: string;
    preview: string;
    width: number;
    height: number;
}

type PageSize = 'a4' | 'letter' | 'a3' | 'fit';
type Orientation = 'portrait' | 'landscape' | 'auto';

export const ImageToPdf: React.FC = () => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [pageSize, setPageSize] = useState<PageSize>('a4');
    const [orientation, setOrientation] = useState<Orientation>('auto');
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [showReview, setShowReview] = useState(false);
    const [downloadCount, setDownloadCount] = useState(0);

    // Show review modal 2 seconds after successful PDF generation (once per session)
    useEffect(() => {
        if (downloadCount === 0) return;
        if (sessionStorage.getItem('pn_review_shown')) return;
        const t = setTimeout(() => setShowReview(true), 2000);
        return () => clearTimeout(t);
    }, [downloadCount]);

    const handleFileSelect = useCallback(async (selectedFiles: FileList | null) => {
        if (!selectedFiles) return;

        const newImages: ImageFile[] = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            if (file.type.startsWith('image/')) {
                const preview = URL.createObjectURL(file);

                // Get image dimensions
                const dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
                    const img = new window.Image();
                    img.onload = () => resolve({ width: img.width, height: img.height });
                    img.src = preview;
                });

                newImages.push({
                    id: `${Date.now()}-${i}`,
                    file,
                    name: file.name,
                    preview,
                    ...dimensions,
                });
            }
        }
        setImages(prev => [...prev, ...newImages]);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        handleFileSelect(e.dataTransfer.files);
    }, [handleFileSelect]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
    }, []);

    const removeImage = (id: string) => {
        const image = images.find(img => img.id === id);
        if (image) {
            URL.revokeObjectURL(image.preview);
        }
        setImages(prev => prev.filter(img => img.id !== id));
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

        const newImages = [...images];
        const draggedImage = newImages[draggedIndex];
        newImages.splice(draggedIndex, 1);
        newImages.splice(index, 0, draggedImage);
        setImages(newImages);
        setDraggedIndex(index);
    };

    const convertToPdf = async () => {
        if (images.length === 0) return;

        setIsProcessing(true);
        try {
            // Page dimensions in mm
            const pageSizes: Record<string, [number, number]> = {
                a4: [210, 297],
                letter: [215.9, 279.4],
                a3: [297, 420],
            };

            let pdf: jsPDF | null = null;

            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                const isLandscape = img.width > img.height;

                let pageWidth: number, pageHeight: number;
                let imgOrientation: 'portrait' | 'landscape';

                if (orientation === 'auto') {
                    imgOrientation = isLandscape ? 'landscape' : 'portrait';
                } else {
                    imgOrientation = orientation;
                }

                if (pageSize === 'fit') {
                    // Use image dimensions (convert px to mm at 96 DPI)
                    pageWidth = (img.width / 96) * 25.4;
                    pageHeight = (img.height / 96) * 25.4;
                } else {
                    const [w, h] = pageSizes[pageSize];
                    if (imgOrientation === 'landscape') {
                        pageWidth = h;
                        pageHeight = w;
                    } else {
                        pageWidth = w;
                        pageHeight = h;
                    }
                }

                if (i === 0) {
                    pdf = new jsPDF({
                        orientation: imgOrientation,
                        unit: 'mm',
                        format: pageSize === 'fit' ? [pageWidth, pageHeight] : pageSize,
                    });
                } else if (pdf) {
                    pdf.addPage(pageSize === 'fit' ? [pageWidth, pageHeight] : pageSize, imgOrientation);
                }

                if (pdf) {
                    // Calculate image dimensions to fit page with margins
                    const margin = 10;
                    const maxWidth = pageWidth - margin * 2;
                    const maxHeight = pageHeight - margin * 2;

                    let imgWidth = maxWidth;
                    let imgHeight = (img.height / img.width) * imgWidth;

                    if (imgHeight > maxHeight) {
                        imgHeight = maxHeight;
                        imgWidth = (img.width / img.height) * imgHeight;
                    }

                    const x = (pageWidth - imgWidth) / 2;
                    const y = (pageHeight - imgHeight) / 2;

                    pdf.addImage(img.preview, 'JPEG', x, y, imgWidth, imgHeight);
                }
            }

            if (pdf) {
                pdf.save('images-to-pdf.pdf');
                setDownloadCount(c => c + 1);
            }
        } catch (error) {
            console.error('Error converting to PDF:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
        <div className="space-y-6">
            {/* Upload Zone */}
            <div className="rounded-[28px] bg-card/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2.5 mb-2">
                    <ImageIcon className="w-5 h-5 text-accent" />
                    <h3 className="font-bold text-lg tracking-tight">Upload Images</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                    Drag and drop images (JPG, PNG, WebP) or click to browse
                </p>

                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-black/[0.1] dark:border-white/[0.12] rounded-[20px] p-8 text-center hover:border-accent/40 hover:bg-accent/5 transition-all cursor-pointer"
                >
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="hidden"
                        id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer block">
                        <div className="w-12 h-12 rounded-[16px] bg-accent/10 flex items-center justify-center mx-auto mb-3 text-accent">
                            <Plus className="w-6 h-6" />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                            Drop images here or <span className="text-accent underline underline-offset-2">browse</span>
                        </p>
                    </label>
                </div>
            </div>

            {/* Settings */}
            <div className="rounded-[28px] bg-card/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2.5 mb-5">
                    <Settings className="w-5 h-5 text-accent" />
                    <h3 className="font-bold text-lg tracking-tight">PDF Settings</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold tracking-tight">Page Size</Label>
                        <Select value={pageSize} onValueChange={(v) => setPageSize(v as PageSize)}>
                            <SelectTrigger className="rounded-[12px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-[16px]">
                                <SelectItem value="a4">A4</SelectItem>
                                <SelectItem value="letter">Letter</SelectItem>
                                <SelectItem value="a3">A3</SelectItem>
                                <SelectItem value="fit">Fit to Image</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold tracking-tight">Orientation</Label>
                        <Select value={orientation} onValueChange={(v) => setOrientation(v as Orientation)}>
                            <SelectTrigger className="rounded-[12px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-[16px]">
                                <SelectItem value="auto">Auto-detect</SelectItem>
                                <SelectItem value="portrait">Portrait</SelectItem>
                                <SelectItem value="landscape">Landscape</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Image Preview Grid */}
            {images.length > 0 && (
                <div className="rounded-[28px] bg-card/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] p-6 sm:p-8 shadow-sm">
                    <div className="mb-5">
                        <h3 className="font-bold text-lg tracking-tight">Selected Images ({images.length})</h3>
                        <p className="text-sm text-muted-foreground">Drag to reorder</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                        {images.map((image, index) => (
                            <div
                                key={image.id}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragEnd={handleDragEnd}
                                onDragOver={(e) => handleDragOverItem(e, index)}
                                className={`relative group rounded-[16px] overflow-hidden border border-black/[0.08] dark:border-white/[0.1] bg-card shadow-sm ${draggedIndex === index ? 'opacity-50' : ''}`}
                            >
                                <img
                                    src={image.preview}
                                    alt={image.name}
                                    className="w-full aspect-square object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <GripVertical className="w-5 h-5 text-white cursor-grab" />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeImage(image.id)}
                                        className="w-8 h-8 rounded-[10px] text-white hover:text-destructive hover:bg-white/20 active:scale-[0.92]"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md text-foreground text-xs p-1.5 truncate border-t border-black/[0.06] dark:border-white/[0.08] font-medium">
                                    {index + 1}. {image.name}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Button
                            onClick={convertToPdf}
                            disabled={images.length === 0 || isProcessing}
                            className="flex-1 rounded-[14px] bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-sm active:scale-[0.96]"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            {isProcessing ? 'Converting...' : `Convert ${images.length} Images to PDF`}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                images.forEach(img => URL.revokeObjectURL(img.preview));
                                setImages([]);
                            }}
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

