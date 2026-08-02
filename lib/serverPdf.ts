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
      x: 40,
      y,
      size: 22,
      font: bold,
      color: groen,
    }
  );

  y -= 34;

  page.drawText(
    `Vestiging: ${vestiging}`,
    {
      x: 40,
      y,
      size: 11,
      font,
    }
  );

  y -= 16;

  page.drawText(
    `Medewerker: ${medewerker}`,
    {
      x: 40,
      y,
      size: 11,
      font,
    }
  );

  y -= 16;

  page.drawText(
    `Datum: ${datum}`,
    {
      x: 40,
      y,
      size: 11,
      font,
    }
  );

  y -= 28;

  page.drawLine({
    start: {
      x: 40,
      y,
    },
    end: {
      x: 555,
      y,
    },
    thickness: 1,
    color: groen,
  });

  y -= 20;

  page.drawText(
    "Product",
    {
      x: 40,
      y,
      size: 11,
      font: bold,
    }
  );

  page.drawText(
    "Geteld",
    {
      x: 295,
      y,
      size: 11,
      font: bold,
    }
  );

  page.drawText(
    "Buffer",
    {
      x: 365,
      y,
      size: 11,
      font: bold,
    }
  );

  page.drawText(
    "Bestellen",
    {
      x: 445,
      y,
      size: 11,
      font: bold,
    }
  );

  y -= 16;

  page.drawLine({
    start: {
      x: 40,
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
      String(regel.geteld),
      {
        x: 305,
        y,
        size: 10,
        font,
      }
    );

    page.drawText(
      String(regel.buffer),
      {
        x: 375,
        y,
        size: 10,
        font,
      }
    );

    page.drawText(
      String(regel.besteld),
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

    y -= 16;

    if (y < 90) {
      break;
    }
  }

  y -= 12;

  page.drawLine({
    start: {
      x: 40,
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

  page.drawText(
    `Totaal te bestellen: ${totaal}`,
    {
      x: 40,
      y,
      size: 12,
      font: bold,
    }
  );

  y -= 18;

  page.drawText(
    `Aantal bestelregels: ${bestelRegels}`,
    {
      x: 40,
      y,
      size: 11,
      font,
    }
  );

  page.drawText(
    "Automatisch gegenereerd door Clevers Bestelsysteem",
    {
      x: 40,
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

  return await pdf.save();
}