import { QrView } from "@/features/qr";
import { FAQ_ITEMS, LandingContent } from "@/features/landing";
import { BannerAdSlot, NativeAdSlot } from "@/features/ads";
import {
  JsonLd,
  buildPageMetadata,
  buildStructuredData,
  siteConfig,
} from "@/features/seo";

export const metadata = buildPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      <JsonLd data={buildStructuredData(FAQ_ITEMS)} />
      <QrView />
      <BannerAdSlot />
      <LandingContent afterTypes={<NativeAdSlot />} />
    </main>
  );
}