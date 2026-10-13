import type {
    CornerDotType,
    CornerSquareType,
    DotType,
} from "qr-code-styling";
import type { CornerStyle, DotStyle } from "../types";

export const DOT_STYLES: {
    value: DotStyle;
    label: string;
    type: DotType;
}[] = [
        { value: "square", label: "Cuadrados", type: "square" },
        { value: "dots", label: "Redondos", type: "dots" },
        { value: "rounded", label: "Suaves", type: "rounded" },
    ];

export const CORNER_STYLES: {
    value: CornerStyle;
    label: string;
    square: CornerSquareType; // marco exterior
    dot: CornerDotType; // punto interior
}[] = [
        { value: "square", label: "Cuadradas", square: "square", dot: "square" },
        { value: "rounded", label: "Redondeadas", square: "extra-rounded", dot: "square" },
        { value: "circle", label: "Circulares", square: "dot", dot: "dot" },
    ];

export function getDotType(style: DotStyle): DotType {
    return DOT_STYLES.find((s) => s.value === style)?.type ?? "square";
}

export function getCornerTypes(style: CornerStyle) {
    const found = CORNER_STYLES.find((s) => s.value === style) ?? CORNER_STYLES[0];
    return { square: found.square, dot: found.dot };
}