import Link from "next/link";
import { prisma } from "@/lib/prisma";

function weekPeriode(jaar: number, week: number) {
  const jan4 = new Date(jaar, 0, 4);

  const maandagWeek1 = new Date(jan4);
  maandagWeek1.setDate(
    jan4.getDate() - ((jan4.getDay() + 6) % 7)
  );

  const maandag = new Date(maandagWeek1);
  maandag.setDate(maandag.getDate() + (week - 1) * 7);

  const zondag = new Date(maandag);
  zondag.setDate(maandag.getDate() + 6);

  const start = maandag.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
  });

  const einde = zondag.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `${start} t/m ${einde}`;
}

export default async function HistorieWeektakenPagina() {
  const weken = await prisma.week.findMany({
    include: {
      taken: true,
    },
    orderBy: [
      {
        jaar: "desc",
      },
      {
        week: "desc",
      },
      {
        vestiging: "asc",
      },
    ],
  });

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          ✅ Historie weektaken
        </h1>

        <Link
          href="/historie"
          className="rounded-lg border bg-white px-4 py-2 hover:bg-gray-50"
        >
          ← Historie
        </Link>
      </div>

      <div className="grid gap-6">
        {weken.map((week) => {
          const totaal = week.taken.length;
          const gereed = week.taken.filter(
            (t) => t.voltooid
          ).length;

          const percentage =
            totaal === 0
              ? 0
              : Math.round((gereed / totaal) * 100);

          return (
            <Link
              key={week.id}
              href={`/historie/weektaken/${week.id}`}
              className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {week.vestiging}
                  </h2>

                  <p className="mt-1 text-gray-500">
                    Week {week.week} •{" "}
                    {weekPeriode(week.jaar, week.week)}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold">
                    {percentage}%
                  </div>

                  <div className="text-sm text-gray-500">
                    {gereed} / {totaal}
                  </div>
                </div>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </Link>
          );
        })}

        {weken.length === 0 && (
          <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
            Er zijn nog geen weektaken opgeslagen.
          </div>
        )}
      </div>
    </main>
  );
}