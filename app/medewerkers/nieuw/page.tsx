import TopBar from "@/components/TopBar";
import Link from "next/link";
import MedewerkerForm from "@/components/medewerkers/MedewerkerForm";

export default function NieuweMedewerkerPagina() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 md:p-10">
      <div className="mx-auto max-w-4xl">
        <TopBar title="Nieuwe medewerker" />

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-2 text-3xl font-bold">
            Nieuwe medewerker
          </h2>

          <p className="mb-8 text-gray-500">
            Voeg een nieuwe medewerker toe aan het systeem.
          </p>

          <MedewerkerForm />

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