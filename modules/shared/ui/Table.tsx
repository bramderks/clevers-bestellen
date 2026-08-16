import type { ReactNode } from "react";

interface Kolom {
  key: string;
  titel: string;
  className?: string;
}

interface Props<T> {
  kolommen: Kolom[];
  data: T[];
  render: (item: T, key: string) => ReactNode;
  leegTekst?: string;
}

export default function Table<T>({
  kolommen,
  data,
  render,
  leegTekst = "Geen gegevens gevonden.",
}: Readonly<Props<T>>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>
              {kolommen.map((kolom) => (
                <th
                  key={kolom.key}
                  className={`border-b border-slate-200 px-5 py-3 text-left text-sm font-semibold text-slate-700 ${kolom.className ?? ""}`}
                >
                  {kolom.titel}
                </th>
              ))}
            </tr>

          </thead>

          <tbody>

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={kolommen.length}
                  className="px-6 py-10 text-center text-slate-500"
                >
                  {leegTekst}
                </td>
              </tr>
            )}

            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >
                {kolommen.map((kolom) => (
                  <td
                    key={kolom.key}
                    className="px-5 py-4"
                  >
                    {render(item, kolom.key)}
                  </td>
                ))}
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}