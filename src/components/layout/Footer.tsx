import Link from "next/link";
import { DISCLAIMER, SITE_NAME } from "@/lib/constants";
import { CALCULATORS } from "@/lib/calculators/registry";
import { CATEGORY_LABELS, CalculatorCategory } from "@/lib/calculators/types";

const CATEGORY_ORDER: CalculatorCategory[] = [
  "prisma",
  "potencia-lente",
  "medidas",
  "prescripcion",
  "lentes-contacto",
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-100 bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-slate-900">{SITE_NAME}</p>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Calculadoras profesionales para optometristas y ópticos.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORY_ORDER.map((category) => (
            <div key={category}>
              <p className="text-sm font-semibold text-slate-900">{CATEGORY_LABELS[category]}</p>
              <ul className="mt-1 flex flex-col gap-1">
                {CALCULATORS.filter((c) => c.category === category).map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/calculadoras/${c.slug}`}
                      className="text-sm text-slate-500 hover:text-violet-700"
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-sm font-semibold text-slate-900">Ajustes</p>
            <ul className="mt-1 flex flex-col gap-1">
              <li>
                <Link href="/ajustes" className="text-sm text-slate-500 hover:text-violet-700">
                  Datos de mi óptica
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="border-t border-slate-200 pt-4 text-xs text-slate-500">
          {DISCLAIMER}
        </p>
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
