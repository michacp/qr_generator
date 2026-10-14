import { getContrast } from "../lib/contrast";

type ContrastWarningProps = {
  fgColor: string;
  bgColor: string;
};

export function ContrastWarning({ fgColor, bgColor }: ContrastWarningProps) {
  const { ratio, level, inverted } = getContrast(fgColor, bgColor);

  if (level === "ok" && !inverted) return null;

  const isDanger = level === "danger";

  return (
    <div
      role="status"
      className={`flex flex-col gap-1 rounded-xl border p-3 text-sm ${
        isDanger
          ? "border-red-300 bg-red-50 text-red-800"
          : "border-amber-300 bg-amber-50 text-amber-800"
      }`}
    >
      {level !== "ok" && (
        <p>
          {isDanger
            ? "Contraste muy bajo: es probable que este QR no se pueda escanear."
            : "Contraste bajo: algunos celulares podrían tener problemas para leerlo."}{" "}
          (Ratio {ratio.toFixed(1)}:1)
        </p>
      )}
      {inverted && (
        <p>
          El código es más claro que el fondo. Muchos lectores de QR no leen
          este formato; usa un código oscuro sobre fondo claro.
        </p>
      )}
    </div>
  );
}