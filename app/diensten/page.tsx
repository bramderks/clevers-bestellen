import Link from "next/link";

import TopBar from "@/components/TopBar";
import { prisma } from "@/lib/prisma";

export default async function DienstenPagina() {
  const diensten =
    await prisma.dienst.findMany({
      include: {
        medewerker: true,
      },
      orderBy: [
        {
          datum: "desc",
        },
        {
          begintijd: "asc",
        },
      ],
    });

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-7xl">

        <TopBar title="Diensten" />

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              Diensten
            </h2>

            <p className="mt-2 text-gray-500">
              Overzicht van alle ingeplande diensten.
            </p>
          </div>

          <Link
            href="/diensten/nieuw"
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            ➕ Nieuwe dienst
          </Link>

        </div>

        {diensten.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

            <div className="text-6xl">
              📅
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Nog geen diensten
            </h3>

            <p className="mt-3 text-gray-500">
              Maak de eerste dienst aan.
            </p>

          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

            <div className="hidden grid-cols-[180px_220px_180px_140px_120px] bg-blue-700 px-6 py-4 font-bold text-white md:grid">

              <div>Datum</div>

              <div>Medewerker</div>

              <div>Tijd</div>

              <div>Vestiging</div>

              <div></div>

            </div>

            {diensten.map((dienst) => (
              <div
                key={dienst.id}
                className="border-t px-6 py-5 md:grid md:grid-cols-[180px_220px_180px_140px_120px] md:items-center"
              >
                <div>
                  {dienst.datum.toLocaleDateString(
                    "nl-NL"
                  )}
                </div>

                <div className="mt-2 font-semibold md:mt-0">
                  {dienst.medewerker.naam}
                </div>

                <div className="mt-2 md:mt-0">
                  {dienst.begintijd} - {dienst.eindtijd}
                </div>

                <div className="mt-2 md:mt-0">
                  {dienst.vestiging}
                </div>

                <div className="mt-4 md:mt-0">

                  <Link
                    href={`/diensten/${dienst.id}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Open
                  </Link>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}