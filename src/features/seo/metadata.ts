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
    // Asegura que la URL canonical siempre sea absoluta y sin slashes duplicados
    const absoluteUrl = `${siteConfig.url}${path === "/" ? "" : path}`;

    return {
        title: { absolute: title },
        description,
        alternates: {
            canonical: absoluteUrl,
        },
        openGraph: {
            type: "website",
            locale: siteConfig.locale,
            siteName: siteConfig.name,
            title,
            description,
            url: absoluteUrl,
            images: [
                {
                    url: `${siteConfig.url}/opengraph-image`, // O la ruta de tu opengraph-image.tsx
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${siteConfig.url}/opengraph-image`],
        },
    };
}