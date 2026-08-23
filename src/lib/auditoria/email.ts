import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { InformeAuditoria } from "./types";

function construirHtmlEmail(nombre: string, informe: InformeAuditoria): string {
  const pendientes = informe.checks
    .filter((c) => !c.passed)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 6);

  const filasPendientes = pendientes
    .map(
      (c) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;">
            <strong style="color:#111827;">${c.label}</strong><br/>
            <span style="color:#4b5563;font-size:14px;">${c.mensaje}</span>
          </td>
        </tr>`
    )
    .join("");

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#111827;">
    <h1 style="font-size:20px;">Hola ${nombre || ""}, aquí tienes el informe de tu web</h1>
    <p style="color:#4b5563;">Análisis de <strong>${informe.url}</strong> generado con ${SITE_NAME}.</p>
    <div style="text-align:center;margin:24px 0;">
      <div style="display:inline-block;width:96px;height:96px;line-height:96px;border-radius:50%;background:#f5f3ff;color:#6d28d9;font-size:28px;font-weight:bold;">
        ${informe.puntuacion}
      </div>
      <p style="color:#4b5563;margin-top:8px;">Puntuación sobre 100</p>
    </div>
    <h2 style="font-size:16px;">Puntos a mejorar más importantes</h2>
    <table style="width:100%;border-collapse:collapse;">${filasPendientes}</table>
    <p style="margin-top:24px;color:#6b7280;font-size:12px;">
      Esta herramienta es una ayuda orientativa y no sustituye una auditoría SEO profesional completa.
    </p>
    <p style="margin-top:16px;">
      <a href="${SITE_URL}" style="color:#6d28d9;">${SITE_URL}</a>
    </p>
  </div>`;
}

export async function enviarInformePorEmail(
  destinatario: { nombre: string; email: string },
  informe: InformeAuditoria
): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) return;

  try {
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: SITE_NAME, email: senderEmail },
        to: [{ email: destinatario.email, name: destinatario.nombre }],
        subject: `Informe SEO de tu web (${informe.puntuacion}/100) — ${SITE_NAME}`,
        htmlContent: construirHtmlEmail(destinatario.nombre, informe),
      }),
    });
  } catch {
    // El envío de email es un extra: si falla, el informe en pantalla sigue funcionando.
  }
}
