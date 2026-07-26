import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export interface PdfRegel {
  productNaam: string;
  geteld: number;
  buffer: number;
  besteld: number;
}

export async function maakBestelPdf(
  vestiging: string,
  medewerker: string,
  datum: string,
  regels: PdfRegel[]
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();

  const page = pdf.addPage([595, 842]);

  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let y = 810;

  page.drawText("CLEVERS BESTELAPP", {
    x: 40,
    y,
    size: 20,
    font: bold,
    color: rgb(0, 0.55, 0.2),
  });

  y -= 30;

  page.drawText(`Vestiging: ${vestiging}`, {
    x: 40,
    y,
    size: 11,
    font,
  });

  y -= 16;

  page.drawText(`Medewerker: ${medewerker}`, {
    x: 40,
    y,
    size: 11,
    font,
  });

  y -= 16;

  page.drawText(`Datum: ${datum}`, {
    x: 40,
    y,
    size: 11,
    font,
  });

  y -= 30;

  page.drawText("Product", {
    x: 40,
    y,
    size: 11,
    font: bold,
  });

  page.drawText("Geteld", {
    x: 290,
    y,
    size: 11,
    font: bold,
  });

  page.drawText("Buffer", {
    x: 360,
    y,
    size: 11,
    font: bold,
  });

  page.drawText("Bestellen", {
    x: 440,
    y,
    size: 11,
    font: bold,
  });

  y -= 15;

  page.drawLine({
    start: { x: 40, y },
    end: { x: 550, y },
    thickness: 1,
  });

  y -= 18;

  for (const regel of regels) {
    page.drawText(regel.productNaam, {
      x: 40,
      y,
      size: 10,
      font,
    });

    page.drawText(String(regel.geteld), {
      x: 305,
      y,
      size: 10,
      font,
    });

    page.drawText(String(regel.buffer), {
      x: 375,
      y,
      size: 10,
      font,
    });

    page.drawText(String(regel.besteld), {
      x: 465,
      y,
      size: 10,
      font: bold,
    });

    y -= 16;

    if (y < 60) {
      break;
    }
  }

  y -= 10;

  const totaal = regels.reduce((t, r) => t + r.besteld, 0);

  page.drawText(`Totaal te bestellen: ${totaal}`, {
    x: 40,
    y,
    size: 12,
    font: bold,
  });

  return await pdf.save();
}