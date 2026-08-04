import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { APP } from "@/lib/config/app";

interface DashboardKaart {
  waarde: number;
  kleur: string;
  label: string;
}

interface MenuKaart {
  href: string;
  icoon: string;
  titel: string;
  omschrijving: string;
  accent?: boolean;
}

export default async function Home() {
  const [
    bestellingen,
    weken,
    openTaken,
    medewerkers,
  ] = await Promise.all([
    prisma.bestelling.count(),
    prisma.week.count(),
    prisma.weekTaak.count({
      where: { voltooid: false },
    }),
    prisma.medewerker.count({
      where: { actief: true },
    }),
  ]);

  const dashboard: DashboardKaart[] = [
    {
      waarde: bestellingen,
      kleur: "text-blue-700",
      label: "📦 Bestellingen",
    },
    {
      waarde: weken,
      kleur: "text-green-700",
      label: "✅ Weken",
    },
    {
      waarde: openTaken,
      kleur: "text-orange-600",
      label: "⏳ Open taken",
    },
    {
      waarde: medewerkers,
      kleur: "text-purple-700",
      label: "👥 Medewerkers",
    },
  ];

  const menu: MenuKaart[] = [
    {
      href: "/tellen",
      icoon: "🍦",
      titel: "Nieuwe telling",
      omschrijving:
        "Voorraad tellen en direct een bestelling genereren.",
    },
    {
      href: "/weektaken",
      icoon: "✅",
      titel: "Weektaken",
      omschrijving:
        "Schoonmaak-, controle- en onderhoudstaken.",
    },
    {
      href: "/historie",
      icoon: "📚",
      titel: "Historie",
      omschrijving:
        "Bekijk alle eerdere bestellingen en weektaken.",
    },
    {
      href: "/producten",
      icoon: "🛒",
      titel: "Productbeheer",
      omschrijving:
        "Beheer alle producten en buffers.",
    },
    {
      href: "/medewerkers",
      icoon: "👥",
      titel: "Medewerkers",
      omschrijving:
        "Beheer medewerkers, beschikbaarheid en roosters.",
    },
    {
      href: "/dashboard",
      icoon: "📊",
      titel: "Dashboard",
      omschrijving:
        "Analyseer bestellingen, weektaken en prestaties.",
      accent: true,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-7xl">

        <header className="mb-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-5xl font-bold">
                {APP.naam}
              </h1>

              <p className="mt-3 text-lg text-slate-500">
                Dashboard
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-right text-xs text-slate-500 shadow-sm">
              <div>{APP.versie}</div>
              <div>{APP.eigenaar}</div>
            </div>
          </div>
        </header>

        <section className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboard.map((kaart) => (
            <div
              key={kaart.label}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className={`text-4xl font-bold ${kaart.kleur}`}>
                {kaart.waarde}
              </div>

              <div className="mt-2 text-slate-500">
                {kaart.label}
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {menu.map((kaart) => (
            <Link
              key={kaart.titel}
              href={kaart.href}
              className={
                kaart.accent
                  ? "rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                  : "rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              }
            >
              <div className="mb-5 text-5xl">
                {kaart.icoon}
              </div>

              <h2 className="text-2xl font-bold">
                {kaart.titel}
              </h2>

              <p
                className={`mt-3 ${
                  kaart.accent
                    ? "text-blue-100"
                    : "text-slate-500"
                }`}
              >
                {kaart.omschrijving}
              </p>
            </Link>
          ))}
        </section>

      </div>
    </main>
  );
}