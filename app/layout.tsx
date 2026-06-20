import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mohit Kumar",
    template: "%s | Mohit Kumar",
  },
  description:
    "Portfolio of Mohit Kumar, a backend systems engineer focused on reliability, latency, and distributed systems under real-world constraints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
