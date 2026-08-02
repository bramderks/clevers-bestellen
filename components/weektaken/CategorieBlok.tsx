"use client";

import { useEffect, useState } from "react";
import TaakRij from "./TaakRij";

type Taak = {
  id: string;
  taak: string;
  categorie: string;
  voltooid: boolean;
  naam: string | null;
  voltooidOp: string | null;
};

type Props = {
  categorie: string;
  taken: Taak[];
  afgesloten: boolean;
  onUpdate?: (taken: Taak[]) => void;
};

export default function CategorieBlok({
  categorie,
  taken,
  afgesloten,
  onUpdate,
}: Props) {
  const [open, setOpen] = useState(true);

  const [takenState, setTakenState] =
    useState<Taak[]>(taken);

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

  const totaal =
    takenState.length;

  const gereed =
    takenState.filter(
      (t) => t.voltooid
    ).length;

  const openTaken =
    totaal - gereed;

  const percentage =
    totaal === 0
      ? 0
      : Math.round(
          (gereed / totaal) * 100
        );

  useEffect(() => {
    if (
      totaal > 0 &&
      gereed === totaal
    ) {
      setOpen(false);
    }
  }, [gereed, totaal]);

  const gesorteerdeTaken = [
    ...takenState,
  ].sort((a, b) => {
    if (
      a.voltooid === b.voltooid
    ) {
      return a.taak.localeCompare(
        b.taak,
        "nl"
      );
    }

    return a.voltooid ? 1 : -1;
  });

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border bg-white shadow-sm">
      <button
        type="button"
        onClick={() =>
          setOpen(!open)
        }
        className="flex w-full items-center justify-between bg-blue-700 px-6 py-5 text-left text-white transition hover:bg-blue-800"
      >
        <div className="flex flex-1 items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold">
              {categorie}
            </h2>

            <p className="mt-1 text-sm text-blue-100">
              {gereed} van {totaal} voltooid
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
              {percentage}%
            </div>

            {gereed === totaal ? (
              <div className="rounded-full bg-green-500 px-4 py-1 text-sm font-bold text-white">
                ✅ Gereed
              </div>
            ) : (
              <div className="rounded-full bg-orange-500 px-4 py-1 text-sm font-bold text-white">
                {openTaken} open
              </div>
            )}
          </div>
        </div>

        <div
          className={`ml-5 text-xl transition-transform duration-200 ${
            open
              ? "rotate-180"
              : ""
          }`}
        >
          ▼
        </div>
      </button>

      <div className="bg-blue-700 px-6 pb-4">
        <div className="h-2 overflow-hidden rounded-full bg-blue-300">
          <div
            className="h-full rounded-full bg-green-400 transition-all duration-500"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-sm text-white">
          <span>
            {gereed} / {totaal} taken voltooid
          </span>

          <span>
            {percentage}%
          </span>
        </div>
      </div>

      {open && (
        <>
          <div className="hidden md:grid grid-cols-[80px_1fr_220px_180px] border-b bg-slate-100 px-4 py-3 font-semibold">
            <div>Gereed</div>
            <div>Taak</div>
            <div>Medewerker</div>
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
                              t.id === id
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