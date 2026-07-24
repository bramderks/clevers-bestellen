import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-10">
      <div className="max-w-5xl w-full">

        <h1 className="text-5xl font-bold text-center mb-3">
          Clevers Bestelsysteem
        </h1>

        <p className="text-center text-gray-500 mb-12">
          Kies een functie
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          <Link
            href="/tellen"
            className="bg-white rounded-2xl shadow-xl p-10 hover:shadow-2xl transition"
          >
            <h2 className="text-3xl font-bold mb-3">
              🍦 Nieuwe telling
            </h2>

            <p className="text-gray-500">
              Doorloop de voorraadtelling en genereer direct de bestelling.
            </p>
          </Link>

          <Link
            href="/historie"
            className="bg-white rounded-2xl shadow-xl p-10 hover:shadow-2xl transition"
          >
            <h2 className="text-3xl font-bold mb-3">
              📚 Historie
            </h2>

            <p className="text-gray-500">
              Bekijk alle eerdere bestellingen.
            </p>
          </Link>

          <Link
            href="/ocr"
            className="bg-white rounded-2xl shadow-xl p-10 hover:shadow-2xl transition"
          >
            <h2 className="text-3xl font-bold mb-3">
              📷 OCR import
            </h2>

            <p className="text-gray-500">
              Lees een oud papieren formulier in.
            </p>
          </Link>

          <Link
            href="/instellingen"
            className="bg-white rounded-2xl shadow-xl p-10 hover:shadow-2xl transition"
          >
            <h2 className="text-3xl font-bold mb-3">
              ⚙️ Instellingen
            </h2>

            <p className="text-gray-500">
              Producten, buffers en vestigingen beheren.
            </p>
          </Link>

        </div>

      </div>
    </main>
  );
}