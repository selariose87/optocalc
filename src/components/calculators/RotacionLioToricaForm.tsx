"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { AddToInformeButton } from "@/components/informe/AddToInformeButton";
import {
  avisosRotacionLioTorica,
  calcularRotacionLioTorica,
} from "@/lib/calculators/rotacionLioTorica";
import { formatNumber } from "@/lib/format";

interface RotacionLioToricaFormProps {
  calculatorTitle: string;
}

export function RotacionLioToricaForm({ calculatorTitle }: RotacionLioToricaFormProps) {
  const [cilindroLio, setCilindroLio] = useState("3.00");
  const [rotacionGrados, setRotacionGrados] = useState("10");

  const cilindroLioN = parseFloat(cilindroLio);
  const rotacionGradosN = parseFloat(rotacionGrados);
  const valido = Number.isFinite(cilindroLioN) && Number.isFinite(rotacionGradosN);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return calcularRotacionLioTorica({ cilindroLio: cilindroLioN, rotacionGrados: rotacionGradosN });
  }, [valido, cilindroLioN, rotacionGradosN]);

  const avisos = valido
    ? avisosRotacionLioTorica({ cilindroLio: cilindroLioN, rotacionGrados: rotacionGradosN })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Cilindro del LIO y desalineación
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField id="cilindro-lio" label="Cilindro del LIO" value={cilindroLio} onChange={setCilindroLio} unit="D" />
          <NumberField
            id="rotacion-lio"
            label="Rotación respecto al eje previsto"
            value={rotacionGrados}
            onChange={setRotacionGrados}
            step={1}
            unit="°"
          />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[
              { label: "Astigmatismo residual inducido", value: `${formatNumber(resultado.astigmatismoResidual)} D` },
              { label: "Cilindro corrector perdido", value: `${formatNumber(resultado.porcentajePerdida)} %` },
            ]}
          />
          <p className="text-sm text-slate-500">
            Regla clínica orientativa: cada grado de rotación supone aproximadamente un 3,3% de
            pérdida de cilindro corrector; a partir de 30° de rotación el LIO tórico deja de
            aportar beneficio frente a no corregir el astigmatismo.
          </p>
          <div>
            <AddToInformeButton
              calculatorTitle={calculatorTitle}
              entradas={[
                { label: "Cilindro del LIO", value: `${cilindroLioN} D` },
                { label: "Rotación respecto al eje previsto", value: `${rotacionGradosN}°` },
              ]}
              resultados={[
                { label: "Astigmatismo residual inducido", value: `${formatNumber(resultado.astigmatismoResidual)} D` },
                { label: "Cilindro corrector perdido", value: `${formatNumber(resultado.porcentajePerdida)} %` },
              ]}
              notas={[
                "Estimación teórica basada en el método vectorial; a partir de 30° de rotación el LIO tórico deja de aportar beneficio.",
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}
