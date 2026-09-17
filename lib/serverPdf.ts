import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFPage,
  type PDFFont,
} from "pdf-lib";

export interface PdfRegel {
  productId: string;
  productNaam: string;
  geteld: number;
  buffer: number;
  besteld: number;
  bestelGroep: string;
}

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGE = 40;
const BREEDTE = PAGE_WIDTH - MARGE * 2;
const REGEL_HOOGTE = 28;

interface PdfContext {
  pdf: PDFDocument;
  page: PDFPage;
  font: PDFFont;
  bold: PDFFont;
  y: number;
}

function nieuwePagina(ctx: PdfContext) {
  ctx.page = ctx.pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  ctx.y = PAGE_HEIGHT - MARGE;
}

function zorgVoorRuimte(ctx: PdfContext, hoogte: number) {
  if (ctx.y - hoogte < 50) nieuwePagina(ctx);
}

function tekst(
  ctx: PdfContext,
  waarde: string,
  x: number,
  y: number,
  opties: { size?: number; bold?: boolean; color?: ReturnType<typeof rgb> } = {},
) {
  ctx.page.drawText(waarde, {
    x,
    y,
    size: opties.size ?? 10,
    font: opties.bold ? ctx.bold : ctx.font,
    color: opties.color,
  });
}

function tekenBlok(
  ctx: PdfContext,
  titel: string,
  kleur: ReturnType<typeof rgb>,
  regels: Array<{ naam: string; aantal: number }>,
  totaal?: number,
) {
  const hoogte = 34 + regels.length * REGEL_HOOGTE + (totaal !== undefined ? 30 : 0);
  zorgVoorRuimte(ctx, Math.min(hoogte, PAGE_HEIGHT - 100));

  // De kop komt overeen met de gekleurde kop van de controlepagina.
  ctx.page.drawRectangle({
    x: MARGE,
    y: ctx.y - 30,
    width: BREEDTE,
    height: 30,
    color: kleur,
  });
  tekst(ctx, titel, MARGE + 14, ctx.y - 20, {
    size: 12,
    bold: true,
    color: rgb(1, 1, 1),
  });
  ctx.y -= 30;

  for (const regel of regels) {
    zorgVoorRuimte(ctx, REGEL_HOOGTE + 10);
    const onderkant = ctx.y - REGEL_HOOGTE;

    ctx.page.drawRectangle({
      x: MARGE,
      y: onderkant,
      width: BREEDTE,
      height: REGEL_HOOGTE,
      borderColor: rgb(0.88, 0.89, 0.91),
      borderWidth: 0.5,
    });
    tekst(ctx, regel.naam, MARGE + 14, onderkant + 9, { size: 10 });
    const aantal = String(regel.aantal);
    const aantalBreedte = ctx.bold.widthOfTextAtSize(aantal, 10);
    tekst(ctx, aantal, MARGE + BREEDTE - 14 - aantalBreedte, onderkant + 9, {
      size: 10,
      bold: true,
    });
    ctx.y = onderkant;
  }

  if (totaal !== undefined) {
    zorgVoorRuimte(ctx, 30);
    const onderkant = ctx.y - 30;
    ctx.page.drawRectangle({
      x: MARGE,
      y: onderkant,
      width: BREEDTE,
      height: 30,
      color: rgb(0.97, 0.98, 0.99),
      borderColor: rgb(0.88, 0.89, 0.91),
      borderWidth: 0.5,
    });
    tekst(ctx, "Totaal", MARGE + 14, onderkant + 10, { size: 10, bold: true });
    const waarde = String(totaal);
    const waardeBreedte = ctx.bold.widthOfTextAtSize(waarde, 10);
    tekst(ctx, waarde, MARGE + BREEDTE - 14 - waardeBreedte, onderkant + 10, {
      size: 10,
      bold: true,
    });
    ctx.y = onderkant;
  }

  ctx.y -= 18;
}

export async function maakBestelPdf(
  vestiging: string,
  medewerker: string,
  datum: string,
  regels: PdfRegel[],
  opmerking = "",
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const ctx: PdfContext = { pdf, page, font, bold, y: PAGE_HEIGHT - MARGE };

  tekst(ctx, "Clevers Telapp - Controle", MARGE, ctx.y, { size: 18, bold: true });
  ctx.y -= 22;
  tekst(ctx, `${vestiging}  |  ${datum}  |  ${medewerker}`, MARGE, ctx.y, {
    size: 10,
    color: rgb(0.35, 0.37, 0.4),
  });
  ctx.y -= 28;

  const ijs = regels
    .filter((r) => r.bestelGroep === "ijs" && r.productId !== "speciaalsmaken" && r.productId !== "slagroom")
    .sort((a, b) => a.productNaam.localeCompare(b.productNaam, "nl"));
  const speciaalsmaken = regels.find((r) => r.productId === "speciaalsmaken");
  const slagroom = regels.find((r) => r.productId === "slagroom");
  const drooggoed = regels
    .filter((r) => r.bestelGroep !== "ijs" && r.productId !== "speciaalsmaken" && r.productId !== "slagroom")
    .sort((a, b) => a.productNaam.localeCompare(b.productNaam, "nl"));

  const totaalIJs =
    ijs.reduce((totaal, regel) => totaal + regel.besteld, 0) +
    (speciaalsmaken?.besteld ?? 0);
  const totaalDrooggoed = drooggoed.reduce((totaal, regel) => totaal + regel.besteld, 0);

  tekenBlok(
    ctx,
    "Regulier ijs",
    rgb(0.11, 0.31, 0.85),
    ijs.map((r) => ({ naam: r.productNaam, aantal: r.besteld })),
    totaalIJs,
  );
  tekenBlok(
    ctx,
    "Speciaalsmaken",
    rgb(0.96, 0.62, 0.04),
    [{ naam: "Speciaalsmaken", aantal: speciaalsmaken?.besteld ?? 0 }],
  );
  tekenBlok(
    ctx,
    "Slagroom",
    rgb(0.02, 0.52, 0.78),
    [{ naam: "Slagroom", aantal: slagroom?.besteld ?? 0 }],
  );
  tekenBlok(
    ctx,
    "Drooggoed",
    rgb(0.02, 0.48, 0.33),
    drooggoed.map((r) => ({ naam: r.productNaam, aantal: r.besteld })),
    totaalDrooggoed,
  );

  zorgVoorRuimte(ctx, 75);
  ctx.page.drawRectangle({
    x: MARGE,
    y: ctx.y - 60,
    width: BREEDTE,
    height: 60,
    borderColor: rgb(0.88, 0.89, 0.91),
    borderWidth: 0.7,
  });
  tekst(ctx, "Opmerking", MARGE + 14, ctx.y - 20, { size: 10, bold: true });
  const opmerkingTekst = opmerking.trim() || "-";
  const regelsOpmerking = opmerkingTekst.match(/.{1,85}(?:\s|$)/g) ?? [opmerkingTekst];
  regelsOpmerking.slice(0, 2).forEach((regel, index) => {
    tekst(ctx, regel.trim(), MARGE + 14, ctx.y - 39 - index * 12, { size: 9 });
  });

  const paginaAantal = pdf.getPageCount();
  pdf.getPages().forEach((pdfPage, index) => {
    pdfPage.drawText(`Pagina ${index + 1} van ${paginaAantal}`, {
      x: PAGE_WIDTH - 95,
      y: 22,
      size: 8,
      font,
      color: rgb(0.45, 0.47, 0.5),
    });
  });

  return pdf.save();
}
