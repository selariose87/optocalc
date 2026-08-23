export interface LeadAuditoria {
  nombre: string;
  email: string;
  optica?: string;
  url: string;
  puntuacion: number;
  ip: string;
}

function config() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tabla = process.env.AIRTABLE_TABLE_NAME || "Leads";
  if (!apiKey || !baseId) return null;
  return { apiKey, baseId, tabla };
}

function escaparFormula(valor: string): string {
  return valor.replace(/'/g, "\\'");
}

// Cuenta cuántos análisis se han hecho desde este email o esta IP en las
// últimas 24 horas, para limitar el abuso de la cuota gratuita de PageSpeed.
// Si Airtable no está configurado, no se puede limitar y se deja pasar
// (nunca debe bloquear el uso solo por no tener credenciales).
// {Fecha} es un campo "Fecha de creación" (de solo lectura, lo rellena
// Airtable automáticamente), por eso no se envía al crear el registro.
export async function contarAnalisisRecientes(email: string, ip: string): Promise<number> {
  const cfg = config();
  if (!cfg) return 0;

  const formula = `AND(
    IS_AFTER({Fecha}, DATEADD(NOW(), -1, 'days')),
    OR({Email} = '${escaparFormula(email)}', {IP} = '${escaparFormula(ip)}')
  )`;

  const endpoint = new URL(
    `https://api.airtable.com/v0/${cfg.baseId}/${encodeURIComponent(cfg.tabla)}`
  );
  endpoint.searchParams.set("filterByFormula", formula);
  endpoint.searchParams.set("fields[]", "Email");

  try {
    const res = await fetch(endpoint.toString(), {
      headers: { Authorization: `Bearer ${cfg.apiKey}` },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("contarAnalisisRecientes: Airtable respondió", res.status, await res.text());
      return 0;
    }
    const data = await res.json();
    return Array.isArray(data.records) ? data.records.length : 0;
  } catch (error) {
    console.error("contarAnalisisRecientes: fetch falló", error);
    return 0;
  }
}

export async function guardarLead(lead: LeadAuditoria): Promise<void> {
  const cfg = config();
  if (!cfg) return;

  const endpoint = `https://api.airtable.com/v0/${cfg.baseId}/${encodeURIComponent(cfg.tabla)}`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Nombre: lead.nombre,
          Email: lead.email,
          Optica: lead.optica || "",
          URL: lead.url,
          Puntuacion: lead.puntuacion,
          IP: lead.ip,
        },
      }),
    });
    if (!res.ok) {
      console.error("guardarLead: Airtable respondió", res.status, await res.text());
    }
  } catch (error) {
    console.error("guardarLead: fetch falló", error);
    // Si falla el guardado del lead, no debe romper la generación del informe.
  }
}
