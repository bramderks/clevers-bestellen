import { Artikel } from "../types";
import { producten } from "../data/producten";

interface Props {
  artikelen: Artikel[];
}

export default function Samenvatting({ artikelen }: Props) {
  const totaal = artikelen.length;

  const ijs = artikelen.filter((artikel) => {
    const product = producten.find(
      (p) => p.id === artikel.id
    );

    return product?.categorie === "ijs";
  }).length;

  const drooggoed = artikelen.filter((artikel) => {
    const product = producten.find(
      (p) => p.id === artikel.id
    );

    return product?.categorie === "drooggoed";
  }).length;

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h3 className="text-lg font-semibold mb-4">
        Samenvatting
      </h3>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="rounded-lg bg-slate-100 p-4">
          <div className="text-3xl font-bold">
            {totaal}
          </div>
          <div className="text-sm text-gray-600">
            Artikelen
          </div>
        </div>

        <div className="rounded-lg bg-green-100 p-4">
          <div className="text-3xl font-bold">
            {ijs}
          </div>
          <div className="text-sm text-gray-600">
            IJsproducten
          </div>
        </div>

        <div className="rounded-lg bg-blue-100 p-4">
          <div className="text-3xl font-bold">
            {drooggoed}
          </div>
          <div className="text-sm text-gray-600">
            Drooggoed
          </div>
        </div>
      </div>
    </div>
  );
}