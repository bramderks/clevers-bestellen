"use client";

import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  beschrijving?: string;
}

export default function Checkbox({
  label,
  beschrijving,
  className = "",
  ...props
}: Readonly<Props>) {
  return (
    <label className="flex cursor-pointer items-start gap-3">

      <input
        type="checkbox"
        {...props}
        className={`mt-1 h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 ${className}`}
      />

      <div>

        <div className="font-medium text-slate-800">
          {label}
        </div>

        {beschrijving && (
          <div className="mt-1 text-sm text-slate-500">
            {beschrijving}
          </div>
        )}

      </div>

    </label>
  );
}