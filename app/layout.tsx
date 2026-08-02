import type { Metadata } from 'next';
import { Anton, Instrument_Serif, Inter } from 'next/font/google';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Earl Romeo Ordovez — Full Stack Developer',
  description:
    'Portfolio of Earl Romeo Ordovez, a full stack developer crafting immersive digital experiences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${instrumentSerif.variable} ${inter.variable}`}
    >
      <body className="bg-ink text-cream font-sans antialiased">{children}</body>
    </html>
  );
}
