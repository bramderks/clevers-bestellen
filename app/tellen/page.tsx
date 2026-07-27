"use client";

import { useState } from "react";

import VestigingSelector from "@/components/VestigingSelector";
import TelForm from "@/components/TelForm";
import type { Vestiging } from "@/types";

export default function NieuweTelling() {
  const [vestiging, setVestiging] = useState<Vestiging | "">("");

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-5 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Nieuwe telling
          </h1>

          <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base">
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