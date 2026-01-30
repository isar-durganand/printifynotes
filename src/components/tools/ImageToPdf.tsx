import React, { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, Trash2, Download, GripVertical, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import jsPDF from 'jspdf';

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
            }
        } catch (error) {
            console.error('Error converting to PDF:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Upload Zone */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-emerald-500" />
                        Upload Images
                    </CardTitle>
                    <CardDescription>
                        Drag and drop images (JPG, PNG, WebP) or click to browse
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
                            accept="image/*"
                            onChange={(e) => handleFileSelect(e.target.files)}
                            className="hidden"
                            id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                            <Plus className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">
                                Drop images here or <span className="text-emerald-500">browse</span>
                            </p>
                        </label>
                    </div>
                </CardContent>
            </Card>

            {/* Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        PDF Settings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Page Size</Label>
                            <Select value={pageSize} onValueChange={(v) => setPageSize(v as PageSize)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="a4">A4</SelectItem>
                                    <SelectItem value="letter">Letter</SelectItem>
                                    <SelectItem value="a3">A3</SelectItem>
                                    <SelectItem value="fit">Fit to Image</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Orientation</Label>
                            <Select value={orientation} onValueChange={(v) => setOrientation(v as Orientation)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="auto">Auto-detect</SelectItem>
                                    <SelectItem value="portrait">Portrait</SelectItem>
                                    <SelectItem value="landscape">Landscape</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Image Preview Grid */}
            {images.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Selected Images ({images.length})</CardTitle>
                        <CardDescription>Drag to reorder</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {images.map((image, index) => (
                                <div
                                    key={image.id}
                                    draggable
                                    onDragStart={() => handleDragStart(index)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={(e) => handleDragOverItem(e, index)}
                                    className={`relative group rounded-lg overflow-hidden border bg-card ${draggedIndex === index ? 'opacity-50' : ''
                                        }`}
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
                                            className="text-white hover:text-destructive hover:bg-white/20"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 truncate">
                                        {index + 1}. {image.name}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex gap-3">
                            <Button
                                onClick={convertToPdf}
                                disabled={images.length === 0 || isProcessing}
                                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
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
