import type { Metadata } from 'next';
import { Inter, Noto_Sans_Ethiopic } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { SearchProvider } from '@/components/SearchProvider';
import { ThemeProvider, themeScript } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const notoEthiopic = Noto_Sans_Ethiopic({
  subsets: ['ethiopic'],
  variable: '--font-noto-ethiopic',
  weight: ['400', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ወይኩን ፈቃድከ | Official Channel',
  description: 'Watch the latest videos from ወይኩን ፈቃድከ (@Desalegn-e1n)',
  manifest: '/manifest.json',
  openGraph: {
    title: 'ወይኩን ፈቃድከ',
    description: 'Official video platform for ወይኩን ፈቃድከ',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontClass = [inter.variable, notoEthiopic.variable].sort().join(' ');

  return (
    <html lang="am" className={fontClass}>
      <head>
        {/* Blocking theme script — prevents flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Font preconnects to improve loading and reduce CLS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Prefer a theme-color for mobile UI */}
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-surface text-white min-h-screen">
        <ThemeProvider>
          <SearchProvider>
            <Navbar />
            <main className="pt-20 pb-24 pb-mobile">{children}</main>
            <Footer />
            <BottomNav />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
