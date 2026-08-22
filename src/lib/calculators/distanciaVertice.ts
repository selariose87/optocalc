import { round2 } from "@/lib/format";

export type SentidoDistanciaVertice = "gafa-a-lentilla" | "lentilla-a-gafa";

export interface DistanciaVerticeInput {
  potencia: number;
  distanciaMm: number;
  sentido: SentidoDistanciaVertice;
}

export interface DistanciaVerticeResult {
  potenciaCompensada: number | null;
  error?: string;
}

export function compensarDistanciaVertice({
  potencia,
  distanciaMm,
  sentido,
}: DistanciaVerticeInput): DistanciaVerticeResult {
  const dMetros = distanciaMm / 1000;
  const dConSigno = sentido === "gafa-a-lentilla" ? dMetros : -dMetros;
  const denominador = 1 - dConSigno * potencia;

  if (Math.abs(denominador) < 1e-6) {
    return {
      potenciaCompensada: null,
      error:
        "El resultado no es calculable con estos valores (denominador próximo a cero).",
    };
  }

  return { potenciaCompensada: round2(potencia / denominador) };
}

export function avisosDistanciaVertice({
  potencia,
  distanciaMm,
}: Pick<DistanciaVerticeInput, "potencia" | "distanciaMm">): string[] {
  const avisos: string[] = [];
  if (Math.abs(potencia) > 20)
    avisos.push("La potencia introducida está fuera del rango habitual (±20 D).");
  if (distanciaMm < 0 || distanciaMm > 20)
    avisos.push(
      "La distancia al vértice introducida está fuera del rango habitual (0-20 mm)."
    );
  return avisos;
}
