import type { Metadata } from "next";
import { Bebas_Neue, Syne } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Syne({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Breathing Walls | Prototyping Empathic Spaces",
  description:
    "Living architecture and pneumatic soft robotics — TPU cells that breathe with human presence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-dvh bg-[var(--bg)] text-[var(--fg)]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
