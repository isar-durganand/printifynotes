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
      <div className="flex flex-col items-center justify-center p-12 glass-card rounded-2xl animate-fade-in">
        <div className="relative w-24 h-24 mb-6">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="6"
              strokeDasharray={`${progress * 2.51} 251`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold gradient-text">{progress}%</span>
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
        'relative flex flex-col items-center justify-center p-12 glass-card rounded-2xl cursor-pointer transition-all duration-300',
        isDragging
          ? 'border-primary/50 glow scale-[1.02]'
          : 'hover:border-primary/30'
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
          isDragging 
            ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground scale-110 glow animate-float' 
            : 'bg-gradient-to-br from-primary/20 to-secondary/20 text-primary'
        )}
      >
        {isDragging ? (
          <FileText className="w-10 h-10" />
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

      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground glass-button px-4 py-2 rounded-full">
        <FileText className="w-4 h-4" />
        <span>PDF files only • Processed locally for privacy</span>
      </div>
    </div>
  );
}
