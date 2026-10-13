"use client";

import type { QrStyle } from "../types";
import { CORNER_STYLES, DOT_STYLES } from "../lib/style-options";

type ShapePanelProps = {
  style: QrStyle;
  onChange: (style: QrStyle) => void;
};

type OptionGroupProps<T extends string> = {
  legend: string;
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
};

function OptionGroup<T extends string>({
  legend,
  options,
  selected,
  onSelect,
}: OptionGroupProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">{legend}</span>
      <div className="flex flex-wrap gap-2" role="group" aria-label={legend}>
        {options.map((o) => {
          const active = o.value === selected;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(o.value)}
              className={`cursor-pointer rounded-lg border px-3.5 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 ${
                active
                  ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                  : "border-slate-300 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ShapePanel({ style, onChange }: ShapePanelProps) {
  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">Diseño</h2>

      <OptionGroup
        legend="Puntos"
        options={DOT_STYLES}
        selected={style.dotStyle}
        onSelect={(dotStyle) => onChange({ ...style, dotStyle })}
      />

      <OptionGroup
        legend="Esquinas"
        options={CORNER_STYLES}
        selected={style.cornerStyle}
        onSelect={(cornerStyle) => onChange({ ...style, cornerStyle })}
      />
    </section>
  );
}