import type { CheckId } from "./types";

interface Textos {
  label: string;
  ok: string;
  fail: string;
}

// Textos pre-escritos: no se genera ningún texto con IA en producción, así
// el coste de generar un informe es siempre cero.
export const TEXTOS: Record<CheckId, Textos> = {
  https: {
    label: "Conexión segura (HTTPS)",
    ok: "Tu web usa una conexión segura (HTTPS). Correcto.",
    fail:
      "Tu web no usa HTTPS. Además de ser una señal de posicionamiento para Google, los navegadores muestran avisos de \"sitio no seguro\" que espantan a pacientes potenciales. Contacta con tu proveedor de hosting para activar un certificado SSL, hoy en día casi siempre gratuito.",
  },
  rendimiento: {
    label: "Velocidad de carga",
    ok: "Tu web carga con buena velocidad en móvil.",
    fail:
      "Tu web tarda en cargar en móvil, donde la mayoría de tus pacientes te buscarán. Cada segundo de más reduce las visitas que se quedan a mirar. Optimiza el peso de las imágenes, activa el caché del navegador y revisa si tu hosting es adecuado para el tráfico que recibes.",
  },
  "core-web-vitals": {
    label: "Core Web Vitals",
    ok: "Tu web cumple las métricas de experiencia de usuario de Google (Core Web Vitals).",
    fail:
      "Tu web no cumple las Core Web Vitals de Google: son las métricas con las que Google mide si una página es rápida y estable para el usuario (velocidad de carga, estabilidad visual y capacidad de respuesta). No cumplirlas puede penalizar tu posicionamiento. Suele mejorar reduciendo el peso de imágenes y scripts innecesarios.",
  },
  "mobile-friendly": {
    label: "Adaptación a móvil",
    ok: "Tu web está bien adaptada para verse en el móvil.",
    fail:
      "Tu web no está bien adaptada para móvil según el análisis de Google. La mayoría de búsquedas de ópticas se hacen desde el móvil: si el texto sale diminuto o hay que hacer zoom, muchos visitantes se irán antes de leer nada. Revisa el diseño responsive con tu diseñador o plantilla web.",
  },
  titulo: {
    label: "Título de la página",
    ok: "Tu página tiene un título con una longitud adecuada.",
    fail:
      "El título de tu página no existe o su longitud no es la ideal (lo recomendable son unos 50-60 caracteres). Si es muy largo, Google lo corta en los resultados de búsqueda; si es muy corto o no existe, pierdes la oportunidad de decir quién eres. Incluye el nombre de tu óptica y tu ciudad, por ejemplo: \"Óptica García — Gafas y lentillas en Valencia\".",
  },
  "meta-descripcion": {
    label: "Meta descripción",
    ok: "Tu página tiene una meta descripción con una longitud adecuada.",
    fail:
      "Falta la meta descripción o su longitud no es la ideal (lo recomendable son unos 120-155 caracteres). Es el texto que aparece bajo el título en Google: sin una buena descripción, muchas personas no sabrán por qué entrar en tu web en vez de en la del competidor. Escribe una frase clara que invite a hacer clic, mencionando tus servicios y tu ciudad.",
  },
  "h1-unico": {
    label: "Encabezado principal (H1)",
    ok: "Tu página tiene un único encabezado principal (H1), como recomienda Google.",
    fail:
      "Tu página no tiene un H1 o tiene varios. El H1 le dice a Google (y al usuario) de qué trata la página de un vistazo. Asegúrate de tener exactamente uno, con el tema principal de la página, por ejemplo \"Óptica en el centro de Sevilla\".",
  },
  "jerarquia-encabezados": {
    label: "Jerarquía de encabezados",
    ok: "La jerarquía de tus encabezados (H1, H2, H3...) es coherente.",
    fail:
      "Los encabezados de tu página saltan de nivel (por ejemplo, de H1 directamente a H3 sin pasar por H2). Mantener un orden lógico ayuda a Google a entender la estructura de tu contenido y facilita la lectura a personas que usan lectores de pantalla.",
  },
  "imagenes-alt": {
    label: "Texto alternativo en imágenes",
    ok: "Casi todas tus imágenes tienen texto alternativo (atributo alt).",
    fail:
      "Varias imágenes de tu web no tienen texto alternativo (atributo alt). Ese texto ayuda a Google a entender qué muestra cada imagen y es imprescindible para personas con discapacidad visual que usan lectores de pantalla. Describe brevemente cada imagen, por ejemplo \"gafas de sol de pasta en el escaparate de la óptica\".",
  },
  viewport: {
    label: "Etiqueta viewport",
    ok: "Tu página incluye la etiqueta viewport para adaptarse a distintas pantallas.",
    fail:
      "Falta la etiqueta viewport en tu página. Sin ella, los navegadores móviles no saben cómo ajustar el tamaño del contenido y suelen mostrar la web como una versión de escritorio reducida, difícil de leer. Tu diseñador o plantilla web debe añadir esta etiqueta en el <head> del HTML.",
  },
  lang: {
    label: "Idioma declarado (HTML lang)",
    ok: "Tu página declara correctamente el idioma español.",
    fail:
      "Tu página no declara el idioma (o declara uno distinto del español) en la etiqueta <html>. Es una señal que ayuda a Google a mostrar tu web a usuarios que buscan en español y a tu zona geográfica. Debe añadirse como lang=\"es\" en la etiqueta <html> del código.",
  },
  "open-graph": {
    label: "Etiquetas Open Graph",
    ok: "Tu página tiene configuradas las etiquetas Open Graph para compartir en redes.",
    fail:
      "Faltan etiquetas Open Graph (og:title, og:description, og:image). Son las que controlan cómo se ve tu web cuando alguien la comparte en WhatsApp, Facebook o Instagram: sin ellas, el enlace aparece sin imagen ni texto atractivo, lo que reduce muchísimo los clics cuando un paciente recomienda tu óptica.",
  },
  favicon: {
    label: "Favicon",
    ok: "Tu web tiene favicon (el icono que aparece en la pestaña del navegador).",
    fail:
      "Tu web no tiene favicon, el pequeño icono que aparece en la pestaña del navegador y en los marcadores. Es un detalle menor, pero transmite una imagen más profesional y ayuda a que los usuarios reconozcan tu pestaña entre varias abiertas.",
  },
  "robots-txt": {
    label: "Archivo robots.txt",
    ok: "Tu web tiene un archivo robots.txt accesible.",
    fail:
      "No se ha encontrado un archivo robots.txt en tu web. Este archivo indica a Google qué partes de tu web puede rastrear. No es obligatorio, pero su ausencia puede generar rastreos innecesarios o dejar sin indexar contenido importante. Es sencillo de crear con tu proveedor de hosting o gestor de contenidos.",
  },
  "sitemap-xml": {
    label: "Mapa del sitio (sitemap.xml)",
    ok: "Tu web tiene un mapa del sitio (sitemap.xml) accesible.",
    fail:
      "No se ha encontrado un sitemap.xml en tu web. El mapa del sitio ayuda a Google a descubrir y indexar todas tus páginas más rápido, especialmente si tienes varias secciones o servicios. La mayoría de gestores de contenidos (WordPress incluido, con un plugin de SEO) lo generan automáticamente.",
  },
  "schema-local-business": {
    label: "Datos estructurados (LocalBusiness)",
    ok: "Tu web incluye marcado de datos estructurados de negocio local (schema.org).",
    fail:
      "Tu web no incluye datos estructurados de tipo \"negocio local\" (schema.org LocalBusiness). Este marcado ayuda a Google a mostrar tu óptica con información enriquecida (horario, teléfono, valoraciones) directamente en los resultados de búsqueda y en Google Maps. Es uno de los factores con más impacto en el SEO local de una óptica.",
  },
  nap: {
    label: "Nombre, dirección y teléfono visibles",
    ok: "Hemos detectado un teléfono y una dirección en el texto de tu página.",
    fail:
      "No hemos detectado con claridad un teléfono y una dirección en el texto visible de tu web (detección aproximada, revísalo también a simple vista). Mostrar el nombre, la dirección y el teléfono de tu óptica de forma coherente en toda la web es una de las señales más importantes para el SEO local: ayuda a Google a confirmar que existes y dónde estás.",
  },
};
