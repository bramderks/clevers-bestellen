"use client";

import type { BestelAdvies } from "@/types";

interface Props {
  advies: BestelAdvies[];
}

export default function BestelAdviesTable({
  advies,
}: Props) {
  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">
        Besteladvies
      </h2>

      <table className="w-full overflow-hidden rounded-lg border border-gray-300">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">
              Artikel
            </th>

            <th className="p-3 text-center">
              Geteld
            </th>

            <th className="p-3 text-center">
              Buffer
            </th>

            <th className="p-3 text-center">
              Bestellen
            </th>
          </tr>
        </thead>

        <tbody>
          {advies.map((regel) => (
            <tr
              key={regel.id}
              className="border-t even:bg-slate-50"
            >
              <td className="p-3">
                {regel.naam}
              </td>

              <td className="text-center">
                {regel.geteld}
              </td>

              <td className="text-center">
                {regel.buffer}
              </td>

              <td className="text-center text-lg font-bold text-green-700">
                {regel.bestellen}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}