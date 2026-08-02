import Link from "next/link";

import TopBar from "@/components/TopBar";
import { prisma } from "@/lib/prisma";

export default async function DashboardPagina() {
  const [
    bestellingen,
    medewerkers,
    diensten,
    uren,
    openTaken,
    afgerondeTaken,
    actieveDiensten,
    goedgekeurdeUren,
  ] = await Promise.all([
    prisma.bestelling.count(),

    prisma.medewerker.count({
      where: {
        actief: true,
      },
    }),

    prisma.dienst.count(),

    prisma.uurRegistratie.count(),

    prisma.weekTaak.count({
      where: {
        voltooid: false,
      },
    }),

    prisma.weekTaak.count({
      where: {
        voltooid: true,
      },
    }),

    prisma.dienst.count({
      where: {
        datum: {
          gte: new Date(),
        },
      },
    }),

    prisma.uurRegistratie.count({
      where: {
        goedgekeurd: true,
      },
    }),
  ]);

  const totaalTaken =
    openTaken + afgerondeTaken;

  const percentageTaken =
    totaalTaken === 0
      ? 0
      : Math.round(
          (afgerondeTaken /
            totaalTaken) *
            100
        );

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-7xl">

        <TopBar title="Dashboard" />

        <div className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-blue-700">
              {bestellingen}
            </div>

            <div className="mt-2 text-gray-500">
              📦 Bestellingen
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-green-700">
              {medewerkers}
            </div>

            <div className="mt-2 text-gray-500">
              👥 Actieve medewerkers
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-orange-600">
              {diensten}
            </div>

            <div className="mt-2 text-gray-500">
              📅 Diensten
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-purple-700">
              {uren}
            </div>

            <div className="mt-2 text-gray-500">
              🕒 Urenregistraties
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-red-600">
              {openTaken}
            </div>

            <div className="mt-2 text-gray-500">
              ✅ Open weektaken
            </div>
          </div>

        </div>

        <div className="mb-10 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="text-4xl font-bold text-green-600">
              {percentageTaken}%
            </div>

            <div className="mt-2 text-gray-500">
              ✔️ Weektaken voltooid
            </div>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="text-4xl font-bold text-blue-700">
              {actieveDiensten}
            </div>

            <div className="mt-2 text-gray-500">
              📅 Toekomstige diensten
            </div>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="text-4xl font-bold text-purple-700">
              {goedgekeurdeUren}
            </div>

            <div className="mt-2 text-gray-500">
              🕒 Goedgekeurde uren
            </div>

          </div>

        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-2xl font-bold">
              Snel naar
            </h2>

            <div className="grid gap-4">

              <Link
                href="/tellen"
                className="rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                🍦 Nieuwe bestelling
              </Link>

              <Link
                href="/weektaken"
                className="rounded-xl bg-green-600 px-5 py-4 font-semibold text-white transition hover:bg-green-700"
              >
                ✅ Weektaken
              </Link>

              <Link
                href="/rooster/week"
                className="rounded-xl bg-orange-600 px-5 py-4 font-semibold text-white transition hover:bg-orange-700"
              >
                📅 Weekrooster
              </Link>

              <Link
                href="/uren"
                className="rounded-xl bg-purple-600 px-5 py-4 font-semibold text-white transition hover:bg-purple-700"
              >
                🕒 Urenregistratie
              </Link>

            </div>

          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-2xl font-bold">
              Management
            </h2>

            <div className="space-y-4">

              <div className="rounded-xl border p-4">

                <div className="font-semibold">
                  📈 Omzetanalyse
                </div>

                <div className="mt-2 text-sm text-slate-500">
                  Binnenkort beschikbaar
                </div>

              </div>

              <div className="rounded-xl border p-4">

                <div className="font-semibold">
                  💰 Personeelskosten
                </div>

                <div className="mt-2 text-sm text-slate-500">
                  Binnenkort beschikbaar
                </div>

              </div>

              <div className="rounded-xl border p-4">

                <div className="font-semibold">
                  📊 AI Analyse
                </div>

                <div className="mt-2 text-sm text-slate-500">
                  Binnenkort beschikbaar
                </div>

              </div>

              <div className="rounded-xl border p-4">

                <div className="font-semibold">
                  🍦 IJsverbruik
                </div>

                <div className="mt-2 text-sm text-slate-500">
                  Binnenkort beschikbaar
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}