import { round2, roundTo } from "@/lib/format";

export type NotacionAV = "snellen-pies" | "snellen-metros" | "decimal" | "logmar";

export interface ConversionAvInput {
  valor: number;
  notacion: NotacionAV;
}

export interface ConversionAvResult {
  decimal: number;
  snellenPies: string;
  snellenMetros: string;
  logMar: number;
}

function aDecimal(valor: number, notacion: NotacionAV): number {
  switch (notacion) {
    case "snellen-pies":
      return 20 / valor;
    case "snellen-metros":
      return 6 / valor;
    case "decimal":
      return valor;
    case "logmar":
      return Math.pow(10, -valor);
  }
}

export function convertirAgudezaVisual({ valor, notacion }: ConversionAvInput): ConversionAvResult {
  const decimal = aDecimal(valor, notacion);
  return {
    decimal: round2(decimal),
    snellenPies: `20/${Math.round(20 / decimal)}`,
    snellenMetros: `6/${roundTo(6 / decimal, 1)}`,
    logMar: round2(-Math.log10(decimal)),
  };
}

export function avisosConversionAv({ valor, notacion }: ConversionAvInput): string[] {
  const avisos: string[] = [];
  if (notacion === "decimal" && (valor <= 0 || valor > 3))
    avisos.push("El valor decimal introducido está fuera del rango habitual (0-3).");
  if (notacion === "logmar" && (valor < -0.3 || valor > 3))
    avisos.push("El valor logMAR introducido está fuera del rango habitual (−0.3 a 3.0).");
  if (notacion === "snellen-pies" && (valor < 10 || valor > 800))
    avisos.push("El denominador de Snellen introducido está fuera del rango habitual (10-800).");
  if (notacion === "snellen-metros" && (valor < 3 || valor > 240))
    avisos.push("El denominador de Snellen introducido está fuera del rango habitual (3-240).");
  return avisos;
}
