import { notFound } from "next/navigation";
import Link from "next/link";

import TopBar from "@/components/TopBar";
import DienstForm from "@/components/diensten/DienstForm";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DienstPagina({
  params,
}: Props) {
  const { id } = await params;

  const [dienst, medewerkers] =
    await Promise.all([
      prisma.dienst.findUnique({
        where: {
          id,
        },
        include: {
          medewerker: true,
        },
      }),

      prisma.medewerker.findMany({
        where: {
          actief: true,
        },
        orderBy: {
          naam: "asc",
        },
      }),
    ]);

  if (!dienst) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-5xl">

        <TopBar title="Dienst bewerken" />

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="text-3xl font-bold">
            Dienst bewerken
          </h2>

          <p className="mb-8 mt-2 text-gray-500">
            Pas de gegevens van deze dienst aan.
          </p>

          <DienstForm
            medewerkers={medewerkers}
            dienst={{
              id: dienst.id,
              medewerkerId:
                dienst.medewerkerId,
              datum: dienst.datum
                .toISOString()
                .split("T")[0],
              begintijd:
                dienst.begintijd,
              eindtijd:
                dienst.eindtijd,
              vestiging:
                dienst.vestiging,
              functie:
                dienst.functie ??
                "Medewerker",
            }}
          />

          <div className="mt-8 border-t pt-6">

            <Link
              href="/diensten"
              className="rounded-xl bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              ← Terug naar diensten
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}