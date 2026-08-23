"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { InformeReport } from "./InformeReport";
import type { InformeAuditoria } from "@/lib/auditoria/types";

type Paso = "url" | "lead" | "cargando" | "informe" | "error" | "limite";

export function AuditoriaForm() {
  const [paso, setPaso] = useState<Paso>("url");
  const [url, setUrl] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [optica, setOptica] = useState("");
  const [error, setError] = useState("");
  const [informe, setInforme] = useState<InformeAuditoria | null>(null);

  function handleUrlSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setPaso("lead");
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) return;

    setPaso("cargando");
    try {
      const res = await fetch("/api/auditoria/analizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, nombre, email, optica }),
      });
      const data = await res.json();

      if (res.status === 429) {
        setError(data.error || "Has alcanzado el límite de análisis gratuitos.");
        setPaso("limite");
        return;
      }
      if (!res.ok) {
        setError(data.error || "No se ha podido generar el informe.");
        setPaso("error");
        return;
      }

      setInforme(data.informe);
      setPaso("informe");
    } catch {
      setError("No se ha podido conectar con el servidor. Inténtalo de nuevo.");
      setPaso("error");
    }
  }

  function reiniciar() {
    setPaso("url");
    setUrl("");
    setInforme(null);
    setError("");
  }

  if (paso === "informe" && informe) {
    return (
      <div className="flex flex-col gap-6">
        <InformeReport informe={informe} />
        <div>
          <Button type="button" variant="secondary" onClick={reiniciar}>
            Analizar otra web
          </Button>
        </div>
      </div>
    );
  }

  if (paso === "cargando") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 p-10 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-700" />
        <p className="font-medium text-slate-900">Analizando tu web…</p>
        <p className="text-sm text-slate-500">
          Estamos revisando el contenido y la velocidad. Puede tardar hasta 20-30 segundos.
        </p>
      </div>
    );
  }

  if (paso === "limite" || paso === "error") {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="font-medium text-red-800">{error}</p>
        <div>
          <Button type="button" variant="secondary" onClick={reiniciar}>
            Volver a intentarlo
          </Button>
        </div>
      </div>
    );
  }

  if (paso === "lead") {
    return (
      <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-6">
        <div>
          <p className="font-semibold text-slate-900">Ya casi está</p>
          <p className="text-sm text-slate-500">
            Dinos a quién enviamos el informe de <span className="font-medium">{url}</span>.
          </p>
        </div>
        <TextField id="auditoria-nombre" label="Tu nombre" value={nombre} onChange={setNombre} />
        <TextField id="auditoria-email" label="Tu email" value={email} onChange={setEmail} type="email" />
        <TextField
          id="auditoria-optica"
          label="Nombre de tu óptica (opcional)"
          value={optica}
          onChange={setOptica}
        />
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost" onClick={() => setPaso("url")}>
            Atrás
          </Button>
          <Button type="submit">Ver mi informe gratis</Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleUrlSubmit} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-6 sm:flex-row sm:items-end">
      <div className="flex-1">
        <TextField
          id="auditoria-url"
          label="URL de la web de tu óptica"
          value={url}
          onChange={setUrl}
          placeholder="www.tuoptica.com"
        />
      </div>
      <Button type="submit">Analizar gratis</Button>
    </form>
  );
}
