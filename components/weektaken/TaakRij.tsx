"use client";

import { useState } from "react";

type Props = {
  taak: {
    id: string;
    titel: string;
    categorie: string | null;
    omschrijving: string | null;
    prioriteit: string | null;
    voltooid: boolean;
    naam?: string | null;
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
    if (afgesloten || voltooid) {
      return;
    }

    const naamIngevuld = naam.trim();

    if (!naamIngevuld) {
      alert("Vul je naam in.");
      return;
    }

    setOpslaan(true);

    try {
      const res = await fetch(
        `/api/weektaken/${taak.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            naam: naamIngevuld,
            voltooid: true,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Opslaan mislukt."
        );
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error(
          data.error ??
            "Opslaan mislukt."
        );
      }

      const voltooidOp =
        data.taak?.voltooidOp ??
        new Date().toISOString();

      setVoltooid(true);
      setNaam(naamIngevuld);
      setDatum(voltooidOp);

      onVoltooid?.(
        taak.id,
        naamIngevuld,
        voltooidOp
      );

      setGelukt(true);

      setTimeout(() => {
        setGelukt(false);
        setModalOpen(false);
      }, 700);
    } catch (error) {
      console.error(
        "❌ Fout bij afronden weektaak:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Opslaan is mislukt."
      );
    } finally {
      setOpslaan(false);
    }
  }

  function openModal() {
    if (afgesloten || voltooid) {
      return;
    }

    setGelukt(false);
    setModalOpen(true);
  }

  return (
    <>
      <div
        className={`hidden items-center gap-4 border-b px-4 py-3 transition md:grid md:grid-cols-[80px_1fr_220px_180px] ${
          voltooid
            ? "bg-green-50"
            : "bg-white hover:bg-slate-50"
        }`}
      >
        <div className="text-center">
          <input
            type="checkbox"
            checked={voltooid}
            disabled={
              voltooid || afgesloten
            }
            onChange={openModal}
            className="h-6 w-6 cursor-pointer disabled:cursor-default"
          />
        </div>

        <div className="font-medium">
          {taak.titel}
        </div>

        <div>
          {naam || "-"}
        </div>

        <div className="text-sm text-slate-500">
          {datum
            ? new Date(
                datum
              ).toLocaleString(
                "nl-NL"
              )
            : "-"}
        </div>
      </div>

      <div
        className={`mb-3 rounded-xl border p-4 shadow-sm transition md:hidden ${
          voltooid
            ? "border-green-300 bg-green-50"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex items-start gap-4">
          <input
            type="checkbox"
            checked={voltooid}
            disabled={
              voltooid || afgesloten
            }
            onChange={openModal}
            className="mt-1 h-8 w-8 flex-shrink-0 disabled:cursor-default"
          />

          <div className="flex-1">
            <div className="text-lg font-semibold leading-6">
              {taak.titel}
            </div>

            {taak.omschrijving && (
              <div className="mt-2 text-sm text-slate-500">
                {taak.omschrijving}
              </div>
            )}

            <div className="mt-3 text-sm text-slate-600">
              👤 {naam || "-"}
            </div>

            <div className="mt-1 text-sm text-slate-500">
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

      {modalOpen &&
        !afgesloten && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="mb-2 text-2xl font-bold">
                Taak afronden
              </h2>

              <p className="mb-2 text-lg font-semibold">
                {taak.titel}
              </p>

              {taak.omschrijving && (
                <p className="mb-5 text-sm text-slate-500">
                  {taak.omschrijving}
                </p>
              )}

              {gelukt && (
                <div className="mb-5 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-center font-semibold text-green-700">
                  ✅ Taak succesvol opgeslagen
                </div>
              )}

              <input
                autoFocus
                type="text"
                value={naam}
                onChange={(event) =>
                  setNaam(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (
                    event.key ===
                    "Enter"
                  ) {
                    event.preventDefault();
                    void opslaanTaak();
                  }

                  if (
                    event.key ===
                    "Escape"
                  ) {
                    setModalOpen(false);
                  }
                }}
                placeholder="Naam medewerker"
                className="mb-6 w-full rounded-xl border-2 border-blue-200 px-4 py-4 text-lg transition focus:border-blue-600 focus:outline-none"
                disabled={opslaan}
              />

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setModalOpen(false)
                  }
                  disabled={opslaan}
                  className="rounded-xl border px-6 py-3 font-semibold transition hover:bg-slate-100 disabled:opacity-60"
                >
                  Annuleren
                </button>

                <button
                  type="button"
                  disabled={opslaan}
                  onClick={() =>
                    void opslaanTaak()
                  }
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
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