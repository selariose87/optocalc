import { round2 } from "@/lib/format";

export interface EsferocilindricaVectorialInput {
  esfera: number;
  cilindro: number;
  eje: number;
}

export interface EsferocilindricaVectorialResult {
  m: number;
  j0: number;
  j45: number;
}

export function calcularVectorPotencia({
  esfera,
  cilindro,
  eje,
}: EsferocilindricaVectorialInput): EsferocilindricaVectorialResult {
  const radianes = (2 * eje * Math.PI) / 180;
  return {
    m: round2(esfera + cilindro / 2),
    j0: round2(-(cilindro / 2) * Math.cos(radianes)),
    j45: round2(-(cilindro / 2) * Math.sin(radianes)),
  };
}

export function avisosEsferocilindricaVectorial({
  esfera,
  cilindro,
  eje,
}: EsferocilindricaVectorialInput): string[] {
  const avisos: string[] = [];
  if (Math.abs(esfera) > 25)
    avisos.push("La esfera introducida está fuera del rango habitual (±25 D).");
  if (cilindro > 0)
    avisos.push("Esta calculadora usa convenio de cilindro negativo; transpón la graduación si la tienes en cilindro positivo.");
  if (Math.abs(cilindro) > 10)
    avisos.push("El cilindro introducido está fuera del rango habitual (±10 D).");
  if (eje < 1 || eje > 180) avisos.push("El eje debe estar entre 1° y 180°.");
  return avisos;
}
