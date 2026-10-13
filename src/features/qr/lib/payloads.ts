import type { QrType, QrValues } from "../types";

const clean = (v?: string) => (v ?? "").trim();
const onlyDigits = (v: string) => v.replace(/\D/g, "");
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function escapeVCard(v: string) {
    return v
        .replace(/\\/g, "\\\\")
        .replace(/\n/g, "\\n")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,");
}

function escapeWifi(v: string) {
    return v.replace(/([\\;,:"])/g, "\\$1");
}

type Builder = (v: QrValues) => string;

const builders: Record<QrType, Builder> = {
    url: (v) => {
        const url = clean(v.url);
        if (!url) return "";
        return /^[a-z][a-z\d+.-]*:\/\//i.test(url) ? url : `https://${url}`;
    },

    vcard: (v) => {
        const first = clean(v.firstName);
        const last = clean(v.lastName);
        if (!first && !last) return "";

        const lines = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            `N:${escapeVCard(last)};${escapeVCard(first)};;;`,
            `FN:${escapeVCard(`${first} ${last}`.trim())}`,
        ];
        if (clean(v.company)) lines.push(`ORG:${escapeVCard(clean(v.company))}`);
        if (clean(v.phone)) lines.push(`TEL:${escapeVCard(clean(v.phone))}`);
        if (clean(v.email)) lines.push(`EMAIL:${escapeVCard(clean(v.email))}`);
        lines.push("END:VCARD");
        return lines.join("\n");
    },

    wifi: (v) => {
        const ssid = clean(v.ssid);
        const security = v.security || "WPA";
        const password = v.password ?? "";
        if (!ssid) return "";
        if (security !== "nopass" && !password) return "";

        const parts = [`T:${security}`, `S:${escapeWifi(ssid)}`];
        if (security !== "nopass") parts.push(`P:${escapeWifi(password)}`);
        if (v.hidden === "true") parts.push("H:true");
        return `WIFI:${parts.join(";")};;`;
    },

    whatsapp: (v) => {
        const phone = onlyDigits(v.phone ?? "");
        if (phone.length < 8) return "";
        const message = clean(v.message);
        return `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ""
            }`;
    },

    sms: (v) => {
        const phone = clean(v.phone).replace(/[^\d+]/g, "");
        if (!phone) return "";
        return `SMSTO:${phone}:${clean(v.message)}`;
    },

    email: (v) => {
        const to = clean(v.to);
        if (!isEmail(to)) return "";
        const params: string[] = [];
        if (clean(v.subject)) {
            params.push(`subject=${encodeURIComponent(clean(v.subject))}`);
        }
        if (clean(v.body)) {
            params.push(`body=${encodeURIComponent(clean(v.body))}`);
        }
        return `mailto:${to}${params.length ? `?${params.join("&")}` : ""}`;
    },

    text: (v) => clean(v.text).slice(0, 500),

    geo: (v) => {
        const lat = Number(clean(v.latitude).replace(",", "."));
        const lng = Number(clean(v.longitude).replace(",", "."));
        if (!clean(v.latitude) || !clean(v.longitude)) return "";
        if (Number.isNaN(lat) || Number.isNaN(lng)) return "";
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return "";
        return `https://www.google.com/maps?q=${lat},${lng}`;
    },
};

export function buildPayload(type: QrType, values: QrValues): string {
    return builders[type](values);
}