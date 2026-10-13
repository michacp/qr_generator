"use client";

import type { QrType, QrValues } from "../types";
import { QR_TYPE_CONFIG } from "../lib/form-config";

type QrFormProps = {
  type: QrType;
  values: QrValues;
  onChange: (name: string, value: string) => void;
};

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100";

export function QrForm({ type, values, onChange }: QrFormProps) {
  const { fields, label } = QR_TYPE_CONFIG[type];

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">
        Datos del QR · {label}
      </h2>

      {fields.map((field) => {
        const id = `qr-${type}-${field.name}`;
        const value = values[field.name] ?? "";

        if (field.input === "checkbox") {
          return (
            <label
              key={id}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
            >
              <input
                id={id}
                type="checkbox"
                checked={value === "true"}
                onChange={(e) =>
                  onChange(field.name, e.target.checked ? "true" : "")
                }
                className="h-4 w-4 cursor-pointer accent-indigo-600"
              />
              {field.label}
            </label>
          );
        }

        return (
          <div key={id} className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-sm font-medium text-slate-700">
              {field.label}
            </label>

            {field.input === "textarea" ? (
              <textarea
                id={id}
                rows={3}
                maxLength={field.maxLength}
                value={value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={inputClass}
              />
            ) : field.input === "select" ? (
              <select
                id={id}
                value={value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={inputClass}
              >
                {field.options?.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                type={field.input}
                inputMode={field.inputMode}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                value={value}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={inputClass}
              />
            )}
          </div>
        );
      })}
    </section>
  );
}