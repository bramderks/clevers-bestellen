import TaakRij from "@/components/weektaken/TaakRij";

async function haalTakenOp() {
  const res = await fetch(
    "http://localhost:3000/api/weektaken?vestiging=Nijmegen",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function WeektakenPagina() {
  const data = await haalTakenOp();

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
        <h1 className="text-4xl font-bold">
          Weektaken
        </h1>

        <p className="mt-2 text-gray-600">
          Week {data.week.week} • Nijmegen
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
              <TaakRij
                key={taak.id}
                taak={taak}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}