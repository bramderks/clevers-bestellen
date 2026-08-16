import type { ReactNode } from "react";

interface Props {
  titel: string;
  omschrijving?: string;
  children: ReactNode;
}

export default function FormSection({
  titel,
  omschrijving,
  children,
}: Readonly<Props>) {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <header>

        <h2 className="text-xl font-semibold">
          {titel}
        </h2>

        {omschrijving && (
          <p className="mt-2 text-sm text-slate-500">
            {omschrijving}
          </p>
        )}

      </header>

      <div className="grid gap-6">
        {children}
      </div>

    </section>
  );
}