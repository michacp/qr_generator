import type { Metadata } from "next";
import { QrView } from "@/features/qr";

export const metadata: Metadata = {
  title: "Generador de códigos QR",
  description: "Crea códigos QR gratis de forma rápida.",
};

export default function QrPage() {
  return <QrView />;
}