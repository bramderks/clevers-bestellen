"use client";

type Props = {
  vestiging: string;
  onChange: (vestiging: string) => void;
};

export default function VestigingSelector({
  vestiging,
  onChange,
}: Props) {
  return (
    <div className="mb-6 flex gap-3">
      {["Nijmegen", "Roermond"].map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`rounded-lg px-5 py-2 font-medium transition ${
            vestiging === v
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  );
}