import Link from "next/link";
import { notFound } from "next/navigation";
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
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const einde = zondag.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `${start} t/m ${einde}`;
}

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
          { categorie: "asc" },
          { taak: "asc" },
        ],
      },
    },
  });

  if (!week) {
    notFound();
  }

  const groepen = week.taken.reduce(
    (acc: any, taak: any) => {
      if (!acc[taak.categorie]) acc[taak.categorie] = [];
      acc[taak.categorie].push(taak);
      return acc;
    },
    {}
  );

  const totaal = week.taken.length;
  const gereed = week.taken.filter((t) => t.voltooid).length;
  const percentage =
    totaal === 0 ? 0 : Math.round((gereed / totaal) * 100);

  const medewerkers = Array.from(
    new Set(
      week.taken
        .map((t) => t.naam)
        .filter(Boolean)
    )
  );

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-6 flex gap-3">
        <Link
          href="/"
          className="rounded-lg border bg-white px-4 py-2 hover:bg-gray-50"
        >
          ← Home
        </Link>

        <Link
          href="/historie/weektaken"
          className="rounded-lg border bg-white px-4 py-2 hover:bg-gray-50"
        >
          ← Historie
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          📍 {week.vestiging}
        </h1>

        <p className="mt-2 text-gray-500">
          Week {week.week} • {weekPeriode(week.jaar, week.week)}
        </p>

        <div className="mt-5 h-4 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-green-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="mt-2 font-semibold">
          {gereed} van {totaal} taken voltooid ({percentage}%)
        </p>

        <div className="mt-6 rounded-xl border bg-white p-5">
          <h2 className="mb-4 text-xl font-bold">
            👥 Medewerkers
          </h2>

          {medewerkers.length === 0 ? (
            <p className="text-gray-500">
              Geen medewerkers geregistreerd.
            </p>
          ) : (
            medewerkers.map((naam) => {
              const aantal = week.taken.filter(
                (t) => t.naam === naam
              ).length;

              return (
                <div
                  key={naam}
                  className="flex justify-between border-b py-2 last:border-0"
                >
                  <span>{naam}</span>

                  <span className="font-semibold">
                    {aantal} taak{aantal !== 1 ? "en" : ""}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {Object.entries(groepen).map(([categorie, taken]: any) => {
        const categorieTotaal = taken.length;
        const categorieGereed = taken.filter(
          (t: any) => t.voltooid
        ).length;
        const categoriePercentage =
          categorieTotaal === 0
            ? 0
            : Math.round(
                (categorieGereed / categorieTotaal) * 100
              );

        return (
          <section
            key={categorie}
            className="mb-8 overflow-hidden rounded-xl border bg-white shadow"
          >
            <div className="bg-blue-700 px-6 py-4">
              <div className="text-xl font-bold text-white">
                {categorie}
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-300">
                <div
                  className="h-full bg-green-400"
                  style={{
                    width: `${categoriePercentage}%`,
                  }}
                />
              </div>

              <div className="mt-2 text-sm text-white">
                {categorieGereed} / {categorieTotaal} voltooid (
                {categoriePercentage}%)
              </div>
            </div>

            <div className="grid grid-cols-[80px_1fr_220px_180px] bg-gray-100 px-4 py-3 font-semibold">
              <div>Status</div>
              <div>Taak</div>
              <div>Medewerker</div>
              <div>Afgerond op</div>
            </div>

            {taken
              .sort(
                (a: any, b: any) =>
                  Number(a.voltooid) - Number(b.voltooid)
              )
              .map((taak: any) => (
                <div
                  key={taak.id}
                  className={`grid grid-cols-[80px_1fr_220px_180px] border-t px-4 py-3 ${
                    taak.voltooid
                      ? "bg-green-50"
                      : "bg-red-50"
                  }`}
                >
                  <div className="text-xl">
                    {taak.voltooid ? "✅" : "⬜"}
                  </div>

                  <div>{taak.taak}</div>

                  <div>{taak.naam ?? "-"}</div>

                  <div>
                    {taak.voltooidOp
                      ? new Date(
                          taak.voltooidOp
                        ).toLocaleString("nl-NL")
                      : "-"}
                  </div>
                </div>
              ))}
          </section>
        );
      })}
    </main>
  );
}