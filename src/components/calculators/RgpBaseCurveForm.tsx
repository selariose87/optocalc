"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { AddToInformeButton } from "@/components/informe/AddToInformeButton";
import { avisosRgpBaseCurve, calcularCurvaBaseRgp } from "@/lib/calculators/rgpBaseCurve";
import { formatNumber } from "@/lib/format";

export function RgpBaseCurveForm() {
  const [kPlano, setKPlano] = useState("43.00");
  const [kCurvo, setKCurvo] = useState("44.00");

  const kPlanoN = parseFloat(kPlano);
  const kCurvoN = parseFloat(kCurvo);
  const valido = Number.isFinite(kPlanoN) && Number.isFinite(kCurvoN);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return calcularCurvaBaseRgp({ kPlano: kPlanoN, kCurvo: kCurvoN });
  }, [valido, kPlanoN, kCurvoN]);

  const avisos = valido ? avisosRgpBaseCurve({ kPlano: kPlanoN, kCurvo: kCurvoN }) : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Lecturas queratométricas
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField id="k-plano" label="K plano" value={kPlano} onChange={setKPlano} unit="D" helpText="El valor más bajo de los dos" />
          <NumberField id="k-curvo" label="K curvo" value={kCurvo} onChange={setKCurvo} unit="D" />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[
              { label: "Curva base on-K", value: `${formatNumber(resultado.onK)} D` },
              { label: "Ligeramente plana", value: `${formatNumber(resultado.ligeramentePlana)} D` },
              { label: "Ligeramente curva", value: `${formatNumber(resultado.ligeramenteCurva)} D` },
              { label: "Astigmatismo corneal", value: `${formatNumber(resultado.astigmatismoCorneal)} D` },
            ]}
          />
          <p className="text-sm text-slate-500">
            La curva base inicial habitual se sitúa en el K plano (&quot;on-K&quot;). Los ajustes de
            ±0,50 D dependen de la filosofía de adaptación, la película lagrimal y el patrón
            fluoresceínico observado.
          </p>
          <div>
            <AddToInformeButton
              calculatorTitle="Curva base RGP"
              entradas={[
                { label: "K plano", value: `${formatNumber(kPlanoN)} D` },
                { label: "K curvo", value: `${formatNumber(kCurvoN)} D` },
              ]}
              resultados={[
                { label: "Curva base on-K", value: `${formatNumber(resultado.onK)} D` },
                { label: "Ligeramente plana", value: `${formatNumber(resultado.ligeramentePlana)} D` },
                { label: "Ligeramente curva", value: `${formatNumber(resultado.ligeramenteCurva)} D` },
                { label: "Astigmatismo corneal", value: `${formatNumber(resultado.astigmatismoCorneal)} D` },
              ]}
              notas={["Curva base inicial orientativa: ajústala según la evaluación del patrón fluoresceínico."]}
            />
          </div>
        </>
      )}
    </div>
  );
}
