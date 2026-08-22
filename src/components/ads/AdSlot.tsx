type AdSlotVariant = "header" | "sidebar" | "in-content" | "mobile-banner";

interface AdSlotProps {
  variant: AdSlotVariant;
  className?: string;
}

const VARIANT_CLASSES: Record<AdSlotVariant, string> = {
  header: "h-[90px] w-full max-w-[728px]",
  sidebar: "h-[600px] w-full max-w-[300px]",
  "in-content": "h-[250px] w-full max-w-[336px]",
  "mobile-banner": "h-[100px] w-full",
};

const VARIANT_LABEL: Record<AdSlotVariant, string> = {
  header: "Espacio publicitario",
  sidebar: "Publicidad",
  "in-content": "Espacio publicitario",
  "mobile-banner": "Publicidad",
};

// Placeholder de anuncio: sustituir el contenido interior por el <ins> de
// Google AdSense (u otro proveedor) cuando esté disponible, manteniendo
// este mismo componente y sus variantes de tamaño.
export function AdSlot({ variant, className = "" }: AdSlotProps) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto flex items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 text-xs font-medium tracking-wide text-slate-400 uppercase ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {VARIANT_LABEL[variant]}
    </div>
  );
}
