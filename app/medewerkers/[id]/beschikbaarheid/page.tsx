import { notFound } from "next/navigation";
import Link from "next/link";

import TopBar from "@/components/TopBar";
import BeschikbaarheidForm from "@/components/medewerkers/BeschikbaarheidForm";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BeschikbaarheidPagina({
  params,
}: Props) {
  const { id } = await params;

  const medewerker =
    await prisma.medewerker.findUnique({
      where: {
        id,
      },
      include: {
        beschikbaarheden: {
          orderBy: {
            weekdag: "asc",
          },
        },
      },
    });

  if (!medewerker) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-5xl">

        <TopBar title="Beschikbaarheid" />

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="text-3xl font-bold">
            {medewerker.naam}
          </h2>

          <p className="mt-2 mb-8 text-gray-500">
            Stel de wekelijkse beschikbaarheid van deze medewerker in.
          </p>

          <BeschikbaarheidForm
            medewerkerId={medewerker.id}
            beschikbaarheden={
              medewerker.beschikbaarheden
            }
          />

          <div className="mt-8 border-t pt-6">
            <Link
              href={`/medewerkers/${medewerker.id}`}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              ← Terug naar medewerker
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}