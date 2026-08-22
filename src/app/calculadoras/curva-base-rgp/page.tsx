import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { RgpBaseCurveForm } from "@/components/calculators/RgpBaseCurveForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("curva-base-rgp")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function CurvaBaseRgpPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Estima la curva base inicial de una lentilla RGP a partir de las lecturas queratométricas del paciente."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            La selección de la curva base de una lentilla rígida permeable al gas suele partir de
            las lecturas queratométricas (K) del paciente. Esta calculadora ofrece un punto de
            partida habitual: la curva base &quot;on-K&quot;, junto con las opciones ligeramente
            más plana o más curva.
          </p>
          <h2>Fórmula aplicada</h2>
          <ul>
            <li>On-K = K plano</li>
            <li>Ligeramente plana = K plano − 0,50 D</li>
            <li>Ligeramente curva = K plano + 0,50 D</li>
          </ul>
          <p>
            La curva base definitiva depende también de la filosofía de adaptación, la película
            lagrimal y el patrón fluoresceínico observado en consulta.
          </p>
        </>
      }
    >
      <RgpBaseCurveForm />
    </CalculatorPageLayout>
  );
}
