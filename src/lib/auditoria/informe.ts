import { PESOS } from "./pesos";
import { TEXTOS } from "./recomendaciones";
import type { ChequeoParcial } from "./checksOnPage";
import type { CheckResult, InformeAuditoria } from "./types";

export function ensamblarInforme(url: string, chequeos: ChequeoParcial[]): InformeAuditoria {
  const checks: CheckResult[] = chequeos.map((c) => {
    const peso = PESOS[c.id];
    const textos = TEXTOS[c.id];
    const pointsEarned = Math.round(peso * c.fraccion * 10) / 10;
    return {
      id: c.id,
      label: textos.label,
      weight: peso,
      pointsEarned,
      passed: c.passed,
      detail: c.detail,
      mensaje: c.passed ? textos.ok : textos.fail,
    };
  });

  const puntuacion = Math.round(checks.reduce((suma, c) => suma + c.pointsEarned, 0));

  return {
    url,
    puntuacion: Math.min(100, Math.max(0, puntuacion)),
    checks,
    generadoEl: new Date().toISOString(),
  };
}
