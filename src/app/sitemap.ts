import type { MetadataRoute } from "next";
import { siteConfig } from "@/features/seo";

// Actualiza esta fecha cuando cambies el contenido de la página
const LAST_UPDATED = new Date("2026-10-13");

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${siteConfig.url}/`,
            lastModified: LAST_UPDATED,
        },
    ];
}