export type CalculatorCategory =
  | "prisma"
  | "potencia-lente"
  | "medidas"
  | "prescripcion"
  | "lentes-contacto";

export const CATEGORY_LABELS: Record<CalculatorCategory, string> = {
  prisma: "Prisma",
  "potencia-lente": "Potencia de lente",
  medidas: "Medidas",
  prescripcion: "Prescripción",
  "lentes-contacto": "Lentes de contacto",
};

export interface CalculatorMeta {
  slug: string;
  title: string;
  shortDescription: string;
  metaDescription: string;
  keywords: string[];
  category: CalculatorCategory;
  popular?: boolean;
}

export interface ReportField {
  label: string;
  value: string;
}
