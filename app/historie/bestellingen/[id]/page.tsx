import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function BestellingDetail({
  params,
}: Readonly<Props>) {
  const { id } = await params;

  const bestelling = await prisma.bestelling.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      regels: true,
      vestiging: true,
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

  const vestigingNaam =
    bestelling.vestigingSnapshot ??
    bestelling.vestiging?.naam ??
    "-";

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Bestelling #{bestelling.id}
            </h1>

            <p className="text-gray-500">
              {new Date(bestelling.datum).toLocaleDateString("nl-NL")} •{" "}
              {vestigingNaam} • {bestelling.type}
            </p>
          </div>

          <Link
            href="/historie"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            Terug
          </Link>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b font-semibold">
              <th className="py-3 text-left">
                Product
              </th>
              <th className="text-right">
                Geteld
              </th>
              <th className="text-right">
                Buffer
              </th>
              <th className="text-right">
                Besteld
              </th>
            </tr>
          </thead>

          <tbody>
            {bestelling.regels.map((regel) => (
              <tr
                key={regel.id}
                className="border-b"
              >
                <td className="py-2">
                  {regel.productNaam}
                </td>

                <td className="text-right">
                  {regel.geteld}
                </td>

                <td className="text-right">
                  {regel.buffer}
                </td>

                <td className="text-right font-semibold">
                  {regel.besteld}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 text-right text-xl font-bold">
          Totaal te bestellen: {totaal}
        </div>
      </div>
    </main>
  );
}