import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { prisma } from "@/lib/prisma";
import { vergelijkRegels, type FactuurControleResultaat } from "@/lib/factuurcontrole";
import { haalErpGebruiker } from "@/lib/erp-auth";

export const runtime = "nodejs";
export const maxDuration = 120;

type AIRegel = {
  omschrijving: string;
  productCode?: string | null;
  aantal?: number | null;
  eenheid?: string | null;
  prijs?: number | null;
  pagina?: number | null;
};

type AIDocument = {
  type: "factuur" | "pakbon" | "overig" | "onzeker";
  pagina: number;
  nummer?: string | null;
  datum?: string | null;
  leverancier?: string | null;
  valuta?: string | null;
  totaalExclBtw?: number | null;
  totaalBtw?: number | null;
  totaalInclBtw?: number | null;
  regels?: AIRegel[];
};

type AIResult = {
  documenten: AIDocument[];
  opmerkingen?: string[];
};

function nummer(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export async function POST(request: NextRequest) {
  const gebruiker = await haalErpGebruiker(request);
  if (!gebruiker) {
    return NextResponse.json({ success: false, message: "Log in met je Clevers ERP-account." }, { status: 401 });
  }
  if (!gebruiker.eigenaar) {
    return NextResponse.json({ success: false, message: "Alleen de eigenaar kan facturen controleren." }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.type !== "application/pdf") {
    return NextResponse.json({ success: false, message: "Upload één PDF-bestand." }, { status: 400 });
  }

  if (file.size > 25 * 1024 * 1024) {
    return NextResponse.json({ success: false, message: "De PDF is groter dan 25 MB." }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ success: false, message: "OPENAI_API_KEY ontbreekt." }, { status: 500 });
  }

  const started = Date.now();

  try {
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = [
      "Analyseer de volledige PDF voor een administratieve factuurcontrole.",
      "De PDF bevat één factuur en één of meer gescande pakbonnen van dezelfde leverancier over een week.",
      "Bepaal voor iedere pagina: factuur, pakbon, overig of onzeker. De eerste pagina is pagina 1.",
      "Extraheer voor de factuur leverancier, factuurnummer, factuurdatum, valuta, totaal exclusief btw, btw, totaal inclusief btw en ALLE factuurregels.",
      "Extraheer voor iedere pakbon pakbonnummer, leverdatum, leverancier en ALLE regels met geleverd aantal.",
      "Per regel: omschrijving, artikelcode indien zichtbaar, aantal, eenheid, prijs indien zichtbaar en paginanummer.",
      "Neem ook regels over die maar één keer voorkomen. Verzin nooit waarden; gebruik null als iets niet leesbaar is.",
      "Een pakbon heeft vaak geen prijs; laat die dan null.",
      "Geef uitsluitend JSON terug met deze vorm:",
      '{"documenten":[{"type":"factuur|pakbon|overig|onzeker","pagina":1,"nummer":null,"datum":null,"leverancier":null,"valuta":null,"totaalExclBtw":null,"totaalBtw":null,"totaalInclBtw":null,"regels":[{"omschrijving":"string","productCode":null,"aantal":null,"eenheid":null,"prijs":null,"pagina":1}]}],"opmerkingen":[]}',
    ].join("\n");

    const response = await openai.responses.create({
      model: "gpt-4.1",
      input: [{
        role: "user",
        content: [
          { type: "input_text", text: prompt },
          {
            type: "input_file",
            filename: file.name,
            file_data: "data:application/pdf;base64," + base64,
          },
        ],
      }],
    });

    let ai: AIResult;
    try {
      ai = JSON.parse(response.output_text) as AIResult;
    } catch {
      return NextResponse.json({
        success: false,
        message: "De OCR-uitvoer was geen geldige JSON.",
        output: response.output_text,
      }, { status: 502 });
    }

    const documenten = Array.isArray(ai.documenten) ? ai.documenten : [];
    const factuur = documenten.find((d) => d.type === "factuur");
    const pakbonnen = documenten.filter((d) => d.type === "pakbon");

    if (!factuur) {
      return NextResponse.json({ success: false, message: "Geen duidelijke factuurpagina gevonden.", documenten }, { status: 422 });
    }
    if (!pakbonnen.length) {
      return NextResponse.json({ success: false, message: "Geen duidelijke pakbonpagina gevonden.", documenten }, { status: 422 });
    }

    const factuurRegels = (factuur.regels ?? []).map((regel) => ({
      omschrijving: regel.omschrijving,
      productCode: regel.productCode ?? null,
      aantal: nummer(regel.aantal),
      eenheid: regel.eenheid ?? null,
      prijs: nummer(regel.prijs),
      pagina: regel.pagina ?? factuur.pagina,
    }));

    const pakbonRegels = pakbonnen.flatMap((pakbon) =>
      (pakbon.regels ?? []).map((regel) => ({
        omschrijving: regel.omschrijving,
        productCode: regel.productCode ?? null,
        aantal: nummer(regel.aantal),
        eenheid: regel.eenheid ?? null,
        prijs: nummer(regel.prijs),
        pagina: regel.pagina ?? pakbon.pagina,
      })),
    );

    const regels = vergelijkRegels(factuurRegels, pakbonRegels);
    const samenvatting = {
      groen: regels.filter((r) => r.status === "GROEN").length,
      oranje: regels.filter((r) => r.status === "ORANJE").length,
      rood: regels.filter((r) => r.status === "ROOD").length,
    };

    const resultaat: FactuurControleResultaat = {
      leverancier: factuur.leverancier ?? pakbonnen[0]?.leverancier ?? null,
      factuurnummer: factuur.nummer ?? null,
      factuurdatum: factuur.datum ?? null,
      valuta: factuur.valuta ?? "EUR",
      totaalExclBtw: nummer(factuur.totaalExclBtw),
      totaalBtw: nummer(factuur.totaalBtw),
      totaalInclBtw: nummer(factuur.totaalInclBtw),
      factuurPaginas: [factuur.pagina],
      pakbonnen: pakbonnen.map((p) => ({ nummer: p.nummer ?? null, datum: p.datum ?? null, pagina: p.pagina })),
      regels,
      samenvatting,
      opmerkingen: ai.opmerkingen ?? [],
    };

    const status = samenvatting.rood > 0 ? "Verschil" : samenvatting.oranje > 0 ? "Controleren" : "Akkoord";

    await prisma.factuurControle.create({
      data: {
        gebruikerId: (await prisma.gebruiker.findUnique({ where: { email: gebruiker.email }, select: { id: true } }))?.id ?? null,
        bestandsNaam: file.name,
        leverancierNaam: resultaat.leverancier,
        factuurnummer: resultaat.factuurnummer,
        factuurDatum: resultaat.factuurdatum ? new Date(resultaat.factuurdatum) : null,
        status,
        aantalRood: samenvatting.rood,
        aantalOranje: samenvatting.oranje,
        aantalGroen: samenvatting.groen,
        resultaat: resultaat as unknown as object,
        duurMs: Date.now() - started,
      },
    });

    return NextResponse.json({ success: true, resultaat });
  } catch (error) {
    console.error("FACTUURCONTROLE", error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Onbekende fout bij factuurcontrole.",
    }, { status: 500 });
  }
}
