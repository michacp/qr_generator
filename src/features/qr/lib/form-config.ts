import type { QrType, QrValues } from "../types";
import { COUNTRIES, DEFAULT_COUNTRY, countryLabel } from "./countries";

export type TypeConfig = {
    label: string;
    fields: FieldConfig[];
    defaults: QrValues;
};
export type FieldConfig = {
    name: string;
    label: string;
    input:
    | "text"
    | "tel"
    | "email"
    | "password"
    | "textarea"
    | "select"
    | "checkbox";
    inputMode?: "text" | "url" | "tel" | "email" | "decimal";
    placeholder?: string;
    hint?: string;
    maxLength?: number;
    options?: { value: string; label: string }[];
};
export const QR_TYPE_CONFIG: Record<QrType, TypeConfig> = {
    url: {
        label: "URL",
        fields: [
            {
                name: "url",
                label: "URL del sitio web",
                input: "text",
                inputMode: "url",
                placeholder: "https://tusitio.com",
            },
        ],
        defaults: { url: "" },
    },

    vcard: {
        label: "Contacto",
        fields: [
            { name: "firstName", label: "Nombre", input: "text" },
            { name: "lastName", label: "Apellido", input: "text" },
            {
                name: "phone",
                label: "Teléfono",
                input: "tel",
                inputMode: "tel",
                placeholder: "+593 99 123 4567",
            },
            { name: "email", label: "Email", input: "email", inputMode: "email" },
            { name: "company", label: "Empresa", input: "text" },
        ],
        defaults: { firstName: "", lastName: "", phone: "", email: "", company: "" },
    },

    wifi: {
        label: "Wi-Fi",
        fields: [
            { name: "ssid", label: "Nombre de la red (SSID)", input: "text" },
            { name: "password", label: "Contraseña", input: "password" },
            {
                name: "security",
                label: "Seguridad",
                input: "select",
                options: [
                    { value: "WPA", label: "WPA/WPA2" },
                    { value: "WEP", label: "WEP" },
                    { value: "nopass", label: "Sin contraseña" },
                ],
            },
            { name: "hidden", label: "Red oculta", input: "checkbox" },
        ],
        defaults: { ssid: "", password: "", security: "WPA", hidden: "" },
    },

    whatsapp: {
        label: "WhatsApp",
        fields: [
            {
                name: "country",
                label: "País",
                input: "select",
                options: COUNTRIES.map((c) => ({
                    value: c.iso,
                    label: countryLabel(c),
                })),
            },
            {
                name: "phone",
                label: "Número (sin código de país)",
                input: "tel",
                inputMode: "tel",
                placeholder: "0991234567",
                hint: "También puedes pegar el número completo con +, por ejemplo +57 300 123 4567.",
            },
            {
                name: "message",
                label: "Mensaje predefinido (opcional)",
                input: "textarea",
                maxLength: 300,
            },
        ],
        defaults: { country: DEFAULT_COUNTRY, phone: "", message: "" },
    },

    sms: {
        label: "SMS",
        fields: [
            {
                name: "phone",
                label: "Número",
                input: "tel",
                inputMode: "tel",
                placeholder: "+593991234567",
            },
            {
                name: "message",
                label: "Mensaje (opcional)",
                input: "textarea",
                maxLength: 300,
            },
        ],
        defaults: { phone: "", message: "" },
    },

    email: {
        label: "Email",
        fields: [
            {
                name: "to",
                label: "Destinatario",
                input: "email",
                inputMode: "email",
                placeholder: "correo@ejemplo.com",
            },
            { name: "subject", label: "Asunto (opcional)", input: "text" },
            {
                name: "body",
                label: "Mensaje (opcional)",
                input: "textarea",
                maxLength: 300,
            },
        ],
        defaults: { to: "", subject: "", body: "" },
    },

    text: {
        label: "Texto",
        fields: [
            {
                name: "text",
                label: "Texto (máx. 500 caracteres)",
                input: "textarea",
                maxLength: 500,
            },
        ],
        defaults: { text: "" },
    },

    geo: {
        label: "Ubicación",
        fields: [
            {
                name: "latitude",
                label: "Latitud",
                input: "text",
                inputMode: "decimal",
                placeholder: "-2.9001",
            },
            {
                name: "longitude",
                label: "Longitud",
                input: "text",
                inputMode: "decimal",
                placeholder: "-79.0059",
            },
        ],
        defaults: { latitude: "", longitude: "" },
    },
};