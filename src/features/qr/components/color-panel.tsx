"use client";

import { DEFAULT_STYLE, type QrStyle } from "../types";

type ColorPanelProps = {
  style: QrStyle;
  onChange: (style: QrStyle) => void;
};

const COLOR_FIELDS = [
  { key: "fgColor", label: "Color del código" },
  { key: "bgColor", label: "Color de fondo" },
] as const;

export function ColorPanel({ style, onChange }: ColorPanelProps) {
  const isDefault =
    style.fgColor === DEFAULT_STYLE.fgColor &&
    style.bgColor === DEFAULT_STYLE.bgColor;

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">Colores</h2>

      <div className="flex flex-wrap gap-6">
        {COLOR_FIELDS.map(({ key, label }) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-3 text-sm text-slate-700"
          >
            <input
              type="color"
              value={style[key]}
              onChange={(e) => onChange({ ...style, [key]: e.target.value })}
              className="h-11 w-14 cursor-pointer rounded-lg border border-slate-300 bg-white p-1"
            />
            <span className="flex flex-col">
              {label}
              <span className="font-mono text-xs uppercase text-slate-500">
                {style[key]}
              </span>
            </span>
          </label>
        ))}
      </div>

      <button
        type="button"
        disabled={isDefault}
        onClick={() =>
          onChange({
            ...style,
            fgColor: DEFAULT_STYLE.fgColor,
            bgColor: DEFAULT_STYLE.bgColor,
          })
        }
        className="cursor-pointer self-start text-sm font-medium text-indigo-600 hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:no-underline"
      >
        Restablecer colores
      </button>
    </section>
  );
}