"use client";

import { useState } from "react";
import {
  DEFAULT_STYLE,
  QR_TYPES,
  type QrStyle,
  type QrType,
  type QrValues,
} from "../types";
import { QR_TYPE_CONFIG } from "../lib/form-config";
import { buildPayload } from "../lib/payloads";
import { downloadQr } from "../lib/export-qr";
import { EXPORT_SIZE } from "../lib/qr-options";
import {
  DEFAULT_EXPORT_SETTINGS,
  type ExportSettings,
} from "../lib/export-options";
import { QrPreview } from "./qr-preview";
import { QrForm } from "./qr-form";
import { TypeSelector } from "./type-selector";
import { ColorPanel } from "./color-panel";
import { ShapePanel } from "./shape-panel";
import { LogoPanel } from "./logo-panel";
import { ContrastWarning } from "./contrast-warning";
import { DownloadButtons, type DownloadFormat } from "./download-buttons";
import { DownloadOptions } from "./download-options";

type AllValues = Record<QrType, QrValues>;

const initialValues = Object.fromEntries(
  QR_TYPES.map((t) => [t, QR_TYPE_CONFIG[t].defaults]),
) as AllValues;

export function QrGenerator() {
  const [type, setType] = useState<QrType>("url");
  const [allValues, setAllValues] = useState<AllValues>(initialValues);
  const [style, setStyle] = useState<QrStyle>(DEFAULT_STYLE);
  const [exportSettings, setExportSettings] = useState<ExportSettings>(
    DEFAULT_EXPORT_SETTINGS,
  );

  const payload = buildPayload(type, allValues[type]);

  const handleChange = (name: string, value: string) => {
    setAllValues((prev) => ({
      ...prev,
      [type]: { ...prev[type], [name]: value },
    }));
  };

  // Botones rápidos: PNG o SVG con el tamaño por defecto
  const handleQuickDownload = async (format: DownloadFormat) => {
    if (!payload) return;
    await downloadQr(payload, style, { format, size: EXPORT_SIZE });
  };

  // Configuración avanzada: el formato y tamaño elegidos
  const handleAdvancedDownload = async () => {
    if (!payload) return;
    await downloadQr(payload, style, exportSettings);
  };

  return (
    <div className="flex flex-col gap-8">
      <TypeSelector value={type} onChange={setType} />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <QrForm type={type} values={allValues[type]} onChange={handleChange} />
          <ColorPanel style={style} onChange={setStyle} />
          <ShapePanel style={style} onChange={setStyle} />
          <LogoPanel style={style} onChange={setStyle} />
          <ContrastWarning fgColor={style.fgColor} bgColor={style.bgColor} />
        </div>

        <div className="md:sticky md:top-6 md:self-start">
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex min-h-72 w-full items-center justify-center rounded-xl bg-slate-50 p-4">
              {payload ? (
                <QrPreview data={payload} style={style} />
              ) : (
                <p className="max-w-52 text-center text-sm text-slate-500">
                  Completa los datos y tu código QR aparecerá aquí
                </p>
              )}
            </div>

            <DownloadButtons
              disabled={!payload}
              onDownload={handleQuickDownload}
            />

            <DownloadOptions
              settings={exportSettings}
              onChange={setExportSettings}
              disabled={!payload}
              onDownload={handleAdvancedDownload}
            />

            <p className="text-center text-xs text-slate-500">
              QR estático: nunca caduca mientras la información enlazada exista.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}