# AGENTS.md

## 1. Proyecto

Generador de códigos QR **estáticos, gratis e ilimitados**, sin registro. Pensado para contadores, diseñadores y emprendedores de Ecuador. Todo el procesamiento ocurre en el navegador: ningún dato ni logo se envía a un servidor.

Tipos de QR: URL, vCard (contacto), Wi-Fi, WhatsApp, SMS, Email, Texto, Ubicación (geo). Personalización: colores (con aviso de contraste), estilo de puntos y esquinas, logo central (drag and drop), vista previa en tiempo real, descarga PNG/JPG/WebP/SVG con tamaño elegible. La landing (`/`) debe maximizar el SEO: UI en español.

## 2. Stack

> Verifica versiones exactas con `npm ls next react typescript tailwindcss qr-code-styling`.

- Next.js (**App Router**, con `src/`), React, **TypeScript**, ESLint, Turbopack
- **Tailwind CSS v4** (`@import "tailwindcss"` en `globals.css`)
- `qr-code-styling`: única librería de QR (dibuja la vista previa y exporta)
- Sin base de datos, sin API routes, sin Server Actions, sin autenticación
- Alias de imports: `@/*` → `src/*`

## 3. Estructura

```
src/
├── app/                    ← router "tonto": solo rutas, layout y metadata
│   ├── layout.tsx
│   ├── page.tsx            ← "/" = landing + generador
│   └── globals.css         ← tema claro forzado (color-scheme: light)
└── features/
    └── qr/
        ├── index.ts        ← API pública (único punto de import desde fuera)
        ├── types.ts        ← QR_TYPES, QrType, QrValues, QrStyle, DEFAULT_STYLE
        ├── components/
        │   ├── qr-view.tsx         ← Server Component (título, textos SEO)
        │   ├── qr-generator.tsx    ← "use client": estado y orquestación
        │   ├── qr-preview.tsx      ← dibuja el QR (import dinámico de la librería)
        │   ├── qr-form.tsx         ← formulario genérico dibujado desde config
        │   ├── type-selector.tsx, color-panel.tsx, shape-panel.tsx,
        │   │   logo-panel.tsx, contrast-warning.tsx,
        │   │   download-buttons.tsx, download-options.tsx
        └── lib/            ← funciones puras y datos de configuración
            ├── payloads.ts        ← formulario → texto que va dentro del QR
            ├── form-config.ts     ← campos y defaults de cada tipo
            ├── style-options.ts   ← puntos/esquinas → nombres de la librería
            ├── qr-options.ts      ← buildQrOptions() (preview y export)
            ├── export-options.ts  ← formatos, tamaños, límites
            ├── export-qr.ts       ← downloadQr()
            ├── contrast.ts        ← ratio de contraste WCAG
            └── image.ts           ← valida y redimensiona el logo
```

## 4. Rendering

- `app/page.tsx` es un **Server Component**: define `metadata` y renderiza `<QrView />`. No usa `cookies()`/`headers()`, así que la página se prerenderiza y el HTML llega completo al crawler.
- `qr-view.tsx` es Server Component (todo el contenido de SEO vive aquí o en componentes de servidor).
- Solo la parte interactiva es `"use client"`: `qr-generator` y sus paneles. Es una "isla" dentro de la landing.
- `qr-code-styling` necesita el navegador: se importa con `await import("qr-code-styling")` dentro de `useEffect` o de handlers. Fuera de eso, solo `import type`.

## 5. Comandos

```powershell
npm run dev            # desarrollo en http://localhost:3000
npm run build          # build de producción (valida tipos y rutas)
npm run start          # sirve el build
npm run lint           # ESLint
npx tsc --noEmit       # chequeo de tipos
```

No hay tests configurados. Verificación manual obligatoria: **escanear con un celular** el QR descargado (PNG y SVG).

## 6. Convenciones

- Archivos en `kebab-case`; componentes en `PascalCase` con **export nombrado** (sin `default`, salvo `page.tsx`/`layout.tsx`).
- Cada feature vive en `src/features/<nombre>/` con `components/`, `lib/`, `types.ts` e `index.ts`. Desde `app/` u otras features se importa **solo** desde `@/features/<nombre>`.
- La lógica de negocio va en `lib/` como **funciones puras** (sin React ni DOM). Los componentes solo renderizan y manejan estado.
- Lo configurable se define **como datos** (`form-config`, `style-options`, `export-options`), no con JSX repetido.
- Estado local con `useState`; sin librerías de estado global. Todos los valores de formulario son `string` (`QrValues`).
- Estilos: solo clases de Tailwind. Tema claro, acento `indigo`, tarjetas `rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`, inputs `rounded-xl border-slate-300 focus:ring-4 focus:ring-indigo-100`.
- Todo `<button>` lleva `type="button"` y `cursor-pointer` (Tailwind v4 ya no lo pone).
- Accesibilidad: `label` con `htmlFor`, `aria-pressed` en botones tipo toggle, `role="alert"` en errores y avisos.
- Textos de UI y comentarios en **español**.

## 7. Reglas: lo que NO se debe hacer

- No poner lógica ni UI en `src/app/`; solo rutas, metadata y composición.
- No agregar `"use client"` a `qr-view.tsx` ni a contenido SEO.
- No importar `qr-code-styling` (valor) en el nivel superior de un módulo: rompe el render en servidor.
- No construir las opciones del QR en dos sitios: **siempre** `buildQrOptions()` (vista previa y descarga deben coincidir).
- No subir logos ni datos del usuario a ningún servidor; no usar `localStorage` para datos del QR.
- No crear rutas duplicadas con el mismo contenido (se eliminó `/qr` por SEO).
- No agregar modo oscuro ni dependencias nuevas sin necesidad.
- No exportar a más de 4096 px (`MAX_SIZE`): falla en celulares.
- No dejar un tipo de QR a medias: `QrType` obliga a completar `form-config` y `payloads` (si TypeScript marca error, falta uno).
- Con logo, mantener `errorCorrectionLevel: "H"`; sin logo, `"M"`.

## 8. Cómo agregar cosas

### Nuevo tipo de QR (ej. `paypal`)

1. `types.ts`: agregar `"paypal"` a `QR_TYPES`.
2. `lib/form-config.ts`: agregar la entrada (TypeScript la exige):
   ```ts
   paypal: {
     label: "PayPal",
     fields: [{ name: "user", label: "Usuario", input: "text" }],
     defaults: { user: "" },
   },
   ```
3. `lib/payloads.ts`: agregar el builder (devuelve `""` si los datos son inválidos):
   ```ts
   paypal: (v) => (clean(v.user) ? `https://paypal.me/${clean(v.user)}` : ""),
   ```
4. Probar en `npm run dev` y escanear.

### Nueva página (ej. `/guia`)

1. Crear `src/features/guia/components/guia-view.tsx` (Server Component) y `src/features/guia/index.ts` con `export { GuiaView } from "./components/guia-view";`
2. Crear `src/app/guia/page.tsx`:
   ```tsx
   import type { Metadata } from "next";
   import { GuiaView } from "@/features/guia";

   export const metadata: Metadata = {
     title: "Título único de la página",
     description: "Descripción única, 150-160 caracteres.",
     alternates: { canonical: "/guia" },
   };

   export default function GuiaPage() {
     return <GuiaView />;
   }
   ```
3. Agregarla al `sitemap` y enlazarla desde la landing.

### Nuevo estilo de puntos o esquinas

1. `types.ts`: ampliar `DotStyle` o `CornerStyle`.
2. `lib/style-options.ts`: agregar una línea en `DOT_STYLES` o `CORNER_STYLES` con el tipo equivalente de la librería.

### Nuevo formato o tamaño de descarga

1. `lib/export-options.ts`: ampliar `ExportFormat` y `FORMAT_OPTIONS`, o `SIZE_PRESETS`.
2. Verificar que la extensión sea soportada por `qr.download()` en `lib/export-qr.ts`.
