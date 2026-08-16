import type { ReactNode } from "react";

interface Props {
  titel: string;
  waarde: string | number;
  icoon?: ReactNode;
  kleur?: "blue" | "green" | "orange" | "red" | "purple";
}

const kleuren = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  orange: "bg-orange-100 text-orange-700",
  red: "bg-red-100 text-red-700",
  purple: "bg-purple-100 text-purple-700",
};

export default function StatCard({
  titel,
  waarde,
  icoon,
  kleur = "blue",
}: Readonly<Props>) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {titel}
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {waarde}
          </h2>

        </div>

        {icoon && (
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${kleuren[kleur]}`}
          >
            {icoon}
          </div>
        )}

      </div>

    </div>
  );
}