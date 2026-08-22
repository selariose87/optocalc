import { round2 } from "@/lib/format";

export interface OverRefractionInput {
  potenciaPrueba: number;
  overSphere: number;
  overCilindro: number;
}

export interface OverRefractionResult {
  equivalenteEsfericoOverRx: number;
  potenciaFinal: number;
}

export function calcularSobrerrefraccion({
  potenciaPrueba,
  overSphere,
  overCilindro,
}: OverRefractionInput): OverRefractionResult {
  const equivalenteEsfericoOverRx = round2(overSphere + overCilindro / 2);
  const potenciaFinal = round2(potenciaPrueba + equivalenteEsfericoOverRx);
  return { equivalenteEsfericoOverRx, potenciaFinal };
}

export function avisosOverRefraction({
  potenciaPrueba,
  overSphere,
  overCilindro,
}: OverRefractionInput): string[] {
  const avisos: string[] = [];
  if (Math.abs(potenciaPrueba) > 20)
    avisos.push("La potencia de la lentilla de prueba está fuera del rango habitual (±20 D).");
  if (Math.abs(overSphere) > 10)
    avisos.push("La esfera de la sobrerrefracción está fuera del rango habitual (±10 D).");
  if (Math.abs(overCilindro) > 6)
    avisos.push("El cilindro de la sobrerrefracción está fuera del rango habitual (±6 D).");
  return avisos;
}
