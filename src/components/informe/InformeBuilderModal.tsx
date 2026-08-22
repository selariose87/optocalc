"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { useOpticaSettings } from "@/hooks/useOpticaSettings";
import { useInforme } from "@/lib/informe/InformeContext";
import { descargarInformePdf } from "@/lib/pdf/generateReport";
import type { OpticaSettings } from "@/lib/opticaSettings";

interface InformeBuilderModalProps {
  onClose: () => void;
}

export function InformeBuilderModal({ onClose }: InformeBuilderModalProps) {
  const { items, removeItem, clearItems } = useInforme();
  const { settings, updateSettings } = useOpticaSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(items.map((item) => item.id))
  );
  const [pacienteNombre, setPacienteNombre] = useState("");
  const [fecha, setFecha] = useState(() => new Date().toISOString().slice(0, 10));
  const [generando, setGenerando] = useState(false);

  function setField<K extends keyof OpticaSettings>(key: K, value: OpticaSettings[K]) {
    updateSettings({ ...settings, [key]: value });
  }

  function toggleSelected(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleRemove(id: string) {
    removeItem(id);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setField("logoDataUrl", reader.result as string);
    reader.readAsDataURL(file);
  }

  const seleccionados = items.filter((item) => selectedIds.has(item.id));

  async function handleGenerar() {
    if (seleccionados.length === 0) return;
    setGenerando(true);
    try {
      await descargarInformePdf({
        optica: settings,
        pacienteNombre: pacienteNombre || undefined,
        fecha: fecha || undefined,
        sections: seleccionados.map((item) => ({
          calculatorTitle: item.calculatorTitle,
          entradas: item.entradas,
          resultados: item.resultados,
          notas: item.notas,
        })),
      });
      clearItems();
      onClose();
    } finally {
      setGenerando(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Generar informe PDF</h2>
            <p className="mt-1 text-sm text-slate-500">
              Elige qué cálculos quieres incluir en este informe.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            Todavía no has añadido ningún cálculo. Ve a una calculadora, calcula un resultado y
            pulsa &quot;Añadir al informe&quot;.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            {items.map((item) => (
              <label
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-3"
              >
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    onChange={() => toggleSelected(item.id)}
                    className="h-4 w-4 accent-violet-700"
                  />
                  <span className="text-sm font-medium text-slate-900">
                    {item.calculatorTitle}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="text-xs text-slate-400 hover:text-red-600"
                >
                  Quitar
                </button>
              </label>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-5">
          <div>
            <p className="mb-1.5 text-sm font-medium text-slate-700">Logo de la óptica</p>
            <div className="flex items-center gap-3">
              {settings.logoDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={settings.logoDataUrl}
                  alt="Logo de la óptica"
                  className="h-16 w-16 rounded-md border border-slate-200 object-contain p-1"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-md border border-dashed border-slate-300 text-[10px] text-slate-400">
                  Sin logo
                </div>
              )}
              <div className="flex flex-col gap-1">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {settings.logoDataUrl ? "Cambiar logo" : "Subir logo"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>
            </div>
          </div>

          <TextField
            id="informe-optica-nombre"
            label="Nombre de la óptica"
            value={settings.nombre}
            onChange={(v) => setField("nombre", v)}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              id="informe-optica-telefono"
              label="Teléfono (opcional)"
              value={settings.telefono}
              onChange={(v) => setField("telefono", v)}
              type="tel"
            />
            <TextField
              id="informe-optica-email"
              label="Email (opcional)"
              value={settings.email}
              onChange={(v) => setField("email", v)}
              type="email"
            />
          </div>
          <TextField
            id="informe-optica-direccion"
            label="Dirección (opcional)"
            value={settings.direccion}
            onChange={(v) => setField("direccion", v)}
          />
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="mb-3 text-sm font-medium text-slate-700">
            Datos del paciente (opcional, solo para este informe)
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              id="informe-paciente-nombre"
              label="Nombre del paciente"
              value={pacienteNombre}
              onChange={setPacienteNombre}
            />
            <TextField
              id="informe-paciente-fecha"
              label="Fecha"
              value={fecha}
              onChange={setFecha}
              type="date"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleGenerar}
            disabled={generando || seleccionados.length === 0}
          >
            {generando
              ? "Generando…"
              : `Descargar informe PDF (${seleccionados.length})`}
          </Button>
        </div>
      </div>
    </div>
  );
}
