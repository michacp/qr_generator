import { QrGenerator } from "./qr-generator";

export function QrView() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <header className="mb-8 flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Generador de códigos QR gratis
        </h1>
        <p className="max-w-2xl text-slate-600">
          Crea códigos QR estáticos, sin registro y sin límites. Personalízalos
          con tus colores y tu logo, y descárgalos en PNG o SVG.
        </p>
      </header>

      <QrGenerator />
    </section>
  );
}