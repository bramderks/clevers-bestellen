"use client";

interface Props {
  naam: string;
  buffer: number;
  aantal: number;
  onChange: (waarde: number) => void;
}

export default function TelRij({
  naam,
  buffer,
  aantal,
  onChange,
}: Props) {
  return (
    <div className="grid grid-cols-[1fr_60px_140px] md:grid-cols-[1fr_90px_180px] items-center gap-3 border-b py-3">
      <div className="font-medium text-sm md:text-base break-words">
        {naam}
      </div>

      <div className="text-center text-gray-500">
        {buffer}
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, aantal - 1))}
          className="h-10 w-10 rounded-lg bg-red-500 text-xl font-bold text-white active:scale-95"
        >
          −
        </button>

        <input
          type="number"
          min={0}
          inputMode="numeric"
          value={aantal}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-16 rounded-lg border py-2 text-center font-semibold"
        />

        <button
          type="button"
          onClick={() => onChange(aantal + 1)}
          className="h-10 w-10 rounded-lg bg-green-600 text-xl font-bold text-white active:scale-95"
        >
          +
        </button>
      </div>
    </div>
  );
}