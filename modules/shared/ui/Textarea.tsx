import type { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  fout?: string;
}

export default function Textarea({
  label,
  fout,
  className = "",
  rows = 4,
  ...props
}: Readonly<Props>) {
  return (
    <div className="space-y-1">

      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <textarea
        {...props}
        rows={rows}
        className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100 resize-y ${className}`}
      />

      {fout && (
        <p className="text-sm text-red-600">
          {fout}
        </p>
      )}

    </div>
  );
}