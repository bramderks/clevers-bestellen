import TaakRij from "@/components/weektaken/TaakRij";

async function haalTakenOp(vestiging: string) {
  const res = await fetch(
    `http://localhost:3000/api/weektaken?vestiging=${vestiging}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

function weekPeriode(jaar: number, week: number) {
  const jan4 = new Date(jaar, 0, 4);

  const maandagWeek1 = new Date(jan4);
  maandagWeek1.setDate(
    jan4.getDate() - ((jan4.getDay() + 6) % 7)
  );

  const maandag = new Date(maandagWeek1);
  maandag.setDate(maandagWeek1.getDate() + (week - 1) * 7);

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
    vestiging: string;
  }>;
};

export default async function WeektakenPagina({
  params,
}: Props) {
  const { vestiging } = await params;

  const data = await haalTakenOp(vestiging);

  const groepen = data.taken.reduce(
    (acc: any, taak: any) => {
      if (!acc[taak.categorie]) acc[taak.categorie] = [];
      acc[taak.categorie].push(taak);
      return acc;
    },
    {}
  );

  const totaal = data.taken.length;
  const gereed = data.taken.filter((t: any) => t.voltooid).length;
  const percentage = Math.round((gereed / totaal) * 100) || 0;

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Weektaken</h1>

        <p className="mt-2 text-gray-600">
          Week {data.week.week} • {vestiging}
        </p>

        <p className="text-sm text-gray-500">
          {weekPeriode(data.week.jaar, data.week.week)}
        </p>

        <div className="mt-5 h-4 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-green-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="mt-2 text-sm font-medium">
          {gereed} van {totaal} taken voltooid ({percentage}%)
        </p>
      </div>

      {Object.entries(groepen).map(([categorie, taken]: any) => (
        <section
          key={categorie}
          className="mb-10 rounded-xl border bg-white shadow-sm"
        >
          <div className="rounded-t-xl bg-blue-700 px-6 py-4 text-xl font-bold text-white">
            {categorie}
          </div>

          <div className="grid grid-cols-[80px_1fr_220px_180px] border-b bg-gray-100 px-4 py-3 font-semibold">
            <div>Gereed</div>
            <div>Taak</div>
            <div>Naam medewerker</div>
            <div>Afgerond op</div>
          </div>

          <div className="divide-y">
            {taken.map((taak: any) => (
              <TaakRij key={taak.id} taak={taak} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}