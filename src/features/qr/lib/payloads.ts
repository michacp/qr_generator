import type { QrType, QrValues } from "../types";
import { getCountry } from "./countries";

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

const MIN_PHONE_DIGITS = 8;
const MAX_PHONE_DIGITS = 15; // límite del estándar internacional (E.164)

// Convierte lo que escribe la persona en el número internacional que pide wa.me
function toInternationalDigits(raw: string, countryIso: string): string {
    const text = raw.trim();
    const digits = onlyDigits(text);
    if (!digits) return "";

    let full: string;

    if (text.startsWith("+")) {
        // Ya viene completo: +57 300 123 4567
        full = digits;
    } else if (digits.startsWith("00")) {
        // Formato 0057...
        full = digits.slice(2);
    } else {
        const { dial } = getCountry(countryIso);
        // Quita el 0 inicial con el que se marca localmente
        const national = digits.replace(/^0+/, "");
        // Si ya empieza con el código del país y es largo, no se repite
        const alreadyHasDial =
            national.startsWith(dial) && national.length >= dial.length + 8;
        full = alreadyHasDial ? national : `${dial}${national}`;
    }

    return full.length >= MIN_PHONE_DIGITS && full.length <= MAX_PHONE_DIGITS
        ? full
        : "";
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
        const phone = toInternationalDigits(v.phone ?? "", v.country ?? "");
        if (!phone) return "";
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