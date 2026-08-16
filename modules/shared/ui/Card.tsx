import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  titel?: string;
  acties?: ReactNode;
  className?: string;
}

export default function Card({
  children,
  titel,
  acties,
  className = "",
}: Readonly<Props>) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      {(titel || acties) && (
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

          <h2 className="text-lg font-semibold">
            {titel}
          </h2>

          {acties && (
            <div className="flex items-center gap-2">
              {acties}
            </div>
          )}

        </header>
      )}

      <div className="p-6">
        {children}
      </div>
    </section>
  );
}