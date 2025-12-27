import React from 'react';
import { Settings, Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
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
    <div className="border border-border rounded-lg p-4 bg-card space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <Settings className="w-4 h-4 text-muted-foreground" />
        <h3 className="font-medium text-foreground text-sm">Transformations</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="invert" className="text-sm">Invert Colors</Label>
          <Switch
            id="invert"
            checked={settings.invertColors}
            onCheckedChange={(checked) => updateSetting('invertColors', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="whiteBg" className="text-sm">Force White Background</Label>
          <Switch
            id="whiteBg"
            checked={settings.forceWhiteBackground}
            onCheckedChange={(checked) => updateSetting('forceWhiteBackground', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="grayscale" className="text-sm">Grayscale</Label>
          <Switch
            id="grayscale"
            checked={settings.grayscale}
            onCheckedChange={(checked) => updateSetting('grayscale', checked)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Brightness</Label>
            <span className="text-xs text-muted-foreground">{settings.brightness}%</span>
          </div>
          <Slider
            value={[settings.brightness]}
            onValueChange={([value]) => updateSetting('brightness', value)}
            min={50}
            max={150}
            step={5}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Contrast</Label>
            <span className="text-xs text-muted-foreground">{settings.contrast}%</span>
          </div>
          <Slider
            value={[settings.contrast]}
            onValueChange={([value]) => updateSetting('contrast', value)}
            min={50}
            max={150}
            step={5}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-glow" />
              <Label className="text-sm">Edge Enhancement</Label>
            </div>
            <span className="text-xs text-muted-foreground">{settings.edgeEnhancement}%</span>
          </div>
          <Slider
            value={[settings.edgeEnhancement]}
            onValueChange={([value]) => updateSetting('edgeEnhancement', value)}
            min={0}
            max={100}
            step={10}
          />
          <p className="text-xs text-muted-foreground">Sharpens text and edges for clearer prints</p>
        </div>
      </div>
    </div>
  );
}
