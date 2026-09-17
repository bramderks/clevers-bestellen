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
const MARGE = 24;
const KOLOM_GAT = 14;
const KOLOM_BREEDTE = (PAGE_WIDTH - MARGE * 2 - KOLOM_GAT) / 2;
const REGEL_HOOGTE = 17;
const HEADER_HOOGTE = 23;
const LETTER_GROOTTE = 8.5;

function tekst(
  page: PDFPage,
  waarde: string,
  x: number,
  y: number,
  font: PDFFont,
  opties: { size?: number; color?: ReturnType<typeof rgb> } = {},
) {
  page.drawText(waarde, {
    x,
    y,
    size: opties.size ?? LETTER_GROOTTE,
    font,
    color: opties.color,
  });
}

function tekenRegels(
  page: PDFPage,
  regels: Array<{ naam: string; aantal: number }>,
  x: number,
  y: number,
  breedte: number,
  font: PDFFont,
  bold: PDFFont,
) {
  let currentY = y;

  for (const regel of regels) {
    const onderkant = currentY - REGEL_HOOGTE;

    page.drawRectangle({
      x,
      y: onderkant,
      width: breedte,
      height: REGEL_HOOGTE,
      borderColor: rgb(0.88, 0.89, 0.91),
      borderWidth: 0.4,
    });

    // Productnamen worden niet afgekapt: ze krijgen de beschikbare breedte.
    const maxNaamBreedte = breedte - 58;
    let naam = regel.naam;
    while (font.widthOfTextAtSize(naam, LETTER_GROOTTE) > maxNaamBreedte && naam.length > 3) {
      naam = `${naam.slice(0, -4).trim()}...`;
    }

    tekst(page, naam, x + 9, onderkant + 5.2, font);

    const aantal = String(regel.aantal);
    const aantalBreedte = bold.widthOfTextAtSize(aantal, LETTER_GROOTTE);
    tekst(page, aantal, x + breedte - 9 - aantalBreedte, onderkant + 5.2, bold);

    currentY = onderkant;
  }

  return currentY;
}

function tekenBlok(
  page: PDFPage,
  titel: string,
  kleur: ReturnType<typeof rgb>,
  regels: Array<{ naam: string; aantal: number }>,
  x: number,
  y: number,
  breedte: number,
  font: PDFFont,
  bold: PDFFont,
  totaal?: number,
) {
  page.drawRectangle({
    x,
    y: y - HEADER_HOOGTE,
    width: breedte,
    height: HEADER_HOOGTE,
    color: kleur,
  });
  tekst(page, titel, x + 9, y - 15.5, bold, {
    size: 9.5,
    color: rgb(1, 1, 1),
  });

  let currentY = y - HEADER_HOOGTE;
  currentY = tekenRegels(page, regels, x, currentY, breedte, font, bold);

  if (totaal !== undefined) {
    const onderkant = currentY - REGEL_HOOGTE;
    page.drawRectangle({
      x,
      y: onderkant,
      width: breedte,
      height: REGEL_HOOGTE,
      color: rgb(0.97, 0.98, 0.99),
      borderColor: rgb(0.88, 0.89, 0.91),
      borderWidth: 0.4,
    });

    tekst(page, "Totaal", x + 9, onderkant + 5.2, bold);
    const waarde = String(totaal);
    const waardeBreedte = bold.widthOfTextAtSize(waarde, LETTER_GROOTTE);
    tekst(page, waarde, x + breedte - 9 - waardeBreedte, onderkant + 5.2, bold);
    currentY = onderkant;
  }

  return currentY;
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

  // Eén compacte A4-bestelbon. Geen emoji: StandardFonts/WinAnsi ondersteunt die niet.
  tekst(page, "Clevers Telapp - Bestelling", MARGE, PAGE_HEIGHT - MARGE, bold, {
    size: 17,
  });
  tekst(
    page,
    `${vestiging}  |  ${datum}  |  ${medewerker}`,
    MARGE,
    PAGE_HEIGHT - MARGE - 19,
    font,
    { size: 9, color: rgb(0.35, 0.37, 0.4) },
  );

  const ijs = regels
    .filter(
      (r) =>
        r.bestelGroep === "ijs" &&
        r.productId !== "speciaalsmaken" &&
        r.productId !== "slagroom",
    )
    .sort((a, b) => a.productNaam.localeCompare(b.productNaam, "nl"));
  const speciaalsmaken = regels.find((r) => r.productId === "speciaalsmaken");
  const slagroom = regels.find((r) => r.productId === "slagroom");
  const drooggoed = regels
    .filter(
      (r) =>
        r.bestelGroep !== "ijs" &&
        r.productId !== "speciaalsmaken" &&
        r.productId !== "slagroom",
    )
    .sort((a, b) => a.productNaam.localeCompare(b.productNaam, "nl"));

  const totaalIJs =
    ijs.reduce((totaal, regel) => totaal + regel.besteld, 0) +
    (speciaalsmaken?.besteld ?? 0);
  const totaalDrooggoed = drooggoed.reduce(
    (totaal, regel) => totaal + regel.besteld,
    0,
  );

  const topY = PAGE_HEIGHT - MARGE - 50;
  const linkerX = MARGE;
  const rechterX = MARGE + KOLOM_BREEDTE + KOLOM_GAT;

  const ijsEindY = tekenBlok(
    page,
    "Regulier ijs",
    rgb(0.114, 0.275, 0.624),
    ijs.map((r) => ({ naam: r.productNaam, aantal: r.besteld })),
    linkerX,
    topY,
    KOLOM_BREEDTE,
    font,
    bold,
    totaalIJs,
  );

  const drooggoedEindY = tekenBlok(
    page,
    "Drooggoed",
    rgb(0.086, 0.49, 0.216),
    drooggoed.map((r) => ({ naam: r.productNaam, aantal: r.besteld })),
    rechterX,
    topY,
    KOLOM_BREEDTE,
    font,
    bold,
    totaalDrooggoed,
  );

  // Kleine vaste blokken onderaan de rechterkolom.
  const kleineBlokkenY = Math.min(drooggoedEindY, topY - 155) - 12;
  const specialEindY = tekenBlok(
    page,
    "Speciaalsmaken",
    rgb(0.961, 0.62, 0.043),
    [{ naam: "Speciaalsmaken", aantal: speciaalsmaken?.besteld ?? 0 }],
    rechterX,
    kleineBlokkenY,
    KOLOM_BREEDTE,
    font,
    bold,
  );

  tekenBlok(
    page,
    "Slagroom",
    rgb(0.02, 0.4, 0.7),
    [{ naam: "Slagroom", aantal: slagroom?.besteld ?? 0 }],
    rechterX,
    specialEindY - 10,
    KOLOM_BREEDTE,
    font,
    bold,
  );

  // Opmerking onder de reguliere ijslijst; dit blijft op dezelfde A4.
  const opmerkingTop = Math.min(ijsEindY, PAGE_HEIGHT - 620) - 12;
  const opmerkingHoogte = 66;
  const opmerkingOnderkant = opmerkingTop - opmerkingHoogte;

  page.drawRectangle({
    x: linkerX,
    y: opmerkingOnderkant,
    width: KOLOM_BREEDTE,
    height: opmerkingHoogte,
    borderColor: rgb(0.88, 0.89, 0.91),
    borderWidth: 0.5,
  });
  tekst(page, "Opmerking", linkerX + 9, opmerkingTop - 16, bold, {
    size: 9,
  });

  const opmerkingTekst = opmerking.trim() || "-";
  const woorden = opmerkingTekst.split(/\s+/);
  const opmerkingRegels: string[] = [];
  let huidige = "";
  const maxBreedte = KOLOM_BREEDTE - 18;

  for (const woord of woorden) {
    const kandidaat = huidige ? `${huidige} ${woord}` : woord;
    if (
      font.widthOfTextAtSize(kandidaat, 8.5) <= maxBreedte ||
      !huidige
    ) {
      huidige = kandidaat;
    } else {
      opmerkingRegels.push(huidige);
      huidige = woord;
    }
  }
  if (huidige) opmerkingRegels.push(huidige);

  opmerkingRegels.slice(0, 3).forEach((regel, index) => {
    tekst(page, regel, linkerX + 9, opmerkingTop - 32 - index * 11, font, {
      size: 8.5,
    });
  });

  tekst(
    page,
    "Deze PDF is de besteloverzicht-versie van de controle na de telling.",
    MARGE,
    16,
    font,
    { size: 7, color: rgb(0.5, 0.52, 0.55) },
  );

  return pdf.save();
}
