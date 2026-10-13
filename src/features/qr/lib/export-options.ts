import { EXPORT_SIZE } from "./qr-options";

export type ExportFormat = "png" | "jpeg" | "webp" | "svg";

export type ExportSettings = {
    format: ExportFormat;
    size: number; // en píxeles (no aplica a SVG)
};

export const FORMAT_OPTIONS: {
    value: ExportFormat;
    label: string;
    hint: string;
    vector: boolean;
}[] = [
        {
            value: "png",
            label: "PNG",
            hint: "Ideal para redes sociales y webs. Calidad sin pérdida.",
            vector: false,
        },
        {
            value: "jpeg",
            label: "JPG",
            hint: "Archivo más liviano. Sin transparencia.",
            vector: false,
        },
        {
            value: "webp",
            label: "WebP",
            hint: "Muy liviano, pensado para sitios web modernos.",
            vector: false,
        },
        {
            value: "svg",
            label: "SVG",
            hint: "Vectorial: se imprime en cualquier tamaño sin pixelarse.",
            vector: true,
        },
    ];

export const SIZE_PRESETS = [512, 1024, 2048, 4096] as const;
export const MIN_SIZE = 128;
export const MAX_SIZE = 4096;

export const DEFAULT_EXPORT_SETTINGS: ExportSettings = {
    format: "png",
    size: EXPORT_SIZE,
};