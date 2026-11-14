'use client';

import React, { useId } from "react";
import type { CSSProperties } from "react";

interface ControlSliderProps {
  label: string;
  symbol: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}

export function ControlSlider({ label, symbol, value, min, max, step, format, onChange }: ControlSliderProps) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="py-4">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-fg">
          {label}
          <span className="ml-2 font-mono text-[11px] text-muted">{symbol}</span>
        </label>
        <output htmlFor={id} className="font-mono text-sm tabular-nums text-fg">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="kinetic-range mt-2"
        style={{ "--fill": `${pct}%` } as CSSProperties}
      />
    </div>
  );
}
