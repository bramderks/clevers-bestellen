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
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="grid grid-cols-[minmax(0,1fr)_72px_132px] items-start gap-3">
        {/* Product */}
        <div className="min-w-0 pt-2">
          <div className="whitespace-nowrap text-sm font-semibold text-slate-900 md:text-base">
            {naam}
          </div>
        </div>

        {/* Buffer */}
        <div className="text-center">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Buffer
          </div>

          <div className="mt-1 text-lg font-bold text-slate-700">
            {buffer}
          </div>
        </div>

        {/* Geteld */}
        <div className="text-center">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Geteld
          </div>

          <div className="mt-1 grid grid-cols-[40px_minmax(0,1fr)_40px] gap-1">
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
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 p-0 text-xl font-bold leading-none text-white transition-colors hover:bg-red-600 active:bg-red-700"
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
              className="h-10 min-w-0 w-full rounded-lg border border-slate-300 bg-white text-center text-lg font-bold outline-none [appearance:textfield] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />

            <button
              type="button"
              onClick={() =>
                onChange(
                  aantal + 1
                )
              }
              aria-label={`${naam} verhogen`}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 p-0 text-xl font-bold leading-none text-white transition-colors hover:bg-green-700 active:bg-green-800"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}