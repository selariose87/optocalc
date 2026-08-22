import { round2 } from "@/lib/format";

export interface BlankSizeInput {
  frameA: number;
  frameDbl: number;
  pacientePd: number;
  diametroEfectivo: number;
}

export interface BlankSizeResult {
  framePd: number;
  descentramientoTotal: number;
  bloqueMinimo: number;
}

export function calcularDiametroMinimoBloque({
  frameA,
  frameDbl,
  pacientePd,
  diametroEfectivo,
}: BlankSizeInput): BlankSizeResult {
  const framePd = round2(frameA + frameDbl);
  const descentramientoTotal = round2(Math.abs(framePd - pacientePd));
  const bloqueMinimo = round2(diametroEfectivo + descentramientoTotal);
  return { framePd, descentramientoTotal, bloqueMinimo };
}

export function avisosBlankSize({
  frameA,
  frameDbl,
  pacientePd,
  diametroEfectivo,
}: BlankSizeInput): string[] {
  const avisos: string[] = [];
  if (frameA < 30 || frameA > 70)
    avisos.push("La medida A de la montura está fuera del rango habitual (30-70 mm).");
  if (frameDbl < 10 || frameDbl > 30)
    avisos.push("La medida DBL de la montura está fuera del rango habitual (10-30 mm).");
  if (pacientePd < 45 || pacientePd > 80)
    avisos.push("La DIP del paciente está fuera del rango habitual (45-80 mm).");
  if (diametroEfectivo < 30 || diametroEfectivo > 70)
    avisos.push("El diámetro efectivo introducido está fuera del rango habitual (30-70 mm).");
  return avisos;
}
