"use client";

import { BestelAdvies } from "../lib/bestelEngine";

interface Props {
  advies: BestelAdvies[];
}

export default function BestelAdviesTable({
  advies,
}: Props) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Besteladvies
      </h2>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">
              Artikel
            </th>

            <th className="p-3 text-center">
              Getelde voorraad
            </th>

            <th className="p-3 text-center">
              Buffervoorraad
            </th>

            <th className="p-3 text-center">
              Te bestellen
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

              <td className="text-center font-bold text-green-700 text-lg">
                {regel.bestellen}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}