import dns from "node:dns/promises";
import net from "node:net";

export interface UrlValidada {
  ok: boolean;
  url?: string;
  error?: string;
}

const RANGOS_PRIVADOS = [
  { inicio: "10.0.0.0", fin: "10.255.255.255" },
  { inicio: "172.16.0.0", fin: "172.31.255.255" },
  { inicio: "192.168.0.0", fin: "192.168.255.255" },
  { inicio: "127.0.0.0", fin: "127.255.255.255" },
  { inicio: "169.254.0.0", fin: "169.254.255.255" },
  { inicio: "100.64.0.0", fin: "100.127.255.255" },
];

function ipAEntero(ip: string): number {
  return ip.split(".").reduce((acc, octeto) => (acc << 8) + Number(octeto), 0) >>> 0;
}

function esIpPrivada(ip: string): boolean {
  if (net.isIPv6(ip)) {
    return ip === "::1" || ip.startsWith("fc") || ip.startsWith("fd") || ip.startsWith("fe80");
  }
  if (!net.isIPv4(ip)) return true;
  const valor = ipAEntero(ip);
  return RANGOS_PRIVADOS.some(
    (rango) => valor >= ipAEntero(rango.inicio) && valor <= ipAEntero(rango.fin)
  );
}

// Normaliza y valida una URL enviada por el usuario, bloqueando destinos
// internos/privados antes de que el servidor haga fetch a esa dirección
// (protección básica contra SSRF).
export async function validarUrlPublica(entrada: string): Promise<UrlValidada> {
  let url: URL;
  try {
    url = new URL(entrada.includes("://") ? entrada : `https://${entrada}`);
  } catch {
    return { ok: false, error: "La URL introducida no es válida." };
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return { ok: false, error: "Solo se admiten URLs http o https." };
  }

  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".local")) {
    return { ok: false, error: "No se pueden analizar direcciones locales." };
  }

  try {
    const resultados = await dns.lookup(host, { all: true });
    if (resultados.some((r) => esIpPrivada(r.address))) {
      return { ok: false, error: "Esa dirección no es una web pública válida." };
    }
  } catch {
    return { ok: false, error: "No se ha podido resolver esa dirección." };
  }

  return { ok: true, url: url.toString() };
}
