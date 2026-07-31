import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8 md:p-10">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-3">
          Clevers Bestelsysteem
        </h1>

        <p className="text-center text-gray-500 mb-8 md:mb-12 text-sm md:text-base">
          Kies een functie
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          <Link
            href="/tellen"
            className="bg-white rounded-2xl shadow-xl p-6 md:p-10 hover:shadow-2xl transition"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              🍦 Nieuwe telling
            </h2>

            <p className="text-gray-500 text-sm md:text-base">
              Doorloop de voorraadtelling en genereer direct de bestelling.
            </p>
          </Link>

          <Link
            href="/weektaken"
            className="bg-white rounded-2xl shadow-xl p-6 md:p-10 hover:shadow-2xl transition"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              ✅ Weektaken
            </h2>

            <p className="text-gray-500 text-sm md:text-base">
              Wekelijkse schoonmaak- en controletaken per vestiging.
            </p>
          </Link>

          <Link
            href="/historie"
            className="bg-white rounded-2xl shadow-xl p-6 md:p-10 hover:shadow-2xl transition"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              📚 Historie
            </h2>

            <p className="text-gray-500 text-sm md:text-base">
              Bekijk alle eerdere bestellingen.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}