"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { ReportButton } from "@/components/calculators/ReportButton";
import { avisosAdicionEdad, estimarAdicion } from "@/lib/calculators/adicionEdad";
import { formatNumber } from "@/lib/format";

export function AdicionEdadForm() {
  const [edad, setEdad] = useState("50");

  const edadN = parseFloat(edad);
  const valido = Number.isFinite(edadN);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return estimarAdicion({ edad: edadN });
  }, [valido, edadN]);

  const avisos = valido ? avisosAdicionEdad({ edad: edadN }) : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Datos del paciente
        </h2>
        <div className="mt-4 max-w-xs">
          <NumberField id="edad" label="Edad" value={edad} onChange={setEdad} step={1} unit="años" />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={
              resultado.requiereAdicion
                ? [
                    {
                      label: "Adición orientativa",
                      value: `+${formatNumber(resultado.rangoMin!)} a +${formatNumber(resultado.rangoMax!)} D`,
                    },
                    {
                      label: "Amplitud de acomodación (Hofstetter)",
                      value: `${formatNumber(resultado.amplitudAcomodacion)} D`,
                    },
                  ]
                : [
                    {
                      label: "Amplitud de acomodación (Hofstetter)",
                      value: `${formatNumber(resultado.amplitudAcomodacion)} D`,
                    },
                  ]
            }
          />
          {resultado.mensaje && (
            <p className="text-sm text-slate-500">{resultado.mensaje}</p>
          )}
          <p className="text-sm text-slate-500">
            Valores orientativos basados en tablas de referencia por edad. La adición final debe
            ajustarse siempre con el examen visual en cerca del paciente.
          </p>
          <div>
            <ReportButton
              calculatorTitle="Adición por edad"
              entradas={[{ label: "Edad del paciente", value: `${edadN} años` }]}
              resultados={
                resultado.requiereAdicion
                  ? [
                      {
                        label: "Adición orientativa",
                        value: `+${formatNumber(resultado.rangoMin!)} a +${formatNumber(resultado.rangoMax!)} D`,
                      },
                      {
                        label: "Amplitud de acomodación",
                        value: `${formatNumber(resultado.amplitudAcomodacion)} D`,
                      },
                    ]
                  : [
                      { label: "Adición orientativa", value: "No suele requerirse" },
                      {
                        label: "Amplitud de acomodación",
                        value: `${formatNumber(resultado.amplitudAcomodacion)} D`,
                      },
                    ]
              }
              notas={[
                "Valores orientativos: la adición definitiva debe confirmarse con el examen visual en cerca del paciente.",
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}
