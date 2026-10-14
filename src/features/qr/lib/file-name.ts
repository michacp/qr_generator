import type { QrType } from "../types";

const TYPE_SLUGS: Record<QrType, string> = {
    url: "url",
    vcard: "contacto",
    wifi: "wifi",
    whatsapp: "whatsapp",
    sms: "sms",
    email: "email",
    text: "texto",
    geo: "ubicacion",
};

function slugify(value: string, maxLength = 40): string {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // quita tildes
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, maxLength)
        .replace(/-+$/g, "");
}

export function buildFileName(type: QrType, payload: string): string {
    const base = `qr-${TYPE_SLUGS[type]}`;
    if (type !== "url") return base;

    try {
        const host = slugify(new URL(payload).hostname.replace(/^www\./, ""));
        return host ? `${base}-${host}` : base;
    } catch {
        return base;
    }
}