"use client";

import { Artikel } from "../types";

interface ResultTableProps {
  artikelen: Artikel[];
  onAantalWijzigen: (id: string, aantal: number) => void;
}

export default function ResultTable({
  artikelen,
  onAantalWijzigen,
}: ResultTableProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mt-10 mb-4">
        Controleer de uitgelezen aantallen
      </h2>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">
              Smaak / Artikel
            </th>

            <th className="border p-2 text-center w-40">
              Bestelhoeveelheid
            </th>
          </tr>
        </thead>

        <tbody>
          {artikelen
            .slice()
            .sort((a, b) => a.naam.localeCompare(b.naam, "nl"))
            .map((artikel) => (
              <tr key={artikel.id}>
                <td className="border p-2">
                  {artikel.naam}
                </td>

                <td className="border p-2 text-center">
                  <input
                    type="number"
                    min={0}
                    value={artikel.aantal}
                    onChange={(e) =>
                      onAantalWijzigen(
                        artikel.id,
                        Number(e.target.value)
                      )
                    }
                    className="w-20 border rounded px-2 py-1 text-center"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}