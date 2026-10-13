"use client";

export type DownloadFormat = "png" | "svg";

type DownloadButtonsProps = {
  disabled?: boolean;
  onDownload: (format: DownloadFormat) => void;
};

export function DownloadButtons({ disabled, onDownload }: DownloadButtonsProps) {
  const base =
    "flex-1 cursor-pointer rounded-xl px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex w-full gap-3">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onDownload("png")}
        className={`${base} bg-indigo-600 text-white shadow-sm hover:bg-indigo-700`}
      >
        Descargar PNG
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onDownload("svg")}
        className={`${base} border border-slate-300 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50`}
      >
        Descargar SVG
      </button>
    </div>
  );
}