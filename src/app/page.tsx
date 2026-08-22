import Link from "next/link";
import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { CALCULATORS } from "@/lib/calculators/registry";
import { SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
};

const POPULARES = CALCULATORS.filter((c) => c.popular);

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4">
        <h1 className="max-w-2xl text-3xl font-bold text-slate-900 sm:text-4xl">
          Calculadoras profesionales de optometría, en español
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          {CALCULATORS.length} calculadoras de prisma, potencia de lente, medidas, prescripción y
          lentes de contacto, listas para usar en consulta. Genera un informe en PDF con el logo
          de tu óptica en un solo clic.
        </p>
      </section>

      <section aria-label="Calculadoras populares" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Calculadoras más usadas</h2>
          <Link href="/calculadoras" className="text-sm font-medium text-violet-700 hover:text-violet-800">
            Ver todas →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {POPULARES.map((c) => (
            <Link
              key={c.slug}
              href={`/calculadoras/${c.slug}`}
              className="flex flex-col gap-2 rounded-xl border border-slate-200 p-5 transition hover:border-violet-600 hover:shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
              <p className="text-sm text-slate-600">{c.shortDescription}</p>
              <span className="mt-1 text-sm font-medium text-violet-700">Abrir calculadora →</span>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot variant="in-content" className="mx-auto" />

      <section className="flex flex-col gap-3 rounded-xl bg-slate-50 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Pensado para usar en consulta</h2>
        <p className="text-sm text-slate-600">
          Cada calculadora muestra el resultado al instante, sin recargar la página, y permite
          generar un informe en PDF con los datos introducidos, el resultado y el logo de tu
          óptica, listo para archivar en el expediente del paciente.
        </p>
      </section>
    </div>
  );
}
