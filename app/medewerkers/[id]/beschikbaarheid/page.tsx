import { notFound } from "next/navigation";
import Link from "next/link";

import TopBar from "@/components/TopBar";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const dagen = [
  "Maandag",
  "Dinsdag",
  "Woensdag",
  "Donderdag",
  "Vrijdag",
  "Zaterdag",
  "Zondag",
];

export default async function BeschikbaarheidPagina({
  params,
}: Props) {
  const { id } = await params;

  const medewerker =
    await prisma.medewerker.findUnique({
      where: {
        id,
      },
      include: {
        beschikbaarheden: {
          orderBy: {
            weekdag: "asc",
          },
        },
      },
    });

  if (!medewerker) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-5xl">

        <TopBar title="Beschikbaarheid" />

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="text-3xl font-bold">
            {medewerker.naam}
          </h2>

          <p className="mt-2 text-gray-500">
            Geef per dag aan wanneer deze medewerker beschikbaar is.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border">

            <div className="grid grid-cols-[180px_120px_1fr_1fr] bg-blue-700 px-6 py-4 font-semibold text-white">
              <div>Dag</div>
              <div>Beschikbaar</div>
              <div>Van</div>
              <div>Tot</div>
            </div>

            {dagen.map((dag, index) => {
              const beschikbaarheid =
                medewerker.beschikbaarheden.find(
                  (b) => b.weekdag === index
                );

              return (
                <div
                  key={dag}
                  className="grid grid-cols-[180px_120px_1fr_1fr] items-center border-t px-6 py-4"
                >
                  <div className="font-semibold">
                    {dag}
                  </div>

                  <div>
                    {beschikbaarheid?.beschikbaar
                      ? "✅"
                      : "❌"}
                  </div>

                  <div>
                    {beschikbaarheid?.vanaf ??
                      "-"}
                  </div>

                  <div>
                    {beschikbaarheid?.tot ??
                      "-"}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex gap-4">

            <Link
              href={`/medewerkers/${medewerker.id}`}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              ← Terug
            </Link>

            <button
              disabled
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white opacity-60"
            >
              Opslaan (volgende stap)
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}