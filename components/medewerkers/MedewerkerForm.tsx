"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Medewerker = {
  id: string;
  voornaam: string;
  achternaam: string;
  naam: string;
  email: string | null;
  telefoon: string | null;
  vestiging: string;
  kleur: string;
  actief: boolean;
};

interface Props {
  medewerker?: Medewerker;
}

export default function MedewerkerForm({
  medewerker,
}: Props) {
  const router = useRouter();

  const bewerken = !!medewerker;

  const [voornaam, setVoornaam] =
    useState(
      medewerker?.voornaam ?? ""
    );

  const [achternaam, setAchternaam] =
    useState(
      medewerker?.achternaam ?? ""
    );

  const [email, setEmail] =
    useState(
      medewerker?.email ?? ""
    );

  const [telefoon, setTelefoon] =
    useState(
      medewerker?.telefoon ?? ""
    );

  const [vestiging, setVestiging] =
    useState(
      medewerker?.vestiging ??
        "Nijmegen"
    );

  const [kleur, setKleur] =
    useState(
      medewerker?.kleur ??
        "#2563eb"
    );

  const [actief, setActief] =
    useState(
      medewerker?.actief ?? true
    );

  const [opslaanBezig, setOpslaanBezig] =
    useState(false);

  async function opslaan() {
    if (opslaanBezig) return;

    if (!voornaam.trim()) {
      alert("Voornaam is verplicht.");
      return;
    }

    if (!achternaam.trim()) {
      alert("Achternaam is verplicht.");
      return;
    }

    setOpslaanBezig(true);

    try {
      const response = await fetch(
        bewerken
          ? `/api/medewerkers/${medewerker!.id}`
          : "/api/medewerkers",
        {
          method: bewerken
            ? "PATCH"
            : "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            voornaam,
            achternaam,
            email,
            telefoon,
            vestiging,
            kleur,
            actief,
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
          ? "✅ Medewerker bijgewerkt."
          : "✅ Medewerker opgeslagen."
      );

      router.push(
        "/medewerkers"
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
            Voornaam
          </label>

          <input
            type="text"
            value={voornaam}
            onChange={(e) =>
              setVoornaam(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Achternaam
          </label>

          <input
            type="text"
            value={achternaam}
            onChange={(e) =>
              setAchternaam(
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
            E-mailadres
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Telefoon
          </label>

          <input
            type="text"
            value={telefoon}
            onChange={(e) =>
              setTelefoon(
                e.target.value
              )
            }
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
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

        <div>
          <label className="mb-2 block font-medium">
            Kleur
          </label>

          <input
            type="color"
            value={kleur}
            onChange={(e) =>
              setKleur(
                e.target.value
              )
            }
            className="h-12 w-full rounded-xl border"
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={actief}
              onChange={(e) =>
                setActief(
                  e.target.checked
                )
              }
            />

            Actieve medewerker
          </label>
        </div>
      </div>

      <div className="flex justify-end">
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
            : "Opslaan"}
        </button>
      </div>
    </form>
  );
}