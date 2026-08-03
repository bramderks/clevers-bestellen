import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type {
  BestelAdvies,
  Vestiging,
} from "@/types";

interface PdfOpties {
  vestiging: Vestiging;
  datum: string;
  bestelling: BestelAdvies[];
}

interface PdfRegel {
  naam: string;
  geteld: number;
  buffer: number;
  bestellen: number;
}

function huidigeDatum(
  datum: string
) {
  return new Date(
    datum
  ).toLocaleDateString(
    "nl-NL"
  );
}

function tekenHeader(
  doc: jsPDF,
  vestiging: Vestiging,
  datum: string
) {
  doc.setFillColor(
    35,
    91,
    170
  );

  doc.rect(
    0,
    0,
    210,
    32,
    "F"
  );

  doc.setTextColor(
    255,
    255,
    255
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(20);

  doc.text(
    "CLEVERS",
    14,
    15
  );

  doc.setFontSize(13);

  doc.text(
    "BESTELCONTROLE",
    14,
    25
  );

  doc.setTextColor(
    40,
    40,
    40
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(11);

  doc.text(
    `Vestiging: ${vestiging}`,
    14,
    45
  );

  doc.text(
    `Datum: ${huidigeDatum(
      datum
    )}`,
    14,
    52
  );

  doc.line(
    14,
    58,
    196,
    58
  );
}

function controleerPagina(
  doc: jsPDF,
  y: number
) {
  if (y > 250) {
    doc.addPage();

    return 20;
  }

  return y;
}

function tekenTabel(
  doc: jsPDF,
  titel: string,
  y: number,
  regels: PdfRegel[]
) {
  const zichtbareRegels =
    regels
      .filter(
        (regel) =>
          regel.bestellen > 0
      )
      .sort((a, b) =>
        a.naam.localeCompare(
          b.naam,
          "nl"
        )
      );

  if (
    zichtbareRegels.length === 0
  ) {
    return y;
  }

  y =
    controleerPagina(
      doc,
      y
    );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(13);

  doc.text(
    titel,
    14,
    y
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(10);

  doc.text(
    `${zichtbareRegels.length} artikelen`,
    160,
    y
  );

  autoTable(doc, {
    startY: y + 5,

    theme: "grid",

    head: [
      [
        "Product",
        "Geteld",
        "Buffer",
        "Bestellen",
      ],
    ],

    body:
      zichtbareRegels.map(
        (regel) => [
          regel.naam,
          regel.geteld,
          regel.buffer,
          regel.bestellen,
        ]
      ),

    headStyles: {
      fillColor: [
        35,
        91,
        170,
      ],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },

    columnStyles: {
      0: {
        cellWidth: 90,
      },
      1: {
        cellWidth: 25,
        halign: "center",
      },
      2: {
        cellWidth: 25,
        halign: "center",
      },
      3: {
        cellWidth: 30,
        halign: "center",
      },
    },

    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 3,
    },

    alternateRowStyles: {
      fillColor: [
        245,
        247,
        250,
      ],
    },
  });

  const laatstePositie =
    (
      doc as jsPDF & {
        lastAutoTable?: {
          finalY: number;
        };
      }
    )
      .lastAutoTable
      ?.finalY ?? y;

  return laatstePositie + 15;
}

export function genereerBestelPdf({
  vestiging,
  datum,
  bestelling,
}: PdfOpties) {
  const doc =
    new jsPDF();

  tekenHeader(
    doc,
    vestiging,
    datum
  );

  const ijs =
    bestelling.filter(
      (regel) =>
        regel.bestelGroep === "ijs"
    );

  const drooggoed =
    bestelling.filter(
      (regel) =>
        regel.bestelGroep ===
        "drooggoed"
    );


  let y = 70;

  y =
    tekenTabel(
      doc,
      "IJS",
      y,
      ijs
    );


  y =
    controleerPagina(
      doc,
      y
    );


  y =
    tekenTabel(
      doc,
      "DROOGGOED",
      y,
      drooggoed
    );


  y =
    controleerPagina(
      doc,
      y
    );


  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(13);

  doc.text(
    "SAMENVATTING",
    14,
    y
  );


  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(11);


  const totaalIJs =
    ijs.reduce(
      (totaal, regel) =>
        totaal +
        regel.bestellen,
      0
    );


  const totaalDrooggoed =
    drooggoed.reduce(
      (totaal, regel) =>
        totaal +
        regel.bestellen,
      0
    );


  doc.text(
    `Totaal ijs: ${totaalIJs}`,
    14,
    y + 10
  );


  doc.text(
    `Totaal drooggoed: ${totaalDrooggoed}`,
    14,
    y + 18
  );


  const aantalPaginas =
    doc.getNumberOfPages();


  for (
    let pagina = 1;
    pagina <= aantalPaginas;
    pagina++
  ) {
    doc.setPage(
      pagina
    );

    doc.setFontSize(8);

    doc.text(
      `Pagina ${pagina} van ${aantalPaginas}`,
      170,
      290
    );
  }


  const bestandsDatum =
    new Date(datum)
      .toISOString()
      .slice(
        0,
        10
      );


  doc.save(
    `${bestandsDatum}_${vestiging}_Bestelcontrole.pdf`
  );
}