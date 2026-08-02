import BestelTabel from "./BestelTabel";
import { BestelAdvies } from "@/lib/bestelEngine";

interface Props {
  ijsBestelling: BestelAdvies[];
  drooggoedBestelling: BestelAdvies[];
  totaalIJs: number;
  totaalDrooggoed: number;
  opmerking: string;
  setOpmerking: (waarde: string) => void;
}

export default function ControlePagina({
  ijsBestelling,
  drooggoedBestelling,
  opmerking,
  setOpmerking,
}: Props) {
  const gesorteerd = [...ijsBestelling].sort((a, b) =>
    a.naam.localeCompare(b.naam, "nl")
  );

  const speciaalsmaken = gesorteerd.filter(
    (r) => r.id === "speciaalsmaken"
  );

  const ijs = gesorteerd.filter(
    (r) => r.id !== "speciaalsmaken"
  );

  const slagroom = drooggoedBestelling.filter(
    (r) => r.id === "slagroom"
  );

  const drooggoed = drooggoedBestelling
    .filter((r) => r.id !== "slagroom")
    .sort((a, b) => a.naam.localeCompare(b.naam, "nl"));

  const totaalIJsBestelling = ijs.reduce(
    (t, r) => t + r.bestellen,
    0
  );

  const totaalSpeciaalsmaken = speciaalsmaken.reduce(
    (t, r) => t + r.bestellen,
    0
  );

  const totaalSlagroom = slagroom.reduce(
    (t, r) => t + r.bestellen,
    0
  );

  const totaalDrooggoedBestelling = drooggoed.reduce(
    (t, r) => t + r.bestellen,
    0
  );

  const totaalBestelling =
    totaalIJsBestelling +
    totaalSpeciaalsmaken +
    totaalSlagroom +
    totaalDrooggoedBestelling;

  return (
    <div className="rounded-xl border bg-white p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold md:text-2xl">
            Controle bestelling
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Controleer de bestelling voordat deze wordt opgeslagen.
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 px-5 py-3 text-center">
          <div className="text-sm text-gray-500">
            Totaal te bestellen
          </div>

          <div className="text-3xl font-bold text-blue-700">
            {totaalBestelling}
          </div>
        </div>
      </div>

      {totaalBestelling === 0 && (
        <div className="mb-6 rounded-xl border border-orange-200 bg-orange-50 p-4 text-orange-700">
          ⚠️ Er worden geen producten besteld.
        </div>
      )}

      <BestelTabel
        titel="🍦 IJs"
        regels={ijs}
        totaal={totaalIJsBestelling}
      />

      <BestelTabel
        titel="⭐ Speciaalsmaken"
        regels={speciaalsmaken}
        totaal={totaalSpeciaalsmaken}
      />

      <BestelTabel
        titel="🥛 Slagroom"
        regels={slagroom}
        totaal={totaalSlagroom}
      />

      <BestelTabel
        titel="📦 Drooggoed"
        regels={drooggoed}
        totaal={totaalDrooggoedBestelling}
      />

      <div className="mt-8">
        <label className="mb-2 block text-sm font-medium md:text-base">
          Opmerking
        </label>

        <textarea
          value={opmerking}
          onChange={(e) => setOpmerking(e.target.value)}
          rows={4}
          className="w-full resize-y rounded-lg border p-3 text-sm md:text-base"
          placeholder="Eventuele opmerkingen..."
        />
      </div>
    </div>
  );
}