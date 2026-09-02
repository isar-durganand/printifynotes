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
      <div className="rounded-xl liquid-glass p-10">
        <div className="flex flex-col items-center gap-5 relative z-10">
          <div className="p-4 rounded-xl bg-[hsl(var(--accent-highlight)/0.08)] border border-[hsl(var(--accent-highlight)/0.15)]">
            <FileText className="w-8 h-8 text-[hsl(var(--accent-highlight))] animate-pulse" />
          </div>
          <div className="w-full max-w-sm space-y-3">
            <Progress value={progress} className="h-1.5" />
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
          relative rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer
          ${isDragging
            ? 'border-[hsl(var(--accent-highlight)/0.4)] bg-[hsl(var(--accent-highlight)/0.04)]'
            : typeError
              ? 'border-destructive/50 bg-destructive/[0.04]'
              : 'border-foreground/[0.1] bg-foreground/[0.02] hover:border-foreground/[0.18] hover:bg-foreground/[0.03]'
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
        <label htmlFor="pdf-upload" className="cursor-pointer block p-10">
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Icon area */}
            <div className={`
              p-4 rounded-xl border transition-all duration-300
              ${isDragging
                ? 'border-[hsl(var(--accent-highlight)/0.2)] bg-[hsl(var(--accent-highlight)/0.06)]'
                : 'border-foreground/[0.08] bg-foreground/[0.04]'
              }
            `}>
              {isDragging
                ? <Upload className="w-7 h-7 text-[hsl(var(--accent-highlight))]" />
                : <Upload className="w-7 h-7 text-muted-foreground" />
              }
            </div>

            {/* Text */}
            <div>
              <p className="text-base font-semibold text-foreground mb-1">
                {isDragging ? 'Release to upload' : 'Drop your file here'}
              </p>
              <p className="text-sm text-muted-foreground">
                or{' '}
                <span className="text-foreground font-medium underline underline-offset-2">
                  click to browse
                </span>
              </p>
            </div>

            {/* Accepted file type chips */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {FILE_CHIPS.map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-foreground/[0.04] border border-foreground/[0.06] text-xs font-medium text-muted-foreground"
                >
                  {type === 'PDF'
                    ? <FileText className="w-3 h-3" />
                    : <Image className="w-3 h-3" />
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
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-destructive/40 bg-destructive/10">
          <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
          <p className="text-sm text-destructive">
            Unsupported file type. Please use PDF, JPG, PNG, or WEBP.
          </p>
        </div>
      )}
    </div>
  );
}
