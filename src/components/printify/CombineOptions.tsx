import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

  return (
    <div className="border border-border rounded-lg p-4 bg-card space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <LayoutGrid className="w-4 h-4 text-muted-foreground" />
        <h3 className="font-medium text-foreground text-sm">Layout Options</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm">Pages per Sheet</Label>
          <Select
            value={settings.pagesPerSheet.toString()}
            onValueChange={(value) => updateSetting('pagesPerSheet', parseInt(value) as 1 | 2 | 4)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 page</SelectItem>
              <SelectItem value="2">2 pages</SelectItem>
              <SelectItem value="3">3 pages</SelectItem>
              <SelectItem value="4">4 pages</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Orientation</Label>
          <Select
            value={settings.orientation}
            onValueChange={(value) => updateSetting('orientation', value as 'portrait' | 'landscape')}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="landscape">Landscape</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Margins</Label>
          <Select
            value={settings.marginSize}
            onValueChange={(value) => updateSetting('marginSize', value as 'small' | 'medium' | 'large')}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Spacing</Label>
          <Select
            value={settings.spacing}
            onValueChange={(value) => updateSetting('spacing', value as 'none' | 'small' | 'medium')}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
