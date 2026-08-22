import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { SagFormulaForm } from "@/components/calculators/SagFormulaForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("sagita")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function SagitaPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Calcula la profundidad (sagita) de una superficie curva a partir de su radio de curvatura y diámetro."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            La sagita es la distancia entre el punto más profundo de una curva óptica y el plano
            que une sus bordes. Se emplea al calcular espesores de lente, adaptar lentillas RGP o
            comparar la curvatura de distintas superficies.
          </p>
          <h2>Fórmula aplicada</h2>
          <p>Sagita = r − √(r² − (d/2)²)</p>
          <p>
            Donde <strong>r</strong> es el radio de curvatura y <strong>d</strong> el diámetro,
            ambos en milímetros.
          </p>
        </>
      }
    >
      <SagFormulaForm />
    </CalculatorPageLayout>
  );
}
