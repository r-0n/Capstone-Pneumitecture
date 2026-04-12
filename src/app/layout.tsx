import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const display = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pneumitecture | Inflatable Systems for Adaptive Spaces",
  description:
    "Soft responsive architecture — pneumatic cellular modules, system design, and adaptive spatial design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} theme-light h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-dvh bg-[var(--canvas)] text-[var(--ink)]"
        suppressHydrationWarning
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
