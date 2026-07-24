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

      <h2 className="text-xl font-semibold mb-4">
        Stap 1 - Kies vestiging
      </h2>

      <div className="flex gap-6">

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="vestiging"
            value="Nijmegen"
            checked={vestiging === "Nijmegen"}
            onChange={(e) => onChange(e.target.value)}
          />

          Nijmegen
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="vestiging"
            value="Roermond"
            checked={vestiging === "Roermond"}
            onChange={(e) => onChange(e.target.value)}
          />

          Roermond
        </label>

      </div>

    </div>
  );
}