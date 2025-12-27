import React, { useCallback, useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  progress: number;
}

export function UploadZone({ onFileSelect, isLoading, progress }: UploadZoneProps) {
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
      <div className="border border-border rounded-lg p-8 bg-card">
        <div className="flex flex-col items-center gap-4">
          <FileText className="w-10 h-10 text-muted-foreground" />
          <div className="w-full max-w-xs space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-muted-foreground">
              Processing PDF... {progress}%
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragging 
          ? 'border-primary bg-primary/5' 
          : 'border-border hover:border-muted-foreground'
        }
      `}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        id="pdf-upload"
      />
      <label htmlFor="pdf-upload" className="cursor-pointer">
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-secondary">
            <Upload className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              Drop your PDF here or click to browse
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              PDF files only
            </p>
          </div>
        </div>
      </label>
    </div>
  );
}
