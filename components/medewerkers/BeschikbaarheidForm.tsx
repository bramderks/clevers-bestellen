"use client";

import { useState } from "react";

type Beschikbaarheid = {
  id?: string;
  weekdag: number;
  beschikbaar: boolean;
  vanaf: string | null;
  tot: string | null;
};

interface Props {
  medewerkerId: string;
  beschikbaarheden: Beschikbaarheid[];
}

const dagen = [
  "Maandag",
  "Dinsdag",
  "Woensdag",
  "Donderdag",
  "Vrijdag",
  "Zaterdag",
  "Zondag",
];

export default function BeschikbaarheidForm({
  medewerkerId,
  beschikbaarheden,
}: Props) {
  const [dagenData, setDagenData] =
    useState(
      dagen.map((_, index) => {
        const bestaand =
          beschikbaarheden.find(
            (b) => b.weekdag === index
          );

        return (
          bestaand ?? {
            weekdag: index,
            beschikbaar: false,
            vanaf: "09:00",
            tot: "18:00",
          }
        );
      })
    );

  const [opslaanBezig, setOpslaanBezig] =
    useState(false);

  function wijzig(
    index: number,
    veld: string,
    waarde: unknown
  ) {
    setDagenData((vorige) =>
      vorige.map((dag, i) =>
        i === index
          ? {
              ...dag,
              [veld]: waarde,
            }
          : dag
      )
    );
  }

  async function opslaan() {
    setOpslaanBezig(true);

    try {
      const response = await fetch(
        `/api/medewerkers/${medewerkerId}/beschikbaarheid`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            beschikbaarheden:
              dagenData,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Opslaan mislukt."
        );
      }

      alert(
        "✅ Beschikbaarheid opgeslagen."
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Er is iets misgegaan."
      );
    } finally {
      setOpslaanBezig(false);
    }
  }

  return (
    <div className="space-y-4">

      {dagenData.map((dag, index) => (
        <div
          key={index}
          className="grid gap-4 rounded-xl border bg-white p-5 md:grid-cols-[180px_140px_1fr_1fr]"
        >
          <div className="font-semibold">
            {dagen[index]}
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                dag.beschikbaar
              }
              onChange={(e) =>
                wijzig(
                  index,
                  "beschikbaar",
                  e.target.checked
                )
              }
            />

            Beschikbaar
          </label>

          <input
            type="time"
            value={
              dag.vanaf ?? "09:00"
            }
            disabled={
              !dag.beschikbaar
            }
            onChange={(e) =>
              wijzig(
                index,
                "vanaf",
                e.target.value
              )
            }
            className="rounded-lg border px-3 py-2"
          />

          <input
            type="time"
            value={
              dag.tot ?? "18:00"
            }
            disabled={
              !dag.beschikbaar
            }
            onChange={(e) =>
              wijzig(
                index,
                "tot",
                e.target.value
              )
            }
            className="rounded-lg border px-3 py-2"
          />
        </div>
      ))}

      <div className="flex justify-end">

        <button
          type="button"
          disabled={
            opslaanBezig
          }
          onClick={opslaan}
          className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
        >
          {opslaanBezig
            ? "Opslaan..."
            : "Beschikbaarheid opslaan"}
        </button>

      </div>

    </div>
  );
}