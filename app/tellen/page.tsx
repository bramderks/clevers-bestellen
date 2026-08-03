"use client";

import { useState } from "react";

import type { Vestiging } from "@/types";

import TopBar from "@/components/TopBar";
import TelForm from "@/components/TelForm";
import VestigingSelector from "@/components/VestigingSelector";

export default function NieuweTelling() {
  const [vestiging, setVestiging] =
    useState<Vestiging | null>(
      null
    );

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:py-10">

      <div className="mx-auto max-w-6xl">

        <TopBar
          title="Nieuwe telling"
        />

        <section className="rounded-2xl bg-white p-6 shadow-xl md:p-8">

          <header className="mb-8">

            <h1 className="text-4xl font-bold">
              Nieuwe telling
            </h1>

            <p className="mt-2 text-slate-500">
              Selecteer eerst de vestiging en vul daarna de telling in.
            </p>

          </header>

          <VestigingSelector
            vestiging={vestiging ?? ""}
            onChange={(waarde) =>
              setVestiging(
                waarde as Vestiging
              )
            }
          />

          {vestiging && (
            <>
              <hr className="my-8" />

              <TelForm
                vestiging={vestiging}
              />
            </>
          )}

        </section>

      </div>

    </main>
  );
}