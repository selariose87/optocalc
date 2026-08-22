import type { CalculatorMeta } from "./types";

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: "transposicion",
    title: "Transposición de graduación",
    shortDescription:
      "Convierte una graduación entre cilindro positivo y cilindro negativo.",
    metaDescription:
      "Calculadora de transposición de graduación online: convierte esfera, cilindro y eje entre notación de cilindro positivo y negativo al instante.",
    keywords: [
      "transposición de graduación",
      "cilindro positivo negativo",
      "transposición óptica",
    ],
    category: "prescripcion",
    popular: true,
  },
  {
    slug: "distancia-al-vertice",
    title: "Distancia al vértice",
    shortDescription:
      "Compensa la potencia de una lente al cambiar la distancia al vértice (gafa ↔ lentilla).",
    metaDescription:
      "Calculadora de distancia al vértice para optometristas: compensa la potencia entre gafa y lentilla de contacto según la distometría.",
    keywords: [
      "distancia al vértice",
      "distometría",
      "compensación de potencia",
      "gafa a lentilla",
    ],
    category: "prescripcion",
    popular: true,
  },
  {
    slug: "regla-prentice",
    title: "Regla de Prentice",
    shortDescription:
      "Calcula el prisma inducido por un descentramiento respecto al centro óptico.",
    metaDescription:
      "Calculadora de la regla de Prentice: obtén el prisma inducido en dioptrías prismáticas a partir del descentramiento y la potencia de la lente.",
    keywords: [
      "regla de Prentice",
      "prisma inducido",
      "dioptrías prismáticas",
      "descentramiento lente",
    ],
    category: "prisma",
    popular: true,
  },
  {
    slug: "resolucion-prisma",
    title: "Resolución de prisma",
    shortDescription:
      "Combina un prisma horizontal y vertical en un único prisma resultante con su eje.",
    metaDescription:
      "Calculadora de resolución de prisma: combina componentes horizontal (BI/BO) y vertical (BS/BI) en un prisma resultante y su eje.",
    keywords: [
      "resolución de prisma",
      "prisma resultante",
      "prisma horizontal vertical",
    ],
    category: "prisma",
    popular: true,
  },
  {
    slug: "potencia-lente",
    title: "Potencia de la lente",
    shortDescription:
      "Calcula la potencia total de una lente a partir de la potencia de sus caras.",
    metaDescription:
      "Calculadora de potencia de lente (fórmula del fabricante de lentes): obtén la potencia total a partir de la cara frontal y posterior.",
    keywords: ["potencia de lente", "fórmula del fabricante", "cara frontal posterior"],
    category: "potencia-lente",
    popular: true,
  },
  {
    slug: "espesor-lente",
    title: "Espesor de lente",
    shortDescription:
      "Estima el espesor de borde de una lente según su potencia, diámetro e índice de refracción.",
    metaDescription:
      "Calculadora de espesor de lente: estima el espesor de borde a partir de la potencia, el diámetro, el índice de refracción y el espesor de centro.",
    keywords: ["espesor de lente", "espesor de borde", "índice de refracción"],
    category: "potencia-lente",
  },
  {
    slug: "sagita",
    title: "Fórmula de la sagita",
    shortDescription:
      "Calcula la flecha (sagita) de una superficie curva a partir del radio y el diámetro.",
    metaDescription:
      "Calculadora de la sagita (flecha) de una lente: obtén la profundidad de una curva óptica a partir del radio de curvatura y el diámetro.",
    keywords: ["sagita", "flecha de lente", "radio de curvatura"],
    category: "potencia-lente",
  },
  {
    slug: "diametro-minimo-bloque",
    title: "Diámetro mínimo de bloque",
    shortDescription:
      "Calcula el diámetro mínimo de bloque necesario para montar una lente en una montura.",
    metaDescription:
      "Calculadora de diámetro mínimo de bloque (blank size): calcula el tamaño mínimo de lente necesario a partir de las medidas de la montura y la DIP del paciente.",
    keywords: ["diámetro mínimo de bloque", "blank size", "descentramiento montura"],
    category: "medidas",
    popular: true,
  },
  {
    slug: "adicion-edad",
    title: "Adición por edad",
    shortDescription:
      "Estima la adición orientativa para progresivos u ocupacionales según la edad del paciente.",
    metaDescription:
      "Calculadora orientativa de adición según la edad para lentes progresivas u ocupacionales, con amplitud de acomodación de referencia.",
    keywords: [
      "adición progresivos",
      "adición por edad",
      "amplitud de acomodación",
      "cerca lentes progresivas",
    ],
    category: "prescripcion",
  },
  {
    slug: "adicion-distancia-trabajo",
    title: "Adición por distancia de trabajo",
    shortDescription:
      "Calcula la adición necesaria a partir de la distancia de trabajo en cerca.",
    metaDescription:
      "Calculadora de adición por distancia de trabajo: obtén la demanda acomodativa necesaria en dioptrías a partir de la distancia de lectura o de pantalla.",
    keywords: ["adición distancia de trabajo", "demanda acomodativa", "adición cerca"],
    category: "prescripcion",
  },
  {
    slug: "equivalente-esferico",
    title: "Equivalente esférico",
    shortDescription:
      "Calcula el equivalente esférico de una graduación con cilindro.",
    metaDescription:
      "Calculadora de equivalente esférico: obtén el EE de una graduación a partir de la esfera y el cilindro (esfera + cilindro/2).",
    keywords: ["equivalente esférico", "esfera cilindro", "EE graduación"],
    category: "prescripcion",
  },
  {
    slug: "sobrerrefraccion",
    title: "Sobrerrefracción en lentilla",
    shortDescription:
      "Calcula la potencia final de la lentilla a partir de la lentilla de prueba y la sobrerrefracción.",
    metaDescription:
      "Calculadora de sobrerrefracción: obtén la potencia final de la lentilla de contacto a partir de la lentilla de prueba y el resultado de la sobrerrefracción.",
    keywords: ["sobrerrefracción", "potencia final lentilla", "lentilla de prueba"],
    category: "lentes-contacto",
  },
  {
    slug: "curva-base-rgp",
    title: "Curva base RGP",
    shortDescription:
      "Estima la curva base inicial de una lentilla RGP a partir de las lecturas queratométricas.",
    metaDescription:
      "Calculadora de curva base para lentillas RGP: estima la curva base inicial a partir de los queratométricos (K plano y K curvo).",
    keywords: ["curva base RGP", "queratometría", "lentilla rígida permeable al gas"],
    category: "lentes-contacto",
  },
];

export function getCalculatorMeta(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}
