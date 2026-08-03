import type { Vestiging } from "@/types";

interface Props {
  vestiging: Vestiging;
  medewerker: string;
  onMedewerkerChange: (
    waarde: string
  ) => void;
  stap: number;
  totaalStappen: number;
  controleStap: boolean;
}

export default function TelHeader({
  vestiging,
  medewerker,
  onMedewerkerChange,
  stap,
  totaalStappen,
  controleStap,
}: Props) {
  const percentage = Math.round(
    ((stap + 1) / totaalStappen) *
      100
  );

  return (
    <section className="rounded-xl border bg-blue-50 p-5">

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div>

          <div className="text-sm text-slate-600">
            Vestiging
          </div>

          <div className="text-xl font-bold capitalize">
            {vestiging}
          </div>

        </div>

        {!controleStap && (
          <div className="text-right">

            <div className="text-sm text-slate-600">
              Stap {stap + 1} van{" "}
              {totaalStappen}
            </div>

            <div className="text-lg font-semibold text-blue-700">
              {percentage}%
            </div>

          </div>
        )}

      </div>

      <div className="mt-5">

        <label className="mb-2 block text-sm font-medium">
          Naam medewerker
        </label>

        <input
          type="text"
          value={medewerker}
          onChange={(e) =>
            onMedewerkerChange(
              e.target.value
            )
          }
          placeholder="Bijvoorbeeld Bram"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
        />

      </div>

      {!controleStap && (
        <div className="mt-5">

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>
      )}

    </section>
  );
}