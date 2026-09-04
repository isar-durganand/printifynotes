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
                <div className="w-72 rounded-[24px] bg-card/90 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] shadow-lg p-6">
                    <div className="flex flex-col items-center gap-4 relative z-10">
                        <div className="p-3 rounded-[16px] bg-accent/10 border border-accent/20">
                            <FileText className="w-8 h-8 text-accent animate-pulse" />
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
                    w-72 rounded-[24px] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                    bg-card/90 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] shadow-lg
                    ${isDragging ? 'scale-[1.02] border-accent shadow-accent/20' : 'hover:shadow-xl'}
                `}
            >
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
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Quick Convert</span>

                        {/* Upload icon */}
                        <div className={`
                            p-4 rounded-[18px] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                            ${isDragging
                                ? 'bg-accent/15 border border-accent/30'
                                : 'bg-foreground/[0.04] border border-black/[0.06] dark:border-white/[0.08]'
                            }
                        `}>
                            <Upload className={`w-8 h-8 transition-colors duration-[400ms] ${isDragging ? 'text-accent' : 'text-muted-foreground'}`} />
                        </div>

                        {/* Text */}
                        <div className="text-center">
                            <p className="font-semibold text-foreground mb-1 text-[15px] tracking-tight">
                                Drop your file here
                            </p>
                            <p className="text-xs text-muted-foreground">
                                PDF · JPG · PNG · WEBP
                            </p>
                        </div>

                        {/* CTA Button */}
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-[12px] text-sm font-semibold bg-accent text-accent-foreground shadow-sm transition-all duration-200 active:scale-[0.96]">
                            Select File
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </label>
            </div>
        </div>
    );
};

