import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Clevers Bestelsysteem",
    template: "%s | Clevers Bestelsysteem",
  },
  description: "Bestel-, voorraad- en bedrijfsapp voor Clevers",
  applicationName: "Clevers Bestelsysteem",
  authors: [
    {
      name: "Clevers",
    },
  ],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="bg-slate-100 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}