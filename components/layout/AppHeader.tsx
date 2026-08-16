"use client";

import { APP } from "@/lib/app";

interface Props {
  naam: string;
  vestiging?: string;
}

export default function AppHeader({
  naam,
  vestiging,
}: Readonly<Props>) {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">

      <div>

        <h1 className="text-2xl font-bold">
          {APP.naam}
        </h1>

        <p className="text-sm text-slate-500">
          {vestiging ?? "Alle vestigingen"}
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <div className="font-medium">
            {naam}
          </div>

          <div className="text-xs text-slate-500">
            {APP.appVersie}
          </div>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
          {naam.charAt(0).toUpperCase()}
        </div>

      </div>

    </header>
  );
}