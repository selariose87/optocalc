"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ReportModal } from "./ReportModal";
import type { ReportField } from "@/lib/calculators/types";

interface ReportButtonProps {
  calculatorTitle: string;
  entradas: ReportField[];
  resultados: ReportField[];
  notas?: string[];
  disabled?: boolean;
}

export function ReportButton({
  calculatorTitle,
  entradas,
  resultados,
  notas,
  disabled,
}: ReportButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        Generar informe PDF
      </Button>
      {open && (
        <ReportModal
          calculatorTitle={calculatorTitle}
          entradas={entradas}
          resultados={resultados}
          notas={notas}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
