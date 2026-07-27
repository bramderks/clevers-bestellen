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
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        Stap 1 - Kies vestiging
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
        <label className="flex items-center gap-2 rounded-lg border bg-white px-4 py-3 cursor-pointer hover:bg-slate-50">
          <input
            type="radio"
            name="vestiging"
            value="nijmegen"
            checked={vestiging === "nijmegen"}
            onChange={(e) => onChange(e.target.value)}
          />

          <span>nijmegen</span>
        </label>

        <label className="flex items-center gap-2 rounded-lg border bg-white px-4 py-3 cursor-pointer hover:bg-slate-50">
          <input
            type="radio"
            name="vestiging"
            value="roermond"
            checked={vestiging === "roermond"}
            onChange={(e) => onChange(e.target.value)}
          />

          <span>roermond</span>
        </label>
      </div>
    </div>
  );
}