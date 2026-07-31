import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HistorieHome() {
  const [
    bestellingen,
    weken,
    laatsteBestelling,
    laatsteWeek,
  ] = await Promise.all([
    prisma.bestelling.count(),
    prisma.week.count(),

    prisma.bestelling.findFirst({
      orderBy: {
        datum: "desc",
      },
    }),

    prisma.week.findFirst({
      orderBy: [
        {
          jaar: "desc",
        },
        {
          week: "desc",
        },
      ],
    }),
  ]);

  return (
    <main className="mx-auto max-w-7xl p-6 md:p-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Historie
        </h1>

        <p className="mt-2 text-gray-500">
          Overzicht van alle opgeslagen gegevens.
        </p>
      </div>

      <div className="mb-10 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-3xl font-bold text-blue-700">
            {bestellingen}
          </div>

          <div className="mt-2 text-sm text-gray-500">
            📦 Bestellingen
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-3xl font-bold text-green-700">
            {weken}
          </div>

          <div className="mt-2 text-sm text-gray-500">
            ✅ Weken
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-lg font-bold">
            {laatsteBestelling
              ? new Date(
                  laatsteBestelling.datum
                ).toLocaleDateString(
                  "nl-NL"
                )
              : "-"}
          </div>

          <div className="mt-2 text-sm text-gray-500">
            Laatste bestelling
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="text-lg font-bold">
            {laatsteWeek
              ? `Week ${laatsteWeek.week}`
              : "-"}
          </div>

          <div className="mt-2 text-sm text-gray-500">
            Laatste weektaken
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/historie"
          className="rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <h2 className="mb-3 text-2xl font-bold">
            📦 Bestellingen
          </h2>

          <p className="mb-6 text-gray-500">
            Bekijk alle opgeslagen bestellingen.
          </p>

          <div className="text-4xl font-bold text-blue-700">
            {bestellingen}
          </div>
        </Link>

        <Link
          href="/historie/weektaken"
          className="rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <h2 className="mb-3 text-2xl font-bold">
            ✅ Weektaken
          </h2>

          <p className="mb-6 text-gray-500">
            Bekijk de historie van alle weektaken.
          </p>

          <div className="text-4xl font-bold text-green-700">
            {weken}
          </div>
        </Link>
      </div>
    </main>
  );
}