import React, { useCallback, useState } from 'react';
import { Upload, FileText, ArrowRight, Sparkles } from 'lucide-react';
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
                <div className="w-72 rounded-2xl liquid-glass-strong p-6">
                    {/* Top highlight */}
                    <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/[0.1] to-transparent pointer-events-none" />
                    
                    <div className="flex flex-col items-center gap-4 relative z-10">
                        <div className="p-3 rounded-xl bg-emerald-500/[0.1] border border-emerald-500/20">
                            <FileText className="w-8 h-8 text-emerald-400 animate-pulse" />
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
                    w-72 rounded-2xl transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${isDragging
                        ? 'liquid-glass-strong scale-[1.03] shadow-[0_16px_64px_rgba(0,0,0,0.4),0_0_30px_rgba(16,185,129,0.15)]'
                        : 'liquid-glass-strong hover:shadow-[0_16px_64px_rgba(0,0,0,0.4),0_0_20px_rgba(16,185,129,0.08)]'
                    }
                `}
            >
                {/* Top highlight */}
                <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/[0.1] to-transparent pointer-events-none" />
                
                {/* Glow border on drag */}
                {isDragging && (
                    <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-emerald-500/40 via-cyan-500/20 to-emerald-500/40 pointer-events-none" style={{
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                        padding: '1.5px',
                    }} />
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
                        {/* Decorative top */}
                        <div className="flex items-center gap-2 text-emerald-400">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Quick Convert</span>
                            <Sparkles className="w-4 h-4" />
                        </div>

                        {/* Upload icon — frosted glass */}
                        <div className={`
                            p-4 rounded-2xl transition-all duration-400
                            ${isDragging
                                ? 'bg-emerald-500/[0.12] border border-emerald-500/25 shadow-[0_0_24px_rgba(16,185,129,0.15)]'
                                : 'bg-white/[0.04] border border-white/[0.08]'
                            }
                        `}>
                            <Upload className={`w-8 h-8 transition-colors duration-300 ${isDragging ? 'text-emerald-400' : 'text-muted-foreground'}`} />
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

                        {/* CTA Button — glass emerald */}
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border border-emerald-400/30 shadow-[0_0_16px_rgba(16,185,129,0.2)] hover:shadow-[0_0_24px_rgba(16,185,129,0.3)] transition-all duration-300">
                            Select File
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </label>
            </div>
        </div>
    );
};
