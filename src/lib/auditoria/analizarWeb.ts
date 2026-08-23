import { analizarOnPage } from "./checksOnPage";
import { comprobarRobotsYSitemap } from "./checksRed";
import { comprobarPageSpeed } from "./pagespeed";
import { ensamblarInforme } from "./informe";
import type { InformeAuditoria } from "./types";

export class AnalisisError extends Error {}

async function obtenerHtml(url: string): Promise<{ html: string; urlFinal: string }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "KoptikApp-AuditorSEO/1.0" },
    });
    if (!res.ok) {
      throw new AnalisisError(`La web respondió con un error (código ${res.status}).`);
    }
    const html = await res.text();
    return { html, urlFinal: res.url || url };
  } catch (error) {
    if (error instanceof AnalisisError) throw error;
    throw new AnalisisError(
      "No se ha podido acceder a esa web. Comprueba que la dirección es correcta y que el sitio está en línea."
    );
  } finally {
    clearTimeout(timeout);
  }
}

export async function analizarWeb(url: string): Promise<InformeAuditoria> {
  const [{ html, urlFinal }, chequeosPageSpeed] = await Promise.all([
    obtenerHtml(url),
    comprobarPageSpeed(url),
  ]);

  const chequeosOnPage = analizarOnPage(html, urlFinal);
  const chequeosRed = await comprobarRobotsYSitemap(urlFinal);

  return ensamblarInforme(urlFinal, [...chequeosOnPage, ...chequeosRed, ...chequeosPageSpeed]);
}
