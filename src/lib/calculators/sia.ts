import { round2, roundTo } from "@/lib/format";

export interface SiaInput {
  k1: number;
  alpha1: number;
  k2: number;
  alpha2: number;
}

export interface SiaResult {
  sia: number;
  eje: number;
}

// Método vectorial (Alpins/Naeser): descompone cada cilindro en componentes
// x/y a partir del eje doblado (2α), y calcula el vector diferencia.
export function calcularSIA({ k1, alpha1, k2, alpha2 }: SiaInput): SiaResult {
  const rad1 = (2 * alpha1 * Math.PI) / 180;
  const rad2 = (2 * alpha2 * Math.PI) / 180;

  const x1 = k1 * Math.cos(rad1);
  const y1 = k1 * Math.sin(rad1);
  const x2 = k2 * Math.cos(rad2);
  const y2 = k2 * Math.sin(rad2);

  const xSia = x2 - x1;
  const ySia = y2 - y1;

  const sia = Math.sqrt(xSia ** 2 + ySia ** 2);
  let eje = (0.5 * Math.atan2(ySia, xSia) * 180) / Math.PI;
  if (eje <= 0) eje += 180;

  return { sia: round2(sia), eje: roundTo(eje, 1) };
}

export function avisosSia({ k1, k2 }: SiaInput): string[] {
  const avisos: string[] = [];
  if (k1 < 0 || k1 > 10) avisos.push("El cilindro preoperatorio está fuera del rango habitual (0-10 D).");
  if (k2 < 0 || k2 > 10) avisos.push("El cilindro postoperatorio está fuera del rango habitual (0-10 D).");
  return avisos;
}
