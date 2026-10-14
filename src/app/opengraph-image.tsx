import { ImageResponse } from "next/og";

export const alt = "Generador de códigos QR gratis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
          color: "#0f172a",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            color: "#4f46e5",
          }}
        >
          ubfix.com
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
          }}
        >
          Generador de códigos QR gratis
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 34,
            color: "#475569",
          }}
        >
          Sin registro · Personalizable · PNG y SVG
        </div>
      </div>
    ),
    { ...size },
  );
}