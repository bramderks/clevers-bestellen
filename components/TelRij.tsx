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
    <>
      {/* MOBIEL */}
      <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm md:hidden">
        <div className="whitespace-nowrap text-base font-semibold text-slate-900">
          {naam}
        </div>

        <div className="mt-3 grid grid-cols-2 items-end gap-4">
          {/* Buffer */}
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Buffer
            </div>

            <div className="mt-1 text-lg font-bold text-slate-700">
              {buffer}
            </div>
          </div>

          {/* Geteld */}
          <div>
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

      {/* DESKTOP */}
      <div className="hidden grid-cols-[minmax(0,1fr)_60px_176px] items-center gap-3 border-b border-slate-300 py-3 md:grid">
        <div className="min-w-0 text-sm font-medium text-slate-900 md:text-base">
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
    </>
  );
}