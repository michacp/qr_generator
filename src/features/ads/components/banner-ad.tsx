"use client";

import { useInView } from "../lib/use-in-view";
import { useIsLiveHost } from "../lib/use-live-host";
import type { BannerAdConfig } from "../lib/ads-config";

function buildSrcDoc({ key, width, height, scriptSrc }: BannerAdConfig) {
  const options = JSON.stringify({
    key,
    format: "iframe",
    height,
    width,
    params: {},
  });

  return [
    '<!DOCTYPE html><html><head><meta charset="utf-8"><base target="_blank">',
    "<style>html,body{margin:0;padding:0;overflow:hidden}</style></head><body>",
    `<script>atOptions = ${options};</script>`,
    `<script src="${scriptSrc}"></script>`,
    "</body></html>",
  ].join("");
}

type BannerAdProps = {
  ad: BannerAdConfig;
  className?: string;
};

export function BannerAd({ ad, className = "" }: BannerAdProps) {
  const isLive = useIsLiveHost();
  const { ref, inView } = useInView<HTMLDivElement>("200px");

  return (
    <div
      ref={ref}
      className={className}
      style={{ width: ad.width, maxWidth: "100%", height: ad.height }}
    >
      {isLive ? (
        inView && (
          <iframe
            title="Publicidad"
            width={ad.width}
            height={ad.height}
            srcDoc={buildSrcDoc(ad)}
            scrolling="no"
            style={{ border: 0 }}
          />
        )
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded border border-dashed border-slate-300 text-xs text-slate-500">
          Anuncio {ad.width}×{ad.height} (solo se carga en ubfix.com)
        </div>
      )}
    </div>
  );
}