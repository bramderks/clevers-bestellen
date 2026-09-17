"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { bewaarBestelling, laadBestelling } from "@/lib/sessionStorage";
import type { BestelAdvies } from "@/types";

import BestelTabel from "@/components/BestelTabel";

interface BestellingData {
  datum: string;
  vestiging: string;
  medewerker?: string;
  opmerking?: string;
  bestelling: BestelAdvies[];
}

function decodeBestelling(value: string): BestellingData | null {
  try {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    return JSON.parse(window.atob(padded)) as BestellingData;
  } catch {
    return null;
  }
}

export default function BestellingPagina() {
  const [data, setData] = useState<BestellingData | null>(null);
  const [viaLink, setViaLink] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("data");

    if (encoded) {
      const bestelling = decodeBestelling(encoded);
      if (bestelling) {
        bewaarBestelling(bestelling.vestiging, bestelling.bestelling);
        setData(bestelling);
        setViaLink(true);
        return;
      }
    }

    const bestelling = laadBestelling();
    if (bestelling) setData(bestelling);
  }, []);

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Geen bestelling gevonden.</h1>
      </main>
    );
  }

  const bestelling = data.bestelling
    .filter((regel) => regel.bestellen > 0)
    .sort((a, b) => a.volgorde - b.volgorde);

  const ijskeuken = bestelling.filter((regel) => regel.bestelBij === "ijskeuken");
  const drooggoed = bestelling.filter((regel) => regel.bestelBij === "drooggoed");

  function openClevers() {
    window.open("https://bestel.clevers.nl/bestellen/", "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 print:bg-white print:py-0">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-10 shadow-xl print:rounded-none print:shadow-none">
        <div className="mb-8 flex flex-wrap justify-between gap-3 print:hidden">
          <button
            type="button"
            onClick={() => window.close()}
            className="rounded-lg bg-gray-200 px-5 py-2 hover:bg-gray-300"
          >
            ← Sluiten
          </button>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openClevers}
              className="rounded-lg bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700"
            >
              Open Clevers bestelpagina →
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg bg-slate-700 px-6 py-2 text-white hover:bg-slate-800"
            >
              🖨️ Afdrukken / PDF
            </button>
          </div>
        </div>

        {viaLink && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900 print:hidden">
            <strong>Bestelling geladen.</strong> De aantallen uit de telling staan hieronder klaar. Controleer ze en open daarna de Clevers-bestelpagina.
          </div>
        )}

        <div className="mb-8 flex justify-center">
          <Image
            src="/logo-clevers.png"
            alt="Clevers"
            width={280}
            height={80}
            priority
          />
        </div>

        <div className="mb-8 border-b pb-6 text-center">
          <h1 className="text-4xl font-bold">Bestelbon</h1>
          <p className="mt-2 text-gray-600">Clevers {data.vestiging}</p>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-8">
          <div>
            <p className="font-semibold">Vestiging</p>
            <p>{data.vestiging}</p>
          </div>
          <div>
            <p className="font-semibold">Datum</p>
            <p>{new Date(data.datum).toLocaleString("nl-NL")}</p>
          </div>
          {data.medewerker && (
            <div>
              <p className="font-semibold">Medewerker</p>
              <p>{data.medewerker}</p>
            </div>
          )}
        </div>

        {ijskeuken.length > 0 && (
          <BestelTabel
            titel="🍦 IJskeuken"
            regels={ijskeuken}
            totaal={ijskeuken.reduce((totaal, regel) => totaal + regel.bestellen, 0)}
          />
        )}

        {drooggoed.length > 0 && (
          <BestelTabel
            titel="📦 Drooggoed"
            regels={drooggoed}
            totaal={drooggoed.reduce((totaal, regel) => totaal + regel.bestellen, 0)}
          />
        )}

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">Opmerkingen</h2>
          <div className="min-h-40 rounded-lg border p-5">
            {data.opmerking ? (
              <p className="whitespace-pre-wrap text-gray-700">{data.opmerking}</p>
            ) : (
              <>
                <div className="h-8 border-b" />
                <div className="h-8 border-b" />
                <div className="h-8 border-b" />
                <div className="h-8" />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
