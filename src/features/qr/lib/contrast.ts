export type ContrastLevel = "ok" | "warning" | "danger";

export type ContrastResult = {
    ratio: number;
    level: ContrastLevel;
    inverted: boolean;
};

function hexToRgb(hex: string): [number, number, number] {
    const h = hex.replace("#", "");
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const n = parseInt(full, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function luminance(hex: string): number {
    const [r, g, b] = hexToRgb(hex).map((v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrast(fg: string, bg: string): ContrastResult {
    const lFg = luminance(fg);
    const lBg = luminance(bg);
    const [hi, lo] = lFg >= lBg ? [lFg, lBg] : [lBg, lFg];
    const ratio = (hi + 0.05) / (lo + 0.05);

    const level: ContrastLevel =
        ratio < 3 ? "danger" : ratio < 4.5 ? "warning" : "ok";

    return { ratio, level, inverted: lFg > lBg };
}