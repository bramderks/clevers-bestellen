import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { APP } from "@/lib/app";

export default async function DashboardPagina() {
  const [
    bestellingen,
    medewerkers,
    vestigingen,
    openWeken,
  ] = await Promise.all([
    prisma.bestelling.count(),
    prisma.medewerker.count({
      where: {
        actief: true,
      },
    }),
    prisma.vestiging.count({
      where: {
        actief: true,
      },
    }),
    prisma.week.count({
      where: {
        afgesloten: false,
      },
    }),
  ]);

  const kaarten = [
    {
      titel: "Bestellingen",
      waarde: bestellingen,
      icoon: "📦",
    },
    {
      titel: "Medewerkers",
      waarde: medewerkers,
      icoon: "👥",
    },
    {
      titel: "Vestigingen",
      waarde: vestigingen,
      icoon: "🏪",
    },
    {
      titel: "Open weken",
      waarde: openWeken,
      icoon: "📅",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100">

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-3xl font-bold">
              Dashboard
            </h1>

            <p className="text-sm text-slate-500">
              {APP.naam}
            </p>
          </div>

          <Link
            href="/api/auth/logout"
            className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-100"
          >
            Uitloggen
          </Link>

        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 p-6 md:grid-cols-2 xl:grid-cols-4">

        {kaarten.map((kaart) => (
          <article
            key={kaart.titel}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <div className="text-4xl">
              {kaart.icoon}
            </div>

            <div className="mt-4 text-3xl font-bold">
              {kaart.waarde}
            </div>

            <div className="mt-1 text-slate-500">
              {kaart.titel}
            </div>
          </article>
        ))}

      </section>

    </main>
  );
}