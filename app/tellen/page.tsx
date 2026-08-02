"use client";

import { useState } from "react";

import TopBar from "@/components/TopBar";
import TelForm from "@/components/TelForm";
import VestigingSelector from "@/components/VestigingSelector";
import type { Vestiging } from "@/types";

export default function NieuweTelling() {
  const [vestiging, setVestiging] = useState<Vestiging | "">("");

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        <TopBar title="Nieuwe telling" />

        <div className="rounded-2xl bg-white p-5 shadow-xl md:p-8">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            Nieuwe telling
          </h1>

          <p className="mb-6 text-sm text-gray-500 md:mb-8 md:text-base">
            Selecteer eerst de vestiging.
          </p>

          <VestigingSelector
            vestiging={vestiging}
            onChange={(value) => setVestiging(value as Vestiging)}
          />

          {vestiging && (
            <>
              <hr className="my-6 md:my-8" />

              <TelForm vestiging={vestiging} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}