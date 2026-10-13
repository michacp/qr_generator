import type { Options } from "qr-code-styling";
import type { QrStyle } from "../types";
import { getCornerTypes, getDotType } from "./style-options";

export const PREVIEW_SIZE = 256;
export const EXPORT_SIZE = 1024;

export function buildQrOptions(
    data: string,
    style: QrStyle,
    size: number,
): Options {
    const scale = size / PREVIEW_SIZE;
    const corners = getCornerTypes(style.cornerStyle);

    return {
        width: size,
        height: size,
        margin: Math.round(8 * scale),
        data,
        image: style.logo ?? undefined,
        qrOptions: { errorCorrectionLevel: style.logo ? "H" : "M" },
        imageOptions: {
            hideBackgroundDots: true,
            imageSize: style.logoSize,
            margin: Math.round(4 * scale),
        },
        dotsOptions: { color: style.fgColor, type: getDotType(style.dotStyle) },
        backgroundOptions: { color: style.bgColor },
        cornersSquareOptions: { color: style.fgColor, type: corners.square },
        cornersDotOptions: { color: style.fgColor, type: corners.dot },
    };
}