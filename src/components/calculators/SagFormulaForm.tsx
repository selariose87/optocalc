"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { ReportButton } from "@/components/calculators/ReportButton";
import { avisosSagFormula, calcularSagita } from "@/lib/calculators/sagFormula";
import { formatNumber } from "@/lib/format";

export function SagFormulaForm() {
  const [radio, setRadio] = useState("50.0");
  const [diametro, setDiametro] = useState("40.0");

  const radioN = parseFloat(radio);
  const diametroN = parseFloat(diametro);
  const valido = Number.isFinite(radioN) && Number.isFinite(diametroN);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return calcularSagita({ radio: radioN, diametro: diametroN });
  }, [valido, radioN, diametroN]);

  const avisos = valido ? avisosSagFormula({ radio: radioN, diametro: diametroN }) : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Curva y diámetro
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField id="radio-sagita" label="Radio de curvatura" value={radio} onChange={setRadio} step={0.5} unit="mm" />
          <NumberField id="diametro-sagita" label="Diámetro" value={diametro} onChange={setDiametro} step={0.5} unit="mm" />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado?.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {resultado.error}
        </p>
      )}

      {resultado?.sagita != null && (
        <>
          <ResultCard rows={[{ label: "Sagita (flecha)", value: `${formatNumber(resultado.sagita)} mm` }]} />
          <div>
            <ReportButton
              calculatorTitle="Fórmula de la sagita"
              entradas={[
                { label: "Radio de curvatura", value: `${radioN} mm` },
                { label: "Diámetro", value: `${diametroN} mm` },
              ]}
              resultados={[{ label: "Sagita (flecha)", value: `${formatNumber(resultado.sagita)} mm` }]}
            />
          </div>
        </>
      )}
    </div>
  );
}
