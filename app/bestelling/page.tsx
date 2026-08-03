"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { laadBestelling } from "@/lib/sessionStorage";
import type { BestelAdvies } from "@/types";

import BestelTabel from "@/components/BestelTabel";

interface BestellingData {
  datum: string;
  vestiging: string;
  bestelling: BestelAdvies[];
}

export default function BestellingPagina() {
  const [data, setData] =
    useState<BestellingData | null>(null);

  useEffect(() => {
    const bestelling = laadBestelling();

    if (bestelling) {
      setData(bestelling);
    }
  }, []);

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">
          Geen bestelling gevonden.
        </h1>
      </main>
    );
  }

  const bestelling =
    data.bestelling
      .filter(
        (regel) =>
          regel.bestellen > 0
      )
      .sort(
        (a, b) =>
          a.volgorde - b.volgorde
      );

  const ijskeuken =
    bestelling.filter(
      (regel) =>
        regel.bestelBij === "ijskeuken"
    );

  const drooggoed =
    bestelling.filter(
      (regel) =>
        regel.bestelBij === "drooggoed"
    );

  return (
    <main className="min-h-screen bg-gray-100 py-10 print:bg-white print:py-0">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-10 shadow-xl print:rounded-none print:shadow-none">

        <div className="mb-8 flex justify-between print:hidden">
          <button
            onClick={() =>
              window.close()
            }
            className="rounded-lg bg-gray-200 px-5 py-2 hover:bg-gray-300"
          >
            ← Sluiten
          </button>

          <button
            onClick={() =>
              window.print()
            }
            className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
          >
            🖨️ Afdrukken / PDF
          </button>
        </div>

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
          <h1 className="text-4xl font-bold">
            Bestelbon
          </h1>

          <p className="mt-2 text-gray-600">
            Clevers {data.vestiging}
          </p>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-8">
          <div>
            <p className="font-semibold">
              Vestiging
            </p>

            <p>
              {data.vestiging}
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Datum
            </p>

            <p>
              {new Date(
                data.datum
              ).toLocaleString(
                "nl-NL"
              )}
            </p>
          </div>
        </div>

        {ijskeuken.length > 0 && (
          <BestelTabel
            titel="🍦 IJskeuken"
            regels={ijskeuken}
            totaal={
              ijskeuken.reduce(
                (totaal, regel) =>
                  totaal +
                  regel.bestellen,
                0
              )
            }
          />
        )}

        {drooggoed.length > 0 && (
          <BestelTabel
            titel="📦 Drooggoed"
            regels={drooggoed}
            totaal={
              drooggoed.reduce(
                (totaal, regel) =>
                  totaal +
                  regel.bestellen,
                0
              )
            }
          />
        )}

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">
            Opmerkingen
          </h2>

          <div className="h-40 rounded-lg border p-5">
            <div className="h-8 border-b" />
            <div className="h-8 border-b" />
            <div className="h-8 border-b" />
            <div className="h-8" />
          </div>
        </div>

      </div>
    </main>
  );
}