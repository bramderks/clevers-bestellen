"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  {
    href: "/dashboard",
    icoon: "🏠",
    titel: "Dashboard",
  },
  {
    href: "/tellen",
    icoon: "🍦",
    titel: "Nieuwe telling",
  },
  {
    href: "/historie",
    icoon: "📚",
    titel: "Historie",
  },
  {
    href: "/producten",
    icoon: "🛒",
    titel: "Producten",
  },
  {
    href: "/medewerkers",
    icoon: "👥",
    titel: "Medewerkers",
  },
  {
    href: "/planning",
    icoon: "📅",
    titel: "Planning",
  },
  {
    href: "/weektaken",
    icoon: "✅",
    titel: "Weektaken",
  },
  {
    href: "/instellingen",
    icoon: "⚙️",
    titel: "Instellingen",
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white">

      <div className="border-b px-6 py-6">
        <h2 className="text-2xl font-bold">
          Clevers
        </h2>

        <p className="text-sm text-slate-500">
          Bestellen
        </p>
      </div>

      <nav className="flex-1 p-4">

        <ul className="space-y-2">

          {MENU.map((item) => {
            const actief =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    actief
                      ? "flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white"
                      : "flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                  }
                >
                  <span className="text-xl">
                    {item.icoon}
                  </span>

                  <span>
                    {item.titel}
                  </span>
                </Link>
              </li>
            );
          })}

        </ul>

      </nav>

    </aside>
  );
}