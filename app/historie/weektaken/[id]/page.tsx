import Link from "next/link";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function HistorieWeekPagina({
  params,
}: Props) {
  const { id } = await params;

  const week = await prisma.week.findUnique({
    where: {
      id,
    },
    include: {
      taken: {
        orderBy: [
          {
            categorie: "asc",
          },
          {
            taak: "asc",
          },
        ],
      },
    },
  });

  if (!week) {
    notFound();
  }

  const totaal = week.taken.length;

  const gereed = week.taken.filter(
    (t) => t.voltooid
  ).length;

  const open = totaal - gereed;

  const percentage =
    totaal === 0
      ? 0
      : Math.round(
          (gereed / totaal) * 100
        );

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <TopBar title="Historie week" />

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              {week.vestiging}
            </h1>

            <p className="mt-2 text-gray-500">
              Week {week.week} • {week.jaar}
            </p>

            <div className="mt-3 inline-flex rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold">
              {week.afgesloten
                ? "🔒 Afgesloten"
                : "🟢 Open"}
            </div>
          </div>

          <Link
            href="/historie/weektaken"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            ← Terug naar overzicht
          </Link>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="text-3xl font-bold text-blue-700">
              {totaal}
            </div>

            <div className="mt-1 text-sm text-gray-500">
              📋 Totaal
            </div>
          </div>

          <div className="rounded-2xl border bg-green-50 p-5 shadow-sm">
            <div className="text-3xl font-bold text-green-700">
              {gereed}
            </div>

            <div className="mt-1 text-sm text-gray-500">
              ✅ Gereed
            </div>
          </div>

          <div className="rounded-2xl border bg-orange-50 p-5 shadow-sm">
            <div className="text-3xl font-bold text-orange-600">
              {open}
            </div>

            <div className="mt-1 text-sm text-gray-500">
              ⏳ Open
            </div>
          </div>

          <div className="rounded-2xl border bg-blue-50 p-5 shadow-sm">
            <div className="text-3xl font-bold text-blue-700">
              {percentage}%
            </div>

            <div className="mt-1 text-sm text-gray-500">
              📈 Voortgang
            </div>
          </div>
        </div>

        <div className="mb-8 h-4 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-green-500"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="hidden grid-cols-[80px_1fr_220px_220px] bg-blue-700 px-4 py-4 font-bold text-white md:grid">
            <div>Status</div>
            <div>Taak</div>
            <div>Medewerker</div>
            <div>Afgerond op</div>
          </div>

          {week.taken.map((taak) => (
            <div
              key={taak.id}
              className={`border-t px-4 py-4 md:grid md:grid-cols-[80px_1fr_220px_220px] ${
                taak.voltooid
                  ? "bg-green-50"
                  : "bg-white"
              }`}
            >
              <div className="font-semibold">
                {taak.voltooid
                  ? "✅"
                  : "⬜"}
              </div>

              <div className="mt-2 font-medium md:mt-0">
                {taak.taak}
              </div>

              <div className="mt-2 text-gray-700 md:mt-0">
                {taak.naam ?? "-"}
              </div>

              <div className="mt-2 text-sm text-gray-500 md:mt-0">
                {taak.voltooidOp
                  ? new Date(
                      taak.voltooidOp
                    ).toLocaleString(
                      "nl-NL"
                    )
                  : "-"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}