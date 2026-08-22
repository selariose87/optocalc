import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { SiaForm } from "@/components/calculators/SiaForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("astigmatismo-inducido-sia")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function AstigmatismoInducidoSiaPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Calcula la magnitud y el eje del astigmatismo inducido por una cirugía, a partir del cilindro pre y postoperatorio."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            El SIA (Surgically Induced Astigmatism) mide el cambio astigmático real producido por
            una cirugía (cataratas, refractiva, trasplante de córnea...), teniendo en cuenta tanto
            la magnitud como el eje del cilindro antes y después de la intervención.
          </p>
          <h2>Fórmula aplicada (método vectorial)</h2>
          <p>SIA = √(K1² + K2² − 2 × K1 × K2 × cos(2 × (α2 − α1)))</p>
          <p>
            Donde K1/α1 son la potencia y el eje del cilindro preoperatorio, y K2/α2 los del
            postoperatorio. El eje del SIA se obtiene descomponiendo cada cilindro en componentes
            según el eje doblado (2α).
          </p>
        </>
      }
    >
      <SiaForm />
    </CalculatorPageLayout>
  );
}
