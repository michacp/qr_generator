"use client";

import { useCallback, useRef, useState } from "react";
import type QRCodeStyling from "qr-code-styling";
import {
  DEFAULT_STYLE,
  QR_TYPES,
  type QrStyle,
  type QrType,
  type QrValues,
} from "../types";
import { QR_TYPE_CONFIG } from "../lib/form-config";
import { buildPayload } from "../lib/payloads";
import { QrPreview } from "./qr-preview";
import { QrForm } from "./qr-form";
import { TypeSelector } from "./type-selector";
import { ColorPanel } from "./color-panel";
import { ShapePanel } from "./shape-panel";
import { LogoPanel } from "./logo-panel";
import { ContrastWarning } from "./contrast-warning";
import { DownloadButtons, type DownloadFormat } from "./download-buttons";

type AllValues = Record<QrType, QrValues>;

const initialValues = Object.fromEntries(
  QR_TYPES.map((t) => [t, QR_TYPE_CONFIG[t].defaults]),
) as AllValues;

export function QrGenerator() {
  const [type, setType] = useState<QrType>("url");
  const [allValues, setAllValues] = useState<AllValues>(initialValues);
  const [style, setStyle] = useState<QrStyle>(DEFAULT_STYLE);
  const qrRef = useRef<QRCodeStyling | null>(null);

  const payload = buildPayload(type, allValues[type]);

  const handleReady = useCallback((qr: QRCodeStyling) => {
    qrRef.current = qr;
  }, []);

  const handleChange = (name: string, value: string) => {
    setAllValues((prev) => ({
      ...prev,
      [type]: { ...prev[type], [name]: value },
    }));
  };

  const handleDownload = async (extension: DownloadFormat) => {
    await qrRef.current?.download({ name: "qr-code", extension });
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
                <QrPreview data={payload} style={style} onReady={handleReady} />
              ) : (
                <p className="max-w-52 text-center text-sm text-slate-500">
                  Completa los datos y tu código QR aparecerá aquí
                </p>
              )}
            </div>

            <DownloadButtons disabled={!payload} onDownload={handleDownload} />

            <p className="text-center text-xs text-slate-500">
              QR estático: nunca caduca mientras la información enlazada exista.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}