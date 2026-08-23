import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { SITE_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-700 text-sm font-bold text-white">
              K
            </span>
            <span className="text-lg font-bold text-slate-900">{SITE_NAME}</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium text-slate-600">
            <Link href="/calculadoras" className="hover:text-violet-700">
              Todas las calculadoras
            </Link>
            <Link href="/auditoria-web" className="hover:text-violet-700">
              Audita tu web gratis
            </Link>
            <Link href="/ajustes" className="hover:text-violet-700">
              Mi óptica
            </Link>
          </nav>
        </div>

        <AdSlot variant="header" />
      </div>
    </header>
  );
}
