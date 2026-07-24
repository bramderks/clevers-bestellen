"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { laadBestelling } from "../../lib/sessionStorage";
import { BestelAdvies } from "../../lib/bestelEngine";

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
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Geen bestelling gevonden.
        </h1>
      </main>
    );
  }

  const bestelling = data.bestelling
    .filter((p) => p.bestellen > 0)
    .sort((a, b) => a.volgorde - b.volgorde);

  const ijskeuken = bestelling.filter(
    (p) => p.bestelBij === "ijskeuken"
  );

  const drooggoed = bestelling.filter(
    (p) => p.bestelBij === "drooggoed"
  );

  return (
    <main className="bg-gray-100 min-h-screen py-10 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-10 print:shadow-none print:rounded-none">

        <div className="flex justify-between mb-8 print:hidden">
          <button
            onClick={() => window.close()}
            className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg"
          >
            ← Sluiten
          </button>

          <button
            onClick={() => window.print()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            🖨️ Afdrukken / PDF
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <Image
            src="/logo-clevers.png"
            alt="Clevers"
            width={280}
            height={80}
            priority
          />
        </div>

        <div className="text-center border-b pb-6 mb-8">
          <h1 className="text-4xl font-bold">
            Bestelbon
          </h1>

          <p className="text-gray-600 mt-2">
            Clevers {data.vestiging}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <p className="font-semibold">
              Vestiging
            </p>
            <p>{data.vestiging}</p>
          </div>

          <div>
            <p className="font-semibold">
              Datum
            </p>
            <p>
              {new Date(data.datum).toLocaleString(
                "nl-NL"
              )}
            </p>
          </div>
        </div>

        {ijskeuken.length > 0 && (
          <BestelTabel
            titel="🍦 IJskeuken"
            regels={ijskeuken}
          />
        )}

        {drooggoed.length > 0 && (
          <BestelTabel
            titel="📦 Drooggoed"
            regels={drooggoed}
          />
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Opmerkingen
          </h2>

          <div className="border rounded-lg h-40 p-5">
            <div className="border-b h-8"></div>
            <div className="border-b h-8"></div>
            <div className="border-b h-8"></div>
            <div className="h-8"></div>
          </div>
        </div>

      </div>
    </main>
  );
}

function BestelTabel({
  titel,
  regels,
}: {
  titel: string;
  regels: BestelAdvies[];
}) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold bg-gray-100 p-3 rounded-lg mb-4">
        {titel}
      </h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-3 w-12"></th>

            <th className="text-left p-3">
              Product
            </th>

            <th className="text-center p-3 w-28">
              Aantal
            </th>
          </tr>
        </thead>

        <tbody>
          {regels.map((regel) => (
            <tr
              key={regel.id}
              className="border-t"
            >
              <td className="text-center">
                ☐
              </td>

              <td className="p-3">
                {regel.naam}
              </td>

              <td className="text-center font-bold">
                {regel.bestellen}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}