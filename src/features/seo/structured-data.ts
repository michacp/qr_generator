import { siteConfig } from "./site-config";

type FaqItem = { readonly question: string; readonly answer: string };

export function buildStructuredData(faq: readonly FaqItem[]) {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": `${siteConfig.url}/#website`,
                url: siteConfig.url,
                name: siteConfig.name,
                inLanguage: siteConfig.language,
            },
            {
                "@type": "WebApplication",
                "@id": `${siteConfig.url}/#app`,
                name: "Generador de códigos QR",
                url: siteConfig.url,
                description: siteConfig.description,
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Any",
                browserRequirements: "Requiere JavaScript",
                inLanguage: siteConfig.language,
                isAccessibleForFree: true,
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
            {
                "@type": "FAQPage",
                mainEntity: faq.map(({ question, answer }) => ({
                    "@type": "Question",
                    name: question,
                    acceptedAnswer: { "@type": "Answer", text: answer },
                })),
            },
        ],
    };
}