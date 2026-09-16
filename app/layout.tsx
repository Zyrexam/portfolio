import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohit Kumar — Software Engineer",
  description:
    "Software engineer building distributed systems, async pipelines, and payment-grade APIs where reliability, performance, and clean design meet. IIT Jodhpur '26.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--ws-bg)] text-[var(--ws-text-primary)]">{children}</body>
    </html>
  );
}
