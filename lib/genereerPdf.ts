import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type {
  BestelAdvies,
  Vestiging,
} from "@/types";

import { getControleBestelling } from "@/lib/tellen/getControleBestelling";

interface PdfOpties {
  vestiging: Vestiging;
  datum: string;
  bestelling: BestelAdvies[];
}

function tekenHeader(
  doc: jsPDF,
  vestiging: Vestiging,
  datum: string
) {
  doc.setFillColor(35, 91, 170);
  doc.rect(0, 0, 210, 28, "F");

  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("CLEVERS", 14, 17);

  doc.setFontSize(13);
  doc.text("BESTELADVIES", 105, 17, {
    align: "center",
  });

  doc.setTextColor(40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(
    `Vestiging: ${vestiging}`,
    14,
    38
  );

  doc.text(
    `Datum: ${new Date(
      datum
    ).toLocaleDateString("nl-NL")}`,
    14,
    44
  );

  doc.line(14, 49, 196, 49);
}

function tekenTabel(
  doc: jsPDF,
  titel: string,
  y: number,
  regels: {
    naam: string;
    geteld: number;
    buffer: number;
    bestellen: number;
  }[]
) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(titel, 14, y);

  autoTable(doc, {
    startY: y + 4,

    theme: "grid",

    head: [[
      "Product",
      "Geteld",
      "Buffer",
      "Bestellen",
    ]],

    body: regels.map((r) => [
      r.naam,
      r.geteld,
      r.buffer,
      r.bestellen,
    ]),

    headStyles: {
      fillColor: [35, 91, 170],
    },

    styles: {
      font: "helvetica",
      fontSize: 10,
    },
  });

  return (
    (
      doc as jsPDF & {
        lastAutoTable?: {
          finalY: number;
        };
      }
    ).lastAutoTable?.finalY ?? y
  );
}

export function genereerBestelPdf({
  vestiging,
  datum,
  bestelling,
}: PdfOpties) {
  const doc = new jsPDF();

  tekenHeader(
    doc,
    vestiging,
    datum
  );

  const controle =
    getControleBestelling(
      bestelling,
      vestiging
    );

  let y = 58;

  y =
    tekenTabel(
      doc,
      "🍦 Regulier ijs",
      y,
      controle.ijsBestelling.map(
        (r) => ({
          naam: r.product.naam,
          geteld: r.geteld,
          buffer: r.buffer,
          bestellen: r.bestellen,
        })
      )
    ) + 12;

  y =
    tekenTabel(
      doc,
      "⭐ Speciaalsmaken",
      y,
      [
        {
          naam: "Speciaalsmaken",
          geteld:
            controle.speciaalsmaken
              ?.geteld ?? 0,
          buffer:
            controle.speciaalsmaken
              ?.buffer ?? 0,
          bestellen:
            controle.speciaalsmaken
              ?.bestellen ?? 0,
        },
      ]
    ) + 12;

  y =
    tekenTabel(
      doc,
      "🍦 Slagroom",
      y,
      [
        {
          naam: "Slagroom",
          geteld:
            controle.slagroom
              ?.geteld ?? 0,
          buffer:
            controle.slagroom
              ?.buffer ?? 0,
          bestellen:
            controle.slagroom
              ?.bestellen ?? 0,
        },
      ]
    ) + 12;

  y =
    tekenTabel(
      doc,
      "📦 Drooggoed",
      y,
      controle.drooggoedBestelling.map(
        (r) => ({
          naam: r.product.naam,
          geteld: r.geteld,
          buffer: r.buffer,
          bestellen: r.bestellen,
        })
      )
    ) + 15;

  doc.setFont("helvetica", "bold");
  doc.text(
    "SAMENVATTING",
    14,
    y
  );

  doc.setFont("helvetica", "normal");

  doc.text(
    `Totaal ijs: ${controle.totaalIJs}`,
    14,
    y + 8
  );

  doc.text(
    `Totaal drooggoed: ${controle.totaalDrooggoed}`,
    14,
    y + 15
  );

  const paginaTotaal =
    doc.getNumberOfPages();

  for (
    let i = 1;
    i <= paginaTotaal;
    i++
  ) {
    doc.setPage(i);

    doc.setFontSize(8);

    doc.text(
      `Pagina ${i} van ${paginaTotaal}`,
      170,
      290
    );
  }

  const bestandsDatum =
    new Date(datum)
      .toISOString()
      .slice(0, 10);

  doc.save(
    `${bestandsDatum}_${vestiging}_Besteladvies.pdf`
  );
}