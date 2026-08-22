import { round2 } from "@/lib/format";

export interface LensThicknessInput {
  potencia: number;
  diametro: number;
  indice: number;
  espesorCentro: number;
}

export interface LensThicknessResult {
  sagita: number;
  espesorBorde: number;
}

export const INDICES_REFRACCION = [
  { value: "1.498", label: "CR-39 (plástico estándar) — 1.498" },
  { value: "1.53", label: "Trivex — 1.53" },
  { value: "1.586", label: "Policarbonato — 1.586" },
  { value: "1.60", label: "Índice 1.60" },
  { value: "1.67", label: "Índice 1.67" },
  { value: "1.74", label: "Índice 1.74" },
];

export function calcularEspesorLente({
  potencia,
  diametro,
  indice,
  espesorCentro,
}: LensThicknessInput): LensThicknessResult {
  const radio = diametro / 2;
  const sagita = round2((radio ** 2 * Math.abs(potencia)) / (2000 * (indice - 1)));
  return { sagita, espesorBorde: round2(espesorCentro + sagita) };
}

export function avisosLensThickness({
  diametro,
  espesorCentro,
}: Pick<LensThicknessInput, "diametro" | "espesorCentro">): string[] {
  const avisos: string[] = [];
  if (diametro < 30 || diametro > 80)
    avisos.push("El diámetro introducido está fuera del rango habitual (30-80 mm).");
  if (espesorCentro < 0.5 || espesorCentro > 6)
    avisos.push("El espesor de centro introducido está fuera del rango habitual (0.5-6 mm).");
  return avisos;
}
