"use client";

import { useMemo, useState } from "react";
import { NumberField } from "@/components/ui/NumberField";
import { ResultCard } from "@/components/calculators/ResultCard";
import { WarningList } from "@/components/calculators/WarningList";
import { ReportButton } from "@/components/calculators/ReportButton";
import { avisosBlankSize, calcularDiametroMinimoBloque } from "@/lib/calculators/blankSize";
import { formatNumber } from "@/lib/format";

export function BlankSizeForm() {
  const [frameA, setFrameA] = useState("52");
  const [frameDbl, setFrameDbl] = useState("18");
  const [pacientePd, setPacientePd] = useState("62");
  const [diametroEfectivo, setDiametroEfectivo] = useState("54");

  const frameAN = parseFloat(frameA);
  const frameDblN = parseFloat(frameDbl);
  const pacientePdN = parseFloat(pacientePd);
  const diametroEfectivoN = parseFloat(diametroEfectivo);
  const valido = [frameAN, frameDblN, pacientePdN, diametroEfectivoN].every(Number.isFinite);

  const resultado = useMemo(() => {
    if (!valido) return null;
    return calcularDiametroMinimoBloque({
      frameA: frameAN,
      frameDbl: frameDblN,
      pacientePd: pacientePdN,
      diametroEfectivo: diametroEfectivoN,
    });
  }, [valido, frameAN, frameDblN, pacientePdN, diametroEfectivoN]);

  const avisos = valido
    ? avisosBlankSize({
        frameA: frameAN,
        frameDbl: frameDblN,
        pacientePd: pacientePdN,
        diametroEfectivo: diametroEfectivoN,
      })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Medidas de montura y paciente
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField
            id="frame-a"
            label="Medida A de la montura"
            value={frameA}
            onChange={setFrameA}
            step={1}
            unit="mm"
            helpText="Anchura horizontal de la lente"
          />
          <NumberField
            id="frame-dbl"
            label="DBL de la montura"
            value={frameDbl}
            onChange={setFrameDbl}
            step={1}
            unit="mm"
            helpText="Distancia entre lentes (puente)"
          />
          <NumberField id="paciente-pd" label="DIP del paciente" value={pacientePd} onChange={setPacientePd} step={1} unit="mm" />
          <NumberField
            id="diametro-efectivo"
            label="Diámetro efectivo (ED)"
            value={diametroEfectivo}
            onChange={setDiametroEfectivo}
            step={1}
            unit="mm"
            helpText="ED medido de la montura"
          />
        </div>
      </div>

      <WarningList avisos={avisos} />

      {resultado && (
        <>
          <ResultCard
            rows={[
              { label: "DIP de la montura", value: `${formatNumber(resultado.framePd, 1)} mm` },
              { label: "Descentramiento total", value: `${formatNumber(resultado.descentramientoTotal, 1)} mm` },
              { label: "Diámetro mínimo de bloque", value: `${formatNumber(resultado.bloqueMinimo, 1)} mm` },
            ]}
          />
          <p className="text-sm text-slate-500">
            Pide siempre un bloque ligeramente mayor que el mínimo calculado, para compensar el margen de biselado y montaje.
          </p>
          <div>
            <ReportButton
              calculatorTitle="Diámetro mínimo de bloque"
              entradas={[
                { label: "Medida A de la montura", value: `${frameAN} mm` },
                { label: "DBL de la montura", value: `${frameDblN} mm` },
                { label: "DIP del paciente", value: `${pacientePdN} mm` },
                { label: "Diámetro efectivo (ED)", value: `${diametroEfectivoN} mm` },
              ]}
              resultados={[
                { label: "DIP de la montura", value: `${formatNumber(resultado.framePd, 1)} mm` },
                { label: "Descentramiento total", value: `${formatNumber(resultado.descentramientoTotal, 1)} mm` },
                { label: "Diámetro mínimo de bloque", value: `${formatNumber(resultado.bloqueMinimo, 1)} mm` },
              ]}
              notas={["Pide un bloque ligeramente mayor que el mínimo calculado para el margen de biselado."]}
            />
          </div>
        </>
      )}
    </div>
  );
}
