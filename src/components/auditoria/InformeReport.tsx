import type { InformeAuditoria } from "@/lib/auditoria/types";

function colorPuntuacion(puntuacion: number): { texto: string; barra: string; etiqueta: string } {
  if (puntuacion >= 80) return { texto: "text-emerald-700", barra: "bg-emerald-600", etiqueta: "Muy buena" };
  if (puntuacion >= 50) return { texto: "text-amber-700", barra: "bg-amber-500", etiqueta: "Mejorable" };
  return { texto: "text-red-700", barra: "bg-red-600", etiqueta: "Necesita atención" };
}

export function InformeReport({ informe }: { informe: InformeAuditoria }) {
  const color = colorPuntuacion(informe.puntuacion);
  const pendientes = [...informe.checks].filter((c) => !c.passed).sort((a, b) => b.weight - a.weight);
  const correctos = [...informe.checks].filter((c) => c.passed).sort((a, b) => b.weight - a.weight);

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl border border-slate-200 p-6">
        <p className="text-sm text-slate-500">Informe para</p>
        <p className="break-all font-medium text-slate-900">{informe.url}</p>

        <div className="mt-5 flex items-center gap-6">
          <span className={`text-5xl font-extrabold ${color.texto}`}>{informe.puntuacion}</span>
          <div className="flex-1">
            <p className={`text-sm font-semibold ${color.texto}`}>{color.etiqueta}</p>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${color.barra}`}
                style={{ width: `${informe.puntuacion}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-slate-400">Puntuación sobre 100</p>
          </div>
        </div>
      </div>

      {pendientes.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Puntos a mejorar</h2>
          {pendientes.map((c) => (
            <div key={c.id} className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-900">{c.label}</p>
                <span className="shrink-0 text-xs text-amber-700">
                  {c.pointsEarned}/{c.weight} pts
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{c.detail}</p>
              <p className="mt-2 text-sm text-slate-700">{c.mensaje}</p>
            </div>
          ))}
        </div>
      )}

      {correctos.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Lo que ya haces bien</h2>
          {correctos.map((c) => (
            <div key={c.id} className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-900">{c.label}</p>
                <span className="shrink-0 text-xs text-emerald-700">
                  {c.pointsEarned}/{c.weight} pts
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-700">{c.mensaje}</p>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-400">
        Análisis orientativo automático, sin revisión humana. No sustituye una auditoría SEO
        profesional completa.
      </p>
    </div>
  );
}
