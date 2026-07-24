import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HistoriePagina() {
  const bestellingen = await prisma.bestelling.findMany({
    include: {
      regels: true,
    },
    orderBy: {
      datum: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Bestelhistorie
          </h1>

          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            Terug
          </Link>
        </div>

        {bestellingen.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Er zijn nog geen bestellingen opgeslagen.
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Datum</th>
                <th className="text-left">Vestiging</th>
                <th className="text-left">Type</th>
                <th className="text-right">Regels</th>
              </tr>
            </thead>

            <tbody>
              {bestellingen.map((bestelling) => (
                <tr
                  key={bestelling.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="py-3">
                    <Link
                      href={`/historie/${bestelling.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {new Date(bestelling.datum).toLocaleDateString("nl-NL")}
                    </Link>
                  </td>

                  <td>{bestelling.vestiging}</td>

                  <td className="capitalize">
                    {bestelling.type}
                  </td>

                  <td className="text-right">
                    {bestelling.regels.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}