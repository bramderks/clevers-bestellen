import { BestelAdvies } from "@/lib/bestelEngine";

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
  return (
    <div className="mb-10">
      <h3 className="mb-3 text-lg md:text-xl font-semibold">
        {titel}
      </h3>

      <div className="overflow-x-auto">
<table className="w-full table-fixed border-collapse text-sm md:text-base">
<thead>
  <tr className="border-b">
    <th className="w-1/2 py-2 text-left">Product</th>
    <th className="w-1/6 py-2 text-right">Geteld</th>
    <th className="w-1/6 py-2 text-right">Buffer</th>
    <th className="w-1/6 py-2 text-right">Bestellen</th>
  </tr>
</thead>

          <tbody>
            {regels.map((regel) => (
              <tr
                key={regel.id}
                className="border-b"
              >
<td className="py-2 pr-4">
  {regel.naam}
</td>

<td className="py-2 text-right">
  {regel.geteld}
</td>

                <td className="py-2 text-right">
                  {regel.buffer}
                </td>

                <td className="py-2 text-right font-bold">
                  {regel.bestellen}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right text-base md:text-lg font-bold">
        Totaal te bestellen: {totaal}
      </div>
    </div>
  );
}