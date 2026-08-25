"use client";

type Props = {
  vestiging: string;
  onChange: (vestiging: string) => void;
};

const vestigingen = [
  "Nijmegen",
  "Roermond",
] as const;

export default function VestigingSelector({
  vestiging,
  onChange,
}: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {vestigingen.map((naam) => {
        const actief =
          vestiging === naam;

        return (
          <button
            key={naam}
            type="button"
            onClick={() =>
              onChange(naam)
            }
            aria-pressed={actief}
            className={`rounded-lg px-5 py-2 font-medium transition ${
              actief
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {naam}
          </button>
        );
      })}
    </div>
  );
}