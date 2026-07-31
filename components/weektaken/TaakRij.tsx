"use client";

import { useState } from "react";

type Props = {
  taak: {
    id: string;
    taak: string;
    categorie: string;
    voltooid: boolean;
    naam: string | null;
    voltooidOp: string | null;
  };
};

export default function TaakRij({ taak }: Props) {
  const [voltooid, setVoltooid] = useState(taak.voltooid);
  const [naam, setNaam] = useState(taak.naam ?? "");
  const [datum, setDatum] = useState(taak.voltooidOp);
  const [modalOpen, setModalOpen] = useState(false);
  const [opslaan, setOpslaan] = useState(false);

  async function opslaanTaak() {
    if (!naam.trim()) {
      alert("Vul je naam in.");
      return;
    }

    setOpslaan(true);

    const res = await fetch(`/api/weektaken/${taak.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        naam,
        voltooid: true,
      }),
    });

    const data = await res.json();

    localStorage.setItem("weektakenNaam", naam);

    setVoltooid(true);
    setDatum(data.voltooidOp);
    setModalOpen(false);
    setOpslaan(false);
  }

  return (
    <>
      <div
        className={`grid grid-cols-[80px_1fr_220px_180px] items-center gap-4 rounded-lg border p-3 ${
          voltooid ? "bg-green-50" : "bg-white"
        }`}
      >
        <div className="text-center">
          <input
            type="checkbox"
            checked={voltooid}
            disabled={voltooid}
            onChange={() => {
  setNaam(localStorage.getItem("weektakenNaam") ?? "");
  setModalOpen(true);
}}
            className="h-5 w-5"
          />
        </div>

        <div>{taak.taak}</div>

        <div>{naam || "-"}</div>

        <div className="text-sm text-gray-500">
          {datum
            ? new Date(datum).toLocaleString("nl-NL")
            : "-"}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-xl font-bold">
              Taak afronden
            </h2>

            <p className="mb-4">{taak.taak}</p>

            <input
              autoFocus
              type="text"
              value={naam}
              onChange={(e) => setNaam(e.target.value)}
              placeholder="Naam medewerker"
              className="mb-6 w-full rounded-lg border px-4 py-3"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg border px-5 py-2"
              >
                Annuleren
              </button>

              <button
                disabled={opslaan}
                onClick={opslaanTaak}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white"
              >
                Opslaan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}