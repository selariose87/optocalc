import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { ReglaPrenticeForm } from "@/components/calculators/ReglaPrenticeForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("regla-prentice")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function ReglaPrenticePage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Calcula el prisma inducido por un descentramiento respecto al centro óptico de la lente."
      explicacion={
        <>
          <h2>¿Cuándo se aplica la regla de Prentice?</h2>
          <p>
            Cualquier punto de una lente distinto de su centro óptico induce un efecto prismático.
            La regla de Prentice permite calcular la magnitud de ese prisma a partir del
            descentramiento y de la potencia de la lente, algo útil al montar lentes
            descentradas o al valorar el efecto prismático de una montura mal centrada.
          </p>
          <h2>Fórmula aplicada</h2>
          <p>Prisma (Δ) = c (cm) × F (D)</p>
          <p>
            Donde <strong>c</strong> es el descentramiento expresado en centímetros (introducido en
            milímetros en el formulario) y <strong>F</strong> la potencia de la lente en dioptrías.
          </p>
        </>
      }
    >
      <ReglaPrenticeForm />
    </CalculatorPageLayout>
  );
}
