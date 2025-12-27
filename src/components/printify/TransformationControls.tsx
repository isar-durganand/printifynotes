import React from 'react';
import { Sun, Moon, Contrast, Palette, Eye } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { TransformationSettings } from '@/types/printify';

interface TransformationControlsProps {
  settings: TransformationSettings;
  onChange: (settings: TransformationSettings) => void;
}

export function TransformationControls({ settings, onChange }: TransformationControlsProps) {
  const updateSetting = <K extends keyof TransformationSettings>(
    key: K,
    value: TransformationSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="glass-card rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-border/50">
        <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
          <Palette className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Transformations</h3>
          <p className="text-sm text-muted-foreground">Optimize for printing</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 glass-button rounded-lg">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-primary" />
            <div>
              <Label htmlFor="invert" className="text-sm font-medium">
                Invert Colors
              </Label>
              <p className="text-xs text-muted-foreground">Dark → Light conversion</p>
            </div>
          </div>
          <Switch
            id="invert"
            checked={settings.invertColors}
            onCheckedChange={(checked) => updateSetting('invertColors', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-3 glass-button rounded-lg">
          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5 text-primary" />
            <div>
              <Label htmlFor="white-bg" className="text-sm font-medium">
                Force White Background
              </Label>
              <p className="text-xs text-muted-foreground">Clean, paper-ready output</p>
            </div>
          </div>
          <Switch
            id="white-bg"
            checked={settings.forceWhiteBackground}
            onCheckedChange={(checked) => updateSetting('forceWhiteBackground', checked)}
          />
        </div>

        <div className="flex items-center justify-between p-3 glass-button rounded-lg">
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-primary" />
            <div>
              <Label htmlFor="grayscale" className="text-sm font-medium">
                Grayscale Mode
              </Label>
              <p className="text-xs text-muted-foreground">Maximum ink savings</p>
            </div>
          </div>
          <Switch
            id="grayscale"
            checked={settings.grayscale}
            onCheckedChange={(checked) => updateSetting('grayscale', checked)}
          />
        </div>
      </div>

      <div className="space-y-6 pt-4 border-t border-border/50">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-primary" />
              <Label className="text-sm font-medium">Brightness</Label>
            </div>
            <span className="text-sm font-mono text-primary">
              {settings.brightness}%
            </span>
          </div>
          <Slider
            value={[settings.brightness]}
            onValueChange={([value]) => updateSetting('brightness', value)}
            min={50}
            max={150}
            step={5}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Contrast className="w-4 h-4 text-primary" />
              <Label className="text-sm font-medium">Contrast</Label>
            </div>
            <span className="text-sm font-mono text-primary">
              {settings.contrast}%
            </span>
          </div>
          <Slider
            value={[settings.contrast]}
            onValueChange={([value]) => updateSetting('contrast', value)}
            min={50}
            max={150}
            step={5}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
