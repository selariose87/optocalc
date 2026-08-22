import { round2 } from "@/lib/format";

export interface AdicionEdadInput {
  edad: number;
}

export interface AdicionEdadResult {
  requiereAdicion: boolean;
  rangoMin: number | null;
  rangoMax: number | null;
  amplitudAcomodacion: number;
  mensaje?: string;
}

interface TramoEdad {
  min: number;
  max: number;
  rango: [number, number];
}

const TABLA_ADICION: TramoEdad[] = [
  { min: 40, max: 44, rango: [0.75, 1.0] },
  { min: 45, max: 49, rango: [1.25, 1.5] },
  { min: 50, max: 54, rango: [1.75, 2.0] },
  { min: 55, max: 59, rango: [2.25, 2.5] },
  { min: 60, max: 200, rango: [2.5, 3.0] },
];

export function estimarAdicion({ edad }: AdicionEdadInput): AdicionEdadResult {
  const amplitudAcomodacion = round2(Math.max(0, 15 - 0.25 * edad));

  if (edad < 40) {
    return {
      requiereAdicion: false,
      rangoMin: null,
      rangoMax: null,
      amplitudAcomodacion,
      mensaje:
        "Antes de los 40 años no suele requerirse adición, salvo casos particulares (hipermetropía, esfuerzo visual en cerca elevado, etc.).",
    };
  }

  const tramo =
    TABLA_ADICION.find((t) => edad >= t.min && edad <= t.max) ??
    TABLA_ADICION[TABLA_ADICION.length - 1];

  return {
    requiereAdicion: true,
    rangoMin: tramo.rango[0],
    rangoMax: tramo.rango[1],
    amplitudAcomodacion,
  };
}

export function avisosAdicionEdad({ edad }: AdicionEdadInput): string[] {
  const avisos: string[] = [];
  if (edad < 0 || edad > 110)
    avisos.push("La edad introducida está fuera del rango habitual (0-110 años).");
  return avisos;
}
