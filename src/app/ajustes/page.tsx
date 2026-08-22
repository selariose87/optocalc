import type { Metadata } from "next";
import { OpticaSettingsForm } from "@/components/ajustes/OpticaSettingsForm";

export const metadata: Metadata = {
  title: "Datos de mi óptica",
  description:
    "Configura el logo y los datos de contacto de tu óptica para incluirlos en los informes en PDF.",
};

export default function AjustesPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Datos de mi óptica</h1>
        <p className="max-w-2xl text-slate-600">
          Estos datos se guardan solo en este navegador y se usan para rellenar automáticamente
          los informes en PDF de cada calculadora.
        </p>
      </header>
      <OpticaSettingsForm />
    </div>
  );
}
