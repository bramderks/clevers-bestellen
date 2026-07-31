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

  afgesloten: boolean;

  onVoltooid?: (
    id: string,
    naam: string,
    datum: string
  ) => void;
};

export default function TaakRij({
  taak,
  afgesloten,
  onVoltooid,
}: Props) {
  const [voltooid, setVoltooid] =
    useState(taak.voltooid);

  const [naam, setNaam] = useState(
    taak.naam ?? ""
  );

  const [datum, setDatum] = useState(
    taak.voltooidOp
  );

  const [modalOpen, setModalOpen] =
    useState(false);

  const [opslaan, setOpslaan] =
    useState(false);

  const [gelukt, setGelukt] =
    useState(false);

  async function opslaanTaak() {
    if (afgesloten) return;

    if (!naam.trim()) {
      alert("Vul je naam in.");
      return;
    }

    setOpslaan(true);

    const res = await fetch(
      `/api/weektaken/${taak.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          naam,
          voltooid: true,
        }),
      }
    );

    if (!res.ok) {
      alert(
        "Opslaan is mislukt."
      );
      setOpslaan(false);
      return;
    }

    const data = await res.json();

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
      <div
        className={`hidden md:grid grid-cols-[80px_1fr_220px_180px] items-center gap-4 border-b px-4 py-3 transition ${
          voltooid
            ? "bg-green-50"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        <div className="text-center">
          <input
            type="checkbox"
            checked={voltooid}
            disabled={
              voltooid || afgesloten
            }
            onChange={() => {
              if (
                voltooid ||
                afgesloten
              )
                return;

              setModalOpen(true);
            }}
            className="h-6 w-6 cursor-pointer"
          />
        </div>

        <div className="font-medium">
          {taak.taak}
        </div>

        <div>{naam || "-"}</div>

        <div className="text-sm text-gray-500">
          {datum
            ? new Date(
                datum
              ).toLocaleString("nl-NL")
            : "-"}
        </div>
      </div>

      <div
        className={`mb-3 rounded-xl border p-4 shadow-sm transition md:hidden ${
          voltooid
            ? "border-green-300 bg-green-50"
            : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            checked={voltooid}
            disabled={
              voltooid || afgesloten
            }
            onChange={() => {
              if (
                voltooid ||
                afgesloten
              )
                return;

              setModalOpen(true);
            }}
            className="mt-1 h-8 w-8 flex-shrink-0"
          />

          <div className="flex-1">
            <div className="text-lg font-semibold leading-6">
              {taak.taak}
            </div>

            <div className="mt-3 text-sm text-gray-600">
              👤 {naam || "-"}
            </div>

            <div className="mt-1 text-sm text-gray-500">
              📅{" "}
              {datum
                ? new Date(
                    datum
                  ).toLocaleString(
                    "nl-NL"
                  )
                : "-"}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && !afgesloten && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-2xl font-bold">
              Taak afronden
            </h2>

            <p className="mb-5 text-gray-700">
              {taak.taak}
            </p>

            {gelukt && (
              <div className="mb-5 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-center font-semibold text-green-700">
                ✅ Taak succesvol opgeslagen
              </div>
            )}

            <input
              autoFocus
              type="text"
              value={naam}
              onChange={(e) =>
                setNaam(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter"
                ) {
                  opslaanTaak();
                }

                if (
                  e.key ===
                  "Escape"
                ) {
                  setModalOpen(false);
                }
              }}
              placeholder="Naam medewerker"
              className="mb-6 w-full rounded-xl border-2 border-blue-200 px-4 py-4 text-lg outline-none transition focus:border-blue-600"
            />

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() =>
                  setModalOpen(
                    false
                  )
                }
                className="rounded-xl border px-6 py-3 font-semibold transition hover:bg-gray-100"
              >
                Annuleren
              </button>

              <button
                disabled={opslaan}
                onClick={
                  opslaanTaak
                }
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {opslaan
                  ? "Opslaan..."
                  : "Opslaan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}