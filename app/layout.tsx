import type {
  Metadata,
  Viewport,
} from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Clevers Bestelsysteem",

    template:
      "%s | Clevers Bestelsysteem",
  },

  description:
    "Bestel-, voorraad-, planning- en bedrijfsapp voor Clevers.",

  applicationName:
    "Clevers Bestelsysteem",

  authors: [
    {
      name: "Clevers",
    },
  ],

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
        {children}
      </body>
    </html>
  );
}