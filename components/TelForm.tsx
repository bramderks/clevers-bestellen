"use client";

import { useMemo, useState } from "react";

import TelCategorie from "./TelCategorie";
import { producten } from "@/data/producten";
import { berekenBestelling } from "@/lib/bestelEngine";
import { genereerDrooggoedPdf, genereerIJsPdf } from "@/lib/genereerPdf";
import { useRouter } from "next/navigation";
import ControlePagina from "./ControlePagina";
import SpeciaalsmakenTeller from "./SpeciaalsmakenTeller";

interface Props {
  vestiging: string;
}

const STAPPEN = [
  { key: "hardlopers", titel: "Hardlopers" },
  { key: "middenlopers", titel: "Middenlopers" },
  { key: "zachtlopers", titel: "Zachtlopers" },
  { key: "speciaalsmaken", titel: "Speciaalsmaken" },
  { key: "drooggoed", titel: "Drooggoed" },
] as const;

export default function TelForm({ vestiging }: Props) {
    const router = useRouter();
  const [telling, setTelling] = useState<Record<string, number>>({});
  const [stap, setStap] = useState(0);
const [opmerking, setOpmerking] = useState("");
const [medewerker, setMedewerker] = useState("");

  function wijzig(id: string, waarde: number) {
    setTelling((vorige) => ({
      ...vorige,
      [id]: waarde,
    }));
  }

  const artikelen = useMemo(
    () =>
      producten.map((p) => ({
        id: p.id,
        naam: p.naam,
        aantal: telling[p.id] ?? 0,
      })),
    [telling]
  );

  const advies = useMemo(
    () => berekenBestelling(artikelen, producten),
    [artikelen]
  );

  const controleStap = stap === STAPPEN.length;

  const huidigeStap = controleStap ? null : STAPPEN[stap];

 const huidigeProducten = controleStap
  
  ? []
  : producten.filter(
      (p) =>
        p.telCategorie === huidigeStap!.key &&
        p.id !== "speciaalsmaken"
    );
console.log("Stap:", huidigeStap?.key);
console.log("Producten:", huidigeProducten);
console.log(huidigeProducten);

const ijsBestelling = advies
  .filter((a) => a.bestelGroep === "ijs")
  .sort((a, b) => a.naam.localeCompare(b.naam));

const drooggoedBestelling = advies
  .filter((a) => a.bestelGroep === "drooggoed")
  .sort((a, b) => a.naam.localeCompare(b.naam));

const totaalIJs = ijsBestelling.reduce(
  (t, r) => t + r.bestellen,
  0
);

const totaalDrooggoed = drooggoedBestelling.reduce(
  (t, r) => t + r.bestellen,
  0
);

  function volgende() {
    if (stap < STAPPEN.length) {
      setStap((s) => s + 1);
    }
  }

  function vorige() {
    if (stap > 0) {
      setStap((s) => s - 1);
    }
  }

async function opslaan() {
  console.log("🚀 Opslaan gestart");

  if (!medewerker.trim()) {
    alert("Vul de naam van de medewerker in.");
    return;
  }

  console.log("🚀 Opslaan gestart");

  try {
      const regels = advies.map((r) => ({
      productId: r.id,
      productNaam: r.naam,
      geteld: r.geteld,
      buffer: r.buffer,
      besteld: r.bestellen,
      bestelGroep: r.bestelGroep,
    }));

    const response = await fetch("/api/bestelling", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
body: JSON.stringify({
  datum: new Date().toISOString(),
  vestiging,
  medewerker,
  type: "telling",
  opmerking,
  regels,
}),
    });

const result = await response.json();

console.log("API RESPONSE:", result);

if (!response.ok) {
  throw new Error(result.error ?? "Opslaan mislukt");
}

    genereerIJsPdf({
      vestiging,
      datum: new Date().toISOString(),
      bestelling: advies,
    });

    genereerDrooggoedPdf({
      vestiging,
      datum: new Date().toISOString(),
      bestelling: advies,
    });

alert("✅ Bestelling succesvol opgeslagen.");
window.location.href = "/historie";

  } catch (error) {
    console.error(error);
    alert("❌ Er is iets misgegaan bij het opslaan.");
  }
}

 return (
  <div className="space-y-6">
    <div className="rounded-xl border bg-blue-50 p-4 md:p-5">
      <div className="text-sm text-gray-600 break-words">
        Vestiging: <strong>{vestiging}</strong>
      </div>
      <div className="mt-4">
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Naam medewerker
  </label>

  <input
    type="text"
    value={medewerker}
    onChange={(e) => setMedewerker(e.target.value)}
    placeholder="Bijvoorbeeld Bram"
    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
  />
</div>

      {!controleStap && (
        <>
          <div className="mt-2 text-sm">
            Stap <strong>{stap + 1}</strong> van{" "}
            <strong>{STAPPEN.length}</strong>
          </div>

          <div className="mt-3 h-3 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-3 rounded-full bg-blue-600 transition-all"
              style={{
                width: `${((stap + 1) / STAPPEN.length) * 100}%`,
              }}
            />
          </div>
        </>
      )}
    </div>

    {!controleStap ? (
      huidigeStap?.key === "speciaalsmaken" ? (
        <SpeciaalsmakenTeller
          waarde={telling.speciaalsmaken ?? 0}
          onChange={(v) => wijzig("speciaalsmaken", v)}
          slagroom={telling.slagroom ?? 0}
          onSlagroomChange={(v) => wijzig("slagroom", v)}
        />
      ) : (
        <TelCategorie
          titel={huidigeStap!.titel}
          producten={huidigeProducten}
          telling={telling}
          onChange={wijzig}
        />
      )
    ) : (
      <ControlePagina
        ijsBestelling={ijsBestelling}
        drooggoedBestelling={drooggoedBestelling}
        totaalIJs={totaalIJs}
        totaalDrooggoed={totaalDrooggoed}
        opmerking={opmerking}
        setOpmerking={setOpmerking}
      />
    )}

    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
      <button
        onClick={vorige}
        disabled={stap === 0}
        className="w-full sm:w-auto rounded-lg bg-gray-300 px-6 py-3 disabled:opacity-40"
      >
        ← Vorige
      </button>

      {!controleStap ? (
        <button
          onClick={volgende}
          className={`w-full sm:w-auto rounded-lg px-6 py-3 text-white ${
            stap === STAPPEN.length - 1
              ? "bg-green-600"
              : "bg-blue-600"
          }`}
        >
          {stap === STAPPEN.length - 1
            ? "Naar controle"
            : "Volgende →"}
        </button>
      ) : (
        <button
          onClick={opslaan}
          className="w-full sm:w-auto rounded-lg bg-emerald-700 px-6 py-3 text-white"
        >
          Opslaan + PDF
        </button>
      )}
    </div>
  </div>
);
}