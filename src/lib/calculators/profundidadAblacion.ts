import { round2 } from "@/lib/format";

export interface ProfundidadAblacionInput {
  correccion: number;
  zonaOptica: number;
}

export interface ProfundidadAblacionResult {
  profundidadMicras: number;
}

// Fórmula de Munnerlyn (miopía): profundidad (µm) = corrección (D) × zona óptica (mm)² / 3
export function calcularProfundidadAblacion({
  correccion,
  zonaOptica,
}: ProfundidadAblacionInput): ProfundidadAblacionResult {
  return { profundidadMicras: round2((correccion * zonaOptica ** 2) / 3) };
}

export function avisosProfundidadAblacion({
  correccion,
  zonaOptica,
}: ProfundidadAblacionInput): string[] {
  const avisos: string[] = [];
  if (correccion <= 0 || correccion > 12)
    avisos.push("La corrección introducida está fuera del rango habitual (0.25-12 D).");
  if (zonaOptica < 5 || zonaOptica > 8)
    avisos.push("La zona óptica introducida está fuera del rango habitual (5-8 mm).");
  return avisos;
}
