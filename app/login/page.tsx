import Link from "next/link";

export default function LoginPagina() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Clevers Bestellen
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Aanmelden
          </p>
        </div>

        <form className="space-y-5">

          <div>
            <label className="mb-1 block text-sm font-medium">
              E-mailadres
            </label>

            <input
              type="email"
              name="email"
              autoComplete="email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Wachtwoord
            </label>

            <input
              type="password"
              name="password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Inloggen
          </button>

        </form>

        <div className="mt-8 border-t pt-4 text-center text-xs text-slate-500">
          © 2026 B. Derks Holding • Uitsluitend bestemd voor geautoriseerde gebruikers.
        </div>

        <div className="mt-2 text-center text-xs text-slate-400">
          <Link href="/">
            Terug naar dashboard
          </Link>
        </div>

      </div>
    </main>
  );
}