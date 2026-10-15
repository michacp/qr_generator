"use client";

import { useEffect } from "react";
import { ADS } from "../lib/ads-config";
import { useInView } from "../lib/use-in-view";
import { useIsLiveHost } from "../lib/use-live-host";

const CONTAINER_ID = `container-${ADS.native.key}`;

export function NativeAdSlot() {
  const isLive = useIsLiveHost();
  // Margen amplio: el anuncio se carga antes de entrar en pantalla
  const { ref, inView } = useInView<HTMLDivElement>("400px");

  useEffect(() => {
    if (!isLive || !inView) return;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = ADS.native.scriptSrc;
    document.body.appendChild(script);

    return () => {
      script.remove();
      document.getElementById(CONTAINER_ID)?.replaceChildren();
    };
  }, [isLive, inView]);

  return (
    <aside aria-label="Publicidad" className="flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-wide text-slate-500">
        Publicidad
      </span>
      <div ref={ref}>
        {isLive ? (
          <div id={CONTAINER_ID} />
        ) : (
          <div className="flex min-h-24 items-center justify-center rounded border border-dashed border-slate-300 text-xs text-slate-500">
            Anuncio nativo (solo se carga en ubfix.com)
          </div>
        )}
      </div>
    </aside>
  );
}