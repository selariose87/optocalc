"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { SelectField } from "@/components/ui/SelectField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { AddToInformeButton } from "@/components/informe/AddToInformeButton";
import { avisosConversionAv, convertirAgudezaVisual, NotacionAV } from "@/lib/calculators/conversionAv";

const NOTACION_OPTIONS: { value: NotacionAV; label: string }[] = [
  { value: "snellen-pies", label: "Snellen en pies (20/X)" },
  { value: "snellen-metros", label: "Snellen en metros (6/X)" },
  { value: "decimal", label: "Decimal" },
  { value: "logmar", label: "logMAR" },
];

const PLACEHOLDER: Record<NotacionAV, string> = {
  "snellen-pies": "40",
  "snellen-metros": "12",
  decimal: "0.50",
  logmar: "0.30",
};

const HELP: Record<NotacionAV, string> = {
  "snellen-pies": "Introduce solo el denominador (ej. 40 para 20/40)",
  "snellen-metros": "Introduce solo el denominador (ej. 12 para 6/12)",
  decimal: "Ej. 1.0 = 20/20",
  logmar: "Ej. 0.0 = 20/20",
};

export function ConversionAvForm() {
  const [valor, setValor] = useState("40");
  const [notacion, setNotacion] = useState<NotacionAV>("snellen-pies");

  const valorN = parseFloat(valor);
  const valido = Number.isFinite(valorN) && valorN !== 0;

  const resultado = useMemo(() => {
    if (!valido) return null;
    return convertirAgudezaVisual({ valor: valorN, notacion });
  }, [valido, valorN, notacion]);

  const avisos = valido ? avisosConversionAv({ valor: valorN, notacion }) : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Agudeza visual de partida
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SelectField
            id="notacion-av"
            label="Notación"
            value={notacion}
            onChange={(v) => {
              setNotacion(v as NotacionAV);
              setValor(PLACEHOLDER[v as NotacionAV]);
            }}
            options={NOTACION_OPTIONS}
          />
          <NumberField
            id="valor-av"
            label="Valor"
            value={valor}
            onChange={setValor}
            step={notacion === "decimal" || notacion === "logmar" ? 0.01 : 1}
            helpText={HELP[notacion]}
          />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[
              { label: "Snellen (pies)", value: resultado.snellenPies },
              { label: "Snellen (metros)", value: resultado.snellenMetros },
              { label: "Decimal", value: resultado.decimal.toFixed(2) },
              { label: "logMAR", value: resultado.logMar.toFixed(2) },
            ]}
          />
          <div>
            <AddToInformeButton
              calculatorTitle="Conversión de agudeza visual"
              entradas={[
                {
                  label: "Valor introducido",
                  value: `${valor} (${NOTACION_OPTIONS.find((o) => o.value === notacion)?.label})`,
                },
              ]}
              resultados={[
                { label: "Snellen (pies)", value: resultado.snellenPies },
                { label: "Snellen (metros)", value: resultado.snellenMetros },
                { label: "Decimal", value: resultado.decimal.toFixed(2) },
                { label: "logMAR", value: resultado.logMar.toFixed(2) },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}
