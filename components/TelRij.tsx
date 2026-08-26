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
    <div className="grid grid-cols-[minmax(0,1fr)_44px_176px] items-center gap-3 border-b border-slate-300 py-3 md:grid-cols-[minmax(0,1fr)_60px_176px]">
      <div className="min-w-0 break-words text-sm font-medium text-slate-900 md:text-base">
        {naam}
      </div>

      <div className="text-center text-base font-semibold text-slate-600">
        {buffer}
      </div>

      <div className="grid h-11 grid-cols-[44px_minmax(0,1fr)_44px] gap-1">
        <button
          type="button"
          onClick={() =>
            onChange(
              Math.max(
                0,
                aantal - 1
              )
            )
          }
          aria-label={`${naam} verlagen`}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500 p-0 text-2xl font-bold leading-none text-white transition-colors hover:bg-red-600 active:bg-red-700"
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
          aria-label={`${naam} aantal`}
          className="h-11 min-w-0 w-full rounded-xl border border-slate-300 bg-white text-center text-lg font-bold outline-none [appearance:textfield] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          onClick={() =>
            onChange(
              aantal + 1
            )
          }
          aria-label={`${naam} verhogen`}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 p-0 text-2xl font-bold leading-none text-white transition-colors hover:bg-green-700 active:bg-green-800"
        >
          +
        </button>
      </div>
    </div>
  );
}