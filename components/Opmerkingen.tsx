"use client";

interface Props {
  opmerkingen: string[];
}

export default function Opmerkingen({ opmerkingen }: Props) {
  return (
    <div className="mt-8 rounded-xl border bg-white p-5">
      <h3 className="text-lg font-semibold mb-3">
        Opmerkingen AI
      </h3>

      {opmerkingen.length === 0 ? (
        <p className="text-green-700">
          ✓ Geen bijzonderheden gevonden.
        </p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {opmerkingen.map((opmerking, index) => (
            <li key={index} className="text-orange-700">
              {opmerking}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}