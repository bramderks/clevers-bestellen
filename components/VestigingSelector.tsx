"use client";

interface VestigingSelectorProps {
  vestiging: string;
  onChange: (vestiging: string) => void;
}

export default function VestigingSelector({
  vestiging,
  onChange,
}: VestigingSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-lg font-semibold md:text-xl">
        Stap 1 - Kies vestiging
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <label
          className={`cursor-pointer rounded-xl border-2 p-5 transition ${
            vestiging === "nijmegen"
              ? "border-blue-600 bg-blue-50"
              : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
          }`}
        >
          <input
            type="radio"
            name="vestiging"
            value="nijmegen"
            checked={vestiging === "nijmegen"}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />

          <div className="flex items-center gap-3">
            <span className="text-3xl">🍦</span>

            <div>
              <div className="text-lg font-bold">
                Nijmegen
              </div>

              <div className="text-sm text-slate-500">
                Clevers Nijmegen
              </div>
            </div>
          </div>
        </label>

        <label
          className={`cursor-pointer rounded-xl border-2 p-5 transition ${
            vestiging === "roermond"
              ? "border-blue-600 bg-blue-50"
              : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
          }`}
        >
          <input
            type="radio"
            name="vestiging"
            value="roermond"
            checked={vestiging === "roermond"}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />

          <div className="flex items-center gap-3">
            <span className="text-3xl">🍦</span>

            <div>
              <div className="text-lg font-bold">
                Roermond
              </div>

              <div className="text-sm text-slate-500">
                Clevers Roermond
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}