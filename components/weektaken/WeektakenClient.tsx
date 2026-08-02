"use client";

import { useEffect, useState } from "react";
import CategorieBlok from "@/components/weektaken/CategorieBlok";

type Taak = {
  id: string;
  taak: string;
  categorie: string;
  voltooid: boolean;
  naam: string | null;
  voltooidOp: string | null;
};

type Categorie = {
  categorie: string;
  taken: Taak[];
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
    useState<Categorie[]>(categorieen);

  useEffect(() => {
    setCategorieData(categorieen);
  }, [categorieen]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent<boolean>(
        "weektaken-open",
        {
          detail: allesOpen,
        }
      )
    );
  }, [allesOpen]);

  const totaalTaken =
    categorieData.reduce(
      (totaal, categorie) =>
        totaal + categorie.taken.length,
      0
    );

  const gereedTaken =
    categorieData.reduce(
      (totaal, categorie) =>
        totaal +
        categorie.taken.filter(
          (taak) => taak.voltooid
        ).length,
      0
    );

  const openTaken =
    totaalTaken - gereedTaken;

  const percentage =
    totaalTaken === 0
      ? 0
      : Math.round(
          (gereedTaken / totaalTaken) *
            100
        );

  return (
    <>
      <div className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                setAllesOpen(true)
              }
              className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              ▼ Alles uitklappen
            </button>

            <button
              type="button"
              onClick={() =>
                setAllesOpen(false)
              }
              className="rounded-lg bg-slate-700 px-5 py-2 font-semibold text-white transition hover:bg-slate-800"
            >
              ▶ Alles inklappen
            </button>

            {afgesloten && (
              <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 font-semibold text-red-700">
                🔒 Week afgesloten
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-700">
                {totaalTaken}
              </div>

              <div className="text-sm text-slate-500">
                Totaal
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold text-green-700">
                {gereedTaken}
              </div>

              <div className="text-sm text-slate-500">
                Gereed
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold text-orange-600">
                {openTaken}
              </div>

              <div className="text-sm text-slate-500">
                Open
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold text-indigo-700">
                {percentage}%
              </div>

              <div className="text-sm text-slate-500">
                Voortgang
              </div>
            </div>
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
                g.categorie ===
                groep.categorie
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