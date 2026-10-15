import { ADS } from "../lib/ads-config";
import { BannerAd } from "./banner-ad";

export function BannerAdSlot() {
  return (
    <aside
      aria-label="Publicidad"
      className="mx-auto flex max-w-5xl flex-col items-center gap-1 px-4 py-6"
    >
      <span className="text-[11px] uppercase tracking-wide text-slate-500">
        Publicidad
      </span>
      <BannerAd ad={ADS.banner728} className="hidden md:block" />
      <BannerAd ad={ADS.banner320} className="md:hidden" />
    </aside>
  );
}