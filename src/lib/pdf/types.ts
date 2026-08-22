import type { ReportField } from "@/lib/calculators/types";
import type { OpticaSettings } from "@/lib/opticaSettings";

export interface ReportSection {
  calculatorTitle: string;
  entradas: ReportField[];
  resultados: ReportField[];
  notas?: string[];
}

export interface ReportData {
  optica: OpticaSettings;
  pacienteNombre?: string;
  fecha?: string;
  sections: ReportSection[];
}
