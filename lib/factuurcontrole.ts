export type ControleStatus = "GROEN" | "ORANJE" | "ROOD";

export interface ControleRegel {
  sleutel: string;
  omschrijving: string;
  productCode?: string | null;
  eenheidFactuur?: string | null;
  eenheidPakbon?: string | null;
  aantalFactuur?: number | null;
  aantalPakbon?: number | null;
  verschilAantal?: number | null;
  prijsFactuur?: number | null;
  prijsPakbon?: number | null;
  verschilPrijs?: number | null;
  status: ControleStatus;
  reden: string;
  factuurPagina?: number | null;
  pakbonPaginas?: number[];
}

export interface FactuurControleResultaat {
  leverancier?: string | null;
  factuurnummer?: string | null;
  factuurdatum?: string | null;
  valuta?: string | null;
  totaalExclBtw?: number | null;
  totaalBtw?: number | null;
  totaalInclBtw?: number | null;
  factuurPaginas: number[];
  pakbonnen: Array<{ nummer?: string | null; datum?: string | null; pagina: number }>;
  regels: ControleRegel[];
  samenvatting: { groen: number; oranje: number; rood: number };
  opmerkingen: string[];
}

export function normaliseerTekst(value: string | null | undefined): string {
  return (value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function bijnaGelijk(a: string, b: string): boolean {
  const na = normaliseerTekst(a);
  const nb = normaliseerTekst(b);
  if (!na || !nb) return false;
  if (na === nb || na.includes(nb) || nb.includes(na)) return true;
  const aa = new Set(na.split(" "));
  const bb = new Set(nb.split(" "));
  const overlap = [...aa].filter((woord) => bb.has(woord)).length;
  return Math.max(aa.size, bb.size) > 0 && overlap / Math.max(aa.size, bb.size) >= 0.6;
}

export function vergelijkRegels(
  factuurRegels: Array<{ omschrijving: string; productCode?: string | null; aantal?: number | null; eenheid?: string | null; prijs?: number | null; pagina?: number | null }>,
  pakbonRegels: Array<{ omschrijving: string; productCode?: string | null; aantal?: number | null; eenheid?: string | null; prijs?: number | null; pagina?: number | null }>,
): ControleRegel[] {
  const gebruikt = new Set<number>();
  const regels: ControleRegel[] = [];

  for (const factuur of factuurRegels) {
    const code = normaliseerTekst(factuur.productCode);
    let index = pakbonRegels.findIndex((regel, i) =>
      !gebruikt.has(i) && !!code && normaliseerTekst(regel.productCode) === code
    );
    if (index < 0) {
      index = pakbonRegels.findIndex((regel, i) =>
        !gebruikt.has(i) && bijnaGelijk(factuur.omschrijving, regel.omschrijving)
      );
    }

    if (index < 0) {
      regels.push({
        sleutel: normaliseerTekst(factuur.productCode || factuur.omschrijving),
        omschrijving: factuur.omschrijving,
        productCode: factuur.productCode,
        eenheidFactuur: factuur.eenheid,
        aantalFactuur: factuur.aantal,
        prijsFactuur: factuur.prijs,
        status: "ROOD",
        reden: "Op factuur, maar niet aangetroffen op een pakbon.",
        factuurPagina: factuur.pagina,
        pakbonPaginas: [],
      });
      continue;
    }

    gebruikt.add(index);
    const pakbon = pakbonRegels[index];
    const verschilAantal =
      factuur.aantal != null && pakbon.aantal != null
        ? Number(pakbon.aantal) - Number(factuur.aantal)
        : null;
    const eenheidVerschil =
      !!factuur.eenheid && !!pakbon.eenheid &&
      normaliseerTekst(factuur.eenheid) !== normaliseerTekst(pakbon.eenheid);
    const verschilPrijs =
      factuur.prijs != null && pakbon.prijs != null
        ? Number(factuur.prijs) - Number(pakbon.prijs)
        : null;

    let status: ControleStatus = "GROEN";
    let reden = "Gegevens komen overeen.";

    if (eenheidVerschil || verschilAantal !== 0 || (verschilPrijs != null && Math.abs(verschilPrijs) > 0.005)) {
      status = "ROOD";
      const redenen: string[] = [];
      if (verschilAantal !== 0) redenen.push("aantal wijkt af");
      if (eenheidVerschil) redenen.push("eenheid wijkt af");
      if (verschilPrijs != null && Math.abs(verschilPrijs) > 0.005) redenen.push("prijs wijkt af");
      reden = redenen.join(", ") + ".";
    } else if (factuur.aantal == null || pakbon.aantal == null || !factuur.eenheid || !pakbon.eenheid) {
      status = "ORANJE";
      reden = "Gegevens zijn niet volledig genoeg voor een automatische controle.";
    }

    regels.push({
      sleutel: normaliseerTekst(factuur.productCode || factuur.omschrijving),
      omschrijving: factuur.omschrijving,
      productCode: factuur.productCode,
      eenheidFactuur: factuur.eenheid,
      eenheidPakbon: pakbon.eenheid,
      aantalFactuur: factuur.aantal,
      aantalPakbon: pakbon.aantal,
      verschilAantal,
      prijsFactuur: factuur.prijs,
      prijsPakbon: pakbon.prijs,
      verschilPrijs,
      status,
      reden,
      factuurPagina: factuur.pagina,
      pakbonPaginas: pakbon.pagina != null ? [pakbon.pagina] : [],
    });
  }

  for (let i = 0; i < pakbonRegels.length; i++) {
    if (gebruikt.has(i)) continue;
    const pakbon = pakbonRegels[i];
    regels.push({
      sleutel: normaliseerTekst(pakbon.productCode || pakbon.omschrijving),
      omschrijving: pakbon.omschrijving,
      productCode: pakbon.productCode,
      eenheidPakbon: pakbon.eenheid,
      aantalPakbon: pakbon.aantal,
      prijsPakbon: pakbon.prijs,
      status: "ROOD",
      reden: "Op pakbon, maar niet aangetroffen op de factuur.",
      pakbonPaginas: pakbon.pagina != null ? [pakbon.pagina] : [],
    });
  }

  return regels;
}
