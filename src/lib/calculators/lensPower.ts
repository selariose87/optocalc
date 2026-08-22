import { round2 } from "@/lib/format";

export interface LensPowerInput {
  curvaFrontal: number;
  curvaPosterior: number;
}

export interface LensPowerResult {
  potenciaTotal: number;
}

export function calcularPotenciaLente({
  curvaFrontal,
  curvaPosterior,
}: LensPowerInput): LensPowerResult {
  return { potenciaTotal: round2(curvaFrontal + curvaPosterior) };
}

export function avisosLensPower({ curvaFrontal, curvaPosterior }: LensPowerInput): string[] {
  const avisos: string[] = [];
  if (Math.abs(curvaFrontal) > 20)
    avisos.push("La curva frontal introducida está fuera del rango habitual (±20 D).");
  if (Math.abs(curvaPosterior) > 20)
    avisos.push("La curva posterior introducida está fuera del rango habitual (±20 D).");
  return avisos;
}
