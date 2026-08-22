"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { AddToInformeButton } from "@/components/informe/AddToInformeButton";
import { avisosSia, calcularSIA } from "@/lib/calculators/sia";
import { formatNumber } from "@/lib/format";

export function SiaForm() {
  const [k1, setK1] = useState("1.00");
  const [alpha1, setAlpha1] = useState("90");
  const [k2, setK2] = useState("0.50");
  const [alpha2, setAlpha2] = useState("100");

  const k1N = parseFloat(k1);
  const alpha1N = parseFloat(alpha1);
  const k2N = parseFloat(k2);
  const alpha2N = parseFloat(alpha2);
  const valido = [k1N, alpha1N, k2N, alpha2N].every(Number.isFinite);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return calcularSIA({ k1: k1N, alpha1: alpha1N, k2: k2N, alpha2: alpha2N });
  }, [valido, k1N, alpha1N, k2N, alpha2N]);

  const avisos = valido ? avisosSia({ k1: k1N, alpha1: alpha1N, k2: k2N, alpha2: alpha2N }) : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Cilindro preoperatorio
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField id="k1-sia" label="Cilindro preoperatorio" value={k1} onChange={setK1} unit="D" />
          <NumberField id="alpha1-sia" label="Eje preoperatorio" value={alpha1} onChange={setAlpha1} step={1} unit="°" />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Cilindro postoperatorio
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField id="k2-sia" label="Cilindro postoperatorio" value={k2} onChange={setK2} unit="D" />
          <NumberField id="alpha2-sia" label="Eje postoperatorio" value={alpha2} onChange={setAlpha2} step={1} unit="°" />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[
              { label: "Astigmatismo inducido (SIA)", value: `${formatNumber(resultado.sia)} D` },
              { label: "Eje del SIA", value: `${formatNumber(resultado.eje, 1)}°` },
            ]}
          />
          <p className="text-sm text-slate-500">
            Método vectorial (Alpins/Naeser), a partir de la descomposición de cada cilindro en
            componentes según el eje doblado (2α).
          </p>
          <div>
            <AddToInformeButton
              calculatorTitle="Astigmatismo inducido quirúrgicamente (SIA)"
              entradas={[
                { label: "Cilindro preoperatorio", value: `${k1N} D @ ${alpha1N}°` },
                { label: "Cilindro postoperatorio", value: `${k2N} D @ ${alpha2N}°` },
              ]}
              resultados={[
                { label: "SIA", value: `${formatNumber(resultado.sia)} D` },
                { label: "Eje del SIA", value: `${formatNumber(resultado.eje, 1)}°` },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}
