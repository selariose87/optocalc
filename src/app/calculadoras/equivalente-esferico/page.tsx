import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { SphericalEquivalentForm } from "@/components/calculators/SphericalEquivalentForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("equivalente-esferico")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function EquivalenteEsfericoPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Calcula el equivalente esférico de una graduación con esfera y cilindro."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            El equivalente esférico resume una graduación astigmática en un único valor esférico,
            útil para adaptar lentillas esféricas, comparar prescripciones rápidamente o hacer una
            primera estimación sin trabajar con el cilindro.
          </p>
          <h2>Fórmula aplicada</h2>
          <p>Equivalente esférico = Esfera + Cilindro / 2</p>
        </>
      }
    >
      <SphericalEquivalentForm />
    </CalculatorPageLayout>
  );
}
