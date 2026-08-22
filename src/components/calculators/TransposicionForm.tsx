"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { ReportButton } from "@/components/calculators/ReportButton";
import { avisosTransposicion, transponer } from "@/lib/calculators/transposicion";
import { formatSigned } from "@/lib/format";

export function TransposicionForm() {
  const [esfera, setEsfera] = useState("0.00");
  const [cilindro, setCilindro] = useState("-1.00");
  const [eje, setEje] = useState("90");

  const esferaN = parseFloat(esfera);
  const cilindroN = parseFloat(cilindro);
  const ejeN = parseInt(eje, 10);
  const valores = [esferaN, cilindroN, ejeN];
  const valido = valores.every((v) => Number.isFinite(v));

  const resultado = useMemo(() => {
    if (!valido) return null;
    return transponer({ esfera: esferaN, cilindro: cilindroN, eje: ejeN });
  }, [valido, esferaN, cilindroN, ejeN]);

  const avisos = valido
    ? avisosTransposicion({ esfera: esferaN, cilindro: cilindroN, eje: ejeN })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Graduación original
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <NumberField id="esfera" label="Esfera" value={esfera} onChange={setEsfera} unit="D" />
          <NumberField id="cilindro" label="Cilindro" value={cilindro} onChange={setCilindro} unit="D" />
          <NumberField id="eje" label="Eje" value={eje} onChange={setEje} step={1} unit="°" />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[
              { label: "Esfera", value: `${formatSigned(resultado.esfera)} D` },
              { label: "Cilindro", value: `${formatSigned(resultado.cilindro)} D` },
              { label: "Eje", value: `${resultado.eje}°` },
            ]}
          />
          <div>
            <ReportButton
              calculatorTitle="Transposición de graduación"
              entradas={[
                { label: "Esfera original", value: `${formatSigned(esferaN)} D` },
                { label: "Cilindro original", value: `${formatSigned(cilindroN)} D` },
                { label: "Eje original", value: `${ejeN}°` },
              ]}
              resultados={[
                { label: "Esfera transpuesta", value: `${formatSigned(resultado.esfera)} D` },
                { label: "Cilindro transpuesto", value: `${formatSigned(resultado.cilindro)} D` },
                { label: "Eje transpuesto", value: `${resultado.eje}°` },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}
