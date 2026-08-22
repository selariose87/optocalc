import { jsPDF } from "jspdf";
import { DISCLAIMER, SITE_NAME } from "@/lib/constants";
import type { ReportData, ReportSection } from "./types";

const PAGE_MARGIN = 18;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2;
const FOOTER_RESERVE = 22;

function detectImageFormat(dataUrl: string): "PNG" | "JPEG" {
  return dataUrl.startsWith("data:image/png") ? "PNG" : "JPEG";
}

function loadImageSize(
  dataUrl: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = dataUrl;
  });
}

export async function generarInformePdf(data: ReportData): Promise<jsPDF> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = PAGE_MARGIN;

  function ensureSpace(needed: number) {
    if (y + needed > PAGE_HEIGHT - FOOTER_RESERVE) {
      doc.addPage();
      y = PAGE_MARGIN;
    }
  }

  const logo = data.optica.logoDataUrl;
  let textStartX = PAGE_MARGIN;

  if (logo) {
    try {
      const { width, height } = await loadImageSize(logo);
      const maxW = 32;
      const maxH = 20;
      const scale = Math.min(maxW / width, maxH / height);
      const drawW = width * scale;
      const drawH = height * scale;
      doc.addImage(logo, detectImageFormat(logo), PAGE_MARGIN, y, drawW, drawH);
      textStartX = PAGE_MARGIN + drawW + 6;
    } catch {
      // Si el logo no se puede leer, se omite y se continúa sin él.
    }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(data.optica.nombre || "Óptica", textStartX, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const contactoLineas = [data.optica.direccion, data.optica.telefono, data.optica.email]
    .filter(Boolean)
    .join(" · ");
  if (contactoLineas) {
    doc.text(contactoLineas, textStartX, y + 12, { maxWidth: CONTENT_WIDTH - (textStartX - PAGE_MARGIN) });
  }

  y += 26;
  doc.setDrawColor(200);
  doc.line(PAGE_MARGIN, y, PAGE_MARGIN + CONTENT_WIDTH, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  const titulo =
    data.sections.length === 1
      ? `Informe: ${data.sections[0].calculatorTitle}`
      : "Informe de cálculos ópticos";
  doc.text(titulo, PAGE_MARGIN, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const generadoEl = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  doc.text(`Generado el ${generadoEl}`, PAGE_MARGIN, y);
  y += 8;

  if (data.pacienteNombre || data.fecha) {
    doc.setFont("helvetica", "bold");
    doc.text("Paciente", PAGE_MARGIN, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    if (data.pacienteNombre) {
      doc.text(`Nombre: ${data.pacienteNombre}`, PAGE_MARGIN, y);
      y += 6;
    }
    if (data.fecha) {
      doc.text(`Fecha de la consulta: ${data.fecha}`, PAGE_MARGIN, y);
      y += 6;
    }
    y += 4;
  }

  data.sections.forEach((section, index) => {
    y = drawSection(doc, section, y, ensureSpace, data.sections.length > 1);
    if (index < data.sections.length - 1) y += 6;
  });

  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page++) {
    doc.setPage(page);
    const pageHeight = doc.internal.pageSize.getHeight();
    const footerY = pageHeight - 18;
    doc.setDrawColor(220);
    doc.line(PAGE_MARGIN, footerY - 6, PAGE_MARGIN + CONTENT_WIDTH, footerY - 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(110);
    const disclaimerLines = doc.splitTextToSize(DISCLAIMER, CONTENT_WIDTH);
    doc.text(disclaimerLines, PAGE_MARGIN, footerY - 2);
    doc.text(
      `Generado con ${SITE_NAME} · Página ${page} de ${pageCount}`,
      PAGE_MARGIN,
      pageHeight - 8
    );
    doc.setTextColor(0);
  }

  return doc;
}

function drawSection(
  doc: jsPDF,
  section: ReportSection,
  startY: number,
  ensureSpace: (needed: number) => void,
  showTitle: boolean
): number {
  let y = startY;

  if (showTitle) {
    ensureSpace(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(109, 40, 217); // violet-700
    doc.text(section.calculatorTitle, PAGE_MARGIN, y);
    doc.setTextColor(0);
    y += 8;
  }

  y = drawFieldSection(doc, "Datos introducidos", section.entradas, y, false, ensureSpace);
  y += 4;
  y = drawFieldSection(doc, "Resultado", section.resultados, y, true, ensureSpace);

  if (section.notas && section.notas.length > 0) {
    y += 4;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    for (const nota of section.notas) {
      const lines = doc.splitTextToSize(`• ${nota}`, CONTENT_WIDTH);
      ensureSpace(lines.length * 4.5);
      doc.text(lines, PAGE_MARGIN, y);
      y += lines.length * 4.5;
    }
  }

  return y;
}

function drawFieldSection(
  doc: jsPDF,
  titulo: string,
  campos: { label: string; value: string }[],
  startY: number,
  destacar: boolean,
  ensureSpace: (needed: number) => void
): number {
  let y = startY;
  ensureSpace(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(titulo, PAGE_MARGIN, y);
  y += 3;
  doc.setDrawColor(230);
  doc.line(PAGE_MARGIN, y, PAGE_MARGIN + CONTENT_WIDTH, y);
  y += 6;

  for (const campo of campos) {
    const rowHeight = destacar ? 8 : 6.5;
    ensureSpace(rowHeight);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(destacar ? 12 : 10);
    doc.text(campo.label, PAGE_MARGIN, y);
    doc.setFont("helvetica", "bold");
    doc.text(campo.value, PAGE_MARGIN + 75, y);
    y += rowHeight;
  }

  return y;
}

export async function descargarInformePdf(data: ReportData): Promise<void> {
  const doc = await generarInformePdf(data);
  const base =
    data.sections.length === 1 ? data.sections[0].calculatorTitle : "informe-koptikapp";
  const slug = base
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const fecha = new Date().toISOString().slice(0, 10);
  doc.save(`informe-${slug}-${fecha}.pdf`);
}
