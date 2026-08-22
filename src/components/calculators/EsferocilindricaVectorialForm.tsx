"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { AddToInformeButton } from "@/components/informe/AddToInformeButton";
import {
  avisosEsferocilindricaVectorial,
  calcularVectorPotencia,
} from "@/lib/calculators/esferocilindricaVectorial";
import { formatSigned } from "@/lib/format";

export function EsferocilindricaVectorialForm() {
  const [esfera, setEsfera] = useState("-2.00");
  const [cilindro, setCilindro] = useState("-1.00");
  const [eje, setEje] = useState("90");

  const esferaN = parseFloat(esfera);
  const cilindroN = parseFloat(cilindro);
  const ejeN = parseInt(eje, 10);
  const valido = [esferaN, cilindroN, ejeN].every(Number.isFinite);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return calcularVectorPotencia({ esfera: esferaN, cilindro: cilindroN, eje: ejeN });
  }, [valido, esferaN, cilindroN, ejeN]);

  const avisos = valido
    ? avisosEsferocilindricaVectorial({ esfera: esferaN, cilindro: cilindroN, eje: ejeN })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Graduación (cilindro negativo)
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <NumberField id="esfera-vector" label="Esfera" value={esfera} onChange={setEsfera} unit="D" />
          <NumberField id="cilindro-vector" label="Cilindro" value={cilindro} onChange={setCilindro} unit="D" />
          <NumberField id="eje-vector" label="Eje" value={eje} onChange={setEje} step={1} unit="°" />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[
              { label: "M (equivalente esférico)", value: `${formatSigned(resultado.m)} D` },
              { label: "J0", value: `${formatSigned(resultado.j0)} D` },
              { label: "J45", value: `${formatSigned(resultado.j45)} D` },
            ]}
          />
          <div>
            <AddToInformeButton
              calculatorTitle="Esferocilíndrica a vectorial"
              entradas={[
                { label: "Esfera", value: `${formatSigned(esferaN)} D` },
                { label: "Cilindro", value: `${formatSigned(cilindroN)} D` },
                { label: "Eje", value: `${ejeN}°` },
              ]}
              resultados={[
                { label: "M", value: `${formatSigned(resultado.m)} D` },
                { label: "J0", value: `${formatSigned(resultado.j0)} D` },
                { label: "J45", value: `${formatSigned(resultado.j45)} D` },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}
