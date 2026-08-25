import Link from "next/link";

import TopBar from "@/components/TopBar";
import TelForm from "@/components/TelForm";

export default function TellenPagina() {
  const vestiging = "nijmegen";

  return (
    <main className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <TopBar title="Tellen" />

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Voorraad tellen
            </h1>

            <p className="mt-1 text-slate-500">
              Tel de actuele voorraad en bereken de bestelling.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            ← Terug
          </Link>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
          <TelForm vestiging={vestiging} />
        </div>
      </div>
    </main>
  );
}