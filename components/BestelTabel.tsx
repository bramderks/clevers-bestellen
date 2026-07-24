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
      <h3 className="mb-3 text-xl font-semibold">
        {titel}
      </h3>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Product</th>
            <th className="text-right">Geteld</th>
            <th className="text-right">Buffer</th>
            <th className="text-right">Bestellen</th>
          </tr>
        </thead>

        <tbody>
          {regels.map((regel) => (
            <tr
              key={regel.id}
              className="border-b"
            >
              <td className="py-2">
                {regel.naam}
              </td>

              <td className="text-right">
                {regel.geteld}
              </td>

              <td className="text-right">
                {regel.buffer}
              </td>

              <td className="text-right font-bold">
                {regel.bestellen}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-right text-lg font-bold">
        Totaal te bestellen: {totaal}
      </div>
    </div>
  );
}