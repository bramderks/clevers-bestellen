"use client";

import { useState } from "react";
import TaakRij from "./TaakRij";

type Props = {
  categorie: string;
  taken: any[];
};

export default function CategorieBlok({
  categorie,
  taken,
}: Props) {
const [open, setOpen] = useState(true);

useState(() => {
  const handler = (event: Event) => {
    const custom =
      event as CustomEvent<boolean>;

    setOpen(custom.detail);
  };

  window.addEventListener(
    "weektaken-open",
    handler
  );

  return () =>
    window.removeEventListener(
      "weektaken-open",
      handler
    );
});

  const totaal = taken.length;
  const gereed = taken.filter(
    (t) => t.voltooid
  ).length;

  const percentage =
    totaal === 0
      ? 0
      : Math.round((gereed / totaal) * 100);

  return (
    <section className="mb-10 rounded-xl border bg-white shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between bg-blue-700 px-6 py-4 text-left text-white"
      >
        <div>
          <div className="text-xl font-bold">
            {categorie}
          </div>

          <div className="mt-1 text-sm text-blue-100">
            {gereed} van {totaal} voltooid
          </div>
        </div>

        <div
          className={`text-2xl transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </div>
      </button>

<div className="px-6 pb-4 pt-3 bg-blue-700">
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
            {taken.map((taak) => (
              <TaakRij
                key={taak.id}
                taak={taak}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}