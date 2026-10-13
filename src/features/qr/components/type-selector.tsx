"use client";

import { QR_TYPES, type QrType } from "../types";
import { QR_TYPE_CONFIG } from "../lib/form-config";

type TypeSelectorProps = {
  value: QrType;
  onChange: (type: QrType) => void;
};

export function TypeSelector({ value, onChange }: TypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Tipo de QR">
      {QR_TYPES.map((type) => {
        const active = type === value;
        return (
          <button
            key={type}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(type)}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 ${
              active
                ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                : "border-slate-300 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50"
            }`}
          >
            {QR_TYPE_CONFIG[type].label}
          </button>
        );
      })}
    </div>
  );
}