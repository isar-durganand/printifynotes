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
    <div className="rounded-[24px] bg-card/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-black/[0.08] dark:border-white/[0.1] bg-foreground/[0.02] relative">
        <LayoutGrid className="w-4 h-4 text-accent" />
        <h3 className="font-semibold text-foreground text-sm tracking-tight relative z-10">Layout Options</h3>
      </div>

      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold tracking-tight">Pages per Sheet</Label>
          <Select
            value={settings.pagesPerSheet.toString()}
            onValueChange={(value) => updateSetting('pagesPerSheet', parseInt(value) as 1 | 2 | 3 | 4)}
          >
            <SelectTrigger className="rounded-[12px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-[16px]">
              <SelectItem value="1">1 page</SelectItem>
              <SelectItem value="2">2 pages</SelectItem>
              <SelectItem value="3">3 pages</SelectItem>
              <SelectItem value="4">4 pages</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold tracking-tight">Orientation</Label>
          <Select
            value={settings.orientation}
            onValueChange={(value) => updateSetting('orientation', value as 'portrait' | 'landscape')}
          >
            <SelectTrigger className="rounded-[12px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-[16px]">
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="landscape">Landscape</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold tracking-tight">Margins</Label>
          <Select
            value={settings.marginSize}
            onValueChange={(value) => updateSetting('marginSize', value as 'small' | 'medium' | 'large')}
          >
            <SelectTrigger className="rounded-[12px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-[16px]">
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold tracking-tight">Spacing</Label>
          <Select
            value={settings.spacing}
            onValueChange={(value) => updateSetting('spacing', value as 'none' | 'small' | 'medium')}
          >
            <SelectTrigger className="rounded-[12px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-[16px]">
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Page Border toggle */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="min-w-0">
            <Label htmlFor="pageBorder" className="text-sm font-semibold cursor-pointer tracking-tight">
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

