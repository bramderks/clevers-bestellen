import Link from "next/link";
import TopBar from "@/components/TopBar";
import { prisma } from "@/lib/prisma";

export default async function BestellingenHistorie() {
  const bestellingen = await prisma.bestelling.findMany({
    orderBy: {
      datum: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <TopBar title="Historie bestellingen" />

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Bestellingen
          </h1>

          <p className="mt-2 text-gray-500">
            Overzicht van alle opgeslagen bestellingen.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Datum</th>
                <th className="px-6 py-4 text-left">Vestiging</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-right">Bekijken</th>
              </tr>
            </thead>

            <tbody>
              {bestellingen.map((bestelling) => (
                <tr
                  key={bestelling.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    {new Date(bestelling.datum).toLocaleDateString("nl-NL")}
                  </td>

                  <td className="px-6 py-4">
                    {bestelling.vestiging}
                  </td>

                  <td className="px-6 py-4">
                    {bestelling.type}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/historie/bestellingen/${bestelling.id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                      Openen
                    </Link>
                  </td>
                </tr>
              ))}

              {bestellingen.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    Er zijn nog geen bestellingen opgeslagen.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}