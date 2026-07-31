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

  onVoltooid?: (id: string, naam: string, datum: string) => void;
};

export default function TaakRij({
  taak,
  onVoltooid,
}: Props) {
  const [voltooid, setVoltooid] = useState(taak.voltooid);
  const [naam, setNaam] = useState(taak.naam ?? "");
  const [datum, setDatum] = useState(taak.voltooidOp);
  const [modalOpen, setModalOpen] = useState(false);
const [opslaan, setOpslaan] = useState(false);
const [gelukt, setGelukt] = useState(false);

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

onVoltooid?.(
  taak.id,
  naam,
  data.voltooidOp
);

setGelukt(true);

setTimeout(() => {
  setGelukt(false);
  setModalOpen(false);
  setOpslaan(false);
}, 700);
  }

  return (
    <>
      {/* Desktop */}
      <div
        className={`hidden md:grid grid-cols-[80px_1fr_220px_180px] items-center gap-4 border-b px-4 py-3 transition ${
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
        className={`mb-3 rounded-xl border p-4 shadow-sm md:hidden transition ${
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
<div
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
  onClick={() => setModalOpen(false)}
>
<div
  className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
  onClick={(e) => e.stopPropagation()}
>
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  opslaanTaak();
                }

                if (e.key === "Escape") {
                  setModalOpen(false);
                }
              }}
              placeholder="Naam medewerker"
              className="mb-6 w-full rounded-xl border-2 border-blue-200 px-4 py-4 text-lg outline-none transition focus:border-blue-600"
            />

{gelukt && (
  <div className="mb-5 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-center font-semibold text-green-700">
    ✅ Taak succesvol opgeslagen
  </div>
)}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-xl border px-6 py-3 font-semibold transition hover:bg-gray-100"
              >
                Annuleren
              </button>

              <button
                type="button"
                disabled={opslaan}
                onClick={opslaanTaak}
                className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
<>
  {opslaan && (
    <svg
      className="mr-2 inline h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />

      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  )}

  {opslaan ? "Opslaan..." : "Opslaan"}
</>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}