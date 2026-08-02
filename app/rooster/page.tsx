import Link from "next/link";

import TopBar from "@/components/TopBar";
import { prisma } from "@/lib/prisma";

export default async function RoosterPagina() {
  const medewerkers =
    await prisma.medewerker.count({
      where: {
        actief: true,
      },
    });

  const diensten =
    await prisma.dienst.count();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-7xl">

        <TopBar title="Roosterplanner" />

        <div className="mb-8 grid gap-4 md:grid-cols-2">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-blue-700">
              {medewerkers}
            </div>

            <div className="mt-2 text-gray-500">
              👥 Actieve medewerkers
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-green-700">
              {diensten}
            </div>

            <div className="mt-2 text-gray-500">
              📅 Ingeplande diensten
            </div>
          </div>

        </div>

        <div className="rounded-2xl bg-white p-10 shadow-sm">

          <h2 className="text-3xl font-bold">
            Roosterplanner
          </h2>

          <p className="mt-3 text-gray-500">
            Deze module wordt gebruikt om medewerkers automatisch
            in te plannen op basis van beschikbaarheid,
            vestiging en openingstijden.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            <Link
              href="/rooster/week"
              className="rounded-xl border bg-slate-50 p-6 transition hover:bg-slate-100"
            >
              <div className="text-4xl">
                📅
              </div>

              <h3 className="mt-4 text-xl font-bold">
                Weekrooster
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Bekijk en plan een volledige week.
              </p>
            </Link>

            <Link
              href="/diensten"
              className="rounded-xl border bg-slate-50 p-6 transition hover:bg-slate-100"
            >
              <div className="text-4xl">
                ⏰
              </div>

              <h3 className="mt-4 text-xl font-bold">
                Diensten
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Beheer alle diensten.
              </p>
            </Link>

            <Link
              href="/uren"
              className="rounded-xl border bg-slate-50 p-6 transition hover:bg-slate-100"
            >
              <div className="text-4xl">
                💶
              </div>

              <h3 className="mt-4 text-xl font-bold">
                Urenregistratie
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Controleer gewerkte uren en kosten.
              </p>
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}