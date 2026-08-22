import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { PrismResolverForm } from "@/components/calculators/PrismResolverForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("resolucion-prisma")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function ResolucionPrismaPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Combina un prisma horizontal y uno vertical en un único prisma resultante, con su ángulo y dirección."
      explicacion={
        <>
          <h2>¿Cuándo se combinan prismas?</h2>
          <p>
            Cuando una prescripción incluye prisma tanto horizontal como vertical, o cuando el
            descentramiento de una lente induce componentes en ambos ejes, conviene expresar el
            efecto total como un único prisma oblicuo con su magnitud y dirección.
          </p>
          <h2>Fórmula aplicada</h2>
          <ul>
            <li>Prisma resultante = √(H² + V²)</li>
            <li>Ángulo = tan⁻¹(V / H)</li>
          </ul>
          <p>
            Donde H es la magnitud del prisma horizontal y V la del prisma vertical. La dirección
            final se determina combinando la base horizontal (interna/externa) con la base
            vertical (superior/inferior).
          </p>
        </>
      }
    >
      <PrismResolverForm />
    </CalculatorPageLayout>
  );
}
