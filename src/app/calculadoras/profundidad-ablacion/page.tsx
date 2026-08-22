import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { ProfundidadAblacionForm } from "@/components/calculators/ProfundidadAblacionForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("profundidad-ablacion")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function ProfundidadAblacionPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Estima la profundidad de tejido corneal ablacionado en una corrección miópica mediante la fórmula de Munnerlyn."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            La fórmula de Munnerlyn ofrece una estimación teórica de la profundidad de ablación
            necesaria para una corrección miópica en cirugía refractiva (LASIK/PRK), a partir de
            la corrección y el diámetro de la zona óptica.
          </p>
          <h2>Fórmula aplicada</h2>
          <p>Profundidad (µm) = Corrección (D) × Zona óptica (mm)² / 3</p>
          <p>
            Es una aproximación teórica para corrección miópica; la profundidad real depende de
            la plataforma láser y su nomograma específico.
          </p>
        </>
      }
    >
      <ProfundidadAblacionForm />
    </CalculatorPageLayout>
  );
}
