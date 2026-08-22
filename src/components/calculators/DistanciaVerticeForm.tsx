"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { SelectField } from "@/components/ui/SelectField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { AddToInformeButton } from "@/components/informe/AddToInformeButton";
import {
  avisosDistanciaVertice,
  compensarDistanciaVertice,
  SentidoDistanciaVertice,
} from "@/lib/calculators/distanciaVertice";
import { formatSigned } from "@/lib/format";

const SENTIDO_OPTIONS: { value: SentidoDistanciaVertice; label: string }[] = [
  { value: "gafa-a-lentilla", label: "De gafa a lentilla de contacto" },
  { value: "lentilla-a-gafa", label: "De lentilla de contacto a gafa" },
];

export function DistanciaVerticeForm() {
  const [potencia, setPotencia] = useState("-6.00");
  const [distancia, setDistancia] = useState("12");
  const [sentido, setSentido] = useState<SentidoDistanciaVertice>("gafa-a-lentilla");

  const potenciaN = parseFloat(potencia);
  const distanciaN = parseFloat(distancia);
  const valido = Number.isFinite(potenciaN) && Number.isFinite(distanciaN);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return compensarDistanciaVertice({ potencia: potenciaN, distanciaMm: distanciaN, sentido });
  }, [valido, potenciaN, distanciaN, sentido]);

  const avisos = valido
    ? avisosDistanciaVertice({ potencia: potenciaN, distanciaMm: distanciaN })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Datos de partida
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField id="potencia" label="Potencia de partida" value={potencia} onChange={setPotencia} unit="D" />
          <NumberField
            id="distancia"
            label="Diferencia de distancia al vértice"
            value={distancia}
            onChange={setDistancia}
            step={0.5}
            unit="mm"
          />
        </div>
        <div className="mt-4">
          <SelectField
            id="sentido"
            label="Sentido del cálculo"
            value={sentido}
            onChange={(v) => setSentido(v as SentidoDistanciaVertice)}
            options={SENTIDO_OPTIONS}
          />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado?.error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {resultado.error}
        </p>
      )}

      {resultado?.potenciaCompensada != null && (
        <>
          <ResultCard
            rows={[
              { label: "Potencia compensada", value: `${formatSigned(resultado.potenciaCompensada)} D` },
            ]}
          />
          <div>
            <AddToInformeButton
              calculatorTitle="Distancia al vértice"
              entradas={[
                { label: "Potencia de partida", value: `${formatSigned(potenciaN)} D` },
                { label: "Diferencia de distancia al vértice", value: `${distanciaN} mm` },
                {
                  label: "Sentido",
                  value: SENTIDO_OPTIONS.find((o) => o.value === sentido)?.label ?? "",
                },
              ]}
              resultados={[
                { label: "Potencia compensada", value: `${formatSigned(resultado.potenciaCompensada)} D` },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}
