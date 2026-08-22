import { round2 } from "@/lib/format";

export type DireccionGiro = "izquierda" | "derecha";

export interface GiroLenteContactoInput {
  ejeOriginal: number;
  rotacionGrados: number;
  direccion: DireccionGiro;
}

export interface GiroLenteContactoResult {
  nuevoEje: number;
}

// Regla LARS (Left Add, Right Subtract): si la marca de la lentilla gira
// hacia la izquierda del paciente, se suma la rotación al eje pedido; si
// gira hacia la derecha, se resta.
export function calcularGiroLente({
  ejeOriginal,
  rotacionGrados,
  direccion,
}: GiroLenteContactoInput): GiroLenteContactoResult {
  let nuevoEje =
    direccion === "izquierda" ? ejeOriginal + rotacionGrados : ejeOriginal - rotacionGrados;
  nuevoEje = nuevoEje % 180;
  if (nuevoEje <= 0) nuevoEje += 180;
  return { nuevoEje: round2(nuevoEje) };
}

export function avisosGiroLenteContacto({
  ejeOriginal,
  rotacionGrados,
}: GiroLenteContactoInput): string[] {
  const avisos: string[] = [];
  if (ejeOriginal < 1 || ejeOriginal > 180)
    avisos.push("El eje original debe estar entre 1° y 180°.");
  if (rotacionGrados < 0 || rotacionGrados > 90)
    avisos.push("La rotación introducida está fuera del rango habitual (0-90°).");
  return avisos;
}
