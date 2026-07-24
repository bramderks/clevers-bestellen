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

function maakPdf(
  titel: string,
  vestiging: string,
  datum: string,
  bestelling: BestelAdvies[]
) {
  const doc = new jsPDF();

  doc.setFont("helvetica","bold");
  doc.setFontSize(22);
  doc.text("CLEVERS IJS",14,18);

  doc.setFontSize(16);
  doc.text(titel.toUpperCase(),14,28);

  doc.setFont("helvetica","normal");
  doc.setFontSize(10);
  doc.text(`Vestiging: ${vestiging}`,14,38);
  doc.text(`Datum: ${new Date(datum).toLocaleDateString("nl-NL")}`,14,44);

  const totaal = bestelling.reduce((s,p)=>s+p.bestellen,0);

  autoTable(doc,{
    startY:52,
    head:[["Product","Geteld","Buffer","Bestellen"]],
    body: bestelling.map(p=>[
      p.naam,
      String(p.geteld),
      String(p.buffer),
      String(p.bestellen),
    ]),
    styles:{fontSize:10,cellPadding:3},
    headStyles:{fillColor:[30,30,30],textColor:255,fontStyle:"bold"},
    columnStyles:{
      1:{halign:"right"},
      2:{halign:"right"},
      3:{halign:"right"},
    },
   didParseCell(data) {
  if (data.section !== "body") return;

  const row = data.row.raw as (string | number)[];

  if (Number(row[3]) === 0) {
    data.cell.styles.textColor = [140, 140, 140];
  }
}
  });

  const finalY =
  (doc as jsPDF & { lastAutoTable?: { finalY: number } })
    .lastAutoTable?.finalY ?? 52;

let y = finalY + 10;

  doc.setFont("helvetica","bold");
  doc.text(`Totaal te bestellen: ${totaal}`,14,y);

  y+=12;
  doc.text("Opmerkingen",14,y);
  doc.setFont("helvetica","normal");

  for(let i=0;i<5;i++){
    y+=10;
    doc.line(14,y,195,y);
  }

  y+=15;
  doc.text("Handtekening leidinggevende:",14,y);
  doc.line(72,y,170,y);

  const pages=doc.getNumberOfPages();
  for(let i=1;i<=pages;i++){
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Pagina ${i} van ${pages}`,170,290);
  }

  const bestandsDatum=new Date(datum).toISOString().slice(0,10);
  doc.save(`${bestandsDatum}_${vestiging}_${titel.replace(/\s+/g,"_")}.pdf`);
}

export function genereerIJsPdf(opts: PdfOpties){
  maakPdf("IJsbestelling",opts.vestiging,opts.datum,opts.bestelling.filter(p=>p.bestelGroep==="ijs"));
}

export function genereerDrooggoedPdf(opts: PdfOpties){
  maakPdf("Drooggoedbestelling",opts.vestiging,opts.datum,opts.bestelling.filter(p=>p.bestelGroep==="drooggoed"));
}
