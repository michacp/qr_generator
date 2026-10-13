export const QR_TYPES = [
    "url",
    "vcard",
    "wifi",
    "whatsapp",
    "sms",
    "email",
    "text",
    "geo",
] as const;

export type QrType = (typeof QR_TYPES)[number];

// Todos los valores del formulario se guardan como texto
export type QrValues = Record<string, string>;

export type DotStyle = "square" | "dots" | "rounded";
export type CornerStyle = "square" | "rounded" | "circle";

export type QrStyle = {
    fgColor: string; // color del código
    bgColor: string; // color de fondo
    dotStyle: DotStyle;
    cornerStyle: CornerStyle;
    logo: string | null; // imagen en formato data URL
    logoSize: number; // proporción del logo respecto al QR (0.15 a 0.35)
};

export const DEFAULT_STYLE: QrStyle = {
    fgColor: "#000000",
    bgColor: "#ffffff",
    dotStyle: "square",
    cornerStyle: "square",
    logo: null,
    logoSize: 0.25,
};