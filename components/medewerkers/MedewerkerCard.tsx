import Link from "next/link";

type Props = {
  medewerker: {
    id: string;
    naam: string;
    voornaam: string;
    email: string | null;
    telefoon: string | null;
    vestiging: string;
    functie: string | null;
    actief: boolean;
    kleur: string | null;
  };
};

export default function MedewerkerCard({
  medewerker,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div
            className="flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white"
            style={{
              backgroundColor:
                medewerker.kleur ??
                "#2563eb",
            }}
          >
            {medewerker.voornaam
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {medewerker.naam}
            </h2>

            <p className="text-sm text-gray-500">
              {medewerker.email ?? "-"}
            </p>
          </div>

        </div>

        {medewerker.actief ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Actief
          </span>
        ) : (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            Inactief
          </span>
        )}

      </div>

      <div className="mt-6 space-y-2 text-sm">

        <div>
          📍 <strong>Vestiging:</strong>{" "}
          {medewerker.vestiging}
        </div>

        <div>
          💼 <strong>Functie:</strong>{" "}
          {medewerker.functie ??
            "Medewerker"}
        </div>

        <div>
          📞 <strong>Telefoon:</strong>{" "}
          {medewerker.telefoon ?? "-"}
        </div>

      </div>

      <div className="mt-6 flex gap-2">

        <Link
          href={`/medewerkers/${medewerker.id}`}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white transition hover:bg-blue-700"
        >
          Bewerken
        </Link>

        <Link
          href={`/medewerkers/${medewerker.id}/beschikbaarheid`}
          className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-center font-semibold text-white transition hover:bg-emerald-700"
        >
          Planning
        </Link>

      </div>

    </div>
  );
}