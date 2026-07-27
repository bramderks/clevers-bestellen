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
  // IJs alfabetisch
  const gesorteerd = [...ijsBestelling].sort((a, b) =>
    a.naam.localeCompare(b.naam, "nl")
  );

  // Blokken maken
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

  return (
    <div className="rounded-xl border bg-white p-4 md:p-6">
      <h2 className="mb-6 text-xl md:text-2xl font-bold">
        Controle bestelling
      </h2>

      <BestelTabel
        titel="🍦 IJs"
        regels={ijs}
        totaal={ijs.reduce((t, r) => t + r.bestellen, 0)}
      />

      <BestelTabel
        titel="⭐ Speciaalsmaken"
        regels={speciaalsmaken}
        totaal={speciaalsmaken.reduce((t, r) => t + r.bestellen, 0)}
      />

      <BestelTabel
        titel="🥛 Slagroom"
        regels={slagroom}
        totaal={slagroom.reduce((t, r) => t + r.bestellen, 0)}
      />

      <BestelTabel
        titel="📦 Drooggoed"
        regels={drooggoed}
        totaal={drooggoed.reduce((t, r) => t + r.bestellen, 0)}
      />

      <div className="mt-8">
        <label className="mb-2 block font-medium text-sm md:text-base">
          Opmerking
        </label>

        <textarea
          value={opmerking}
          onChange={(e) => setOpmerking(e.target.value)}
          rows={4}
          className="w-full rounded-lg border p-3 text-sm md:text-base resize-y"
          placeholder="Eventuele opmerkingen..."
        />
      </div>
    </div>
  );
}