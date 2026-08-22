import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { DioptriasMilimetrosForm } from "@/components/calculators/DioptriasMilimetrosForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("dioptrias-milimetros")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function DioptriasMilimetrosPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Convierte entre potencia en dioptrías y distancia focal en milímetros, en cualquiera de los dos sentidos."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            La potencia de una lente y su distancia focal son inversamente proporcionales. Esta
            conversión es útil para pasar de la potencia de una lente a su distancia focal
            equivalente, o para saber qué potencia corresponde a una distancia focal concreta.
          </p>
          <h2>Fórmula aplicada</h2>
          <p>Distancia focal (mm) = 1000 / Potencia (D)</p>
          <p>La misma fórmula se aplica en ambos sentidos, ya que es su propia inversa.</p>
        </>
      }
    >
      <DioptriasMilimetrosForm />
    </CalculatorPageLayout>
  );
}
