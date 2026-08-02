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