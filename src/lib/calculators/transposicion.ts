import { round2 } from "@/lib/format";

export interface TransposicionInput {
  esfera: number;
  cilindro: number;
  eje: number;
}

export interface TransposicionResult {
  esfera: number;
  cilindro: number;
  eje: number;
}

export function transponer({
  esfera,
  cilindro,
  eje,
}: TransposicionInput): TransposicionResult {
  const nuevaEsfera = round2(esfera + cilindro);
  const nuevoCilindro = round2(-cilindro);
  let nuevoEje = eje + 90;
  if (nuevoEje > 180) nuevoEje -= 180;
  if (nuevoEje <= 0) nuevoEje += 180;
  return { esfera: nuevaEsfera, cilindro: nuevoCilindro, eje: nuevoEje };
}

export function avisosTransposicion({
  esfera,
  cilindro,
  eje,
}: TransposicionInput): string[] {
  const avisos: string[] = [];
  if (Math.abs(esfera) > 25)
    avisos.push("La esfera introducida está fuera del rango habitual (±25 D).");
  if (Math.abs(cilindro) > 10)
    avisos.push("El cilindro introducido está fuera del rango habitual (±10 D).");
  if (eje < 1 || eje > 180)
    avisos.push("El eje debe estar entre 1° y 180°.");
  return avisos;
}
