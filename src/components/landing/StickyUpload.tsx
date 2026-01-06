import React, { useCallback, useState } from 'react';
import { Upload, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface StickyUploadProps {
    onFileSelect: (file: File) => void;
    isLoading: boolean;
    progress: number;
}

export const StickyUpload = ({ onFileSelect, isLoading, progress }: StickyUploadProps) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file && file.type === 'application/pdf') {
                onFileSelect(file);
            }
        },
        [onFileSelect]
    );

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                onFileSelect(file);
            }
        },
        [onFileSelect]
    );

    if (isLoading) {
        return (
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
                <div className="w-72 rounded-2xl bg-card/95 backdrop-blur-xl border border-border p-6 shadow-2xl shadow-black/40">
                    <div className="flex flex-col items-center gap-4">
                        <div className="p-3 rounded-full bg-emerald-500/10">
                            <FileText className="w-8 h-8 text-emerald-500 animate-pulse" />
                        </div>
                        <div className="w-full space-y-2">
                            <Progress value={progress} className="h-2" />
                            <p className="text-sm text-center text-muted-foreground">
                                Processing... {progress}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          w-72 rounded-2xl bg-card/95 backdrop-blur-xl border shadow-2xl shadow-black/40 transition-all duration-300
          ${isDragging
                        ? 'border-emerald-500 bg-emerald-500/5 scale-105'
                        : 'border-border hover:border-muted-foreground'
                    }
        `}
            >
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="sticky-pdf-upload"
                />
                <label htmlFor="sticky-pdf-upload" className="cursor-pointer block p-6">
                    <div className="flex flex-col items-center gap-4">
                        {/* Decorative top */}
                        <div className="flex items-center gap-2 text-emerald-500">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-xs font-medium uppercase tracking-wider">Quick Convert</span>
                            <Sparkles className="w-4 h-4" />
                        </div>

                        {/* Upload icon */}
                        <div className={`
              p-4 rounded-2xl transition-all duration-300
              ${isDragging ? 'bg-emerald-500/20' : 'bg-secondary'}
            `}>
                            <Upload className={`w-8 h-8 ${isDragging ? 'text-emerald-500' : 'text-muted-foreground'}`} />
                        </div>

                        {/* Text */}
                        <div className="text-center">
                            <p className="font-medium text-foreground mb-1">
                                Drop your PDF here
                            </p>
                            <p className="text-xs text-muted-foreground">
                                or click to browse
                            </p>
                        </div>

                        {/* CTA Button */}
                        <Button size="sm" className="w-full rounded-full gap-2 mt-2">
                            Select File
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </label>
            </div>
        </div>
    );
};
