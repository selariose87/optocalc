"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { ReportButton } from "@/components/calculators/ReportButton";
import { avisosOverRefraction, calcularSobrerrefraccion } from "@/lib/calculators/overRefraction";
import { formatSigned } from "@/lib/format";

export function OverRefractionForm() {
  const [potenciaPrueba, setPotenciaPrueba] = useState("-3.00");
  const [overSphere, setOverSphere] = useState("-0.50");
  const [overCilindro, setOverCilindro] = useState("0.00");

  const potenciaPruebaN = parseFloat(potenciaPrueba);
  const overSphereN = parseFloat(overSphere);
  const overCilindroN = parseFloat(overCilindro);
  const valido = [potenciaPruebaN, overSphereN, overCilindroN].every(Number.isFinite);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return calcularSobrerrefraccion({
      potenciaPrueba: potenciaPruebaN,
      overSphere: overSphereN,
      overCilindro: overCilindroN,
    });
  }, [valido, potenciaPruebaN, overSphereN, overCilindroN]);

  const avisos = valido
    ? avisosOverRefraction({
        potenciaPrueba: potenciaPruebaN,
        overSphere: overSphereN,
        overCilindro: overCilindroN,
      })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Lentilla de prueba y sobrerrefracción
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <NumberField
            id="potencia-prueba"
            label="Potencia de la lentilla de prueba"
            value={potenciaPrueba}
            onChange={setPotenciaPrueba}
            unit="D"
          />
          <NumberField id="over-sphere" label="Esfera de sobrerrefracción" value={overSphere} onChange={setOverSphere} unit="D" />
          <NumberField
            id="over-cilindro"
            label="Cilindro de sobrerrefracción"
            value={overCilindro}
            onChange={setOverCilindro}
            unit="D"
            helpText="Deja en 0 si es solo esférica"
          />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[
              { label: "Equivalente esférico de la sobrerrefracción", value: `${formatSigned(resultado.equivalenteEsfericoOverRx)} D` },
              { label: "Potencia final de la lentilla", value: `${formatSigned(resultado.potenciaFinal)} D` },
            ]}
          />
          <div>
            <ReportButton
              calculatorTitle="Sobrerrefracción en lentilla"
              entradas={[
                { label: "Potencia de la lentilla de prueba", value: `${formatSigned(potenciaPruebaN)} D` },
                { label: "Esfera de sobrerrefracción", value: `${formatSigned(overSphereN)} D` },
                { label: "Cilindro de sobrerrefracción", value: `${formatSigned(overCilindroN)} D` },
              ]}
              resultados={[
                { label: "Equivalente esférico de la sobrerrefracción", value: `${formatSigned(resultado.equivalenteEsfericoOverRx)} D` },
                { label: "Potencia final de la lentilla", value: `${formatSigned(resultado.potenciaFinal)} D` },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
}
