import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { EsferocilindricaVectorialForm } from "@/components/calculators/EsferocilindricaVectorialForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("esferocilindrica-vectorial")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function EsferocilindricaVectorialPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Convierte una graduación esferocilíndrica a los vectores de potencia M, J0 y J45 (método de Thibos)."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            La notación vectorial expresa la graduación como tres componentes ortogonales, útiles
            para promediar prescripciones, comparar cambios entre visitas o realizar análisis
            estadísticos sin las discontinuidades del eje.
          </p>
          <h2>Fórmula aplicada</h2>
          <ul>
            <li>M = Esfera + Cilindro / 2</li>
            <li>J0 = −(Cilindro / 2) × cos(2 × Eje)</li>
            <li>J45 = −(Cilindro / 2) × sin(2 × Eje)</li>
          </ul>
          <p>Se asume convenio de cilindro negativo.</p>
        </>
      }
    >
      <EsferocilindricaVectorialForm />
    </CalculatorPageLayout>
  );
}
