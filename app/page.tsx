import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const [
    bestellingen,
    weken,
    openTaken,
  ] = await Promise.all([
    prisma.bestelling.count(),

    prisma.week.count(),

    prisma.weekTaak.count({
      where: {
        voltooid: false,
      },
    }),
  ]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Clevers Bestelsysteem
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            Dashboard
          </p>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
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
              {weken}
            </div>

            <div className="mt-2 text-gray-500">
              ✅ Weken
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-orange-600">
              {openTaken}
            </div>

            <div className="mt-2 text-gray-500">
              ⏳ Open taken
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Link
            href="/tellen"
            className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 text-5xl">
              🍦
            </div>

            <h2 className="text-2xl font-bold">
              Nieuwe telling
            </h2>

            <p className="mt-3 text-gray-500">
              Voorraad tellen en direct een bestelling genereren.
            </p>
          </Link>

          <Link
            href="/weektaken"
            className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 text-5xl">
              ✅
            </div>

            <h2 className="text-2xl font-bold">
              Weektaken
            </h2>

            <p className="mt-3 text-gray-500">
              Schoonmaak-, controle- en onderhoudstaken.
            </p>
          </Link>

          <Link
            href="/historie"
            className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 text-5xl">
              📚
            </div>

            <h2 className="text-2xl font-bold">
              Historie
            </h2>

            <p className="mt-3 text-gray-500">
              Bekijk alle eerdere bestellingen en weektaken.
            </p>
          </Link>

          <Link
            href="/producten"
            className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 text-5xl">
              🛒
            </div>

            <h2 className="text-2xl font-bold">
              Producten
            </h2>

            <p className="mt-3 text-gray-500">
              Beheer alle producten en buffers.
            </p>
          </Link>

          <Link
            href="/historie"
            className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-5 text-5xl">
              📊
            </div>

            <h2 className="text-2xl font-bold">
              Dashboard
            </h2>

            <p className="mt-3 text-blue-100">
              Analyseer bestellingen, weektaken en prestaties.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}