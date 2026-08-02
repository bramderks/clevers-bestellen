import Link from "next/link";

import TopBar from "@/components/TopBar";
import { prisma } from "@/lib/prisma";

export default async function UrenPagina() {
  const registraties =
    await prisma.uurRegistratie.findMany({
      include: {
        medewerker: true,
        dienst: true,
      },
      orderBy: {
        dienst: {
          datum: "desc",
        },
      },
    });

  const totaal =
    registraties.length;

  const goedgekeurd =
    registraties.filter(
      (r) => r.goedgekeurd
    ).length;

  const open =
    totaal - goedgekeurd;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-7xl">

        <TopBar title="Urenregistratie" />

        <div className="mb-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-blue-700">
              {totaal}
            </div>

            <div className="mt-2 text-gray-500">
              🕒 Registraties
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-green-700">
              {goedgekeurd}
            </div>

            <div className="mt-2 text-gray-500">
              ✅ Goedgekeurd
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-orange-600">
              {open}
            </div>

            <div className="mt-2 text-gray-500">
              ⏳ Openstaand
            </div>
          </div>

        </div>

        {registraties.length === 0 ? (

          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

            <div className="text-6xl">
              ⏱️
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Nog geen urenregistraties
            </h2>

            <p className="mt-3 text-gray-500">
              Zodra diensten zijn ingepland verschijnen hier de uren.
            </p>

          </div>

        ) : (

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

            <div className="hidden grid-cols-[180px_220px_180px_140px_120px] bg-blue-700 px-6 py-4 font-bold text-white md:grid">

              <div>Datum</div>

              <div>Medewerker</div>

              <div>Gepland</div>

              <div>Status</div>

              <div></div>

            </div>

            {registraties.map(
              (registratie) => (
                <div
                  key={registratie.id}
                  className="border-t px-6 py-5 md:grid md:grid-cols-[180px_220px_180px_140px_120px] md:items-center"
                >
                  <div>
                    {registratie.dienst.datum.toLocaleDateString(
                      "nl-NL"
                    )}
                  </div>

                  <div className="mt-2 font-semibold md:mt-0">
                    {registratie.medewerker.naam}
                  </div>

                  <div className="mt-2 md:mt-0">
                    {registratie.geplandeStart}
                    {" - "}
                    {registratie.geplandeEinde}
                  </div>

                  <div className="mt-2 md:mt-0">
                    {registratie.goedgekeurd ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        Goedgekeurd
                      </span>
                    ) : (
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                        Open
                      </span>
                    )}
                  </div>

                  <div className="mt-4 md:mt-0">

                    <Link
                      href={`/uren/${registratie.id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                    >
                      Open
                    </Link>

                  </div>

                </div>
              )
            )}

          </div>

        )}

      </div>
    </main>
  );
}