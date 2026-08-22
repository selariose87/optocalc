import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { SumaPrismasForm } from "@/components/calculators/SumaPrismasForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("suma-prismas")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function SumaPrismasPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Combina dos prismas, cada uno con su componente horizontal y vertical, en un único prisma resultante."
      explicacion={
        <>
          <h2>¿Cuándo se suman prismas?</h2>
          <p>
            Al combinar el prisma de una prescripción con el prisma inducido por un
            descentramiento, o al comparar dos correcciones prismáticas, es necesario sumarlas
            algebraicamente teniendo en cuenta la base de cada una.
          </p>
          <h2>Cómo se calcula</h2>
          <p>
            Cada prisma se descompone en un componente horizontal (positivo hacia base externa,
            negativo hacia base interna) y uno vertical (positivo hacia base superior, negativo
            hacia base inferior). Los componentes de ambos prismas se suman por separado y el
            resultado se expresa de nuevo como magnitud y base.
          </p>
        </>
      }
    >
      <SumaPrismasForm />
    </CalculatorPageLayout>
  );
}
