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
      {/* Desktop */}
      <div
        className={`hidden md:grid grid-cols-[80px_1fr_220px_180px] items-center gap-4 border-b px-4 py-3 ${
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
            className="h-6 w-6 cursor-pointer"
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

      {/* Mobiel */}
      <div
        className={`md:hidden mb-3 rounded-xl border p-4 shadow-sm ${
          voltooid
            ? "border-green-300 bg-green-50"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            checked={voltooid}
            disabled={voltooid}
            onChange={() => {
              setNaam(localStorage.getItem("weektakenNaam") ?? "");
              setModalOpen(true);
            }}
            className="mt-1 h-8 w-8 flex-shrink-0 cursor-pointer"
          />

          <div className="flex-1">
            <div className="text-lg font-semibold leading-6">
              {taak.taak}
            </div>

            <div className="mt-3 text-sm text-gray-600">
              👤 {naam || "Nog niet ingevuld"}
            </div>

            <div className="mt-1 text-sm text-gray-500">
              📅{" "}
              {datum
                ? new Date(datum).toLocaleString("nl-NL")
                : "-"}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-2xl font-bold">
              Taak afronden
            </h2>

            <p className="mb-5 text-gray-700">
              {taak.taak}
            </p>

            <input
              autoFocus
              type="text"
              value={naam}
              onChange={(e) => setNaam(e.target.value)}
              placeholder="Naam medewerker"
              className="mb-6 w-full rounded-lg border px-4 py-3 text-lg"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg border px-5 py-3"
              >
                Annuleren
              </button>

              <button
                disabled={opslaan}
                onClick={opslaanTaak}
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
              >
                {opslaan ? "Opslaan..." : "Opslaan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}