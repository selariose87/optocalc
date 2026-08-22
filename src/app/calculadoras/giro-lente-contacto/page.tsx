import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { GiroLenteContactoForm } from "@/components/calculators/GiroLenteContactoForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("giro-lente-contacto")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function GiroLenteContactoPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Aplica la regla LARS para calcular el nuevo eje a pedir según la rotación observada de una lentilla tórica."
      explicacion={
        <>
          <h2>¿Cuándo se usa?</h2>
          <p>
            Al adaptar una lentilla de contacto tórica, la marca de estabilización puede
            observarse rotada respecto a la posición esperada. La regla LARS permite calcular el
            nuevo eje a pedir para compensar esa rotación.
          </p>
          <h2>Regla aplicada</h2>
          <p>
            LARS: Left Add, Right Subtract. Si la marca gira hacia la izquierda del paciente, se
            suma la rotación al eje pedido; si gira hacia la derecha, se resta.
          </p>
        </>
      }
    >
      <GiroLenteContactoForm />
    </CalculatorPageLayout>
  );
}
