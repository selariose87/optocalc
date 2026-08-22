import { ReactNode } from "react";
import { AdSlot } from "@/components/ads/AdSlot";

interface CalculatorPageLayoutProps {
  title: string;
  intro: string;
  children: ReactNode;
  explicacion: ReactNode;
}

export function CalculatorPageLayout({
  title,
  intro,
  children,
  explicacion,
}: CalculatorPageLayoutProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
        <p className="max-w-2xl text-slate-600">{intro}</p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">{children}</div>
        <aside className="hidden lg:block">
          <div className="sticky top-6">
            <AdSlot variant="sidebar" />
          </div>
        </aside>
      </div>

      <AdSlot variant="mobile-banner" className="lg:hidden" />

      <section className="flex max-w-3xl flex-col gap-3 border-t border-slate-100 pt-8 text-slate-700 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2]:mt-2 [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed">
        {explicacion}
      </section>
    </div>
  );
}
