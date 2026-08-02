import Link from "next/link";
import TopBar from "@/components/TopBar";
import { prisma } from "@/lib/prisma";

function weekPeriode(
  jaar: number,
  week: number
) {
  const jan4 = new Date(jaar, 0, 4);

  const maandagWeek1 = new Date(jan4);

  maandagWeek1.setDate(
    jan4.getDate() -
      ((jan4.getDay() + 6) % 7)
  );

  const maandag = new Date(
    maandagWeek1
  );

  maandag.setDate(
    maandagWeek1.getDate() +
      (week - 1) * 7
  );

  const zondag = new Date(maandag);

  zondag.setDate(
    maandag.getDate() + 6
  );

  const start =
    maandag.toLocaleDateString(
      "nl-NL",
      {
        day: "numeric",
        month: "long",
      }
    );

  const einde =
    zondag.toLocaleDateString(
      "nl-NL",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  return `${start} t/m ${einde}`;
}

export default async function HistorieWeektakenPagina() {
  const weken =
    await prisma.week.findMany({
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
    <main className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <TopBar title="Historie weektaken" />

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Historie weektaken
          </h1>

          <p className="mt-2 text-gray-500">
            Overzicht van alle weken
          </p>
        </div>

        {weken.length === 0 && (
          <div className="rounded-2xl border bg-white p-10 text-center text-gray-500 shadow-sm">
            Er zijn nog geen weektaken opgeslagen.
          </div>
        )}

        <div className="grid gap-6">
          {weken.map((week) => {
            const totaal =
              week.taken.length;

            const gereed =
              week.taken.filter(
                (t) => t.voltooid
              ).length;

            const open =
              totaal - gereed;

            const percentage =
              totaal === 0
                ? 0
                : Math.round(
                    (gereed /
                      totaal) *
                      100
                  );

            return (
              <Link
                key={week.id}
                href={`/historie/weektaken/${week.id}`}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold">
                        {
                          week.vestiging
                        }
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          week.afgesloten
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {week.afgesloten
                          ? "🔒 Afgesloten"
                          : "🟢 Open"}
                      </span>
                    </div>

                    <p className="mt-2 text-gray-500">
                      Week {week.week} •{" "}
                      {weekPeriode(
                        week.jaar,
                        week.week
                      )}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-green-700">
                        {gereed}
                      </div>

                      <div className="text-sm text-gray-500">
                        Gereed
                      </div>
                    </div>

                    <div>
                      <div className="text-3xl font-bold text-orange-600">
                        {open}
                      </div>

                      <div className="text-sm text-gray-500">
                        Open
                      </div>
                    </div>

                    <div>
                      <div className="text-3xl font-bold text-blue-700">
                        {percentage}%
                      </div>

                      <div className="text-sm text-gray-500">
                        Voortgang
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}