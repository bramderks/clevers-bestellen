"use client";

import { useState } from "react";

type Regel = {
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
  status: "GROEN" | "ORANJE" | "ROOD";
  reden: string;
  factuurPagina?: number | null;
  pakbonPaginas?: number[];
};

type Resultaat = {
  leverancier?: string | null;
  factuurnummer?: string | null;
  factuurdatum?: string | null;
  totaalExclBtw?: number | null;
  totaalBtw?: number | null;
  totaalInclBtw?: number | null;
  factuurPaginas: number[];
  pakbonnen: Array<{ nummer?: string | null; datum?: string | null; pagina: number }>;
  regels: Regel[];
  samenvatting: { groen: number; oranje: number; rood: number };
  opmerkingen: string[];
};

const euro = (value: number | null | undefined) =>
  value == null ? "-" : new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(value);

export default function FactuurControlePagina() {
  const [file, setFile] = useState<File | null>(null);
  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [loading, setLoading] = useState(false);
  const [fout, setFout] = useState("");

  async function analyseer() {
    if (!file) return;
    setLoading(true);
    setFout("");
    setResultaat(null);

    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/factuurcontrole/analyse", { method: "POST", body });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setFout(data.message ?? "De controle is mislukt.");
        return;
      }
      setResultaat(data.resultaat);
    } catch {
      setFout("Er ging iets mis tijdens het uploaden of analyseren.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Factuurcontrole</h1>
        <p className="mt-2 text-slate-500">
          Upload de wekelijkse PDF met factuur en pakbonnen. De app vergelijkt beide kanten automatisch.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold">Factuur + pakbonnen uploaden</h2>
        <p className="mt-2 text-slate-500">
          Eén PDF is voldoende. Iedere pagina wordt gecontroleerd en als factuur of pakbon herkend.
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="cursor-pointer rounded-xl border-2 border-dashed border-slate-300 px-6 py-4 font-semibold text-slate-700 hover:border-blue-500 hover:bg-blue-50">
            📄 PDF kiezen
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
                setResultaat(null);
                setFout("");
              }}
            />
          </label>

          {file && <span className="text-sm text-slate-600">{file.name}</span>}

          <button
            type="button"
            onClick={analyseer}
            disabled={!file || loading}
            className="rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? "PDF analyseren..." : "Start factuurcontrole"}
          </button>
        </div>

        {loading && (
          <div className="mt-6 rounded-xl bg-blue-50 p-4 text-blue-800">
            <div className="font-semibold">Bezig met controleren</div>
            <div className="mt-1 text-sm">PDF lezen → factuur/pakbonnen herkennen → regels vergelijken → verschillen bepalen.</div>
          </div>
        )}

        {fout && <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-800"><strong>Controle niet afgerond:</strong> {fout}</div>}
      </div>

      {resultaat && (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Resultaat</div>
                <h2 className={"mt-1 text-3xl font-bold " + (resultaat.samenvatting.rood ? "text-red-700" : resultaat.samenvatting.oranje ? "text-orange-700" : "text-green-700")}>
                  {resultaat.samenvatting.rood ? "FACTUUR KOMT NIET OVEREEN" : resultaat.samenvatting.oranje ? "CONTROLEREN" : "FACTUUR KOMT OVEREEN"}
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-green-50 px-5 py-3"><div className="text-2xl font-bold text-green-700">{resultaat.samenvatting.groen}</div><div className="text-xs text-green-700">Akkoord</div></div>
                <div className="rounded-xl bg-orange-50 px-5 py-3"><div className="text-2xl font-bold text-orange-700">{resultaat.samenvatting.oranje}</div><div className="text-xs text-orange-700">Controleren</div></div>
                <div className="rounded-xl bg-red-50 px-5 py-3"><div className="text-2xl font-bold text-red-700">{resultaat.samenvatting.rood}</div><div className="text-xs text-red-700">Verschil</div></div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
              <h3 className="text-xl font-bold">Factuur</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div><div className="text-xs uppercase text-slate-500">Leverancier</div><div className="font-semibold">{resultaat.leverancier ?? "-"}</div></div>
                <div><div className="text-xs uppercase text-slate-500">Factuurnummer</div><div className="font-semibold">{resultaat.factuurnummer ?? "-"}</div></div>
                <div><div className="text-xs uppercase text-slate-500">Datum</div><div className="font-semibold">{resultaat.factuurdatum ?? "-"}</div></div>
                <div><div className="text-xs uppercase text-slate-500">Pagina</div><div className="font-semibold">{resultaat.factuurPaginas.join(", ")}</div></div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs text-slate-500">Excl. btw</div><div className="text-lg font-bold">{euro(resultaat.totaalExclBtw)}</div></div>
                <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs text-slate-500">Btw</div><div className="text-lg font-bold">{euro(resultaat.totaalBtw)}</div></div>
                <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs text-slate-500">Incl. btw</div><div className="text-lg font-bold">{euro(resultaat.totaalInclBtw)}</div></div>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">Pakbonnen</h3>
              <div className="mt-4 space-y-3">
                {resultaat.pakbonnen.map((pakbon, index) => (
                  <div key={String(pakbon.pagina) + "-" + String(index)} className="rounded-xl bg-slate-50 p-4">
                    <div className="font-semibold">{pakbon.nummer ?? "Pakbon"}</div>
                    <div className="mt-1 text-sm text-slate-500">{pakbon.datum ?? "Datum onbekend"} · pagina {pakbon.pagina}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white shadow-sm">
            <div className="border-b px-6 py-5">
              <h3 className="text-xl font-bold">Artikelcontrole</h3>
              <p className="mt-1 text-sm text-slate-500">Ook ontbrekende regels aan één van beide kanten worden getoond.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-4 py-3">Pakbon</th>
                    <th className="px-4 py-3">Factuur</th>
                    <th className="px-4 py-3">Verschil</th>
                    <th className="px-4 py-3">Prijs</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Bron</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {resultaat.regels.map((regel, index) => (
                    <tr key={regel.sleutel + "-" + String(index)} className={regel.status === "ROOD" ? "bg-red-50/60" : regel.status === "ORANJE" ? "bg-orange-50/50" : ""}>
                      <td className="px-6 py-4"><div className="font-semibold">{regel.omschrijving}</div>{regel.productCode && <div className="text-xs text-slate-400">{regel.productCode}</div>}</td>
                      <td className="px-4 py-4">{regel.aantalPakbon ?? "-"} {regel.eenheidPakbon ?? ""}</td>
                      <td className="px-4 py-4">{regel.aantalFactuur ?? "-"} {regel.eenheidFactuur ?? ""}</td>
                      <td className="px-4 py-4 font-semibold">{regel.verschilAantal == null ? "-" : regel.verschilAantal > 0 ? "+" + regel.verschilAantal : regel.verschilAantal}</td>
                      <td className="px-4 py-4">{regel.prijsFactuur == null && regel.prijsPakbon == null ? "-" : euro(regel.prijsPakbon) + " / " + euro(regel.prijsFactuur)}</td>
                      <td className="px-4 py-4">
                        <span className={"inline-flex rounded-full px-3 py-1 text-xs font-bold " + (regel.status === "GROEN" ? "bg-green-100 text-green-800" : regel.status === "ORANJE" ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800")}>
                          {regel.status === "GROEN" ? "✓ Akkoord" : regel.status === "ORANJE" ? "⚠ Controleren" : "✕ Verschil"}
                        </span>
                        <div className="mt-1 max-w-xs text-xs text-slate-500">{regel.reden}</div>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-500">Factuur p.{regel.factuurPagina ?? "-"}<br />Pakbon p.{regel.pakbonPaginas?.join(", ") || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {resultaat.opmerkingen.length > 0 && (
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold">OCR-opmerkingen</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">{resultaat.opmerkingen.map((item, index) => <li key={index}>{item}</li>)}</ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
