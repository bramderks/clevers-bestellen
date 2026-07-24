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
  totaalIJs,
  totaalDrooggoed,
  opmerking,
  setOpmerking,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Controle bestelling
      </h2>

      <BestelTabel
        titel="🍦 IJsbestelling"
        regels={ijsBestelling}
        totaal={totaalIJs}
      />

      <BestelTabel
        titel="📦 Drooggoed"
        regels={drooggoedBestelling}
        totaal={totaalDrooggoed}
      />

      <div className="mt-8">
        <label className="mb-2 block font-medium">
          Opmerking
        </label>

        <textarea
          value={opmerking}
          onChange={(e) => setOpmerking(e.target.value)}
          rows={4}
          className="w-full rounded-lg border p-3"
          placeholder="Eventuele opmerkingen..."
        />
      </div>

    </div>
  );
}