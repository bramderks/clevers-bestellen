import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

export interface PdfRegel {
  productNaam: string;
  geteld: number;
  buffer: number;
  besteld: number;
}

const MARGE = 40;
const REGEL_HOOGTE = 16;

export async function maakBestelPdf(
  vestiging: string,
  medewerker: string,
  datum: string,
  regels: PdfRegel[]
): Promise<Uint8Array> {
  const pdf =
    await PDFDocument.create();

  const page = pdf.addPage([
    595,
    842,
  ]);

  const font =
    await pdf.embedFont(
      StandardFonts.Helvetica
    );

  const bold =
    await pdf.embedFont(
      StandardFonts.HelveticaBold
    );

  const groen = rgb(
    0,
    0.59,
    0.25
  );

  let y = 810;

  page.drawText(
    "CLEVERS BESTELAPP",
    {
      x: MARGE,
      y,
      size: 22,
      font: bold,
      color: groen,
    }
  );

  y -= 36;

  [
    `Vestiging: ${vestiging}`,
    `Medewerker: ${medewerker}`,
    `Datum: ${datum}`,
  ].forEach((tekst) => {
    page.drawText(tekst, {
      x: MARGE,
      y,
      size: 11,
      font,
    });

    y -= REGEL_HOOGTE;
  });

  y -= 10;

  page.drawLine({
    start: {
      x: MARGE,
      y,
    },
    end: {
      x: 555,
      y,
    },
    thickness: 1,
    color: groen,
  });

  y -= 22;

  [
    ["Product", 40],
    ["Geteld", 295],
    ["Buffer", 365],
    ["Bestellen", 445],
  ].forEach(([tekst, x]) => {
    page.drawText(
      tekst as string,
      {
        x: Number(x),
        y,
        size: 11,
        font: bold,
      }
    );
  });

  y -= 16;

  page.drawLine({
    start: {
      x: MARGE,
      y,
    },
    end: {
      x: 555,
      y,
    },
    thickness: 0.5,
    color: rgb(
      0.8,
      0.8,
      0.8
    ),
  });

  y -= 18;

  let totaal = 0;
  let bestelRegels = 0;

  for (const regel of regels) {
    page.drawText(
      regel.productNaam,
      {
        x: 40,
        y,
        size: 10,
        font,
      }
    );

    page.drawText(
      `${regel.geteld}`,
      {
        x: 305,
        y,
        size: 10,
        font,
      }
    );

    page.drawText(
      `${regel.buffer}`,
      {
        x: 375,
        y,
        size: 10,
        font,
      }
    );

    page.drawText(
      `${regel.besteld}`,
      {
        x: 465,
        y,
        size: 10,
        font: bold,
      }
    );

    totaal += regel.besteld;

    if (regel.besteld > 0) {
      bestelRegels++;
    }

    y -= REGEL_HOOGTE;

    if (y < 90) {
      break;
    }
  }

  y -= 10;

  page.drawLine({
    start: {
      x: MARGE,
      y,
    },
    end: {
      x: 555,
      y,
    },
    thickness: 1,
    color: groen,
  });

  y -= 24;

  page.drawText(
    `Totaal te bestellen: ${totaal}`,
    {
      x: MARGE,
      y,
      size: 12,
      font: bold,
    }
  );

  y -= 18;

  page.drawText(
    `Aantal bestelregels: ${bestelRegels}`,
    {
      x: MARGE,
      y,
      size: 11,
      font,
    }
  );

  page.drawText(
    "Automatisch gegenereerd door Clevers Bestelsysteem",
    {
      x: MARGE,
      y: 30,
      size: 9,
      font,
      color: rgb(
        0.45,
        0.45,
        0.45
      ),
    }
  );

  return pdf.save();
}