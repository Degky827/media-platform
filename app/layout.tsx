import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Sans_Ethiopic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-noto-ethiopic",
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ወይኩን ፈቃድከ | Official Channel",
  description: "Watch the latest videos from ወይኩን ፈቃድከ (@Desalegn-e1n)",
  openGraph: {
    title: "ወይኩን ፈቃድከ",
    description: "Official video platform for ወይኩን ፈቃድከ",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="am" className={`${inter.variable} ${notoEthiopic.variable}`}>
      <body className="bg-surface text-white min-h-screen">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
