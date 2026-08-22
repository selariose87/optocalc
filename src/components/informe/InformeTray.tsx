"use client";

import { useState } from "react";
import { useInforme } from "@/lib/informe/InformeContext";
import { InformeBuilderModal } from "./InformeBuilderModal";

export function InformeTray() {
  const { items } = useInforme();
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 rounded-full bg-violet-700 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-violet-800"
      >
        Ver informe ({items.length})
      </button>
      {open && <InformeBuilderModal onClose={() => setOpen(false)} />}
    </>
  );
}
