"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { SelectField } from "@/components/ui/SelectField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { AddToInformeButton } from "@/components/informe/AddToInformeButton";
import { avisosSumaPrismas, sumarPrismas } from "@/lib/calculators/sumaPrismas";
import type { BaseHorizontal, BaseVertical } from "@/lib/calculators/prismResolver";
import { formatNumber } from "@/lib/format";

const HORIZONTAL_OPTIONS = [
  { value: "BI", label: "Base interna (BI)" },
  { value: "BO", label: "Base externa (BO)" },
];

const VERTICAL_OPTIONS = [
  { value: "BS", label: "Base superior (BS)" },
  { value: "BI_V", label: "Base inferior (BI)" },
];

function PrismaFields({
  titulo,
  horizontal,
  setHorizontal,
  baseHorizontal,
  setBaseHorizontal,
  vertical,
  setVertical,
  baseVertical,
  setBaseVertical,
  idPrefix,
}: {
  titulo: string;
  horizontal: string;
  setHorizontal: (v: string) => void;
  baseHorizontal: BaseHorizontal;
  setBaseHorizontal: (v: BaseHorizontal) => void;
  vertical: string;
  setVertical: (v: string) => void;
  baseVertical: BaseVertical;
  setBaseVertical: (v: BaseVertical) => void;
  idPrefix: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-5">
      <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">{titulo}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField id={`${idPrefix}-h`} label="Prisma horizontal" value={horizontal} onChange={setHorizontal} unit="Δ" />
        <SelectField
          id={`${idPrefix}-bh`}
          label="Base horizontal"
          value={baseHorizontal}
          onChange={(v) => setBaseHorizontal(v as BaseHorizontal)}
          options={HORIZONTAL_OPTIONS}
        />
        <NumberField id={`${idPrefix}-v`} label="Prisma vertical" value={vertical} onChange={setVertical} unit="Δ" />
        <SelectField
          id={`${idPrefix}-bv`}
          label="Base vertical"
          value={baseVertical}
          onChange={(v) => setBaseVertical(v as BaseVertical)}
          options={VERTICAL_OPTIONS}
        />
      </div>
    </div>
  );
}

export function SumaPrismasForm() {
  const [h1, setH1] = useState("2.00");
  const [bh1, setBh1] = useState<BaseHorizontal>("BO");
  const [v1, setV1] = useState("0");
  const [bv1, setBv1] = useState<BaseVertical>("BS");

  const [h2, setH2] = useState("1.50");
  const [bh2, setBh2] = useState<BaseHorizontal>("BI");
  const [v2, setV2] = useState("1.00");
  const [bv2, setBv2] = useState<BaseVertical>("BS");

  const h1N = parseFloat(h1);
  const v1N = parseFloat(v1);
  const h2N = parseFloat(h2);
  const v2N = parseFloat(v2);
  const valido = [h1N, v1N, h2N, v2N].every(Number.isFinite);

  const prisma1 = { horizontal: h1N, baseHorizontal: bh1, vertical: v1N, baseVertical: bv1 };
  const prisma2 = { horizontal: h2N, baseHorizontal: bh2, vertical: v2N, baseVertical: bv2 };

  const resultado = useMemo(() => {
    if (!valido) return null;
    return sumarPrismas(prisma1, prisma2);
  }, [valido, h1N, bh1, v1N, bv1, h2N, bh2, v2N, bv2]); // eslint-disable-line react-hooks/exhaustive-deps

  const avisos = valido ? avisosSumaPrismas(prisma1, prisma2) : [];

  return (
    <div className="flex flex-col gap-6">
      <PrismaFields
        titulo="Prisma 1"
        horizontal={h1}
        setHorizontal={setH1}
        baseHorizontal={bh1}
        setBaseHorizontal={setBh1}
        vertical={v1}
        setVertical={setV1}
        baseVertical={bv1}
        setBaseVertical={setBv1}
        idPrefix="p1"
      />
      <PrismaFields
        titulo="Prisma 2"
        horizontal={h2}
        setHorizontal={setH2}
        baseHorizontal={bh2}
        setBaseHorizontal={setBh2}
        vertical={v2}
        setVertical={setV2}
        baseVertical={bv2}
        setBaseVertical={setBv2}
        idPrefix="p2"
      />

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[
              {
                label: "Horizontal resultante",
                value: `${formatNumber(resultado.horizontal)} Δ ${resultado.baseHorizontal === "BO" ? "BO" : "BI"}`,
              },
              {
                label: "Vertical resultante",
                value: `${formatNumber(resultado.vertical)} Δ ${resultado.baseVertical === "BS" ? "BS" : "BI"}`,
              },
              { label: "Prisma resultante total", value: `${formatNumber(resultado.resultante)} Δ` },
            ]}
          />
          <div>
            <AddToInformeButton
              calculatorTitle="Suma de prismas"
              entradas={[
                { label: "Prisma 1", value: `${h1N} Δ ${bh1} / ${v1N} Δ ${bv1 === "BS" ? "BS" : "BI"}` },
                { label: "Prisma 2", value: `${h2N} Δ ${bh2} / ${v2N} Δ ${bv2 === "BS" ? "BS" : "BI"}` },
              ]}
              resultados={[
                {
                  label: "Horizontal resultante",
                  value: `${formatNumber(resultado.horizontal)} Δ ${resultado.baseHorizontal === "BO" ? "BO" : "BI"}`,
                },
                {
                  label: "Vertical resultante",
                  value: `${formatNumber(resultado.vertical)} Δ ${resultado.baseVertical === "BS" ? "BS" : "BI"}`,
                },
                { label: "Prisma resultante total", value: `${formatNumber(resultado.resultante)} Δ` },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}
