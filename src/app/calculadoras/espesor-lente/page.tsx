import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { LensThicknessForm } from "@/components/calculators/LensThicknessForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("espesor-lente")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function EspesorLentePage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Estima el espesor de borde de una lente a partir de su potencia, diámetro e índice de refracción."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            Antes de recomendar un material o adelantar el aspecto final de una lente,
            especialmente en graduaciones negativas elevadas, es útil estimar cuánto espesor de
            borde tendrá la lente terminada según el índice de refracción elegido.
          </p>
          <h2>Fórmula aplicada</h2>
          <p>Sagita = r² × Potencia / (2000 × (índice − 1))</p>
          <p>Espesor de borde = Espesor de centro + Sagita</p>
          <p>
            Donde <strong>r</strong> es la mitad del diámetro de la lente en milímetros. Es una
            estimación aproximada: el resultado final depende también del biselado y del proceso
            del laboratorio.
          </p>
        </>
      }
    >
      <LensThicknessForm />
    </CalculatorPageLayout>
  );
}
