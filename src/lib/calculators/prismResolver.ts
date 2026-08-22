import { round2 } from "@/lib/format";

export type BaseHorizontal = "BI" | "BO";
export type BaseVertical = "BS" | "BI_V";

export interface PrismResolverInput {
  horizontal: number;
  baseHorizontal: BaseHorizontal;
  vertical: number;
  baseVertical: BaseVertical;
}

export interface PrismResolverResult {
  resultante: number;
  angulo: number;
  direccion: string;
}

const LABEL_HORIZONTAL: Record<BaseHorizontal, string> = {
  BI: "base interna",
  BO: "base externa",
};

const LABEL_VERTICAL: Record<BaseVertical, string> = {
  BS: "base superior",
  BI_V: "base inferior",
};

export function resolverPrisma({
  horizontal,
  baseHorizontal,
  vertical,
  baseVertical,
}: PrismResolverInput): PrismResolverResult {
  const resultante = round2(Math.sqrt(horizontal ** 2 + vertical ** 2));
  const angulo =
    horizontal === 0
      ? 90
      : round2((Math.atan(Math.abs(vertical) / Math.abs(horizontal)) * 180) / Math.PI);

  const partes: string[] = [];
  if (horizontal !== 0) partes.push(LABEL_HORIZONTAL[baseHorizontal]);
  if (vertical !== 0) partes.push(LABEL_VERTICAL[baseVertical]);

  return {
    resultante,
    angulo,
    direccion: partes.length > 0 ? partes.join(" y ") : "sin componente",
  };
}

export function avisosPrismResolver({ horizontal, vertical }: PrismResolverInput): string[] {
  const avisos: string[] = [];
  if (Math.abs(horizontal) > 10)
    avisos.push("El prisma horizontal introducido está fuera del rango habitual (0-10 Δ).");
  if (Math.abs(vertical) > 10)
    avisos.push("El prisma vertical introducido está fuera del rango habitual (0-10 Δ).");
  return avisos;
}
