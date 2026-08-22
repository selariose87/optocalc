import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { TransposicionForm } from "@/components/calculators/TransposicionForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("transposicion")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function TransposicionPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Convierte una graduación de cilindro positivo a negativo, o viceversa, sin errores de cálculo."
      explicacion={
        <>
          <h2>¿Cuándo se usa la transposición de graduación?</h2>
          <p>
            La transposición permite expresar la misma graduación con el cilindro en notación
            positiva o negativa, algo habitual al comparar prescripciones, introducir datos en un
            biselador o adaptar la receta al criterio del laboratorio.
          </p>
          <h2>Fórmula aplicada</h2>
          <ul>
            <li>Nueva esfera = esfera + cilindro</li>
            <li>Nuevo cilindro = −cilindro</li>
            <li>Nuevo eje = eje ± 90° (ajustado al rango 1°–180°)</li>
          </ul>
        </>
      }
    >
      <TransposicionForm />
    </CalculatorPageLayout>
  );
}
