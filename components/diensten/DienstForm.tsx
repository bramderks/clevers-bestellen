"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Medewerker = {
  id: string;
  naam: string;
  vestiging: string;
};

type Dienst = {
  id: string;
  medewerkerId: string;
  datum: string;
  begintijd: string;
  eindtijd: string;
  vestiging: string;
  functie: string;
};

type Props = {
  medewerkers: Medewerker[];
  dienst?: Dienst;
};

export default function DienstForm({
  medewerkers,
  dienst,
}: Props) {
  const router = useRouter();

  const bewerken = !!dienst;

  const [medewerkerId, setMedewerkerId] =
    useState(
      dienst?.medewerkerId ?? ""
    );

  const [datum, setDatum] =
    useState(
      dienst?.datum ?? ""
    );

  const [begintijd, setBegintijd] =
    useState(
      dienst?.begintijd ?? ""
    );

  const [eindtijd, setEindtijd] =
    useState(
      dienst?.eindtijd ?? ""
    );

  const [vestiging, setVestiging] =
    useState(
      dienst?.vestiging ??
        "Nijmegen"
    );

  const [functie, setFunctie] =
    useState(
      dienst?.functie ??
        "Medewerker"
    );

  const [opslaanBezig, setOpslaanBezig] =
    useState(false);

  async function opslaan() {
    if (opslaanBezig) {
      return;
    }

    if (!medewerkerId) {
      alert("Kies een medewerker.");
      return;
    }

    if (!datum) {
      alert("Kies een datum.");
      return;
    }

    if (!begintijd || !eindtijd) {
      alert(
        "Vul begin- en eindtijd in."
      );
      return;
    }

    setOpslaanBezig(true);

    try {
      const response = await fetch(
        bewerken
          ? `/api/diensten/${dienst!.id}`
          : "/api/diensten",
        {
          method: bewerken
            ? "PATCH"
            : "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            medewerkerId,
            datum,
            begintijd,
            eindtijd,
            vestiging,
            functie,
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
        bewerken
          ? "✅ Dienst bijgewerkt."
          : "✅ Dienst opgeslagen."
      );

      router.push("/diensten");
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

  async function verwijderen() {
    if (!dienst) {
      return;
    }

    const akkoord = confirm(
      "Weet je zeker dat je deze dienst wilt verwijderen?"
    );

    if (!akkoord) {
      return;
    }

    try {
      const response = await fetch(
        `/api/diensten/${dienst.id}`,
        {
          method: "DELETE",
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Verwijderen mislukt."
        );
      }

      alert(
        "✅ Dienst verwijderd."
      );

      router.push("/diensten");
      router.refresh();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Er is iets misgegaan."
      );
    }
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        opslaan();
      }}
    >
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Medewerker
          </label>

          <select
            value={medewerkerId}
            onChange={(e) =>
              setMedewerkerId(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          >
            <option value="">
              Kies medewerker...
            </option>

            {medewerkers.map(
              (medewerker) => (
                <option
                  key={medewerker.id}
                  value={
                    medewerker.id
                  }
                >
                  {medewerker.naam}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Vestiging
          </label>

          <select
            value={vestiging}
            onChange={(e) =>
              setVestiging(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          >
            <option>
              Nijmegen
            </option>

            <option>
              Roermond
            </option>
          </select>
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <div>
          <label className="mb-2 block font-medium">
            Datum
          </label>

          <input
            type="date"
            value={datum}
            onChange={(e) =>
              setDatum(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Begintijd
          </label>

          <input
            type="time"
            value={begintijd}
            onChange={(e) =>
              setBegintijd(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Eindtijd
          </label>

          <input
            type="time"
            value={eindtijd}
            onChange={(e) =>
              setEindtijd(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Functie
        </label>

        <input
          type="text"
          value={functie}
          onChange={(e) =>
            setFunctie(
              e.target.value
            )
          }
          className="w-full rounded-xl border px-4 py-3"
        />

      </div>

      <div className="flex justify-between">

        {bewerken ? (
          <button
            type="button"
            onClick={
              verwijderen
            }
            className="rounded-xl bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            🗑 Verwijderen
          </button>
        ) : (
          <div />
        )}

        <button
          type="submit"
          disabled={
            opslaanBezig
          }
          className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
        >
          {opslaanBezig
            ? "Opslaan..."
            : bewerken
            ? "Wijzigingen opslaan"
            : "Dienst opslaan"}
        </button>

      </div>

    </form>
  );
}