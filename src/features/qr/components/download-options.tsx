"use client";

import { useState } from "react";
import {
  FORMAT_OPTIONS,
  MAX_SIZE,
  MIN_SIZE,
  SIZE_PRESETS,
  type ExportSettings,
} from "../lib/export-options";

type DownloadOptionsProps = {
  settings: ExportSettings;
  onChange: (settings: ExportSettings) => void;
  disabled?: boolean;
  onDownload: () => void;
};

const pillBase =
  "cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium transition focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-40";
const pillActive = "border-indigo-600 bg-indigo-600 text-white shadow-sm";
const pillIdle =
  "border-slate-300 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50";

export function DownloadOptions({
  settings,
  onChange,
  disabled,
  onDownload,
}: DownloadOptionsProps) {
  const [draft, setDraft] = useState(String(settings.size));

  const current =
    FORMAT_OPTIONS.find((f) => f.value === settings.format) ??
    FORMAT_OPTIONS[0];

  const commitSize = (size: number) => {
    setDraft(String(size));
    onChange({ ...settings, size });
  };

  const handleDraftChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    setDraft(digits);

    const n = Number(digits);
    if (digits && n >= MIN_SIZE && n <= MAX_SIZE) {
      onChange({ ...settings, size: n });
    }
  };

  const handleBlur = () => {
    const n = Number(draft);
    const base = Number.isFinite(n) && n > 0 ? n : settings.size;
    commitSize(Math.min(MAX_SIZE, Math.max(MIN_SIZE, base)));
  };

  const buttonLabel = current.vector
    ? `Descargar ${current.label}`
    : `Descargar ${current.label} · ${settings.size} × ${settings.size} px`;

  return (
    <details className="group w-full rounded-xl border border-slate-200 bg-slate-50">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 [&::-webkit-details-marker]:hidden">
        Configuración avanzada
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 transition group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>

      <div className="flex flex-col gap-5 border-t border-slate-200 p-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Formato</span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Formato">
            {FORMAT_OPTIONS.map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={f.value === settings.format}
                onClick={() => onChange({ ...settings, format: f.value })}
                className={`${pillBase} ${
                  f.value === settings.format ? pillActive : pillIdle
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500">{current.hint}</p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">Tamaño</span>

          {current.vector ? (
            <p className="text-xs text-slate-500">
              El SVG no depende de un tamaño en píxeles: se ve nítido al
              ampliarlo todo lo que necesites.
            </p>
          ) : (
            <>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Tamaño"
              >
                {SIZE_PRESETS.map((size) => (
                  <button
                    key={size}
                    type="button"
                    aria-pressed={size === settings.size}
                    onClick={() => commitSize(size)}
                    className={`${pillBase} ${
                      size === settings.size ? pillActive : pillIdle
                    }`}
                  >
                    {size} px
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="qr-export-size"
                  className="text-xs text-slate-600"
                >
                  Tamaño personalizado (entre {MIN_SIZE} y {MAX_SIZE} px)
                </label>
                <input
                  id="qr-export-size"
                  type="text"
                  inputMode="numeric"
                  value={draft}
                  onChange={(e) => handleDraftChange(e.target.value)}
                  onBlur={handleBlur}
                  className="w-32 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {settings.size > 2048 && (
                <p className="text-xs text-amber-700">
                  Los tamaños grandes pueden tardar o fallar en celulares con
                  poca memoria.
                </p>
              )}
            </>
          )}
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={onDownload}
          className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {buttonLabel}
        </button>
      </div>
    </details>
  );
}