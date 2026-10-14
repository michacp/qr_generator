import { QrView } from "@/features/qr";
import { FAQ_ITEMS, LandingContent } from "@/features/landing";
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
    <>
      <JsonLd data={buildStructuredData(FAQ_ITEMS)} />
      <QrView />
      <LandingContent />
    </>
  );
}