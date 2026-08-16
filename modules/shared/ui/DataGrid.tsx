import type { ReactNode } from "react";

interface Column<T> {
  key: keyof T | string;
  title: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (row: T) => ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  rows: T[];
  emptyText?: string;
}

export default function DataGrid<T>({
  columns,
  rows,
  emptyText = "Geen gegevens gevonden.",
}: Readonly<Props<T>>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`border-b border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 ${
                    column.align === "center"
                      ? "text-center"
                      : column.align === "right"
                        ? "text-right"
                        : "text-left"
                  }`}
                  style={{
                    width: column.width,
                  }}
                >
                  {column.title}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  {emptyText}
                </td>
              </tr>
            )}

            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={`px-5 py-4 ${
                      column.align === "center"
                        ? "text-center"
                        : column.align === "right"
                          ? "text-right"
                          : "text-left"
                    }`}
                  >
                    {column.render
                      ? column.render(row)
                      : String(
                          row[column.key as keyof T] ?? "",
                        )}
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