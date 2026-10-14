import type { Metadata } from "next";
import { siteConfig } from "./site-config";

type PageMetadataInput = {
    title: string;
    description: string;
    path: string;
};

export function buildPageMetadata({
    title,
    description,
    path,
}: PageMetadataInput): Metadata {
    return {
        title: { absolute: title },
        description,
        alternates: { canonical: path },
        openGraph: {
            type: "website",
            locale: siteConfig.locale,
            siteName: siteConfig.name,
            title,
            description,
            url: path,
        },
        twitter: { card: "summary_large_image", title, description },
    };
}