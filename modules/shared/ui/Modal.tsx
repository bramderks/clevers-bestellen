"use client";

import type { ReactNode } from "react";

interface Props {
  open: boolean;
  titel: string;
  children: ReactNode;
  onClose: () => void;
  grootte?: "sm" | "md" | "lg" | "xl";
}

const breedtes = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
};

export default function Modal({
  open,
  titel,
  children,
  onClose,
  grootte = "md",
}: Readonly<Props>) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

      <div
        className={`w-full ${breedtes[grootte]} rounded-2xl bg-white shadow-2xl`}
      >

        <header className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-xl font-semibold">
            {titel}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>

        </header>

        <div className="max-h-[75vh] overflow-y-auto p-6">
          {children}
        </div>

      </div>

    </div>
  );
}