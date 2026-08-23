import type { ChequeoParcial } from "./checksOnPage";

async function fetchConTimeout(url: string, ms: number): Promise<Response | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "KoptikApp-AuditorSEO/1.0" },
      redirect: "follow",
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function comprobarRobotsYSitemap(urlFinal: string): Promise<ChequeoParcial[]> {
  const origen = new URL(urlFinal).origin;

  const robotsRes = await fetchConTimeout(`${origen}/robots.txt`, 8000);
  const robotsOk = !!robotsRes && robotsRes.ok;
  const robotsTexto = robotsOk ? await robotsRes!.text().catch(() => "") : "";

  let sitemapOk = false;
  let sitemapDetalle = "No se ha encontrado sitemap.xml";

  const sitemapDirecto = await fetchConTimeout(`${origen}/sitemap.xml`, 8000);
  if (sitemapDirecto && sitemapDirecto.ok) {
    sitemapOk = true;
    sitemapDetalle = "sitemap.xml accesible en la ruta estándar";
  } else {
    const lineaSitemap = robotsTexto
      .split("\n")
      .find((linea) => linea.toLowerCase().trim().startsWith("sitemap:"));
    if (lineaSitemap) {
      const urlSitemap = lineaSitemap.split(":").slice(1).join(":").trim();
      const sitemapAlternativo = await fetchConTimeout(urlSitemap, 8000);
      if (sitemapAlternativo && sitemapAlternativo.ok) {
        sitemapOk = true;
        sitemapDetalle = "Sitemap accesible (declarado en robots.txt)";
      }
    }
  }

  return [
    {
      id: "robots-txt",
      passed: robotsOk,
      fraccion: robotsOk ? 1 : 0,
      detail: robotsOk ? "robots.txt accesible" : "No se ha encontrado robots.txt",
    },
    {
      id: "sitemap-xml",
      passed: sitemapOk,
      fraccion: sitemapOk ? 1 : 0,
      detail: sitemapDetalle,
    },
  ];
}
