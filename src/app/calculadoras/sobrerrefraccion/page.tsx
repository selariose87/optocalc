import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { OverRefractionForm } from "@/components/calculators/OverRefractionForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("sobrerrefraccion")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function SobrerrefraccionPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Calcula la potencia final de una lentilla de contacto a partir de la lentilla de prueba y el resultado de la sobrerrefracción."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            Al adaptar una lentilla de contacto se coloca una lentilla de prueba y se refina el
            resultado con una sobrerrefracción sobre gafa de prueba. Este cálculo traduce esa
            sobrerrefracción a la potencia final que debe pedirse.
          </p>
          <h2>Fórmula aplicada</h2>
          <p>Potencia final = Potencia de la lentilla de prueba + Equivalente esférico de la sobrerrefracción</p>
          <p>
            Donde el equivalente esférico de la sobrerrefracción es Esfera + Cilindro / 2. Si la
            sobrerrefracción es puramente esférica, se usa directamente el valor de la esfera.
          </p>
        </>
      }
    >
      <OverRefractionForm />
    </CalculatorPageLayout>
  );
}
