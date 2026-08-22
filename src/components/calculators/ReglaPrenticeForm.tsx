"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { AddToInformeButton } from "@/components/informe/AddToInformeButton";
import { avisosPrentice, calcularPrentice } from "@/lib/calculators/reglaPrentice";
import { formatNumber, formatSigned } from "@/lib/format";

export function ReglaPrenticeForm() {
  const [descentramiento, setDescentramiento] = useState("3");
  const [potencia, setPotencia] = useState("4.00");

  const descentramientoN = parseFloat(descentramiento);
  const potenciaN = parseFloat(potencia);
  const valido = Number.isFinite(descentramientoN) && Number.isFinite(potenciaN);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return calcularPrentice({ descentramientoMm: descentramientoN, potencia: potenciaN });
  }, [valido, descentramientoN, potenciaN]);

  const avisos = valido
    ? avisosPrentice({ descentramientoMm: descentramientoN, potencia: potenciaN })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Datos de la lente
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField
            id="descentramiento"
            label="Descentramiento"
            value={descentramiento}
            onChange={setDescentramiento}
            step={0.5}
            unit="mm"
          />
          <NumberField id="potencia-prentice" label="Potencia de la lente" value={potencia} onChange={setPotencia} unit="D" />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[{ label: "Prisma inducido", value: `${formatNumber(resultado.prisma)} Δ` }]}
          />
          <p className="text-sm text-slate-500">
            La base del prisma resultante depende del signo de la lente y del sentido del
            descentramiento respecto al centro óptico: en lentes positivas la base queda hacia el
            mismo lado del descentramiento, y en lentes negativas hacia el lado contrario.
          </p>
          <div>
            <AddToInformeButton
              calculatorTitle="Regla de Prentice"
              entradas={[
                { label: "Descentramiento", value: `${descentramientoN} mm` },
                { label: "Potencia de la lente", value: `${formatSigned(potenciaN)} D` },
              ]}
              resultados={[{ label: "Prisma inducido", value: `${formatNumber(resultado.prisma)} Δ` }]}
            />
          </div>
        </>
      )}
    </div>
  );
}
