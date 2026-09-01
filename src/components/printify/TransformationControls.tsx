import React, { useEffect } from 'react';
import { Settings, Sparkles, Sun, Contrast, Undo2, Redo2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import type { TransformationSettings } from '@/types/printify';

interface TransformationControlsProps {
  settings: TransformationSettings;
  onChange: (settings: TransformationSettings) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function TransformationControls({ settings, onChange, onUndo, onRedo, canUndo, canRedo }: TransformationControlsProps) {
  const updateSetting = <K extends keyof TransformationSettings>(
    key: K,
    value: TransformationSettings[K]
  ) => {
    onChange({ ...settings, [key]: value });
  };

  // Keyboard shortcuts: Ctrl+Z = undo, Ctrl+Y / Ctrl+Shift+Z = redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          onUndo();
        } else if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
          e.preventDefault();
          onRedo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUndo, onRedo]);

  return (
    <div className="rounded-xl liquid-glass overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02] relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
        <Settings className="w-4 h-4 text-emerald-400" />
        <h3 className="font-semibold text-foreground text-sm tracking-tight relative z-10">Transformations</h3>
        {/* Undo / Redo buttons */}
        <div className="ml-auto flex items-center gap-1 relative z-10">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-lg hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Undo2 className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            className="p-1.5 rounded-lg hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Redo2 className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Toggle switches */}
        <div className="space-y-3">
          <ToggleRow
            id="invert"
            label="Invert Colors"
            description="Flip dark → light"
            checked={settings.invertColors}
            onCheckedChange={(v) => updateSetting('invertColors', v)}
          />
          <ToggleRow
            id="whiteBg"
            label="Force White Background"
            description="Snap near-white pixels to pure white"
            checked={settings.forceWhiteBackground}
            onCheckedChange={(v) => updateSetting('forceWhiteBackground', v)}
          />
          <ToggleRow
            id="grayscale"
            label="Grayscale"
            description="Maximum ink savings"
            checked={settings.grayscale}
            onCheckedChange={(v) => updateSetting('grayscale', v)}
          />
        </div>

        <div className="border-t border-border/60" />

        {/* Sliders */}
        <div className="space-y-4">
          <SliderRow
            icon={Sun}
            label="Brightness"
            value={settings.brightness}
            min={50}
            max={150}
            step={5}
            onChange={(v) => updateSetting('brightness', v)}
          />
          <SliderRow
            icon={Contrast}
            label="Contrast"
            value={settings.contrast}
            min={50}
            max={150}
            step={5}
            onChange={(v) => updateSetting('contrast', v)}
          />
          <SliderRow
            icon={Sparkles}
            label="Edge Enhancement"
            value={settings.edgeEnhancement}
            min={0}
            max={100}
            step={10}
            onChange={(v) => updateSetting('edgeEnhancement', v)}
            hint="Sharpens text for clearer prints"
          />
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <Label htmlFor={id} className="text-sm font-medium cursor-pointer">{label}</Label>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function SliderRow({
  icon: Icon,
  label,
  value,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-muted-foreground" />
          <Label className="text-sm font-medium">{label}</Label>
        </div>
        <span className="text-xs font-mono text-emerald-500 tabular-nums">{value}%</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
