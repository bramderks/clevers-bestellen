"use client";

import type { Vestiging } from "@/types";

interface Props {
  vestiging: Vestiging | "";
  onChange: (
    vestiging: Vestiging
  ) => void;
}

const VESTIGINGEN: {
  waarde: Vestiging;
  titel: string;
  omschrijving: string;
}[] = [
  {
    waarde: "nijmegen",
    titel: "Nijmegen",
    omschrijving:
      "Clevers Nijmegen",
  },
  {
    waarde: "roermond",
    titel: "Roermond",
    omschrijving:
      "Clevers Roermond",
  },
];

export default function VestigingSelector({
  vestiging,
  onChange,
}: Props) {
  return (
    <section className="mb-8">

      <h2 className="mb-4 text-xl font-semibold">
        Stap 1 · Kies vestiging
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">

        {VESTIGINGEN.map(
          (item) => {
            const actief =
              vestiging ===
              item.waarde;

            return (
              <label
                key={
                  item.waarde
                }
                className={`cursor-pointer rounded-2xl border-2 p-5 transition ${
                  actief
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="vestiging"
                  value={
                    item.waarde
                  }
                  checked={
                    actief
                  }
                  onChange={() =>
                    onChange(
                      item.waarde
                    )
                  }
                  className="sr-only"
                />

                <div className="flex items-center gap-4">

                  <span className="text-3xl">
                    🍦
                  </span>

                  <div>

                    <div className="text-lg font-bold">
                      {item.titel}
                    </div>

                    <div className="text-sm text-slate-500">
                      {
                        item.omschrijving
                      }
                    </div>

                  </div>

                </div>

              </label>
            );
          }
        )}

      </div>

    </section>
  );
}