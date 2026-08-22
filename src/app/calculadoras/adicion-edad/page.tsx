import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { AdicionEdadForm } from "@/components/calculators/AdicionEdadForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("adicion-edad")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function AdicionEdadPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Estima de forma orientativa la adición para progresivos u ocupacionales según la edad del paciente."
      explicacion={
        <>
          <h2>Una estimación de partida, no un resultado clínico</h2>
          <p>
            Esta calculadora ofrece un rango de adición orientativo según tablas de referencia por
            edad, junto con la amplitud de acomodación teórica (fórmula de Hofstetter: AA = 15 −
            0,25 × edad). El valor final de adición debe determinarse siempre con el examen visual
            en cerca del paciente.
          </p>
          <h2>Rangos orientativos por edad</h2>
          <ul>
            <li>40–44 años: +0,75 a +1,00 D</li>
            <li>45–49 años: +1,25 a +1,50 D</li>
            <li>50–54 años: +1,75 a +2,00 D</li>
            <li>55–59 años: +2,25 a +2,50 D</li>
            <li>60 años o más: +2,50 a +3,00 D</li>
          </ul>
        </>
      }
    >
      <AdicionEdadForm />
    </CalculatorPageLayout>
  );
}
