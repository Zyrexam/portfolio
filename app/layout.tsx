import type { Metadata } from "next";
import { DM_Mono, DM_Serif_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
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
      <body
        className={`${inter.variable} ${dmSerif.variable} ${dmMono.variable} bg-background text-foreground`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
