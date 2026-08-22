"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { AddToInformeButton } from "@/components/informe/AddToInformeButton";
import {
  avisosAddPowerWorkingDistance,
  calcularAdicionPorDistancia,
} from "@/lib/calculators/addPowerWorkingDistance";
import { formatNumber } from "@/lib/format";

export function AddPowerWorkingDistanceForm() {
  const [distancia, setDistancia] = useState("40");
  const [edad, setEdad] = useState("50");

  const distanciaN = parseFloat(distancia);
  const edadN = parseFloat(edad);
  const valido = Number.isFinite(distanciaN) && Number.isFinite(edadN) && distanciaN > 0;

  const resultado = useMemo(() => {
    if (!valido) return null;
    return calcularAdicionPorDistancia({ distanciaTrabajoCm: distanciaN, edad: edadN });
  }, [valido, distanciaN, edadN]);

  const avisos = valido
    ? avisosAddPowerWorkingDistance({ distanciaTrabajoCm: distanciaN, edad: edadN })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Distancia de trabajo y edad
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField
            id="distancia-trabajo"
            label="Distancia de trabajo"
            value={distancia}
            onChange={setDistancia}
            step={1}
            unit="cm"
            helpText="Lectura habitual: 40 cm · Pantalla: 60 cm"
          />
          <NumberField id="edad-add" label="Edad del paciente" value={edad} onChange={setEdad} step={1} unit="años" />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[
              { label: "Demanda acomodativa total", value: `+${formatNumber(resultado.demandaTotal)} D` },
              { label: "Amplitud de acomodación (Hofstetter)", value: `${formatNumber(resultado.amplitudAcomodacion)} D` },
              { label: "Adición estimada", value: `+${formatNumber(resultado.adicionEstimada)} D` },
            ]}
          />
          <p className="text-sm text-slate-500">
            La adición estimada reserva la mitad de la amplitud de acomodación del paciente para un
            trabajo en cerca cómodo. Ajusta siempre el valor final con el examen subjetivo en cerca.
          </p>
          <div>
            <AddToInformeButton
              calculatorTitle="Adición por distancia de trabajo"
              entradas={[
                { label: "Distancia de trabajo", value: `${distanciaN} cm` },
                { label: "Edad del paciente", value: `${edadN} años` },
              ]}
              resultados={[
                { label: "Demanda acomodativa total", value: `+${formatNumber(resultado.demandaTotal)} D` },
                { label: "Amplitud de acomodación", value: `${formatNumber(resultado.amplitudAcomodacion)} D` },
                { label: "Adición estimada", value: `+${formatNumber(resultado.adicionEstimada)} D` },
              ]}
              notas={["Valor orientativo: ajústalo siempre con el examen subjetivo en cerca del paciente."]}
            />
          </div>
        </>
      )}
    </div>
  );
}
