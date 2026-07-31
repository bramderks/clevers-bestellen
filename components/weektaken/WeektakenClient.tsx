"use client";

import { useEffect, useState } from "react";
import CategorieBlok from "@/components/weektaken/CategorieBlok";

type Categorie = {
  categorie: string;
  taken: any[];
};

type Props = {
  categorieen: Categorie[];
  afgesloten: boolean;
};

export default function WeektakenClient({
  categorieen,
  afgesloten,
}: Props) {
  const [allesOpen, setAllesOpen] =
    useState(true);

  const [categorieData, setCategorieData] =
    useState(categorieen);

  useEffect(() => {
    setCategorieData(categorieen);
  }, [categorieen]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("weektaken-open", {
        detail: allesOpen,
      })
    );
  }, [allesOpen]);

  const totaal = categorieData.reduce(
    (acc, groep) => acc + groep.taken.length,
    0
  );

  const gereed = categorieData.reduce(
    (acc, groep) =>
      acc +
      groep.taken.filter(
        (t) => t.voltooid
      ).length,
    0
  );

  const percentage =
    totaal === 0
      ? 0
      : Math.round((gereed / totaal) * 100);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setAllesOpen(true)}
          className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          ▼ Alles uitklappen
        </button>

        <button
          onClick={() => setAllesOpen(false)}
          className="rounded-lg bg-gray-700 px-5 py-2 font-semibold text-white transition hover:bg-gray-800"
        >
          ▶ Alles inklappen
        </button>

        {afgesloten && (
          <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 font-semibold text-red-700">
            🔒 Week afgesloten
          </div>
        )}
      </div>

      <div className="mb-8 h-4 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-3xl font-bold text-blue-700">
            {totaal}
          </div>

          <div className="mt-1 text-sm text-gray-500">
            📋 Totaal
          </div>
        </div>

        <div className="rounded-2xl border bg-green-50 p-5 shadow-sm">
          <div className="text-3xl font-bold text-green-700">
            {gereed}
          </div>

          <div className="mt-1 text-sm text-gray-500">
            ✅ Gereed
          </div>
        </div>

        <div className="rounded-2xl border bg-orange-50 p-5 shadow-sm">
          <div className="text-3xl font-bold text-orange-600">
            {totaal - gereed}
          </div>

          <div className="mt-1 text-sm text-gray-500">
            ⏳ Open
          </div>
        </div>

        <div className="rounded-2xl border bg-blue-50 p-5 shadow-sm">
          <div className="text-3xl font-bold text-blue-700">
            {percentage}%
          </div>

          <div className="mt-1 text-sm text-gray-500">
            📈 Voortgang
          </div>
        </div>
      </div>

      {categorieData.map((groep) => (
        <CategorieBlok
          key={groep.categorie}
          categorie={groep.categorie}
          taken={groep.taken}
          afgesloten={afgesloten}
          onUpdate={(takenNieuw) => {
            setCategorieData((vorige) =>
              vorige.map((g) =>
                g.categorie === groep.categorie
                  ? {
                      ...g,
                      taken: takenNieuw,
                    }
                  : g
              )
            );
          }}
        />
      ))}
    </>
  );
}