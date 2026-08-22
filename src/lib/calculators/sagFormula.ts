import { round2 } from "@/lib/format";

export interface SagFormulaInput {
  radio: number;
  diametro: number;
}

export interface SagFormulaResult {
  sagita: number | null;
  error?: string;
}

export function calcularSagita({ radio, diametro }: SagFormulaInput): SagFormulaResult {
  const mitadDiametro = diametro / 2;
  const dentroRaiz = radio ** 2 - mitadDiametro ** 2;

  if (dentroRaiz < 0) {
    return {
      sagita: null,
      error: "El diámetro no puede ser mayor que el doble del radio de curvatura.",
    };
  }

  return { sagita: round2(radio - Math.sqrt(dentroRaiz)) };
}

export function avisosSagFormula({ radio, diametro }: SagFormulaInput): string[] {
  const avisos: string[] = [];
  if (radio <= 0) avisos.push("El radio de curvatura debe ser mayor que 0.");
  if (diametro <= 0) avisos.push("El diámetro debe ser mayor que 0.");
  return avisos;
}
