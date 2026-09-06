import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohitkumar-six.vercel.app"),
  title: "Mohit Kumar — Backend Engineer | MohitOS",
  description:
    "Mohit Kumar — Backend Engineer · Graduated from Indian Institute of Technology (IIT), Jodhpur (2026). Explore my workstation: webhook systems, idempotency proxies, federated learning, and more. A portfolio built as a developer's file system.",
  keywords: [
    "Mohit Kumar",
    "Backend Engineer",
    "IIT Jodhpur",
    "Java",
    "Python",
    "FastAPI",
    "Distributed Systems",
    "Federated Learning",
    "Portfolio",
  ],
  authors: [{ name: "Mohit Kumar" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Mohit Kumar — Backend Engineer | MohitOS",
    description:
      "Browse a developer's workstation. Projects, research, and skills — as a file system.",
    url: "https://mohitkumar-six.vercel.app",
    siteName: "MohitOS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Kumar — Backend Engineer | MohitOS",
    description:
      "Browse a developer's workstation. Projects, research, and skills — as a file system.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e1e1e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans bg-vsc text-[#cccccc] antialiased overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
