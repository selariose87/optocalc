import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { BlankSizeForm } from "@/components/calculators/BlankSizeForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("diametro-minimo-bloque")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function DiametroMinimoBloquePage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Calcula el diámetro mínimo de bloque necesario para que una lente monte correctamente en una montura, según la DIP del paciente."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            Al pedir un bloque de lente a laboratorio, especialmente con descentramientos
            importantes o DIP del paciente muy distinta de la DIP de la montura, es necesario
            comprobar que el diámetro del bloque será suficiente para tallar la lente sin que se
            quede corta en algún borde.
          </p>
          <h2>Fórmula aplicada</h2>
          <ul>
            <li>DIP de la montura = A + DBL</li>
            <li>Descentramiento total = |DIP de la montura − DIP del paciente|</li>
            <li>Diámetro mínimo de bloque = ED + Descentramiento total</li>
          </ul>
          <p>
            Pide siempre un bloque ligeramente mayor que el mínimo calculado, para compensar el
            margen de biselado y montaje.
          </p>
        </>
      }
    >
      <BlankSizeForm />
    </CalculatorPageLayout>
  );
}
