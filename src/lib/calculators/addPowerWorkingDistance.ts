import { round2 } from "@/lib/format";

export interface AddPowerWorkingDistanceInput {
  distanciaTrabajoCm: number;
  edad: number;
}

export interface AddPowerWorkingDistanceResult {
  demandaTotal: number;
  amplitudAcomodacion: number;
  adicionEstimada: number;
}

export function calcularAdicionPorDistancia({
  distanciaTrabajoCm,
  edad,
}: AddPowerWorkingDistanceInput): AddPowerWorkingDistanceResult {
  const demandaTotal = round2(100 / distanciaTrabajoCm);
  const amplitudAcomodacion = round2(Math.max(0, 15 - 0.25 * edad));
  const adicionEstimada = round2(Math.max(0, demandaTotal - amplitudAcomodacion / 2));
  return { demandaTotal, amplitudAcomodacion, adicionEstimada };
}

export function avisosAddPowerWorkingDistance({
  distanciaTrabajoCm,
  edad,
}: AddPowerWorkingDistanceInput): string[] {
  const avisos: string[] = [];
  if (distanciaTrabajoCm < 20 || distanciaTrabajoCm > 100)
    avisos.push("La distancia de trabajo introducida está fuera del rango habitual (20-100 cm).");
  if (edad < 0 || edad > 110)
    avisos.push("La edad introducida está fuera del rango habitual (0-110 años).");
  return avisos;
}
