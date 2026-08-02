import { notFound } from "next/navigation";
import Link from "next/link";

import TopBar from "@/components/TopBar";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UurRegistratiePagina({
  params,
}: Props) {
  const { id } = await params;

  const registratie =
    await prisma.uurRegistratie.findUnique({
      where: {
        id,
      },
      include: {
        medewerker: true,
        dienst: true,
      },
    });

  if (!registratie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-5xl">

        <TopBar title="Urenregistratie" />

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="text-3xl font-bold">
            {registratie.medewerker.naam}
          </h2>

          <p className="mt-2 mb-8 text-gray-500">
            Controleer en registreer de gewerkte uren.
          </p>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-xl border p-6">

              <h3 className="mb-4 text-xl font-bold">
                Gepland
              </h3>

              <div className="space-y-3">

                <div>
                  <strong>Datum:</strong>{" "}
                  {registratie.dienst.datum.toLocaleDateString(
                    "nl-NL"
                  )}
                </div>

                <div>
                  <strong>Vestiging:</strong>{" "}
                  {registratie.dienst.vestiging}
                </div>

                <div>
                  <strong>Begintijd:</strong>{" "}
                  {registratie.geplandeStart}
                </div>

                <div>
                  <strong>Eindtijd:</strong>{" "}
                  {registratie.geplandeEinde}
                </div>

              </div>

            </div>

            <div className="rounded-xl border p-6">

              <h3 className="mb-4 text-xl font-bold">
                Geregistreerd
              </h3>

              <div className="space-y-3">

                <div>
                  <strong>Start:</strong>{" "}
                  {registratie.gewerkteStart ??
                    "-"}
                </div>

                <div>
                  <strong>Einde:</strong>{" "}
                  {registratie.gewerkteEinde ??
                    "-"}
                </div>

                <div>
                  <strong>Pauze:</strong>{" "}
                  {registratie.pauze} min
                </div>

                <div>
                  <strong>Status:</strong>{" "}
                  {registratie.goedgekeurd
                    ? "Goedgekeurd"
                    : "Nog niet goedgekeurd"}
                </div>

              </div>

            </div>

          </div>

          <div className="mt-8 rounded-xl border bg-slate-50 p-6">

            <h3 className="mb-4 text-xl font-bold">
              Opmerking
            </h3>

            <p className="text-slate-600">
              {registratie.opmerking ??
                "Geen opmerkingen."}
            </p>

          </div>

          <div className="mt-8 flex justify-between">

            <Link
              href="/uren"
              className="rounded-xl bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              ← Terug
            </Link>

            <button
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              ✅ Goedkeuren
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}