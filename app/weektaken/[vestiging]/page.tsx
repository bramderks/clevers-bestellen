import { headers } from "next/headers";
import WeektakenClient from "@/components/weektaken/WeektakenClient";

async function haalTakenOp(vestiging: string) {
  const h = await headers();

  const protocol =
    process.env.NODE_ENV === "development"
      ? "http"
      : "https";

  const host = h.get("host");

  const res = await fetch(
    `${protocol}://${host}/api/weektaken?vestiging=${vestiging}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Kon weektaken niet ophalen.");
  }

  return res.json();
}

function weekPeriode(jaar: number, week: number) {
  const jan4 = new Date(jaar, 0, 4);

  const maandagWeek1 = new Date(jan4);
  maandagWeek1.setDate(
    jan4.getDate() - ((jan4.getDay() + 6) % 7)
  );

  const maandag = new Date(maandagWeek1);
  maandag.setDate(
    maandagWeek1.getDate() + (week - 1) * 7
  );

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

const groepen: {
  categorie: string;
  taken: any[];
}[] = Object.entries(
  data.taken.reduce(
    (acc: Record<string, any[]>, taak: any) => {
      if (!acc[taak.categorie]) {
        acc[taak.categorie] = [];
      }

      acc[taak.categorie].push(taak);

      return acc;
    },
    {}
  )
).map(([categorie, taken]) => ({
  categorie,
  taken: taken as any[],
}));

  const totaal = data.taken.length;

  const gereed = data.taken.filter(
    (t: any) => t.voltooid
  ).length;

  const percentage =
    totaal === 0
      ? 0
      : Math.round((gereed / totaal) * 100);

  return (
    <main className="mx-auto max-w-7xl p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl">
          Weektaken
        </h1>

        <p className="mt-2 text-gray-600">
          Week {data.week.week} • {vestiging}
        </p>

        <p className="text-sm text-gray-500">
          {weekPeriode(
            data.week.jaar,
            data.week.week
          )}
        </p>

        <div className="mt-5 h-4 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-green-500"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <p className="mt-2 text-sm font-medium">
          {gereed} van {totaal} taken voltooid (
          {percentage}%)
        </p>
      </div>

      <WeektakenClient
        categorieen={groepen}
      />
    </main>
  );
}