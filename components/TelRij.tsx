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
    <div className="grid grid-cols-[1fr_70px_90px] md:grid-cols-[1fr_90px_140px] items-center gap-2 md:gap-4 border-b py-3">
      <div className="font-medium text-sm md:text-base break-words">
        {naam}
      </div>

      <div className="text-center text-gray-500 text-sm md:text-base">
        {buffer}
      </div>

      <input
        type="number"
        min={0}
        inputMode="numeric"
        value={aantal}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border px-2 md:px-3 py-2 text-center text-sm md:text-base"
      />
    </div>
  );
}