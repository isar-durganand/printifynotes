import React from 'react';
import { LayoutGrid, Square, Columns, Grid2X2, RectangleHorizontal, RectangleVertical, Maximize2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { CombineSettings } from '@/types/printify';

interface CombineOptionsProps {
  settings: CombineSettings;
  onChange: (settings: CombineSettings) => void;
}

export function CombineOptions({ settings, onChange }: CombineOptionsProps) {
  const updateSetting = <K extends keyof CombineSettings>(
    key: K,
    value: CombineSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  const pagesPerSheetOptions: { value: 1 | 2 | 4; label: string; icon: React.ReactNode }[] = [
    { value: 1, label: '1 page', icon: <Square className="w-5 h-5" /> },
    { value: 2, label: '2 pages', icon: <Columns className="w-5 h-5" /> },
    { value: 4, label: '4 pages', icon: <Grid2X2 className="w-5 h-5" /> },
  ];

  const orientationOptions: { value: 'portrait' | 'landscape'; label: string; icon: React.ReactNode }[] = [
    { value: 'portrait', label: 'Portrait', icon: <RectangleVertical className="w-5 h-5" /> },
    { value: 'landscape', label: 'Landscape', icon: <RectangleHorizontal className="w-5 h-5" /> },
  ];

  const marginOptions: { value: 'small' | 'medium' | 'large'; label: string }[] = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const spacingOptions: { value: 'none' | 'small' | 'medium'; label: string }[] = [
    { value: 'none', label: 'None' },
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="p-2 bg-primary/10 rounded-lg">
          <LayoutGrid className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Page Layout</h3>
          <p className="text-sm text-muted-foreground">Combine multiple pages per sheet</p>
        </div>
      </div>

      {/* Pages per sheet */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Pages per sheet</Label>
        <div className="grid grid-cols-3 gap-2">
          {pagesPerSheetOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting('pagesPerSheet', option.value)}
              className={cn(
                'flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200',
                settings.pagesPerSheet === option.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
              )}
            >
              {option.icon}
              <span className="text-xs font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Orientation */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Orientation</Label>
        <div className="grid grid-cols-2 gap-2">
          {orientationOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting('orientation', option.value)}
              className={cn(
                'flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-200',
                settings.orientation === option.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
              )}
            >
              {option.icon}
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Margins */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Margins</Label>
        <div className="grid grid-cols-3 gap-2">
          {marginOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting('marginSize', option.value)}
              className={cn(
                'p-2 rounded-lg border-2 text-sm font-medium transition-all duration-200',
                settings.marginSize === option.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spacing (only for 2+ pages) */}
      {settings.pagesPerSheet > 1 && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Spacing between pages</Label>
          <div className="grid grid-cols-3 gap-2">
            {spacingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateSetting('spacing', option.value)}
                className={cn(
                  'p-2 rounded-lg border-2 text-sm font-medium transition-all duration-200',
                  settings.spacing === option.value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
