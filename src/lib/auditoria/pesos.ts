import type { CheckId } from "./types";

// Suman exactamente 100. Más peso en HTTPS, rendimiento/Core Web Vitals y
// mobile-friendly; menos en detalles menores como el favicon.
export const PESOS: Record<CheckId, number> = {
  https: 10,
  rendimiento: 15,
  "core-web-vitals": 10,
  "mobile-friendly": 10,
  titulo: 8,
  "meta-descripcion": 7,
  "h1-unico": 5,
  "jerarquia-encabezados": 3,
  "imagenes-alt": 6,
  viewport: 2,
  lang: 3,
  "open-graph": 5,
  favicon: 1,
  "robots-txt": 3,
  "sitemap-xml": 3,
  "schema-local-business": 6,
  nap: 3,
};
