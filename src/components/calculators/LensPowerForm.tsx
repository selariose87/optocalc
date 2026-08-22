"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { ReportButton } from "@/components/calculators/ReportButton";
import { avisosLensPower, calcularPotenciaLente } from "@/lib/calculators/lensPower";
import { formatSigned } from "@/lib/format";

export function LensPowerForm() {
  const [curvaFrontal, setCurvaFrontal] = useState("6.00");
  const [curvaPosterior, setCurvaPosterior] = useState("-4.00");

  const curvaFrontalN = parseFloat(curvaFrontal);
  const curvaPosteriorN = parseFloat(curvaPosterior);
  const valido = Number.isFinite(curvaFrontalN) && Number.isFinite(curvaPosteriorN);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return calcularPotenciaLente({ curvaFrontal: curvaFrontalN, curvaPosterior: curvaPosteriorN });
  }, [valido, curvaFrontalN, curvaPosteriorN]);

  const avisos = valido
    ? avisosLensPower({ curvaFrontal: curvaFrontalN, curvaPosterior: curvaPosteriorN })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Potencia de las caras
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField
            id="curva-frontal"
            label="Curva frontal"
            value={curvaFrontal}
            onChange={setCurvaFrontal}
            unit="D"
            helpText='Habitualmente la "curva base"'
          />
          <NumberField
            id="curva-posterior"
            label="Curva posterior"
            value={curvaPosterior}
            onChange={setCurvaPosterior}
            unit="D"
            helpText='La "curva ocular"'
          />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[{ label: "Potencia total", value: `${formatSigned(resultado.potenciaTotal)} D` }]}
          />
          <div>
            <ReportButton
              calculatorTitle="Potencia de la lente"
              entradas={[
                { label: "Curva frontal", value: `${formatSigned(curvaFrontalN)} D` },
                { label: "Curva posterior", value: `${formatSigned(curvaPosteriorN)} D` },
              ]}
              resultados={[{ label: "Potencia total", value: `${formatSigned(resultado.potenciaTotal)} D` }]}
            />
          </div>
        </>
      )}
    </div>
  );
}
