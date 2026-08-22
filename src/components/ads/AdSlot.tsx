type AdSlotVariant = "header" | "sidebar" | "in-content" | "mobile-banner";

interface AdSlotProps {
  variant: AdSlotVariant;
  className?: string;
}

// Tamaños alineados con los formatos estándar de IAB / Google AdSense.
// "header" usa un ancho fluido: al conectar AdSense, ese <ins> debe llevar
// data-ad-format="auto" data-full-width-responsive="true" para que el
// anuncio real se adapte al ancho disponible en vez de un tamaño fijo.
// El resto de variantes son tamaños fijos (fit garantizado por el layout).
const VARIANT_CLASSES: Record<AdSlotVariant, string> = {
  header: "h-[50px] sm:h-[90px] w-full max-w-[728px]",
  sidebar: "h-[600px] w-[300px]",
  "in-content": "h-[250px] w-[300px]",
  "mobile-banner": "h-[50px] w-[320px]",
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
