import type {
  Metadata,
  Viewport,
} from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Clevers Bestellen",

    template:
      "%s | Clevers Bestellen",
  },

  description:
    "Intern voorraad-, bestel- en operationeel managementsysteem voor geautoriseerde Clevers-vestigingen.",

  applicationName:
    "Clevers Bestellen",

  authors: [
    {
      name: "Bram Derks Holding B.V.",
    },
  ],

  creator:
    "Bram Derks Holding B.V.",

  publisher:
    "Bram Derks Holding B.V.",

  icons: {
    icon: "/favicon.png",
  },

  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width:
    "device-width",

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
            © 2026 Bram Derks Holding B.V. • Clevers Bestellen • Uitsluitend bestemd voor geautoriseerde gebruikers en gelicentieerde vestigingen.
          </footer>
        </div>
      </body>
    </html>
  );
}