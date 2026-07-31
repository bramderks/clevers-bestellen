import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface BestelAdvies {
  naam: string;
  geteld: number;
  buffer: number;
  bestellen: number;
  bestelBij: string;
  bestelGroep: "ijs" | "drooggoed";
}

interface PdfOpties {
  vestiging: string;
  datum: string;
  bestelling: BestelAdvies[];
}

function tekenHeader(
  doc: jsPDF,
  titel: string,
  vestiging: string,
  datum: string
) {
doc.setFillColor(35, 91, 170);
doc.roundedRect(0, 0, 210, 28, 0, 0, "F");

  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
doc.setFontSize(17);
doc.text("CLEVERS", 14, 17);

doc.setFontSize(11);
doc.setFont("helvetica", "normal");
doc.text("BESTELADVIES", 105, 17, { align: "center" });

doc.setFont("helvetica", "bold");
doc.setFontSize(15);
doc.text(titel.toUpperCase(), 105, 24, { align: "center" });

  doc.setTextColor(60);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

doc.setFont("helvetica", "bold");
doc.text("Vestiging", 14, 38);
doc.text("Datum", 14, 44);

doc.setFont("helvetica", "normal");
doc.text(vestiging, 40, 38);
doc.text(
  new Date(datum).toLocaleDateString("nl-NL"),
  40,
  44
);

doc.setDrawColor(210);
doc.setLineWidth(0.2);
doc.line(14, 49, 196, 49);
}

function tekenTabel(
  doc: jsPDF,
  titel: string,
  vestiging: string,
  datum: string,
  bestelling: BestelAdvies[],
  nieuwePagina = false
) {
  if (nieuwePagina) {
    doc.addPage();
  }

  tekenHeader(doc, titel, vestiging, datum);

  const producten = [...bestelling].sort((a, b) =>
    a.naam.localeCompare(b.naam, "nl")
  );

autoTable(doc, {
  startY: 54,

  theme: "grid",

  head: [[
    "Product",
    "Geteld",
    "Buffer",
    "Te bestellen",
  ]],

  body: producten.map((product) => [
    product.naam,
    product.geteld,
    product.buffer,
    product.bestellen,
  ]),

  styles: {
    font: "helvetica",
    fontSize: 10.5,
    cellPadding: 5,
    lineColor: [220, 220, 220],
    lineWidth: 0.2,
    textColor: [40, 40, 40],
    valign: "middle",
  },

  headStyles: {
    fillColor: [35, 91, 170],
    textColor: 255,
    fontStyle: "bold",
    halign: "center",
    lineColor: [35, 91, 170],
  },

  alternateRowStyles: {
    fillColor: [248, 248, 248],
  },

  columnStyles: {
    0: {
      cellWidth: 105,
      halign: "left",
    },
    1: {
      cellWidth: 22,
      halign: "center",
    },
    2: {
      cellWidth: 22,
      halign: "center",
    },
    3: {
      cellWidth: 30,
      halign: "center",
      fontStyle: "bold",
      fillColor: [220, 235, 255],
    },
  },

  didParseCell(data) {
    if (data.section !== "body") return;

    const rij = data.row.raw as (string | number)[];

    if (Number(rij[3]) === 0) {
      data.cell.styles.textColor = [150, 150, 150];
    }
  },
});

  return {
    totaal: producten.reduce((t, p) => t + p.bestellen, 0),
    regels: producten.filter(p => p.bestellen > 0).length,
    finalY:
      (
        doc as jsPDF & {
          lastAutoTable?: { finalY: number };
        }
      ).lastAutoTable?.finalY ?? 50,
  };
}
export function genereerBestelPdf(opts: PdfOpties) {
  const doc = new jsPDF();

  const ijs = opts.bestelling.filter(
    (p) => p.bestelGroep === "ijs"
  );

  const drooggoed = opts.bestelling.filter(
    (p) => p.bestelGroep === "drooggoed"
  );

  const ijsResultaat = tekenTabel(
    doc,
    "IJsbestelling",
    opts.vestiging,
    opts.datum,
    ijs
  );

  const droogResultaat = tekenTabel(
    doc,
    "Drooggoed",
    opts.vestiging,
    opts.datum,
    drooggoed,
    true
  );

  let y = droogResultaat.finalY + 12;

  doc.setDrawColor(35, 91, 170);
doc.setLineWidth(0.3);
doc.roundedRect(14, y, 182, 34, 2, 2);

doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.text("SAMENVATTING", 18, y + 8);

doc.setFont("helvetica", "normal");
doc.setFontSize(10);

doc.text(`Totaal ijs: ${ijsResultaat.totaal}`, 18, y + 17);
doc.text(`Totaal drooggoed: ${droogResultaat.totaal}`, 105, y + 17);

doc.text(`Bestelregels ijs: ${ijsResultaat.regels}`, 18, y + 26);
doc.text(`Bestelregels drooggoed: ${droogResultaat.regels}`, 105, y + 26);

y += 46;

doc.setFont("helvetica", "bold");
doc.text("OPMERKINGEN", 14, y);

doc.roundedRect(14, y + 4, 182, 45, 2, 2);
    const paginaTotaal = doc.getNumberOfPages();

  for (let i = 1; i <= paginaTotaal; i++) {
    doc.setPage(i);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120);

doc.setDrawColor(220);
doc.line(14, 285, 196, 285);

doc.text(
  `Pagina ${i} van ${paginaTotaal}`,
  170,
  290
);
  }

  const bestandsDatum = new Date(opts.datum)
    .toISOString()
    .slice(0, 10);

  doc.save(
    `${bestandsDatum}_${opts.vestiging}_Besteladvies.pdf`
  );
}