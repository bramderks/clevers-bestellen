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
    <div className="grid grid-cols-[1fr_90px_140px] items-center gap-4 border-b py-3">

      <div className="font-medium">
        {naam}
      </div>

      <div className="text-center text-gray-500">
        {buffer}
      </div>

      <input
        type="number"
        min={0}
        value={aantal}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        className="border rounded-lg px-3 py-2 text-center w-full"
      />

    </div>
  );
}