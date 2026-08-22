"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { AddToInformeButton } from "@/components/informe/AddToInformeButton";
import {
  avisosProfundidadAblacion,
  calcularProfundidadAblacion,
} from "@/lib/calculators/profundidadAblacion";
import { formatNumber } from "@/lib/format";

export function ProfundidadAblacionForm() {
  const [correccion, setCorreccion] = useState("3.00");
  const [zonaOptica, setZonaOptica] = useState("6.5");

  const correccionN = parseFloat(correccion);
  const zonaOpticaN = parseFloat(zonaOptica);
  const valido = Number.isFinite(correccionN) && Number.isFinite(zonaOpticaN);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return calcularProfundidadAblacion({ correccion: correccionN, zonaOptica: zonaOpticaN });
  }, [valido, correccionN, zonaOpticaN]);

  const avisos = valido
    ? avisosProfundidadAblacion({ correccion: correccionN, zonaOptica: zonaOpticaN })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Corrección y zona óptica
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField
            id="correccion-ablacion"
            label="Corrección (miopía)"
            value={correccion}
            onChange={setCorreccion}
            unit="D"
          />
          <NumberField
            id="zona-optica"
            label="Zona óptica"
            value={zonaOptica}
            onChange={setZonaOptica}
            step={0.1}
            unit="mm"
          />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[{ label: "Profundidad de ablación estimada", value: `${formatNumber(resultado.profundidadMicras)} µm` }]}
          />
          <p className="text-sm text-slate-500">
            Fórmula de Munnerlyn para corrección miópica: es una aproximación teórica; la
            profundidad real depende de la plataforma láser y su nomograma.
          </p>
          <div>
            <AddToInformeButton
              calculatorTitle="Profundidad de ablación"
              entradas={[
                { label: "Corrección", value: `${correccionN} D` },
                { label: "Zona óptica", value: `${zonaOpticaN} mm` },
              ]}
              resultados={[
                { label: "Profundidad de ablación estimada", value: `${formatNumber(resultado.profundidadMicras)} µm` },
              ]}
              notas={["Estimación teórica (fórmula de Munnerlyn); depende del láser y nomograma reales."]}
            />
          </div>
        </>
      )}
    </div>
  );
}
