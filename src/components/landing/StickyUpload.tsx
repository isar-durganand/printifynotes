import React, { useCallback, useState } from 'react';
import { Upload, FileText, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StickyUploadProps {
    onFileSelect: (file: File) => void;
    onFilesSelect?: (files: File[]) => void;
    isLoading: boolean;
    progress: number;
}

export const StickyUpload = ({ onFileSelect, onFilesSelect, isLoading, progress }: StickyUploadProps) => {
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
            const files = Array.from(e.dataTransfer.files);
            const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            const validFiles = files.filter(f => allowed.includes(f.type));
            
            if (validFiles.length > 0) {
                if (onFilesSelect) {
                    onFilesSelect(validFiles);
                } else {
                    onFileSelect(validFiles[0]);
                }
            }
        },
        [onFileSelect, onFilesSelect]
    );

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files || []);
            const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            const validFiles = files.filter(f => allowed.includes(f.type));
            
            if (validFiles.length > 0) {
                if (onFilesSelect) {
                    onFilesSelect(validFiles);
                } else {
                    onFileSelect(validFiles[0]);
                }
            }
        },
        [onFileSelect, onFilesSelect]
    );

    if (isLoading) {
        return (
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
                <div className="w-72 rounded-2xl liquid-glass-elevated p-6">
                    <div className="flex flex-col items-center gap-4 relative z-10">
                        <div className="p-3 rounded-xl bg-[hsl(var(--accent-highlight)/0.1)] border border-[hsl(var(--accent-highlight)/0.15)]">
                            <FileText className="w-8 h-8 text-[hsl(var(--accent-highlight))] animate-pulse" />
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
                    w-72 rounded-2xl transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isDragging
                        ? 'liquid-glass-elevated scale-[1.02]'
                        : 'liquid-glass-elevated'
                    }
                `}
            >
                {/* Accent border on drag */}
                {isDragging && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-[hsl(var(--accent-highlight)/0.3)] pointer-events-none z-20" />
                )}

                <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.webp,.gif"
                    multiple={!!onFilesSelect}
                    onChange={handleFileChange}
                    className="hidden"
                    id="sticky-pdf-upload"
                />
                <label htmlFor="sticky-pdf-upload" className="cursor-pointer block p-6 relative z-10">
                    <div className="flex flex-col items-center gap-4">
                        {/* Label */}
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Quick Convert</span>

                        {/* Upload icon */}
                        <div className={`
                            p-4 rounded-2xl transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                            ${isDragging
                                ? 'bg-[hsl(var(--accent-highlight)/0.08)] border border-[hsl(var(--accent-highlight)/0.15)]'
                                : 'bg-foreground/[0.04] border border-foreground/[0.06]'
                            }
                        `}>
                            <Upload className={`w-8 h-8 transition-colors duration-[400ms] ${isDragging ? 'text-[hsl(var(--accent-highlight))]' : 'text-muted-foreground'}`} />
                        </div>

                        {/* Text */}
                        <div className="text-center">
                            <p className="font-medium text-foreground mb-1">
                                Drop your file here
                            </p>
                            <p className="text-xs text-muted-foreground">
                                PDF · JPG · PNG · WEBP
                            </p>
                        </div>

                        {/* CTA Button */}
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-[hsl(var(--accent-highlight))] text-white border-t border-l border-white/20 border-b border-r border-black/5 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02]">
                            Select File
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </label>
            </div>
        </div>
    );
};
