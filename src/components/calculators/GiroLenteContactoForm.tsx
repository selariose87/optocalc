"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { SelectField } from "@/components/ui/SelectField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { AddToInformeButton } from "@/components/informe/AddToInformeButton";
import {
  avisosGiroLenteContacto,
  calcularGiroLente,
  DireccionGiro,
} from "@/lib/calculators/giroLenteContacto";

const DIRECCION_OPTIONS: { value: DireccionGiro; label: string }[] = [
  { value: "izquierda", label: "Hacia la izquierda del paciente" },
  { value: "derecha", label: "Hacia la derecha del paciente" },
];

export function GiroLenteContactoForm() {
  const [ejeOriginal, setEjeOriginal] = useState("90");
  const [rotacionGrados, setRotacionGrados] = useState("10");
  const [direccion, setDireccion] = useState<DireccionGiro>("izquierda");

  const ejeOriginalN = parseFloat(ejeOriginal);
  const rotacionGradosN = parseFloat(rotacionGrados);
  const valido = Number.isFinite(ejeOriginalN) && Number.isFinite(rotacionGradosN);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return calcularGiroLente({ ejeOriginal: ejeOriginalN, rotacionGrados: rotacionGradosN, direccion });
  }, [valido, ejeOriginalN, rotacionGradosN, direccion]);

  const avisos = valido
    ? avisosGiroLenteContacto({ ejeOriginal: ejeOriginalN, rotacionGrados: rotacionGradosN, direccion })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Eje pedido y rotación observada
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <NumberField id="eje-original-giro" label="Eje pedido" value={ejeOriginal} onChange={setEjeOriginal} step={1} unit="°" />
          <NumberField
            id="rotacion-giro"
            label="Rotación observada"
            value={rotacionGrados}
            onChange={setRotacionGrados}
            step={1}
            unit="°"
          />
          <SelectField
            id="direccion-giro"
            label="Dirección del giro"
            value={direccion}
            onChange={(v) => setDireccion(v as DireccionGiro)}
            options={DIRECCION_OPTIONS}
          />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard rows={[{ label: "Nuevo eje a pedir", value: `${resultado.nuevoEje}°` }]} />
          <p className="text-sm text-slate-500">
            Regla LARS: si la marca gira hacia la izquierda del paciente, se suma la rotación al
            eje; si gira hacia la derecha, se resta.
          </p>
          <div>
            <AddToInformeButton
              calculatorTitle="Giro de lente de contacto tórica"
              entradas={[
                { label: "Eje pedido", value: `${ejeOriginalN}°` },
                {
                  label: "Rotación observada",
                  value: `${rotacionGradosN}° ${DIRECCION_OPTIONS.find((o) => o.value === direccion)?.label}`,
                },
              ]}
              resultados={[{ label: "Nuevo eje a pedir", value: `${resultado.nuevoEje}°` }]}
              notas={["Regla LARS: Left Add, Right Subtract."]}
            />
          </div>
        </>
      )}
    </div>
  );
}
