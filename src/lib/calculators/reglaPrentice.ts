import { round2 } from "@/lib/format";

export interface PrenticeInput {
  descentramientoMm: number;
  potencia: number;
}

export interface PrenticeResult {
  prisma: number;
}

export function calcularPrentice({
  descentramientoMm,
  potencia,
}: PrenticeInput): PrenticeResult {
  const descentramientoCm = descentramientoMm / 10;
  const prisma = round2(Math.abs(descentramientoCm * potencia));
  return { prisma };
}

export function avisosPrentice({
  descentramientoMm,
  potencia,
}: PrenticeInput): string[] {
  const avisos: string[] = [];
  if (descentramientoMm < 0 || descentramientoMm > 15)
    avisos.push(
      "El descentramiento introducido está fuera del rango habitual (0-15 mm)."
    );
  if (Math.abs(potencia) > 20)
    avisos.push("La potencia introducida está fuera del rango habitual (±20 D).");
  return avisos;
}
