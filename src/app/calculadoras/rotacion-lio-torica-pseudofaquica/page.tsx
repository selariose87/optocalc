import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { RotacionLioToricaForm } from "@/components/calculators/RotacionLioToricaForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("rotacion-lio-torica-pseudofaquica")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function RotacionLioToricaPseudofaquicaPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Estima el astigmatismo residual inducido cuando un LIO tórico pseudofáquico (tras cirugía de cataratas) queda rotado respecto al eje previsto."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            Tras implantar un LIO tórico en cirugía de cataratas, una desalineación respecto al
            eje planificado reduce el efecto corrector del cilindro e induce astigmatismo
            residual. Esta calculadora estima ese efecto a partir del cilindro del lente y los
            grados de rotación.
          </p>
          <h2>Fórmula aplicada</h2>
          <p>Astigmatismo residual (D) = 2 × Cilindro del LIO × sen(grados de rotación)</p>
          <p>
            Cada grado de rotación supone aproximadamente un 3,3% de pérdida de cilindro
            corrector; a partir de 30° de rotación el LIO tórico deja de aportar beneficio frente
            a no corregir el astigmatismo.
          </p>
        </>
      }
    >
      <RotacionLioToricaForm calculatorTitle={meta.title} />
    </CalculatorPageLayout>
  );
}
