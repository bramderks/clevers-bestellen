import { notFound } from "next/navigation";
import Link from "next/link";

import TopBar from "@/components/TopBar";
import MedewerkerForm from "@/components/medewerkers/MedewerkerForm";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MedewerkerPagina({
  params,
}: Props) {
  const { id } = await params;

  const medewerker =
    await prisma.medewerker.findUnique({
      where: {
        id,
      },
    });

  if (!medewerker) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-4xl">
        <TopBar title="Medewerker bewerken" />

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-2 text-3xl font-bold">
            {medewerker.naam}
          </h2>

          <p className="mb-8 text-gray-500">
            Pas de gegevens van deze medewerker aan.
          </p>

          <MedewerkerForm
            medewerker={medewerker}
          />

          <div className="mt-8 border-t pt-6">
            <Link
              href="/medewerkers"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              ← Terug naar medewerkers
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}