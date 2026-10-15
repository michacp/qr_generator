import {
  FAQ_ITEMS,
  HOW_IT_WORKS,
  QR_TYPE_DESCRIPTIONS,
} from "./landing-data";
import type { ReactNode } from "react";
const cardClass =
  "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";
const h2Class = "text-2xl font-bold tracking-tight text-slate-900";
type LandingContentProps = {
  afterTypes?: ReactNode; // espacio opcional tras la sección de tipos de QR
};

export function LandingContent({ afterTypes }: LandingContentProps) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-14 px-4 pb-20">
      <section aria-labelledby="como-funciona" className="flex flex-col gap-6">
        <h2 id="como-funciona" className={h2Class}>
          Cómo crear un código QR en 3 pasos
        </h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {HOW_IT_WORKS.map((step, i) => (
            <li key={step.title} className={cardClass}>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="tipos-qr" className="flex flex-col gap-6">
        <h2 id="tipos-qr" className={h2Class}>
          Tipos de códigos QR que puedes crear
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QR_TYPE_DESCRIPTIONS.map((type) => (
            <article key={type.title} className={cardClass}>
              <h3 className="font-semibold text-slate-900">{type.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{type.text}</p>
            </article>
          ))}
        </div>
      </section>
 {afterTypes}
      <section
        aria-labelledby="garantia"
        className="flex flex-col gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 p-6"
      >
        <h2 id="garantia" className={h2Class}>
          QR estáticos: gratis, ilimitados y para siempre
        </h2>
        <p className="text-slate-700">
          Los códigos que generas aquí son estáticos: la información se guarda
          directamente en la imagen del QR, por eso nunca caducan y no dependen
          de ninguna suscripción. Funcionarán mientras exista la información a
          la que apuntan, por ejemplo tu sitio web.
        </p>
        <p className="text-slate-700">
          Todo se procesa en tu navegador: lo que escribes y el logo que subes
          no se envían a ningún servidor.
        </p>
        <p className="text-slate-700">
          Como los QR estáticos no se pueden editar, revisa los datos y escanea
          el código con tu celular antes de imprimirlo.
        </p>
      </section>

      <section aria-labelledby="preguntas" className="flex flex-col gap-6">
        <h2 id="preguntas" className={h2Class}>
          Preguntas frecuentes
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question} className={cardClass}>
              <h3 className="font-semibold text-slate-900">{item.question}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}