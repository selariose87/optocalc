"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useInforme } from "@/lib/informe/InformeContext";
import type { ReportField } from "@/lib/calculators/types";

interface AddToInformeButtonProps {
  calculatorTitle: string;
  entradas: ReportField[];
  resultados: ReportField[];
  notas?: string[];
  disabled?: boolean;
}

export function AddToInformeButton({
  calculatorTitle,
  entradas,
  resultados,
  notas,
  disabled,
}: AddToInformeButtonProps) {
  const { addItem } = useInforme();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem({ calculatorTitle, entradas, resultados, notas });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <Button type="button" variant="secondary" disabled={disabled} onClick={handleClick}>
      {added ? "Añadido al informe" : "Añadir al informe"}
    </Button>
  );
}
