import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif-luxury",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "PJ Holdings — Independent Venture & Creative Practice",
  description:
    "An independent holding and creative enterprise. Engineering enduring digital flagships, brand identities, and high-valuation ventures with quiet architectural precision.",
  openGraph: {
    title: "PJ Holdings — Independent Venture & Creative Practice",
    description:
      "Crafting enduring digital flagships and venture architecture with timeless restraint.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} dark antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-[#08080a] text-zinc-100 selection:bg-zinc-800 selection:text-white font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
