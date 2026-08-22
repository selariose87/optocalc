import type { ReportField } from "@/lib/calculators/types";
import type { OpticaSettings } from "@/lib/opticaSettings";

export interface ReportData {
  calculatorTitle: string;
  optica: OpticaSettings;
  pacienteNombre?: string;
  fecha?: string;
  entradas: ReportField[];
  resultados: ReportField[];
  notas?: string[];
}
