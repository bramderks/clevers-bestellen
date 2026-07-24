import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function BestellingDetail({ params }: Props) {
  const { id } = await params;

  const bestelling = await prisma.bestelling.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      regels: true,
    },
  });

  if (!bestelling) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Bestelling niet gevonden
        </h1>

        <Link
          href="/historie"
          className="text-blue-600 underline"
        >
          Terug
        </Link>
      </main>
    );
  }

  const totaal = bestelling.regels.reduce(
    (som, regel) => som + regel.besteld,
    0
  );

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Bestelling #{bestelling.id}
            </h1>

            <p className="text-gray-500">
              {new Date(bestelling.datum).toLocaleDateString("nl-NL")} •{" "}
              {bestelling.vestiging} • {bestelling.type}
            </p>
          </div>

          <Link
            href="/historie"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Terug
          </Link>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b font-semibold">
              <th className="text-left py-3">Product</th>
              <th className="text-right">Geteld</th>
              <th className="text-right">Buffer</th>
              <th className="text-right">Besteld</th>
            </tr>
          </thead>

          <tbody>
            {bestelling.regels.map((regel) => (
              <tr
                key={regel.id}
                className="border-b"
              >
                <td className="py-2">{regel.productNaam}</td>
                <td className="text-right">{regel.geteld}</td>
                <td className="text-right">{regel.buffer}</td>
                <td className="text-right font-semibold">
                  {regel.besteld}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 text-xl font-bold text-right">
          Totaal te bestellen: {totaal}
        </div>

      </div>
    </main>
  );
}