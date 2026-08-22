import type { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/calculators/CalculatorPageLayout";
import { AddPowerWorkingDistanceForm } from "@/components/calculators/AddPowerWorkingDistanceForm";
import { getCalculatorMeta } from "@/lib/calculators/registry";

const meta = getCalculatorMeta("adicion-distancia-trabajo")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
};

export default function AdicionDistanciaTrabajoPage() {
  return (
    <CalculatorPageLayout
      title={meta.title}
      intro="Estima la adición necesaria a partir de la distancia de trabajo habitual del paciente y su edad."
      explicacion={
        <>
          <h2>¿Para qué sirve este cálculo?</h2>
          <p>
            La demanda acomodativa depende directamente de la distancia a la que se trabaja: leer
            a 40 cm exige más acomodación que trabajar con una pantalla a 60 cm. Combinando esa
            demanda con la amplitud de acomodación disponible según la edad, se obtiene una
            adición de partida razonable.
          </p>
          <h2>Fórmula aplicada</h2>
          <ul>
            <li>Demanda acomodativa total = 100 / distancia de trabajo (cm)</li>
            <li>Amplitud de acomodación (Hofstetter) = 15 − 0,25 × edad</li>
            <li>Adición estimada = Demanda total − Amplitud de acomodación / 2</li>
          </ul>
          <p>
            Se reserva la mitad de la amplitud de acomodación para que el trabajo en cerca resulte
            cómodo y sostenible.
          </p>
        </>
      }
    >
      <AddPowerWorkingDistanceForm />
    </CalculatorPageLayout>
  );
}
