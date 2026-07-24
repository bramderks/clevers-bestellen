"use client";

import ResultTable from "./ResultTable";
import Opmerkingen from "./Opmerkingen";
import Samenvatting from "./Samenvatting";

import { Artikel } from "../types";

interface Props {
  preview: string;
  artikelen: Artikel[];
  opmerkingen: string[];
  onAantalWijzigen: (id: string, aantal: number) => void;
}

export default function ControleDashboard({
  preview,
  artikelen,
  opmerkingen,
  onAantalWijzigen,
}: Props) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">
        Stap 3 - Controle bestelling
      </h2>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <ResultTable
            artikelen={artikelen}
            onAantalWijzigen={onAantalWijzigen}
          />
        </div>

        <div>
          <div className="rounded-xl border bg-white shadow p-4">
            <h3 className="text-lg font-semibold mb-4">
              Origineel bestelformulier
            </h3>

            <img
              src={preview}
              alt="Bestelformulier"
              className="w-full rounded-lg border"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Opmerkingen opmerkingen={opmerkingen} />
        <Samenvatting artikelen={artikelen} />
      </div>

      <div className="flex justify-end">
        <button
          className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-8
            py-4
            rounded-xl
            font-semibold
            transition
          "
        >
          Bestelling genereren
        </button>
      </div>
    </div>
  );
}