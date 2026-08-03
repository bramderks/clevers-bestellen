interface BestelAdvies {
  id: string;
  naam: string;
  geteld: number;
  buffer: number;
  bestellen: number;
}

interface Props {
  titel: string;
  regels: BestelAdvies[];
  totaal: number;
}

export default function BestelTabel({
  titel,
  regels,
  totaal,
}: Props) {
  if (regels.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold md:text-xl">
          {titel}
        </h3>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
          {totaal} te bestellen
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm md:text-base">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left">
                  Product
                </th>

                <th className="w-24 px-4 py-3 text-right">
                  Geteld
                </th>

                <th className="w-24 px-4 py-3 text-right">
                  Buffer
                </th>

                <th className="w-28 px-4 py-3 text-right">
                  Bestellen
                </th>
              </tr>
            </thead>

            <tbody>
              {regels.map((regel) => (
                <tr
                  key={regel.id}
                  className="border-t transition hover:bg-slate-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {regel.naam}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {regel.geteld}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {regel.buffer}
                  </td>

                  <td className="px-4 py-3 text-right font-bold text-blue-700">
                    {regel.bestellen}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="border-t bg-slate-50">
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-3 text-right font-semibold"
                >
                  Totaal
                </td>

                <td className="px-4 py-3 text-right text-lg font-bold text-blue-700">
                  {totaal}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}