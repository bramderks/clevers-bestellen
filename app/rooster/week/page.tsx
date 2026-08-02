import Link from "next/link";

import TopBar from "@/components/TopBar";
import DagKolom from "@/components/rooster/DagKolom";

const dagen = [
  {
    dag: "Maandag",
    datum: "",
  },
  {
    dag: "Dinsdag",
    datum: "",
  },
  {
    dag: "Woensdag",
    datum: "",
  },
  {
    dag: "Donderdag",
    datum: "",
  },
  {
    dag: "Vrijdag",
    datum: "",
  },
  {
    dag: "Zaterdag",
    datum: "",
  },
  {
    dag: "Zondag",
    datum: "",
  },
];

export default function WeekRoosterPagina() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-7xl">

        <TopBar title="Weekrooster" />

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              Weekplanning
            </h2>

            <p className="mt-2 text-gray-500">
              Overzicht van alle diensten per dag.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button className="rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800">
              ← Vorige week
            </button>

            <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
              Deze week
            </button>

            <button className="rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800">
              Volgende week →
            </button>

          </div>

        </div>

        <div className="grid gap-6 lg:grid-cols-7">

          {dagen.map((dag) => (
            <DagKolom
              key={dag.dag}
              dag={dag.dag}
              datum={dag.datum}
              diensten={[]}
            />
          ))}

        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">

          <Link
            href="/rooster"
            className="rounded-xl bg-slate-700 px-6 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
          >
            ← Terug
          </Link>

          <button className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
            💾 Rooster opslaan
          </button>

        </div>

      </div>
    </main>
  );
}