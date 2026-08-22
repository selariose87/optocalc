import { round2 } from "@/lib/format";
import type { BaseHorizontal, BaseVertical } from "./prismResolver";

export interface PrismaComponente {
  horizontal: number;
  baseHorizontal: BaseHorizontal;
  vertical: number;
  baseVertical: BaseVertical;
}

export interface SumaPrismasResult {
  horizontal: number;
  baseHorizontal: BaseHorizontal;
  vertical: number;
  baseVertical: BaseVertical;
  resultante: number;
}

function aComponentesXY(p: PrismaComponente): { x: number; y: number } {
  const x = p.baseHorizontal === "BO" ? p.horizontal : -p.horizontal;
  const y = p.baseVertical === "BS" ? p.vertical : -p.vertical;
  return { x, y };
}

export function sumarPrismas(
  prisma1: PrismaComponente,
  prisma2: PrismaComponente
): SumaPrismasResult {
  const c1 = aComponentesXY(prisma1);
  const c2 = aComponentesXY(prisma2);
  const x = c1.x + c2.x;
  const y = c1.y + c2.y;

  return {
    horizontal: round2(Math.abs(x)),
    baseHorizontal: x >= 0 ? "BO" : "BI",
    vertical: round2(Math.abs(y)),
    baseVertical: y >= 0 ? "BS" : "BI_V",
    resultante: round2(Math.sqrt(x * x + y * y)),
  };
}

export function avisosSumaPrismas(prisma1: PrismaComponente, prisma2: PrismaComponente): string[] {
  const fueraDeRango = [prisma1, prisma2].some(
    (p) => Math.abs(p.horizontal) > 15 || Math.abs(p.vertical) > 15
  );
  return fueraDeRango
    ? ["Alguno de los prismas introducidos está fuera del rango habitual (0-15 Δ)."]
    : [];
}
