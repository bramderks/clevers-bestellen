import Link from "next/link";

import { APP } from "@/lib/app";

export default function DashboardPagina() {
  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Clevers Bestellen
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {APP.naam}
            </p>
          </div>

          <Link
            href="/api/auth/logout"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Uitloggen
          </Link>
        </div>
      </header>

      <section className="mx-auto flex max-w-3xl flex-col gap-5 p-5">
        <Link
          href="/tellen"
          className="group rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-md active:scale-[0.99]"
        >
          <div className="text-5xl">
            🍦
          </div>

          <h2 className="mt-5 text-3xl font-bold text-slate-900">
            Bestellen
          </h2>

          <p className="mt-2 text-lg text-slate-500">
            Voorraad tellen en direct een bestelling genereren.
          </p>
        </Link>

        <Link
          href="/weektaken"
          className="group rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-md active:scale-[0.99]"
        >
          <div className="text-5xl">
            ✅
          </div>

          <h2 className="mt-5 text-3xl font-bold text-slate-900">
            Weektaken
          </h2>

          <p className="mt-2 text-lg text-slate-500">
            Schoonmaak-, controle- en onderhoudstaken.
          </p>
        </Link>
      </section>
    </main>
  );
}