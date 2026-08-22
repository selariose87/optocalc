import Link from "next/link";
import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { CALCULATORS } from "@/lib/calculators/registry";
import { CATEGORY_LABELS, CalculatorCategory } from "@/lib/calculators/types";

const CATEGORY_ORDER: CalculatorCategory[] = [
  "prisma",
  "potencia-lente",
  "medidas",
  "prescripcion",
  "lentes-contacto",
];

export const metadata: Metadata = {
  title: "Todas las calculadoras",
  description:
    "Todas las calculadoras profesionales de OptoCalc para optometristas y ópticos, agrupadas por categoría: prisma, potencia de lente, medidas, prescripción y lentes de contacto.",
};

export default function CalculadorasPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Todas las calculadoras</h1>
        <p className="max-w-2xl text-slate-600">
          Herramientas de cálculo óptico para el día a día en consulta, agrupadas por categoría.
        </p>
      </header>

      {CATEGORY_ORDER.map((category) => {
        const items = CALCULATORS.filter((c) => c.category === category);
        if (items.length === 0) return null;

        return (
          <section key={category} className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-slate-900">{CATEGORY_LABELS[category]}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((c) => (
                <Link
                  key={c.slug}
                  href={`/calculadoras/${c.slug}`}
                  className="flex flex-col gap-2 rounded-xl border border-slate-200 p-5 transition hover:border-violet-600 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-slate-900">{c.title}</h3>
                    {c.popular && (
                      <span className="shrink-0 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-800">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{c.shortDescription}</p>
                  <span className="mt-1 text-sm font-medium text-violet-700">Abrir calculadora →</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <AdSlot variant="in-content" className="mx-auto" />
    </div>
  );
}
