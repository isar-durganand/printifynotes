import React, { useCallback } from 'react';
import { Upload, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  progress: number;
}

export function UploadZone({ onFileSelect, isLoading, progress }: UploadZoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);

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

  const handleFileInput = useCallback(
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
      <div className="flex flex-col items-center justify-center p-12 bg-card rounded-2xl border-2 border-dashed border-primary/30 shadow-md">
        <div className="relative w-24 h-24 mb-6">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeDasharray={`${progress * 2.51} 251`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-foreground">{progress}%</span>
          </div>
        </div>
        <p className="text-lg font-medium text-foreground">Loading your PDF...</p>
        <p className="text-sm text-muted-foreground mt-2">Extracting pages for preview</p>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative flex flex-col items-center justify-center p-12 bg-card rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg',
        isDragging
          ? 'border-primary bg-primary/5 scale-[1.02]'
          : 'border-muted-foreground/30 hover:border-primary/50'
      )}
    >
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div
        className={cn(
          'w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300',
          isDragging ? 'bg-primary text-primary-foreground scale-110' : 'bg-primary/10 text-primary'
        )}
      >
        {isDragging ? (
          <FileText className="w-10 h-10 animate-bounce-soft" />
        ) : (
          <Upload className="w-10 h-10" />
        )}
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2">
        {isDragging ? 'Drop your PDF here!' : 'Upload your PDF'}
      </h3>
      <p className="text-muted-foreground text-center max-w-sm">
        Drag & drop your dark-background notes here, or click to browse
      </p>

      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <FileText className="w-4 h-4" />
        <span>PDF files only • Processed locally for privacy</span>
      </div>
    </div>
  );
}
