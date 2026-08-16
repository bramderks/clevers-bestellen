import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fout?: string;
}

export default function Input({
  label,
  fout,
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

      <input
        {...props}
        className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 ${className}`}
      />

      {fout && (
        <p className="text-sm text-red-600">
          {fout}
        </p>
      )}

    </div>
  );
}