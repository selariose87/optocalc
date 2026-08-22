import { round2 } from "@/lib/format";

export interface RgpBaseCurveInput {
  kPlano: number;
  kCurvo: number;
}

export interface RgpBaseCurveResult {
  onK: number;
  ligeramentePlana: number;
  ligeramenteCurva: number;
  astigmatismoCorneal: number;
}

export function calcularCurvaBaseRgp({
  kPlano,
  kCurvo,
}: RgpBaseCurveInput): RgpBaseCurveResult {
  return {
    onK: round2(kPlano),
    ligeramentePlana: round2(kPlano - 0.5),
    ligeramenteCurva: round2(kPlano + 0.5),
    astigmatismoCorneal: round2(kCurvo - kPlano),
  };
}

export function avisosRgpBaseCurve({ kPlano, kCurvo }: RgpBaseCurveInput): string[] {
  const avisos: string[] = [];
  if (kPlano > kCurvo)
    avisos.push("El K plano debería ser el valor más bajo de los dos queratométricos.");
  if (kPlano < 38 || kPlano > 50)
    avisos.push("El K plano introducido está fuera del rango habitual (38-50 D).");
  if (kCurvo < 38 || kCurvo > 50)
    avisos.push("El K curvo introducido está fuera del rango habitual (38-50 D).");
  return avisos;
}
