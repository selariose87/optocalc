import type { ReportField } from "@/lib/calculators/types";

export interface InformeItem {
  id: string;
  calculatorTitle: string;
  entradas: ReportField[];
  resultados: ReportField[];
  notas?: string[];
}
