import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-5 px-5 py-8">
        <div className="mb-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Clevers Bestellen
          </h1>

          <p className="mt-2 text-lg text-slate-500">
            Kies wat je wilt doen
          </p>
        </div>

        <Link
          href="/tellen"
          className="rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-md active:scale-[0.99]"
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
          className="rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-md active:scale-[0.99]"
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