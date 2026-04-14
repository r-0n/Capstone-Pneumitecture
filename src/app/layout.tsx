import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Instrument_Sans, Inter } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import { publicAssetPath } from "@/lib/publicAssetPath";
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

const heroBgUrl = publicAssetPath("/images/backg.PNG");
const heroNoiseUrl = publicAssetPath("/images/noise.svg");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} theme-light h-full antialiased`}
      style={
        {
          ["--hero-bg-image" as string]: `url('${heroBgUrl}')`,
          ["--hero-noise-image" as string]: `url('${heroNoiseUrl}')`,
        } as CSSProperties
      }
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
