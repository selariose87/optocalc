"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { SelectField } from "@/components/ui/SelectField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { AddToInformeButton } from "@/components/informe/AddToInformeButton";
import {
  avisosDioptriasMm,
  convertirDioptriasMm,
  SentidoDioptriasMm,
} from "@/lib/calculators/dioptriasMilimetros";
import { formatNumber, formatSigned } from "@/lib/format";

const SENTIDO_OPTIONS: { value: SentidoDioptriasMm; label: string }[] = [
  { value: "d-a-mm", label: "De dioptrías a milímetros" },
  { value: "mm-a-d", label: "De milímetros a dioptrías" },
];

export function DioptriasMilimetrosForm() {
  const [valor, setValor] = useState("4.00");
  const [sentido, setSentido] = useState<SentidoDioptriasMm>("d-a-mm");

  const valorN = parseFloat(valor);
  const valido = Number.isFinite(valorN);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return convertirDioptriasMm({ valor: valorN, sentido });
  }, [valido, valorN, sentido]);

  const avisos = valido ? avisosDioptriasMm({ valor: valorN, sentido }) : [];

  const etiquetaEntrada = sentido === "d-a-mm" ? "Potencia" : "Distancia focal";
  const unidadEntrada = sentido === "d-a-mm" ? "D" : "mm";
  const etiquetaSalida = sentido === "d-a-mm" ? "Distancia focal" : "Potencia";
  const unidadSalida = sentido === "d-a-mm" ? "mm" : "D";

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Valor de partida
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectField
            id="sentido-dioptrias"
            label="Sentido"
            value={sentido}
            onChange={(v) => setSentido(v as SentidoDioptriasMm)}
            options={SENTIDO_OPTIONS}
          />
          <NumberField
            id="valor-dioptrias"
            label={etiquetaEntrada}
            value={valor}
            onChange={setValor}
            unit={unidadEntrada}
          />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado?.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {resultado.error}
        </p>
      )}

      {resultado?.resultado != null && (
        <>
          <ResultCard
            rows={[
              {
                label: etiquetaSalida,
                value:
                  sentido === "d-a-mm"
                    ? `${formatNumber(resultado.resultado)} ${unidadSalida}`
                    : `${formatSigned(resultado.resultado)} ${unidadSalida}`,
              },
            ]}
          />
          <div>
            <AddToInformeButton
              calculatorTitle="Dioptrías a milímetros"
              entradas={[{ label: etiquetaEntrada, value: `${valorN} ${unidadEntrada}` }]}
              resultados={[
                { label: etiquetaSalida, value: `${formatNumber(resultado.resultado)} ${unidadSalida}` },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}
