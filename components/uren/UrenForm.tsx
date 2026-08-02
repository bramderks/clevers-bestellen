"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Props = {
  registratie: {
    id: string;
    geplandeStart: string;
    geplandeEinde: string;
    gewerkteStart: string | null;
    gewerkteEinde: string | null;
    pauze: number;
    opmerking: string | null;
    goedgekeurd: boolean;
  };
};

function tijdNaarMinuten(
  tijd: string
) {
  const [uren, minuten] =
    tijd.split(":").map(Number);

  return uren * 60 + minuten;
}

export default function UrenForm({
  registratie,
}: Props) {
  const router = useRouter();

  const [start, setStart] =
    useState(
      registratie.gewerkteStart ??
        registratie.geplandeStart
    );

  const [einde, setEinde] =
    useState(
      registratie.gewerkteEinde ??
        registratie.geplandeEinde
    );

  const [pauze, setPauze] =
    useState(registratie.pauze);

  const [opmerking, setOpmerking] =
    useState(
      registratie.opmerking ?? ""
    );

  const [goedgekeurd, setGoedgekeurd] =
    useState(
      registratie.goedgekeurd
    );

  const [opslaanBezig, setOpslaanBezig] =
    useState(false);

  const uren = useMemo(() => {
    if (!start || !einde) {
      return 0;
    }

    const minuten =
      tijdNaarMinuten(einde) -
      tijdNaarMinuten(start) -
      pauze;

    return Math.max(
      0,
      minuten / 60
    );
  }, [
    start,
    einde,
    pauze,
  ]);

  async function opslaan() {
    if (opslaanBezig) {
      return;
    }

    setOpslaanBezig(true);

    try {
      const response =
        await fetch(
          `/api/uren/${registratie.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              gewerkteStart:
                start,
              gewerkteEinde:
                einde,
              pauze,
              opmerking,
              goedgekeurd,
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
        "✅ Uren opgeslagen."
      );

      router.refresh();
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
    <div className="space-y-8">

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Werkelijke start
          </label>

          <input
            type="time"
            value={start}
            onChange={(e) =>
              setStart(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Werkelijke einde
          </label>

          <input
            type="time"
            value={einde}
            onChange={(e) =>
              setEinde(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Pauze (minuten)
          </label>

          <input
            type="number"
            min={0}
            value={pauze}
            onChange={(e) =>
              setPauze(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Gewerkte uren
          </label>

          <div className="rounded-xl border bg-slate-100 px-4 py-3 text-lg font-bold">
            {uren.toFixed(2)} uur
          </div>
        </div>

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Opmerking
        </label>

        <textarea
          rows={4}
          value={opmerking}
          onChange={(e) =>
            setOpmerking(
              e.target.value
            )
          }
          className="w-full rounded-xl border px-4 py-3"
        />

      </div>

      <label className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={
            goedgekeurd
          }
          onChange={(e) =>
            setGoedgekeurd(
              e.target.checked
            )
          }
        />

        Uren goedgekeurd

      </label>

      <div className="flex justify-end">

        <button
          type="button"
          onClick={opslaan}
          disabled={
            opslaanBezig
          }
          className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
        >
          {opslaanBezig
            ? "Opslaan..."
            : "💾 Uren opslaan"}
        </button>

      </div>

    </div>
  );
}