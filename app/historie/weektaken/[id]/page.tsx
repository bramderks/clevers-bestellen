import { notFound } from "next/navigation";
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
          { categorie: "asc" },
          { taak: "asc" },
        ],
      },
    },
  });

  if (!week) {
    notFound();
  }

  const gereed = week.taken.filter((t) => t.voltooid).length;
  const totaal = week.taken.length;
  const percentage = Math.round((gereed / totaal) * 100);

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="text-4xl font-bold">
        {week.vestiging}
      </h1>

      <p className="mt-2 text-gray-500">
        Week {week.week} • {week.jaar}
      </p>

      <p className="mt-2 font-semibold">
        {gereed} van {totaal} taken voltooid ({percentage}%)
      </p>

      <div className="mt-8 rounded-xl border overflow-hidden">
        <div className="grid grid-cols-[80px_1fr_220px_180px] bg-blue-700 px-4 py-3 font-bold text-white">
          <div>Gereed</div>
          <div>Taak</div>
          <div>Medewerker</div>
          <div>Afgerond op</div>
        </div>

        {week.taken.map((taak) => (
          <div
            key={taak.id}
            className="grid grid-cols-[80px_1fr_220px_180px] border-t px-4 py-3"
          >
            <div>{taak.voltooid ? "✅" : "⬜"}</div>

            <div>{taak.taak}</div>

            <div>{taak.naam ?? "-"}</div>

            <div>
              {taak.voltooidOp
                ? new Date(taak.voltooidOp).toLocaleString("nl-NL")
                : "-"}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}