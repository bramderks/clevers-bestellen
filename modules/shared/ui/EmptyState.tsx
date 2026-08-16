import type { ReactNode } from "react";

import Button from "./Button";

interface Props {
  titel: string;
  omschrijving?: string;
  icoon?: ReactNode;

  actieLabel?: string;
  onActie?: () => void;
}

export default function EmptyState({
  titel,
 omschrijving,
  icoon = "📭",
  actieLabel,
  onActie,
}: Readonly<Props>) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center">

      <div className="mb-4 text-6xl">
        {icoon}
      </div>

      <h2 className="text-2xl font-semibold">
        {titel}
      </h2>

      {omschrijving && (
        <p className="mt-3 max-w-lg text-slate-500">
          {omschrijving}
        </p>
      )}

      {actieLabel && onActie && (
        <div className="mt-8">
          <Button onClick={onActie}>
            {actieLabel}
          </Button>
        </div>
      )}

    </div>
  );
}