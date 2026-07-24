import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clevers Bestelsysteem",
  description: "AI Bestelsysteem voor Clevers IJsbar",
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
      <body>{children}</body>
    </html>
  );
}