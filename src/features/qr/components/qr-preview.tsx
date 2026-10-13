"use client";

import { useEffect, useRef } from "react";
import type QRCodeStyling from "qr-code-styling";
import type { QrStyle } from "../types";
import { PREVIEW_SIZE, buildQrOptions } from "../lib/qr-options";

type QrPreviewProps = {
  data: string;
  style: QrStyle;
};

export function QrPreview({ data, style }: QrPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const { default: QRCodeStyling } = await import("qr-code-styling");
      if (cancelled || !containerRef.current) return;

      const options = buildQrOptions(data, style, PREVIEW_SIZE);

      if (!qrRef.current) {
        qrRef.current = new QRCodeStyling({ ...options, type: "svg" });
        qrRef.current.append(containerRef.current);
      } else {
        qrRef.current.update(options);
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [data, style]);

  return <div ref={containerRef} aria-label="Vista previa del código QR" />;
}