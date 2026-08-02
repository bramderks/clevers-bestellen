import Link from "next/link";

type Dienst = {
  id: string;
  medewerkerNaam: string;
  begintijd: string;
  eindtijd: string;
  functie?: string | null;
  kleur?: string | null;
};

interface Props {
  dag: string;
  datum: string;
  diensten: Dienst[];
}

export default function DagKolom({
  dag,
  datum,
  diensten,
}: Props) {
  return (
    <div className="rounded-2xl bg-white shadow-sm">

      <div className="rounded-t-2xl bg-blue-700 px-4 py-4 text-center text-white">

        <div className="text-lg font-bold">
          {dag}
        </div>

        <div className="mt-1 text-sm text-blue-100">
          {datum}
        </div>

      </div>

      <div className="space-y-3 p-4">

        {diensten.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center text-slate-400">

            <div className="text-4xl">
              👤
            </div>

            <div className="mt-3 text-sm">
              Geen diensten
            </div>

          </div>
        ) : (
          diensten.map((dienst) => (
            <Link
              key={dienst.id}
              href={`/diensten/${dienst.id}`}
              className="block rounded-xl border p-4 transition hover:border-blue-500 hover:shadow-md"
            >
              <div className="flex items-center gap-3">

                <div
                  className="h-4 w-4 rounded-full"
                  style={{
                    backgroundColor:
                      dienst.kleur ??
                      "#2563eb",
                  }}
                />

                <div className="font-semibold">
                  {dienst.medewerkerNaam}
                </div>

              </div>

              <div className="mt-3 text-sm text-slate-600">
                🕒 {dienst.begintijd} - {dienst.eindtijd}
              </div>

              {dienst.functie && (
                <div className="mt-1 text-sm text-slate-500">
                  💼 {dienst.functie}
                </div>
              )}
            </Link>
          ))
        )}

        <button
          className="w-full rounded-xl border-2 border-dashed border-blue-300 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
        >
          + Dienst toevoegen
        </button>

      </div>

    </div>
  );
}