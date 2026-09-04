import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mohit Kumar",
    template: "%s | Mohit Kumar",
  },
  description:
    "Portfolio of Mohit Kumar, a backend systems engineer focused on reliability, latency, and distributed systems under real-world constraints.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mohit Kumar — Portfolio",
    title: "Mohit Kumar — Backend Engineer",
    description:
      "Backend systems engineer focused on reliability, latency, and distributed systems under real-world constraints.",
  },
  twitter: {
    card: "summary",
    title: "Mohit Kumar — Backend Engineer",
    description:
      "Backend systems engineer focused on reliability, latency, and distributed systems under real-world constraints.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: -1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
            opacity: 0.04,
          }}
          aria-hidden="true"
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
