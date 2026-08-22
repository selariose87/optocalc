import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { ConversionAvForm } from "@/components/calculators/ConversionAvForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("conversion-av")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function ConversionAvPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Convierte un valor de agudeza visual entre notación Snellen (pies y metros), decimal y logMAR."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            Distintos optotipos y publicaciones expresan la agudeza visual en notaciones
            distintas. Esta calculadora permite pasar de una a otra de forma instantánea para
            comparar resultados o registrar la agudeza en el formato que necesites.
          </p>
          <h2>Fórmulas aplicadas</h2>
          <ul>
            <li>Decimal = numerador / denominador de Snellen</li>
            <li>logMAR = −log₁₀(decimal)</li>
            <li>Snellen (pies) = 20 / decimal · Snellen (metros) = 6 / decimal</li>
          </ul>
        </>
      }
    >
      <ConversionAvForm />
    </CalculatorPageLayout>
  );
}
