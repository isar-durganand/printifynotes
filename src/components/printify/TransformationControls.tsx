import React, { useEffect } from 'react';
import { Settings, Sliders, Sun, Contrast, Undo2, Redo2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import type { TransformationSettings } from '@/types/printify';
import { DEFAULT_TRANSFORMATIONS } from '@/types/printify';

interface TransformationControlsProps {
  settings: TransformationSettings;
  onChange: (settings: TransformationSettings) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function TransformationControls({
  settings = DEFAULT_TRANSFORMATIONS,
  onChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: TransformationControlsProps) {
  const currentSettings = settings || DEFAULT_TRANSFORMATIONS;

  const updateSetting = <K extends keyof TransformationSettings>(
    key: K,
    value: TransformationSettings[K]
  ) => {
    onChange({ ...currentSettings, [key]: value });
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
    <div className="rounded-[24px] bg-card/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.1] shadow-sm overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-black/[0.08] dark:border-white/[0.1] bg-foreground/[0.02] relative">
        <Settings className="w-4 h-4 text-accent" />
        <h3 className="font-semibold text-foreground text-sm tracking-tight relative z-10">Transformations</h3>
        {/* Undo / Redo buttons */}
        <div className="ml-auto flex items-center gap-1.5 relative z-10">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-[10px] hover:bg-foreground/[0.06] active:scale-[0.92] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Undo2 className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            className="p-1.5 rounded-[10px] hover:bg-foreground/[0.06] active:scale-[0.92] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Redo2 className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Toggle switches */}
        <div className="space-y-3.5">
          <ToggleRow
            id="invert"
            label="Invert Colors"
            description="Flip dark → light"
            checked={currentSettings.invertColors ?? true}
            onCheckedChange={(v) => updateSetting('invertColors', v)}
          />
          <ToggleRow
            id="whiteBg"
            label="Force White Background"
            description="Snap near-white pixels to pure white"
            checked={currentSettings.forceWhiteBackground ?? true}
            onCheckedChange={(v) => updateSetting('forceWhiteBackground', v)}
          />
          <ToggleRow
            id="grayscale"
            label="Grayscale"
            description="Maximum ink savings"
            checked={currentSettings.grayscale ?? false}
            onCheckedChange={(v) => updateSetting('grayscale', v)}
          />
        </div>

        <div className="border-t border-black/[0.06] dark:border-white/[0.08]" />

        {/* Sliders */}
        <div className="space-y-4">
          <SliderRow
            icon={Sun}
            label="Brightness"
            value={currentSettings.brightness ?? 100}
            min={50}
            max={150}
            step={5}
            onChange={(v) => updateSetting('brightness', v)}
          />
          <SliderRow
            icon={Contrast}
            label="Contrast"
            value={currentSettings.contrast ?? 110}
            min={50}
            max={150}
            step={5}
            onChange={(v) => updateSetting('contrast', v)}
          />
          <SliderRow
            icon={Sliders}
            label="Edge Enhancement"
            value={currentSettings.edgeEnhancement ?? 30}
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
        <Label htmlFor={id} className="text-sm font-semibold cursor-pointer tracking-tight">{label}</Label>
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
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : min;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-muted-foreground" />
          <Label className="text-sm font-medium tracking-tight">{label}</Label>
        </div>
        <span className="text-xs font-mono font-semibold text-accent tabular-nums">{safeValue}%</span>
      </div>
      <Slider
        value={[safeValue]}
        onValueChange={([v]) => {
          if (typeof v === 'number' && !isNaN(v)) {
            onChange(v);
          }
        }}
        min={min}
        max={max}
        step={step}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
