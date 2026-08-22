"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { SelectField } from "@/components/ui/SelectField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { ReportButton } from "@/components/calculators/ReportButton";
import {
  avisosLensThickness,
  calcularEspesorLente,
  INDICES_REFRACCION,
} from "@/lib/calculators/lensThickness";
import { formatNumber, formatSigned } from "@/lib/format";

export function LensThicknessForm() {
  const [potencia, setPotencia] = useState("-4.00");
  const [diametro, setDiametro] = useState("50");
  const [indice, setIndice] = useState("1.498");
  const [espesorCentro, setEspesorCentro] = useState("2.0");

  const potenciaN = parseFloat(potencia);
  const diametroN = parseFloat(diametro);
  const indiceN = parseFloat(indice);
  const espesorCentroN = parseFloat(espesorCentro);
  const valido = [potenciaN, diametroN, indiceN, espesorCentroN].every(Number.isFinite);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return calcularEspesorLente({
      potencia: potenciaN,
      diametro: diametroN,
      indice: indiceN,
      espesorCentro: espesorCentroN,
    });
  }, [valido, potenciaN, diametroN, indiceN, espesorCentroN]);

  const avisos = valido
    ? avisosLensThickness({ diametro: diametroN, espesorCentro: espesorCentroN })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Parámetros de la lente
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField id="potencia-espesor" label="Potencia de la lente" value={potencia} onChange={setPotencia} unit="D" />
          <NumberField
            id="diametro-espesor"
            label="Diámetro de la lente"
            value={diametro}
            onChange={setDiametro}
            step={1}
            unit="mm"
          />
          <SelectField
            id="indice-refraccion"
            label="Índice de refracción"
            value={indice}
            onChange={setIndice}
            options={INDICES_REFRACCION}
          />
          <NumberField
            id="espesor-centro"
            label="Espesor de centro"
            value={espesorCentro}
            onChange={setEspesorCentro}
            step={0.1}
            unit="mm"
            helpText="Habitual en lentes negativas: 2.0 mm"
          />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[
              { label: "Sagita", value: `${formatNumber(resultado.sagita)} mm` },
              { label: "Espesor de borde estimado", value: `${formatNumber(resultado.espesorBorde)} mm` },
            ]}
          />
          <div>
            <ReportButton
              calculatorTitle="Espesor de lente"
              entradas={[
                { label: "Potencia", value: `${formatSigned(potenciaN)} D` },
                { label: "Diámetro", value: `${diametroN} mm` },
                { label: "Índice de refracción", value: indiceN.toString() },
                { label: "Espesor de centro", value: `${espesorCentroN} mm` },
              ]}
              resultados={[
                { label: "Sagita", value: `${formatNumber(resultado.sagita)} mm` },
                { label: "Espesor de borde estimado", value: `${formatNumber(resultado.espesorBorde)} mm` },
              ]}
              notas={["Estimación aproximada; el espesor real depende del biselado y del laboratorio."]}
            />
          </div>
        </>
      )}
    </div>
  );
}
