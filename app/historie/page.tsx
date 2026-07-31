import Link from "next/link";

export default function HistorieHome() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Historie
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/historie/bestellingen"
          className="rounded-2xl border bg-white p-8 shadow hover:bg-gray-50 transition"
        >
          <h2 className="text-2xl font-bold mb-2">
            📦 Bestellingen
          </h2>

          <p className="text-gray-500">
            Bekijk alle eerdere bestellingen.
          </p>
        </Link>

        <Link
          href="/historie/weektaken"
          className="rounded-2xl border bg-white p-8 shadow hover:bg-gray-50 transition"
        >
          <h2 className="text-2xl font-bold mb-2">
            ✅ Weektaken
          </h2>

          <p className="text-gray-500">
            Bekijk alle afgeronde weektaken per vestiging en week.
          </p>
        </Link>
      </div>
    </main>
  );
}