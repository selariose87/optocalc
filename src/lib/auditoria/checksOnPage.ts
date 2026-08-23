import * as cheerio from "cheerio";
import type { CheckId } from "./types";

export interface ChequeoParcial {
  id: CheckId;
  passed: boolean;
  fraccion: number; // 0-1, puntos obtenidos / peso del check
  detail: string;
}

const REGEX_TELEFONO = /(\+34[\s.-]?)?[6789]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}\b/;
const REGEX_DIRECCION =
  /\b(calle|c\/|avenida|avda\.?|plaza|paseo|carrer|carretera|polígono)\s+[^\d,.;]{2,45}\d{1,4}/i;

function longitudEnRango(texto: string, min: number, max: number): "vacio" | "fuera" | "ideal" {
  if (!texto || texto.trim().length === 0) return "vacio";
  const len = texto.trim().length;
  return len >= min && len <= max ? "ideal" : "fuera";
}

export function analizarOnPage(html: string, urlFinal: string): ChequeoParcial[] {
  const $ = cheerio.load(html);
  const resultados: ChequeoParcial[] = [];

  // HTTPS
  const esHttps = urlFinal.startsWith("https://");
  resultados.push({
    id: "https",
    passed: esHttps,
    fraccion: esHttps ? 1 : 0,
    detail: esHttps ? "Conexión HTTPS activa" : "Conexión sin cifrar (HTTP)",
  });

  // Título
  const titulo = $("title").first().text().trim();
  const estadoTitulo = longitudEnRango(titulo, 50, 60);
  resultados.push({
    id: "titulo",
    passed: estadoTitulo === "ideal",
    fraccion: estadoTitulo === "ideal" ? 1 : estadoTitulo === "fuera" ? 0.5 : 0,
    detail: titulo ? `"${titulo}" (${titulo.length} caracteres)` : "No se ha encontrado título",
  });

  // Meta descripción
  const metaDescripcion = $('meta[name="description"]').attr("content")?.trim() ?? "";
  const estadoMeta = longitudEnRango(metaDescripcion, 120, 155);
  resultados.push({
    id: "meta-descripcion",
    passed: estadoMeta === "ideal",
    fraccion: estadoMeta === "ideal" ? 1 : estadoMeta === "fuera" ? 0.5 : 0,
    detail: metaDescripcion
      ? `${metaDescripcion.length} caracteres`
      : "No se ha encontrado meta descripción",
  });

  // H1 único
  const totalH1 = $("h1").length;
  resultados.push({
    id: "h1-unico",
    passed: totalH1 === 1,
    fraccion: totalH1 === 1 ? 1 : totalH1 === 0 ? 0 : 0.3,
    detail: totalH1 === 0 ? "No se ha encontrado ningún H1" : `${totalH1} etiquetas H1 encontradas`,
  });

  // Jerarquía de encabezados
  const niveles = $("h1, h2, h3, h4, h5, h6")
    .toArray()
    .map((el) => Number(el.tagName.slice(1)));
  let jerarquiaOk = true;
  let maxVisto = 0;
  for (const nivel of niveles) {
    if (maxVisto > 0 && nivel > maxVisto + 1) jerarquiaOk = false;
    maxVisto = Math.max(maxVisto, nivel);
  }
  resultados.push({
    id: "jerarquia-encabezados",
    passed: jerarquiaOk,
    fraccion: jerarquiaOk ? 1 : 0,
    detail: jerarquiaOk ? "Sin saltos de nivel" : "Hay saltos de nivel entre encabezados",
  });

  // Imágenes sin alt
  const imagenes = $("img").toArray();
  const sinAlt = imagenes.filter((img) => $(img).attr("alt") === undefined).length;
  const totalImagenes = imagenes.length;
  const fraccionAlt = totalImagenes === 0 ? 1 : 1 - sinAlt / totalImagenes;
  resultados.push({
    id: "imagenes-alt",
    passed: sinAlt === 0,
    fraccion: fraccionAlt,
    detail:
      totalImagenes === 0
        ? "No se han encontrado imágenes"
        : `${sinAlt} de ${totalImagenes} imágenes sin atributo alt`,
  });

  // Viewport
  const tieneViewport = $('meta[name="viewport"]').length > 0;
  resultados.push({
    id: "viewport",
    passed: tieneViewport,
    fraccion: tieneViewport ? 1 : 0,
    detail: tieneViewport ? "Etiqueta viewport presente" : "Etiqueta viewport ausente",
  });

  // lang
  const lang = $("html").attr("lang")?.toLowerCase() ?? "";
  const langEs = lang.startsWith("es");
  resultados.push({
    id: "lang",
    passed: langEs,
    fraccion: langEs ? 1 : lang ? 0.4 : 0,
    detail: lang ? `lang="${lang}"` : "Atributo lang ausente",
  });

  // Open Graph
  const ogTitle = $('meta[property="og:title"]').length > 0;
  const ogDescription = $('meta[property="og:description"]').length > 0;
  const ogImage = $('meta[property="og:image"]').length > 0;
  const totalOg = [ogTitle, ogDescription, ogImage].filter(Boolean).length;
  resultados.push({
    id: "open-graph",
    passed: totalOg === 3,
    fraccion: totalOg / 3,
    detail: `${totalOg} de 3 etiquetas Open Graph presentes`,
  });

  // Favicon
  const tieneFavicon = $('link[rel*="icon"]').length > 0;
  resultados.push({
    id: "favicon",
    passed: tieneFavicon,
    fraccion: tieneFavicon ? 1 : 0,
    detail: tieneFavicon ? "Favicon declarado" : "No se ha encontrado favicon",
  });

  // Schema.org LocalBusiness
  const tiposLocalBusiness = ["localbusiness", "optician", "medicalbusiness", "store"];
  let tieneLocalBusiness = false;
  $('script[type="application/ld+json"]').each((_, el) => {
    const contenido = $(el).contents().text();
    try {
      const data = JSON.parse(contenido);
      const nodos = Array.isArray(data) ? data : data["@graph"] ? data["@graph"] : [data];
      for (const nodo of nodos) {
        const tipo = nodo?.["@type"];
        const tipos = Array.isArray(tipo) ? tipo : [tipo];
        if (tipos.some((t) => typeof t === "string" && tiposLocalBusiness.includes(t.toLowerCase()))) {
          tieneLocalBusiness = true;
        }
      }
    } catch {
      // JSON-LD mal formado: se ignora ese bloque.
    }
  });
  resultados.push({
    id: "schema-local-business",
    passed: tieneLocalBusiness,
    fraccion: tieneLocalBusiness ? 1 : 0,
    detail: tieneLocalBusiness
      ? "Marcado LocalBusiness encontrado"
      : "No se ha encontrado marcado de negocio local",
  });

  // NAP (teléfono + dirección en el texto visible)
  const textoVisible = $("body").text().replace(/\s+/g, " ");
  const tieneTelefono = REGEX_TELEFONO.test(textoVisible);
  const tieneDireccion = REGEX_DIRECCION.test(textoVisible);
  const napFraccion = (tieneTelefono ? 0.5 : 0) + (tieneDireccion ? 0.5 : 0);
  resultados.push({
    id: "nap",
    passed: tieneTelefono && tieneDireccion,
    fraccion: napFraccion,
    detail: `Teléfono: ${tieneTelefono ? "detectado" : "no detectado"} · Dirección: ${
      tieneDireccion ? "detectada" : "no detectada"
    }`,
  });

  return resultados;
}
