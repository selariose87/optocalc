"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { ReportButton } from "@/components/calculators/ReportButton";
import {
  avisosSphericalEquivalent,
  calcularEquivalenteEsferico,
} from "@/lib/calculators/sphericalEquivalent";
import { formatSigned } from "@/lib/format";

export function SphericalEquivalentForm() {
  const [esfera, setEsfera] = useState("-3.00");
  const [cilindro, setCilindro] = useState("-1.00");

  const esferaN = parseFloat(esfera);
  const cilindroN = parseFloat(cilindro);
  const valido = Number.isFinite(esferaN) && Number.isFinite(cilindroN);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return calcularEquivalenteEsferico({ esfera: esferaN, cilindro: cilindroN });
  }, [valido, esferaN, cilindroN]);

  const avisos = valido ? avisosSphericalEquivalent({ esfera: esferaN, cilindro: cilindroN }) : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Graduación
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField id="esfera-ee" label="Esfera" value={esfera} onChange={setEsfera} unit="D" />
          <NumberField id="cilindro-ee" label="Cilindro" value={cilindro} onChange={setCilindro} unit="D" />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[{ label: "Equivalente esférico", value: `${formatSigned(resultado.equivalenteEsferico)} D` }]}
          />
          <div>
            <ReportButton
              calculatorTitle="Equivalente esférico"
              entradas={[
                { label: "Esfera", value: `${formatSigned(esferaN)} D` },
                { label: "Cilindro", value: `${formatSigned(cilindroN)} D` },
              ]}
              resultados={[{ label: "Equivalente esférico", value: `${formatSigned(resultado.equivalenteEsferico)} D` }]}
            />
          </div>
        </>
      )}
    </div>
  );
}
