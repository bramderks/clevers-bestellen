"use client";

import { useMemo, useState } from "react";
import TopBar from "@/components/TopBar";
import { producten } from "@/data/producten";

export default function ProductenPagina() {
  const [zoek, setZoek] = useState("");
  const [categorie, setCategorie] = useState("alle");

  const lijst = useMemo(() => {
    return [...producten]
      .filter((product) => {
        const zoekMatch =
          product.naam
            .toLowerCase()
            .includes(zoek.toLowerCase()) ||
          product.id
            .toLowerCase()
            .includes(zoek.toLowerCase());

        const categorieMatch =
          categorie === "alle"
            ? true
            : product.telCategorie === categorie;

        return zoekMatch && categorieMatch;
      })
      .sort(
        (a, b) => a.volgorde - b.volgorde
      );
  }, [zoek, categorie]);

  return (
    <main className="min-h-screen bg-slate-100 py-6 md:py-10">
      <div className="mx-auto max-w-7xl px-4">
        <TopBar title="Productbeheer" />

        <div className="rounded-2xl bg-white p-6 shadow-xl md:p-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold">
                Productbeheer
              </h1>

              <p className="text-gray-500">
                {lijst.length} producten
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="text"
                placeholder="Zoek product..."
                value={zoek}
                onChange={(e) =>
                  setZoek(e.target.value)
                }
                className="rounded-xl border px-4 py-3"
              />

              <select
                value={categorie}
                onChange={(e) =>
                  setCategorie(e.target.value)
                }
                className="rounded-xl border px-4 py-3"
              >
                <option value="alle">
                  Alle categorieën
                </option>

                <option value="hardlopers">
                  Hardlopers
                </option>

                <option value="middenlopers">
                  Middenlopers
                </option>

                <option value="zachtlopers">
                  Zachtlopers
                </option>

                <option value="speciaalsmaken">
                  Speciaalsmaken
                </option>

                <option value="drooggoed">
                  Drooggoed
                </option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 text-left">
                    ID
                  </th>

                  <th className="p-3 text-left">
                    Naam
                  </th>

                  <th className="p-3 text-left">
                    Telcategorie
                  </th>

                  <th className="p-3 text-center">
                    Nijmegen
                  </th>

                  <th className="p-3 text-center">
                    Roermond
                  </th>

                  <th className="p-3 text-left">
                    Bestel bij
                  </th>

                  <th className="p-3 text-left">
                    Bestelgroep
                  </th>

                  <th className="p-3 text-center">
                    Actief
                  </th>
                </tr>
              </thead>

              <tbody>
                {lijst.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="p-3 font-mono text-sm">
                      {product.id}
                    </td>

                    <td className="p-3 font-medium">
                      {product.naam}
                    </td>

                    <td className="p-3 capitalize">
                      {product.telCategorie}
                    </td>

                    <td className="p-3 text-center font-semibold">
                      {product.buffers.nijmegen}
                    </td>

                    <td className="p-3 text-center font-semibold">
                      {product.buffers.roermond}
                    </td>

                    <td className="p-3">
                      {product.bestelBij}
                    </td>

                    <td className="p-3">
                      {product.bestelGroep}
                    </td>

                    <td className="p-3 text-center text-xl">
                      {product.actief
                        ? "✅"
                        : "❌"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}