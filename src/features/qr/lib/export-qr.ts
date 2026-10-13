import type { QrStyle } from "../types";
import { buildQrOptions } from "./qr-options";
import type { ExportSettings } from "./export-options";

export async function downloadQr(
    data: string,
    style: QrStyle,
    { format, size }: ExportSettings,
) {
    // Import dinámico: la librería necesita el navegador
    const { default: QRCodeStyling } = await import("qr-code-styling");

    const isVector = format === "svg";

    const qr = new QRCodeStyling({
        ...buildQrOptions(data, style, size),
        type: isVector ? "svg" : "canvas",
    });

    await qr.download({
        name: isVector ? "qr-code" : `qr-code-${size}px`,
        extension: format,
    });
}