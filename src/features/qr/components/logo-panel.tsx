"use client";

import { useRef, useState, type DragEvent } from "react";
import type { QrStyle } from "../types";
import { prepareLogo } from "../lib/image";

type LogoPanelProps = {
  style: QrStyle;
  onChange: (style: QrStyle) => void;
};

export function LogoPanel({ style, onChange }: LogoPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    setIsLoading(true);

    try {
      const logo = await prepareLogo(file);
      onChange({ ...style, logo });
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo cargar el logo.");
    } finally {
      setIsLoading(false);
      // Permite volver a elegir el mismo archivo
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    // Evita el parpadeo cuando el cursor pasa sobre elementos internos
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const removeLogo = () => {
    setError("");
    onChange({ ...style, logo: null });
  };

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">Logo</h2>

      <input
        ref={inputRef}
        id="qr-logo-input"
        type="file"
        accept="image/png,image/jpeg"
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="sr-only"
      />

      <label
        htmlFor="qr-logo-input"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition focus-within:ring-4 focus-within:ring-indigo-100 ${
          isDragging
            ? "border-indigo-500 bg-indigo-50"
            : "border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/50"
        }`}
      >
        {style.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={style.logo}
            alt="Logo cargado"
            className="h-16 w-16 rounded-lg border border-slate-200 bg-white object-contain p-1"
          />
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-8 w-8 text-indigo-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 16V4m0 0L8 8m4-4 4 4" />
            <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
          </svg>
        )}

        <span className="text-sm font-medium text-slate-700">
          {isLoading
            ? "Procesando imagen..."
            : isDragging
              ? "Suelta la imagen aquí"
              : style.logo
                ? "Arrastra otra imagen o haz clic para cambiarla"
                : "Arrastra tu logo aquí o haz clic para elegirlo"}
        </span>
        <span className="text-xs text-slate-500">PNG o JPG · máx. 2 MB</span>
      </label>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      {style.logo && (
        <>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="qr-logo-size"
              className="text-sm font-medium text-slate-700"
            >
              Tamaño del logo: {Math.round(style.logoSize * 100)}%
            </label>
            <input
              id="qr-logo-size"
              type="range"
              min={0.15}
              max={0.35}
              step={0.05}
              value={style.logoSize}
              onChange={(e) =>
                onChange({ ...style, logoSize: Number(e.target.value) })
              }
              className="w-full cursor-pointer accent-indigo-600"
            />
            <p className="text-xs text-slate-500">
              Un logo más grande tapa más puntos del código. Si el QR no
              escanea, redúcelo.
            </p>
          </div>

          <button
            type="button"
            onClick={removeLogo}
            className="cursor-pointer self-start text-sm font-medium text-slate-600 hover:text-red-600 hover:underline"
          >
            Quitar logo
          </button>
        </>
      )}

      <p className="text-xs text-slate-500">
        Tu logo se procesa en tu navegador y no se sube a ningún servidor.
      </p>
    </section>
  );
}