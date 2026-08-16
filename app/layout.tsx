import type {
  Metadata,
  Viewport,
} from "next";

import "./globals.css";
import { APP } from "@/lib/config/app";

export const metadata: Metadata = {
  title: {
    default: APP.naam,
    template: `%s | ${APP.naam}`,
  },

  description:
    "Intern voorraad-, bestel- en operationeel managementsysteem voor geautoriseerde Clevers-vestigingen.",

  applicationName: APP.naam,

  authors: [
    {
      name: APP.eigenaar,
    },
  ],

  creator: APP.eigenaar,

  publisher: APP.eigenaar,

  icons: {
    icon: "/favicon.png",
  },

  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<Props>) {
  return (
    <html
      lang="nl"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t border-slate-200 bg-white px-4 py-2 text-center text-xs text-slate-500">
            {APP.copyright} • {APP.naam} • {APP.footer}
          </footer>
        </div>
      </body>
    </html>
  );
}