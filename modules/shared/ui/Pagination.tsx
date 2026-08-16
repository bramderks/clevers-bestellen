"use client";

interface Props {
  pagina: number;
  totaalPaginas: number;
  onPaginaWijzigen: (pagina: number) => void;
}

export default function Pagination({
  pagina,
  totaalPaginas,
  onPaginaWijzigen,
}: Readonly<Props>) {
  if (totaalPaginas <= 1) {
    return null;
  }

  return (
    <div className="mt-6 flex items-center justify-between">

      <button
        type="button"
        onClick={() => onPaginaWijzigen(pagina - 1)}
        disabled={pagina === 1}
        className="rounded-xl border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        ← Vorige
      </button>

      <div className="text-sm text-slate-600">
        Pagina <strong>{pagina}</strong> van{" "}
        <strong>{totaalPaginas}</strong>
      </div>

      <button
        type="button"
        onClick={() => onPaginaWijzigen(pagina + 1)}
        disabled={pagina === totaalPaginas}
        className="rounded-xl border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Volgende →
      </button>

    </div>
  );
}