/**
 * "Готовые сценарии" cards — Figma final › templates block › scenarioRows
 * (design-refs/final/raw/Main page v4.svg; layer names = texts).
 *
 * Every card is 340×250. Rasters are the base64 PNGs embedded in the SVG export,
 * drawn at full card width and shifted up by `top` px (Figma pattern transform).
 */

export type ScenarioImage = {
  src: string;
  width: number;
  height: number;
  /** Vertical offset of the full-width image inside the card, px. */
  top: number;
};

export type Scenario = {
  /** Figma layer name. */
  id: string;
  category: string;
  format: string;
  /** "\n" = Figma line break (the title box wraps at 300px in Druk). */
  title: string;
  meta: string;
  /** 2px stroke and open button: lime (dark arrow) or orange (white arrow), alternating. */
  accent: "lime" | "orange";
  image: ScenarioImage;
};

const presentation: Omit<Scenario, "id" | "image" | "accent"> = {
  category: "Документы",
  format: "PPTX, PDF",
  title: "Презентация",
  meta: "≈ 30 кредитов, 2 мин",
};

const resume: Omit<Scenario, "id" | "image" | "accent"> = {
  category: "Работа и карьера",
  format: "PDF, DOCX",
  title: "Резюме под\nвакансию",
  meta: "≈ 8 кредитов, 1 мин",
};

const report: Omit<Scenario, "id" | "image" | "accent"> = {
  category: "Документы",
  format: "XLSX",
  title: "Отчёт в Excel",
  meta: "≈ 12 кредитов, 2 мин",
};

const photo: Omit<Scenario, "id" | "image" | "accent"> = {
  category: "Изображения",
  format: "JPG, PNG",
  title: "Обработка фото",
  meta: "≈ 4 кредита за фото",
};

const PRESENTATION_IMAGE = { src: "/images/scenarios/v4/presentation.png", width: 736, height: 1308, top: -177.12 };

/** row1, left → right from x −170 (the export drops the parts outside 0–1440; they repeat row2's copies). */
export const scenarioRow1: Scenario[] = [
  { id: "cardPresentationA", accent: "lime", ...presentation, image: PRESENTATION_IMAGE },
  {
    id: "cardProductCardB", accent: "orange",
    category: "Маркетплейс",
    format: "JPG, PNG",
    title: "Карточка товара",
    meta: "≈ 6 кредитов, 2 мин",
    image: { src: "/images/scenarios/v4/product-card.png", width: 720, height: 1277, top: -176.51 },
  },
  { id: "cardResumeA", accent: "lime", ...resume, image: { src: "/images/scenarios/v4/resume-a.png", width: 736, height: 920, top: -87.5 } },
  { id: "cardReportB", accent: "orange", ...report, image: { src: "/images/scenarios/v4/report-b.png", width: 736, height: 589, top: -11.05 } },
  { id: "cardPhotoA", accent: "lime", ...photo, image: { src: "/images/scenarios/v4/photo-a.png", width: 736, height: 912, top: -85.65 } },
];

/** row2, left → right from x 10. */
export const scenarioRow2: Scenario[] = [
  { id: "cardReportA", accent: "orange", ...report, image: { src: "/images/scenarios/v4/report-a.png", width: 736, height: 548, top: -1.58 } },
  { id: "cardPhotoB", accent: "lime", ...photo, image: { src: "/images/scenarios/v4/photo-b.png", width: 736, height: 736, top: -45 } },
  { id: "cardPresentationB", accent: "orange", ...presentation, image: PRESENTATION_IMAGE },
  { id: "cardResumeB", accent: "lime", ...resume, image: { src: "/images/scenarios/v4/resume-b.png", width: 736, height: 1349, top: -186.59 } },
];
