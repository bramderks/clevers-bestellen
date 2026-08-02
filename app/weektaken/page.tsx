import Link from "next/link";
import TopBar from "@/components/TopBar";
import { prisma } from "@/lib/prisma";

export default async function WeektakenHome() {
  const weken = await prisma.week.findMany({
    where: {
      vestiging: {
        in: ["Nijmegen", "Roermond"],
      },
    },
    include: {
      taken: true,
    },
  });

  function gegevens(vestiging: string) {
    const week = weken.find((w) => w.vestiging === vestiging);

    if (!week) {
      return {
        percentage: 0,
        open: 0,
        afgesloten: false,
      };
    }

    const totaal = week.taken.length;
    const gereed = week.taken.filter((t) => t.voltooid).length;
    const open = totaal - gereed;

    const percentage =
      totaal === 0
        ? 0
        : Math.round((gereed / totaal) * 100);

    return {
      percentage,
      open,
      afgesloten: week.afgesloten,
    };
  }

  const nijmegen = gegevens("Nijmegen");
  const roermond = gegevens("Roermond");

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <TopBar title="Weektaken" />

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Weektaken
          </h1>

          <p className="mt-2 text-gray-500">
            Kies een vestiging
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Link
            href="/weektaken/Nijmegen"
            className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">
                🍦 Nijmegen
              </h2>

              <span
                className={`rounded-full px-4 py-2 text-sm font-bold ${
                  nijmegen.afgesloten
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {nijmegen.afgesloten
                  ? "🔒 Afgesloten"
                  : "🟢 Open"}
              </span>
            </div>

            <div className="mt-8 h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-green-500"
                style={{
                  width: `${nijmegen.percentage}%`,
                }}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-bold text-blue-700">
                  {nijmegen.percentage}%
                </div>

                <div className="text-sm text-gray-500">
                  Voortgang
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-orange-600">
                  {nijmegen.open}
                </div>

                <div className="text-sm text-gray-500">
                  Open taken
                </div>
              </div>
            </div>
          </Link>

          <Link
            href="/weektaken/Roermond"
            className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">
                🍦 Roermond
              </h2>

              <span
                className={`rounded-full px-4 py-2 text-sm font-bold ${
                  roermond.afgesloten
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {roermond.afgesloten
                  ? "🔒 Afgesloten"
                  : "🟢 Open"}
              </span>
            </div>

            <div className="mt-8 h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-green-500"
                style={{
                  width: `${roermond.percentage}%`,
                }}
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-bold text-blue-700">
                  {roermond.percentage}%
                </div>

                <div className="text-sm text-gray-500">
                  Voortgang
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-orange-600">
                  {roermond.open}
                </div>

                <div className="text-sm text-gray-500">
                  Open taken
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}