import React, { useCallback, useState } from 'react';
import { Upload, FileText, Image, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  onFilesSelect?: (files: File[]) => void;
  isLoading: boolean;
  progress: number;
}

const ACCEPTED_TYPES = {
  'application/pdf': true,
  'image/jpeg': true,
  'image/png': true,
  'image/webp': true,
  'image/gif': true,
};

const ACCEPT_STRING = '.pdf,.jpg,.jpeg,.png,.webp,.gif';

const FILE_CHIPS = ['PDF', 'JPG', 'PNG', 'WEBP'];

export function UploadZone({ onFileSelect, onFilesSelect, isLoading, progress }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [typeError, setTypeError] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setTypeError(false);
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
      const validFiles = files.filter(f => ACCEPTED_TYPES[f.type as keyof typeof ACCEPTED_TYPES]);
      
      if (validFiles.length > 0) {
        setTypeError(false);
        if (onFilesSelect) {
          onFilesSelect(validFiles);
        } else {
          onFileSelect(validFiles[0]);
        }
      } else if (files.length > 0) {
        setTypeError(true);
      }
    },
    [onFileSelect, onFilesSelect]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const validFiles = files.filter(f => ACCEPTED_TYPES[f.type as keyof typeof ACCEPTED_TYPES]);
      
      if (validFiles.length > 0) {
        setTypeError(false);
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
      <div className="rounded-[24px] bg-card/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] p-10">
        <div className="flex flex-col items-center gap-5 relative z-10">
          <div className="p-4 rounded-[18px] bg-accent/10 border border-accent/20">
            <FileText className="w-8 h-8 text-accent animate-pulse" />
          </div>
          <div className="w-full max-w-sm space-y-3">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-muted-foreground">
              Processing… {progress}%
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative rounded-[24px] border-2 border-dashed transition-all duration-300 cursor-pointer
          ${isDragging
            ? 'border-accent bg-accent/5 scale-[1.01]'
            : typeError
              ? 'border-destructive/50 bg-destructive/[0.04]'
              : 'border-black/[0.1] dark:border-white/[0.12] bg-card/60 backdrop-blur-xl hover:border-accent/40 hover:bg-card/80'
          }
        `}
      >
        <input
          type="file"
          accept={ACCEPT_STRING}
          multiple={!!onFilesSelect}
          onChange={handleFileChange}
          className="hidden"
          id="pdf-upload"
        />
        <label htmlFor="pdf-upload" className="cursor-pointer block p-10 sm:p-14">
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Icon area */}
            <div className={`
              p-4.5 rounded-[20px] transition-all duration-300
              ${isDragging
                ? 'border border-accent/30 bg-accent/15 scale-110'
                : 'border border-black/[0.06] dark:border-white/[0.08] bg-foreground/[0.04]'
              }
            `}>
              {isDragging
                ? <Upload className="w-8 h-8 text-accent" />
                : <Upload className="w-8 h-8 text-muted-foreground" />
              }
            </div>

            {/* Text */}
            <div>
              <p className="text-lg font-bold text-foreground mb-1 tracking-tight">
                {isDragging ? 'Release to upload' : 'Drop your notes or PDF here'}
              </p>
              <p className="text-sm text-muted-foreground">
                or{' '}
                <span className="text-accent font-semibold underline underline-offset-2">
                  browse files
                </span>
              </p>
            </div>

            {/* Accepted file type chips */}
            <div className="flex items-center gap-2 flex-wrap justify-center pt-2">
              {FILE_CHIPS.map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[10px] bg-background/80 border border-black/[0.06] dark:border-white/[0.08] text-xs font-semibold text-muted-foreground"
                >
                  {type === 'PDF'
                    ? <FileText className="w-3.5 h-3.5 text-accent" />
                    : <Image className="w-3.5 h-3.5 text-accent" />
                  }
                  {type}
                </span>
              ))}
            </div>
          </div>
        </label>
      </div>

      {/* Error message */}
      {typeError && (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-[14px] border border-destructive/30 bg-destructive/10">
          <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
          <p className="text-sm text-destructive font-medium">
            Unsupported file type. Please use PDF, JPG, PNG, or WEBP.
          </p>
        </div>
      )}
    </div>
  );
}

