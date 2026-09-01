import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
    <div className="rounded-xl liquid-glass overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02] relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
        <LayoutGrid className="w-4 h-4 text-emerald-400" />
        <h3 className="font-semibold text-foreground text-sm tracking-tight relative z-10">Layout Options</h3>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <Label className="text-sm">Pages per Sheet</Label>
          <Select
            value={settings.pagesPerSheet.toString()}
            onValueChange={(value) => updateSetting('pagesPerSheet', parseInt(value) as 1 | 2 | 3 | 4)}
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

        {/* Page Border toggle — only useful when combining multiple pages */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="min-w-0">
            <Label htmlFor="pageBorder" className="text-sm font-medium cursor-pointer">
              Page Border
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">Thin border around each page</p>
          </div>
          <Switch
            id="pageBorder"
            checked={settings.pageBorder}
            onCheckedChange={(v) => updateSetting('pageBorder', v)}
          />
        </div>
      </div>
    </div>
  );
}
