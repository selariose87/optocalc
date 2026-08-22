import { round2 } from "@/lib/format";

export type SentidoDioptriasMm = "d-a-mm" | "mm-a-d";

export interface DioptriasMmInput {
  valor: number;
  sentido: SentidoDioptriasMm;
}

export interface DioptriasMmResult {
  resultado: number | null;
  error?: string;
}

export function convertirDioptriasMm({ valor }: DioptriasMmInput): DioptriasMmResult {
  if (valor === 0) {
    return { resultado: null, error: "El valor no puede ser 0." };
  }
  return { resultado: round2(1000 / valor) };
}

export function avisosDioptriasMm({ valor, sentido }: DioptriasMmInput): string[] {
  const avisos: string[] = [];
  if (sentido === "d-a-mm" && Math.abs(valor) > 30)
    avisos.push("La potencia introducida está fuera del rango habitual (±30 D).");
  if (sentido === "mm-a-d" && (Math.abs(valor) < 10 || Math.abs(valor) > 2000))
    avisos.push("La distancia introducida está fuera del rango habitual (10-2000 mm).");
  return avisos;
}
