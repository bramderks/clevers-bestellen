import Link from "next/link";

export default function WeektakenHome() {
  return (
    <main className="mx-auto max-w-3xl p-10">
      <h1 className="mb-8 text-4xl font-bold">
        Weektaken
      </h1>

      <div className="grid gap-4">
        <Link
          href="/weektaken/Nijmegen"
          className="rounded-xl border p-6 text-xl font-semibold hover:bg-blue-50"
        >
          🍦 Clevers Nijmegen
        </Link>

        <Link
          href="/weektaken/Roermond"
          className="rounded-xl border p-6 text-xl font-semibold hover:bg-blue-50"
        >
          🍦 Clevers Roermond
        </Link>
      </div>
    </main>
  );
}