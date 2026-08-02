import Link from "next/link";
import { prisma } from "@/lib/prisma";
import TopBar from "@/components/TopBar";
import MedewerkerCard from "@/components/medewerkers/MedewerkerCard";

export default async function MedewerkersPagina() {
  const medewerkers =
    await prisma.medewerker.findMany({
      orderBy: [
        {
          actief: "desc",
        },
        {
          naam: "asc",
        },
      ],
    });

  const actief =
    medewerkers.filter((m) => m.actief).length;

  const nijmegen =
    medewerkers.filter(
      (m) => m.vestiging === "Nijmegen"
    ).length;

  const roermond =
    medewerkers.filter(
      (m) => m.vestiging === "Roermond"
    ).length;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-7xl">

        <TopBar title="Medewerkers" />

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-blue-700">
              {actief}
            </div>

            <div className="mt-2 text-gray-500">
              👥 Actieve medewerkers
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-green-700">
              {nijmegen}
            </div>

            <div className="mt-2 text-gray-500">
              🍦 Nijmegen
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-orange-600">
              {roermond}
            </div>

            <div className="mt-2 text-gray-500">
              🍦 Roermond
            </div>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Medewerkers
          </h2>

          <Link
            href="/medewerkers/nieuw"
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            ➕ Nieuwe medewerker
          </Link>
        </div>

        {medewerkers.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center text-gray-500 shadow-sm">
            Er zijn nog geen medewerkers aangemaakt.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {medewerkers.map((medewerker) => (
              <div
                key={medewerker.id}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-4">

                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white"
                      style={{
                        backgroundColor:
                          medewerker.kleur ??
                          "#2563eb",
                      }}
                    >
                      {medewerker.voornaam
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <div className="text-xl font-bold">
                        {medewerker.naam}
                      </div>

                      <div className="text-sm text-gray-500">
                        {medewerker.email ??
                          "-"}
                      </div>
                    </div>

                  </div>

                  {medewerker.actief ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Actief
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                      Inactief
                    </span>
                  )}
                </div>

                <div className="mt-6 space-y-2 text-sm">

                  <div>
                    📍{" "}
                    <strong>
                      Vestiging:
                    </strong>{" "}
                    {medewerker.vestiging}
                  </div>

                  <div>
                    📞{" "}
                    <strong>
                      Telefoon:
                    </strong>{" "}
                    {medewerker.telefoon ??
                      "-"}
                  </div>

                  <div>
                    💼{" "}
                    <strong>
                      Functie:
                    </strong>{" "}
                    {medewerker.functie ??
                      "Medewerker"}
                  </div>

                </div>

                <div className="mt-6 flex justify-end">
                  <Link
                    href={`/medewerkers/${medewerker.id}`}
                    className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Bewerken
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}