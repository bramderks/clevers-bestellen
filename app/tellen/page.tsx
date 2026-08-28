"use client";

import Link from "next/link";
import { useState } from "react";

import type { Vestiging } from "@/types";

import TopBar from "@/components/TopBar";
import TelForm from "@/components/TelForm";

export default function TellenPagina() {
  const [vestiging, setVestiging] =
    useState<Vestiging | null>(null);

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <TopBar title="Tellen" />

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Voorraad tellen
            </h1>

            <p className="mt-1 text-slate-500">
              Tel de actuele voorraad en bereken de bestelling.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            ← Terug
          </Link>
        </div>

        {!vestiging ? (
          <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
            <div className="mx-auto max-w-xl">
              <h2 className="text-2xl font-bold text-slate-900">
                Kies vestiging
              </h2>

              <p className="mt-2 text-slate-500">
                Kies eerst voor welke vestiging je de voorraad gaat tellen.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setVestiging("roermond")
                  }
                  className="rounded-2xl border-2 border-slate-200 bg-white p-6 text-xl font-bold text-slate-800 shadow-sm transition hover:border-green-500 hover:bg-green-50"
                >
                  Roermond
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setVestiging("nijmegen")
                  }
                  className="rounded-2xl border-2 border-slate-200 bg-white p-6 text-xl font-bold text-slate-800 shadow-sm transition hover:border-green-500 hover:bg-green-50"
                >
                  Nijmegen
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Gekozen vestiging
                </p>

                <p className="text-xl font-bold text-slate-900">
                  {vestiging === "roermond"
                    ? "Roermond"
                    : "Nijmegen"}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setVestiging(null)
                }
                className="rounded-xl border bg-white px-4 py-2 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Andere vestiging
              </button>
            </div>

            <TelForm vestiging={vestiging} />
          </div>
        )}
      </div>
    </main>
  );
}