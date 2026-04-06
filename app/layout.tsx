import type { Metadata } from "next";
import { Inter, Noto_Sans_Ethiopic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { SearchProvider } from "@/components/SearchProvider";
import { ThemeProvider, themeScript } from "@/components/ThemeProvider";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const notoEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-noto-ethiopic",
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ወይኩን ፈቃድከ | Official Channel",
  description: "Watch the latest videos from ወይኩን ፈቃድከ (@Desalegn-e1n)",
  manifest: "/manifest.json",
  openGraph: {
    title: "ወይኩን ፈቃድከ",
    description: "Official video platform for ወይኩን ፈቃድከ",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="am" className={`${inter.variable} ${notoEthiopic.variable}`}>
      <head>
        {/* Blocking theme script — prevents flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-surface text-white min-h-screen">
        <ThemeProvider>
          <ServiceWorkerRegister />
          <SearchProvider>
            <Navbar />
            <main className="pt-16 pb-mobile">{children}</main>
            <Footer />
            <BottomNav />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
