"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { useOpticaSettings } from "@/hooks/useOpticaSettings";
import type { OpticaSettings } from "@/lib/opticaSettings";

export function OpticaSettingsForm() {
  const { settings, updateSettings } = useOpticaSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function setField<K extends keyof OpticaSettings>(key: K, value: OpticaSettings[K]) {
    updateSettings({ ...settings, [key]: value });
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setField("logoDataUrl", reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex max-w-xl flex-col gap-5 rounded-xl border border-slate-200 p-6">
      <div>
        <p className="mb-1.5 text-sm font-medium text-slate-700">Logo de la óptica</p>
        <div className="flex items-center gap-3">
          {settings.logoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={settings.logoDataUrl}
              alt="Logo de la óptica"
              className="h-20 w-20 rounded-md border border-slate-200 object-contain p-1"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-md border border-dashed border-slate-300 text-[10px] text-slate-400">
              Sin logo
            </div>
          )}
          <div className="flex flex-col gap-1">
            <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()}>
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
        id="ajustes-nombre"
        label="Nombre de la óptica"
        value={settings.nombre}
        onChange={(v) => setField("nombre", v)}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          id="ajustes-telefono"
          label="Teléfono"
          value={settings.telefono}
          onChange={(v) => setField("telefono", v)}
          type="tel"
        />
        <TextField
          id="ajustes-email"
          label="Email"
          value={settings.email}
          onChange={(v) => setField("email", v)}
          type="email"
        />
      </div>
      <TextField
        id="ajustes-direccion"
        label="Dirección"
        value={settings.direccion}
        onChange={(v) => setField("direccion", v)}
      />

      <p className="text-sm text-slate-500">
        Los cambios se guardan automáticamente en este navegador.
      </p>
    </div>
  );
}
