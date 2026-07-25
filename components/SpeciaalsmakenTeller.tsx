interface Props {
  waarde: number;
  onChange: (waarde: number) => void;
  slagroom: number;
  onSlagroomChange: (waarde: number) => void;
}

export default function SpeciaalsmakenTeller({
  waarde,
  onChange,
  slagroom,
  onSlagroomChange,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-4 md:p-6">
      <h2 className="mb-4 md:mb-6 text-xl md:text-2xl font-bold">
        Speciaalsmaken
      </h2>

      <p className="mb-6 text-sm text-gray-600">
        Tel het totaal aantal bakken speciaalsmaken en de voorraad slagroom.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border p-4">
        <span className="font-medium">
          Speciaalsmaken (totaal)
        </span>

        <input
          type="number"
          min={0}
          inputMode="numeric"
          value={waarde}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-full sm:w-24 rounded border px-3 py-2 text-center"
        />
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border p-4">
        <span className="font-medium">
          Slagroom
        </span>

        <input
          type="number"
          min={0}
          inputMode="numeric"
          value={slagroom}
          onChange={(e) =>
            onSlagroomChange(Number(e.target.value) || 0)
          }
          className="w-full sm:w-24 rounded border px-3 py-2 text-center"
        />
      </div>
    </div>
  );
}