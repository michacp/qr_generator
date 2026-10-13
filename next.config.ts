import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración de Turbopack para Tailwind (si la necesitas)
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;