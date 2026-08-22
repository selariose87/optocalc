import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { DistanciaVerticeForm } from "@/components/calculators/DistanciaVerticeForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("distancia-al-vertice")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function DistanciaVerticePage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Compensa la potencia de una lente al cambiar su distancia al vértice, por ejemplo al pasar de gafa a lentilla de contacto."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            A partir de una determinada potencia, la distometría permite estimar la potencia
            equivalente cuando la lente se sitúa a otra distancia del ojo. Es especialmente
            relevante en graduaciones elevadas, donde pequeñas diferencias de distancia al vértice
            afectan de forma significativa a la potencia efectiva.
          </p>
          <h2>Fórmula aplicada</h2>
          <p>Potencia compensada = Potencia / (1 − (d × Potencia))</p>
          <p>
            Donde <strong>d</strong> es la diferencia de distancia al vértice expresada en metros
            (introducida en milímetros en el formulario).
          </p>
        </>
      }
    >
      <DistanciaVerticeForm />
    </CalculatorPageLayout>
  );
}
