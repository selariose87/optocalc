import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { LensPowerForm } from "@/components/calculators/LensPowerForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("potencia-lente")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function PotenciaLentePage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Calcula la potencia total de una lente a partir de la potencia de su cara frontal y posterior."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            En una lente delgada, la potencia total puede aproximarse como la suma de la potencia
            de cada una de sus superficies. Es una simplificación útil de la fórmula del
            fabricante de lentes, habitual al verificar la potencia resultante de una combinación
            de curvas.
          </p>
          <h2>Fórmula aplicada</h2>
          <p>Potencia total (D) = F1 + F2</p>
          <p>
            Donde F1 es la potencia de la cara frontal y F2 la de la cara posterior. Esta versión
            simplificada asume una lente delgada, donde el grosor es despreciable.
          </p>
        </>
      }
    >
      <LensPowerForm />
    </CalculatorPageLayout>
  );
}
