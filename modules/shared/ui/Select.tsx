import type { SelectHTMLAttributes } from "react";

interface Optie {
  waarde: string;
  label: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  fout?: string;
  opties: Optie[];
}

export default function Select({
  label,
  fout,
  opties,
  className = "",
  ...props
}: Readonly<Props>) {
  return (
    <div className="space-y-1">

      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <select
        {...props}
        className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${className}`}
      >
        {opties.map((optie) => (
          <option
            key={optie.waarde}
            value={optie.waarde}
          >
            {optie.label}
          </option>
        ))}
      </select>

      {fout && (
        <p className="text-sm text-red-600">
          {fout}
        </p>
      )}

    </div>
  );
}