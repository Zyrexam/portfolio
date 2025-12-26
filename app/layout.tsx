import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import CursorGlow from "@/components/ui/cursor-glow";
import CustomCursor from "@/components/ui/custom-cursor";
import "./globals.css";

const _inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});
const _jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Mohit Kumar",
    template: "%s | Mohit Kumar",
  },
  description:
    "Portfolio of Mohit Kumar, a software developer specialized in building scalable backend systems and machine learning applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${_inter.variable} ${_playfair.variable} ${_jetbrains.variable} font-sans antialiased text-foreground bg-background`}
      >
        <CustomCursor/>
        <CursorGlow />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
