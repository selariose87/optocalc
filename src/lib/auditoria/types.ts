export type CheckId =
  | "https"
  | "rendimiento"
  | "core-web-vitals"
  | "mobile-friendly"
  | "titulo"
  | "meta-descripcion"
  | "h1-unico"
  | "jerarquia-encabezados"
  | "imagenes-alt"
  | "viewport"
  | "lang"
  | "open-graph"
  | "favicon"
  | "robots-txt"
  | "sitemap-xml"
  | "schema-local-business"
  | "nap";

export interface CheckResult {
  id: CheckId;
  label: string;
  weight: number;
  pointsEarned: number;
  passed: boolean;
  detail: string;
  mensaje: string;
}

export interface InformeAuditoria {
  url: string;
  puntuacion: number;
  checks: CheckResult[];
  generadoEl: string;
}
