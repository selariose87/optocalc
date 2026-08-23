import { NextRequest, NextResponse } from "next/server";
import { validarUrlPublica } from "@/lib/auditoria/urlSeguridad";
import { analizarWeb, AnalisisError } from "@/lib/auditoria/analizarWeb";
import { contarAnalisisRecientes, guardarLead } from "@/lib/auditoria/airtable";
import { enviarInformePorEmail } from "@/lib/auditoria/email";

export const runtime = "nodejs";
export const maxDuration = 60;

const LIMITE_ANALISIS_24H = 3;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function obtenerIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "0.0.0.0";
}

export async function POST(request: NextRequest) {
  let body: { url?: string; nombre?: string; email?: string; optica?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  const nombre = (body.nombre || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const optica = (body.optica || "").trim();
  const urlEntrada = (body.url || "").trim();

  if (!nombre || !email || !urlEntrada) {
    return NextResponse.json({ error: "Faltan datos obligatorios." }, { status: 400 });
  }
  if (!REGEX_EMAIL.test(email)) {
    return NextResponse.json({ error: "El email no es válido." }, { status: 400 });
  }

  const ip = obtenerIp(request);

  const analisisRecientes = await contarAnalisisRecientes(email, ip);
  if (analisisRecientes >= LIMITE_ANALISIS_24H) {
    return NextResponse.json(
      {
        error:
          "Has alcanzado el límite de 3 análisis gratuitos en 24 horas. Vuelve a intentarlo mañana.",
      },
      { status: 429 }
    );
  }

  const urlValidada = await validarUrlPublica(urlEntrada);
  if (!urlValidada.ok || !urlValidada.url) {
    return NextResponse.json({ error: urlValidada.error }, { status: 400 });
  }

  try {
    const informe = await analizarWeb(urlValidada.url);

    await guardarLead({
      nombre,
      email,
      optica,
      url: informe.url,
      puntuacion: informe.puntuacion,
      ip,
    });

    void enviarInformePorEmail({ nombre, email }, informe);

    return NextResponse.json({ informe });
  } catch (error) {
    if (error instanceof AnalisisError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }
    return NextResponse.json(
      { error: "Ha ocurrido un error inesperado al analizar la web. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
