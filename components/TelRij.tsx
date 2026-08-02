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
    <div className="grid grid-cols-[1fr_60px_150px] items-center gap-3 border-b py-3 md:grid-cols-[1fr_90px_190px]">
      <div className="break-words font-medium text-sm md:text-base">
        {naam}
      </div>

      <div className="text-center text-base font-semibold text-slate-600">
        {buffer}
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, aantal - 1))}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500 text-2xl font-bold text-white transition hover:bg-red-600 active:scale-95"
        >
          −
        </button>

        <input
          type="number"
          min={0}
          inputMode="numeric"
          value={aantal}
          onChange={(e) =>
            onChange(
              Math.max(
                0,
                Number(e.target.value) || 0
              )
            )
          }
          className="h-11 w-16 rounded-xl border border-slate-300 text-center text-lg font-bold outline-none transition focus:border-blue-500"
        />

        <button
          type="button"
          onClick={() => onChange(aantal + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-2xl font-bold text-white transition hover:bg-green-700 active:scale-95"
        >
          +
        </button>
      </div>
    </div>
  );
}