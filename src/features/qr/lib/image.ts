const ACCEPTED_TYPES = ["image/png", "image/jpeg"];
const MAX_FILE_BYTES = 2 * 1024 * 1024; // 2 MB
const MAX_SIDE = 512;

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("No se pudo leer la imagen."));
        img.src = src;
    });
}

export async function prepareLogo(file: File): Promise<string> {
    if (!ACCEPTED_TYPES.includes(file.type)) {
        throw new Error("Usa una imagen PNG o JPG.");
    }
    if (file.size > MAX_FILE_BYTES) {
        throw new Error("La imagen pesa más de 2 MB.");
    }

    const objectUrl = URL.createObjectURL(file);

    try {
        const img = await loadImage(objectUrl);
        const scale = Math.min(
            1,
            MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight),
        );
        const width = Math.max(1, Math.round(img.naturalWidth * scale));
        const height = Math.max(1, Math.round(img.naturalHeight * scale));

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("No se pudo procesar la imagen.");
        ctx.drawImage(img, 0, 0, width, height);

        // PNG para conservar la transparencia
        return canvas.toDataURL("image/png");
    } finally {
        URL.revokeObjectURL(objectUrl);
    }
}