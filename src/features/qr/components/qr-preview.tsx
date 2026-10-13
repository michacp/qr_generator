"use client";

import { useEffect, useRef } from "react";
import type QRCodeStyling from "qr-code-styling";
import type { QrStyle } from "../types";
import { getCornerTypes, getDotType } from "../lib/style-options";

type QrPreviewProps = {
  data: string;
  style: QrStyle;
  size?: number;
  onReady?: (qr: QRCodeStyling) => void;
};

export function QrPreview({
  data,
  style,
  size = 256,
  onReady,
}: QrPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  const { fgColor, bgColor, dotStyle, cornerStyle, logo, logoSize } = style;

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const { default: QRCodeStyling } = await import("qr-code-styling");
      if (cancelled || !containerRef.current) return;

      const corners = getCornerTypes(cornerStyle);

      const options = {
        width: size,
        height: size,
        data,
        image: logo ?? undefined,
        qrOptions: { errorCorrectionLevel: logo ? ("H" as const) : ("M" as const) },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: logoSize,
          margin: 4,
        },
        dotsOptions: { color: fgColor, type: getDotType(dotStyle) },
        backgroundOptions: { color: bgColor },
        cornersSquareOptions: { color: fgColor, type: corners.square },
        cornersDotOptions: { color: fgColor, type: corners.dot },
      };

      if (!qrRef.current) {
        qrRef.current = new QRCodeStyling({
          ...options,
          type: "svg",
          margin: 8,
        });
        qrRef.current.append(containerRef.current);
        onReady?.(qrRef.current);
      } else {
        qrRef.current.update(options);
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [data, fgColor, bgColor, dotStyle, cornerStyle, logo, logoSize, size, onReady]);

  return <div ref={containerRef} aria-label="Vista previa del código QR" />;
}