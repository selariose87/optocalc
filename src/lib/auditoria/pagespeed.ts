import type { ChequeoParcial } from "./checksOnPage";

interface PageSpeedApiResponse {
  lighthouseResult?: {
    categories?: {
      performance?: { score?: number };
      seo?: { score?: number };
    };
    audits?: Record<string, { score?: number | null; displayValue?: string }>;
  };
  loadingExperience?: {
    overall_category?: "FAST" | "AVERAGE" | "SLOW";
  };
}

// Usa la API pública y gratuita de PageSpeed Insights v5 (cuota diaria muy
// alta en el tier gratuito). Si no hay API key configurada, o la llamada
// falla, se devuelve un estado "no disponible" sin romper el resto del
// informe.
export async function comprobarPageSpeed(urlFinal: string): Promise<ChequeoParcial[]> {
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;

  const noDisponible = (motivo: string): ChequeoParcial[] => [
    { id: "rendimiento", passed: false, fraccion: 0, detail: motivo },
    { id: "core-web-vitals", passed: false, fraccion: 0, detail: motivo },
    { id: "mobile-friendly", passed: false, fraccion: 0, detail: motivo },
  ];

  if (!apiKey) {
    return noDisponible("Análisis de rendimiento no disponible (PageSpeed no configurado)");
  }

  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", urlFinal);
  endpoint.searchParams.set("key", apiKey);
  endpoint.searchParams.set("strategy", "mobile");
  endpoint.searchParams.append("category", "performance");
  endpoint.searchParams.append("category", "seo");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);

  try {
    const res = await fetch(endpoint.toString(), { signal: controller.signal });
    if (!res.ok) {
      return noDisponible(`PageSpeed no ha podido analizar esta web (${res.status})`);
    }
    const data: PageSpeedApiResponse = await res.json();

    const performanceScore = Math.round(
      (data.lighthouseResult?.categories?.performance?.score ?? 0) * 100
    );

    const overallCategory = data.loadingExperience?.overall_category;
    const cwvPass = overallCategory
      ? overallCategory === "FAST"
      : performanceScore >= 90;
    const cwvFuente = overallCategory ? "datos reales de usuarios" : "estimado en laboratorio";

    const viewportAudit = data.lighthouseResult?.audits?.viewport;
    const mobileFriendly = viewportAudit?.score === 1;

    return [
      {
        id: "rendimiento",
        passed: performanceScore >= 90,
        fraccion: performanceScore / 100,
        detail: `Puntuación de rendimiento móvil: ${performanceScore}/100`,
      },
      {
        id: "core-web-vitals",
        passed: cwvPass,
        fraccion: cwvPass ? 1 : 0,
        detail: `${cwvPass ? "Cumple" : "No cumple"} (${cwvFuente})`,
      },
      {
        id: "mobile-friendly",
        passed: mobileFriendly,
        fraccion: mobileFriendly ? 1 : 0,
        detail: mobileFriendly ? "Vista móvil correctamente configurada" : "Vista móvil no válida",
      },
    ];
  } catch {
    return noDisponible("El análisis de rendimiento ha tardado demasiado y se ha omitido");
  } finally {
    clearTimeout(timeout);
  }
}
