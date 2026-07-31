"use client";

import { useEffect, useState } from "react";
import TaakRij from "./TaakRij";

type Props = {
  categorie: string;
  taken: any[];
  afgesloten: boolean;
  onUpdate?: (taken: any[]) => void;
};

export default function CategorieBlok({
  categorie,
  taken,
  afgesloten,
  onUpdate,
}: Props) {
  const [open, setOpen] = useState(true);

  const [takenState, setTakenState] =
    useState(taken);

  useEffect(() => {
    setTakenState(taken);
  }, [taken]);

  useEffect(() => {
    const handler = (event: Event) => {
      const custom =
        event as CustomEvent<boolean>;

      setOpen(custom.detail);
    };

    window.addEventListener(
      "weektaken-open",
      handler
    );

    return () => {
      window.removeEventListener(
        "weektaken-open",
        handler
      );
    };
  }, []);

  const totaal = takenState.length;

  const gereed = takenState.filter(
    (t) => t.voltooid
  ).length;

  const percentage =
    totaal === 0
      ? 0
      : Math.round((gereed / totaal) * 100);

  useEffect(() => {
    if (totaal > 0 && gereed === totaal) {
      setOpen(false);
    }
  }, [gereed, totaal]);

  const gesorteerdeTaken = [
    ...takenState,
  ].sort((a, b) => {
    if (a.voltooid === b.voltooid) {
      return a.taak.localeCompare(
        b.taak,
        "nl"
      );
    }

    return a.voltooid ? 1 : -1;
  });

  return (
    <section className="mb-10 overflow-hidden rounded-xl border bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between bg-blue-700 px-6 py-4 text-left text-white"
      >
        <div className="flex w-full items-center justify-between gap-4">
          <div>
            <div className="text-xl font-bold">
              {categorie}
            </div>

            <div className="mt-1 text-sm text-blue-100">
              {gereed} van {totaal} voltooid
            </div>
          </div>

          {gereed === totaal ? (
            <div className="rounded-full bg-green-500 px-4 py-1 text-sm font-bold text-white">
              ✅ Gereed
            </div>
          ) : (
            <div className="rounded-full bg-orange-500 px-4 py-1 text-sm font-bold text-white">
              {totaal - gereed} open
            </div>
          )}
        </div>

        <div
          className={`ml-4 text-2xl transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </div>
      </button>

      <div className="bg-blue-700 px-6 pb-4 pt-3">
        <div className="h-2 overflow-hidden rounded-full bg-blue-300">
          <div
            className="h-full rounded-full bg-green-400 transition-all duration-500"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <div className="mt-2 text-sm text-white">
          {gereed} / {totaal} taken voltooid ({percentage}%)
        </div>
      </div>

      {open && (
        <>
          <div className="hidden md:grid grid-cols-[80px_1fr_220px_180px] border-b bg-gray-100 px-4 py-3 font-semibold">
            <div>Gereed</div>
            <div>Taak</div>
            <div>Naam medewerker</div>
            <div>Afgerond op</div>
          </div>

          <div className="divide-y">
            {gesorteerdeTaken.map(
              (taak) => (
                <TaakRij
                  key={taak.id}
                  taak={taak}
                  afgesloten={
                    afgesloten
                  }
                  onVoltooid={(
                    id,
                    naam,
                    datum
                  ) => {
                    setTakenState(
                      (vorige) => {
                        const nieuw =
                          vorige.map(
                            (t) =>
                              t.id ===
                              id
                                ? {
                                    ...t,
                                    voltooid: true,
                                    naam,
                                    voltooidOp:
                                      datum,
                                  }
                                : t
                          );

                        onUpdate?.(
                          nieuw
                        );

                        return nieuw;
                      }
                    );
                  }}
                />
              )
            )}
          </div>
        </>
      )}
    </section>
  );
}