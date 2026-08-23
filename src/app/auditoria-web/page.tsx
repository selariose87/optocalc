import type { Metadata } from "next";
import { AuditoriaForm } from "@/components/auditoria/AuditoriaForm";

export const metadata: Metadata = {
  title: "Audita la web de tu óptica gratis",
  description:
    "Analiza gratis el SEO y la velocidad de la web de tu óptica: título, meta descripción, HTTPS, datos estructurados de negocio local, Core Web Vitals y más. Informe al instante.",
};

export default function AuditoriaWebPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Audita la web de tu óptica gratis
        </h1>
        <p className="text-slate-600">
          Introduce la dirección de tu web y te decimos, en menos de un minuto, qué está frenando
          que te encuentren en Google: título y meta descripción, velocidad de carga, adaptación a
          móvil, datos de negocio local y más.
        </p>
      </header>

      <AuditoriaForm />

      <section className="flex flex-col gap-3 border-t border-slate-100 pt-8 text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">¿Qué revisamos?</h2>
        <ul className="ml-5 list-disc [&>li]:mt-1">
          <li>Título, meta descripción y estructura de encabezados</li>
          <li>Imágenes sin texto alternativo</li>
          <li>HTTPS, favicon, idioma declarado y etiquetas Open Graph</li>
          <li>robots.txt, sitemap.xml y datos estructurados de negocio local (schema.org)</li>
          <li>Nombre, dirección y teléfono visibles en la web (señal clave de SEO local)</li>
          <li>Velocidad de carga, Core Web Vitals y adaptación a móvil (Google PageSpeed Insights)</li>
        </ul>
        <p className="text-sm text-slate-500">
          Es un análisis automático y orientativo: no sustituye una auditoría SEO profesional
          completa, ni analiza posicionamiento por palabras clave, backlinks o competidores.
        </p>
      </section>
    </div>
  );
}
