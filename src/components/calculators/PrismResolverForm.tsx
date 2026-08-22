"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { SelectField } from "@/components/ui/SelectField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { AddToInformeButton } from "@/components/informe/AddToInformeButton";
import {
  avisosPrismResolver,
  BaseHorizontal,
  BaseVertical,
  resolverPrisma,
} from "@/lib/calculators/prismResolver";
import { formatNumber } from "@/lib/format";

const HORIZONTAL_OPTIONS = [
  { value: "BI", label: "Base interna (BI)" },
  { value: "BO", label: "Base externa (BO)" },
];

const VERTICAL_OPTIONS = [
  { value: "BS", label: "Base superior (BS)" },
  { value: "BI_V", label: "Base inferior (BI)" },
];

export function PrismResolverForm() {
  const [horizontal, setHorizontal] = useState("3.00");
  const [baseHorizontal, setBaseHorizontal] = useState<BaseHorizontal>("BO");
  const [vertical, setVertical] = useState("2.00");
  const [baseVertical, setBaseVertical] = useState<BaseVertical>("BS");

  const horizontalN = parseFloat(horizontal);
  const verticalN = parseFloat(vertical);
  const valido = Number.isFinite(horizontalN) && Number.isFinite(verticalN);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return resolverPrisma({ horizontal: horizontalN, baseHorizontal, vertical: verticalN, baseVertical });
  }, [valido, horizontalN, baseHorizontal, verticalN, baseVertical]);

  const avisos = valido
    ? avisosPrismResolver({ horizontal: horizontalN, baseHorizontal, vertical: verticalN, baseVertical })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Componentes de prisma
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField id="horizontal" label="Prisma horizontal" value={horizontal} onChange={setHorizontal} unit="Δ" />
          <SelectField
            id="base-horizontal"
            label="Base horizontal"
            value={baseHorizontal}
            onChange={(v) => setBaseHorizontal(v as BaseHorizontal)}
            options={HORIZONTAL_OPTIONS}
          />
          <NumberField id="vertical" label="Prisma vertical" value={vertical} onChange={setVertical} unit="Δ" />
          <SelectField
            id="base-vertical"
            label="Base vertical"
            value={baseVertical}
            onChange={(v) => setBaseVertical(v as BaseVertical)}
            options={VERTICAL_OPTIONS}
          />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[
              { label: "Prisma resultante", value: `${formatNumber(resultado.resultante)} Δ` },
              { label: "Ángulo respecto a la horizontal", value: `${formatNumber(resultado.angulo, 1)}°` },
              { label: "Dirección", value: resultado.direccion },
            ]}
          />
          <div>
            <AddToInformeButton
              calculatorTitle="Resolución de prisma"
              entradas={[
                { label: "Prisma horizontal", value: `${formatNumber(horizontalN)} Δ ${baseHorizontal}` },
                { label: "Prisma vertical", value: `${formatNumber(verticalN)} Δ ${baseVertical === "BS" ? "BS" : "BI"}` },
              ]}
              resultados={[
                { label: "Prisma resultante", value: `${formatNumber(resultado.resultante)} Δ` },
                { label: "Ángulo", value: `${formatNumber(resultado.angulo, 1)}°` },
                { label: "Dirección", value: resultado.direccion },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}
