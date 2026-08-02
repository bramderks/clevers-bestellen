import Link from "next/link";

import TopBar from "@/components/TopBar";
import DienstForm from "@/components/diensten/DienstForm";
import { prisma } from "@/lib/prisma";

export default async function NieuweDienstPagina() {
  const medewerkers =
    await prisma.medewerker.findMany({
      where: {
        actief: true,
      },
      orderBy: {
        naam: "asc",
      },
    });

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-5xl">

        <TopBar title="Nieuwe dienst" />

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="text-3xl font-bold">
            Nieuwe dienst
          </h2>

          <p className="mb-8 mt-2 text-gray-500">
            Plan een nieuwe dienst voor een medewerker.
          </p>

          <DienstForm
            medewerkers={medewerkers}
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