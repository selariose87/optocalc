import { round2 } from "@/lib/format";

export interface RotacionLioToricaInput {
  cilindroLio: number;
  rotacionGrados: number;
}

export interface RotacionLioToricaResult {
  astigmatismoResidual: number;
  porcentajePerdida: number;
}

// Astigmatismo residual (D) = 2 × C × sen(rotación en grados)
export function calcularRotacionLioTorica({
  cilindroLio,
  rotacionGrados,
}: RotacionLioToricaInput): RotacionLioToricaResult {
  const seno = Math.sin((rotacionGrados * Math.PI) / 180);
  return {
    astigmatismoResidual: round2(2 * cilindroLio * seno),
    porcentajePerdida: round2(200 * seno),
  };
}

export function avisosRotacionLioTorica({
  cilindroLio,
  rotacionGrados,
}: RotacionLioToricaInput): string[] {
  const avisos: string[] = [];
  if (cilindroLio <= 0 || cilindroLio > 12)
    avisos.push("El cilindro del LIO introducido está fuera del rango habitual (0.5-12 D).");
  if (rotacionGrados < 0 || rotacionGrados > 90)
    avisos.push("La rotación introducida está fuera del rango habitual (0-90°).");
  return avisos;
}
