import type { ReactNode } from "react";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

interface Props {
  children: ReactNode;
  naam: string;
  vestiging?: string;
}

export default function AppLayout({
  children,
  naam,
  vestiging,
}: Readonly<Props>) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <AppSidebar />

      <div className="flex min-h-screen flex-1 flex-col">

        <AppHeader
          naam={naam}
          vestiging={vestiging}
        />

        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}