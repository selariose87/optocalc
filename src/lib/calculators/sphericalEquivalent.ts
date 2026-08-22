import { round2 } from "@/lib/format";

export interface SphericalEquivalentInput {
  esfera: number;
  cilindro: number;
}

export interface SphericalEquivalentResult {
  equivalenteEsferico: number;
}

export function calcularEquivalenteEsferico({
  esfera,
  cilindro,
}: SphericalEquivalentInput): SphericalEquivalentResult {
  return { equivalenteEsferico: round2(esfera + cilindro / 2) };
}

export function avisosSphericalEquivalent({
  esfera,
  cilindro,
}: SphericalEquivalentInput): string[] {
  const avisos: string[] = [];
  if (Math.abs(esfera) > 25)
    avisos.push("La esfera introducida está fuera del rango habitual (±25 D).");
  if (Math.abs(cilindro) > 10)
    avisos.push("El cilindro introducido está fuera del rango habitual (±10 D).");
  return avisos;
}
