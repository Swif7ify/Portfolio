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
  metadataBase: new URL('https://earl-portfolio.onedevph.online'),
  title: 'Earl Romeo Ordovez — Full Stack Developer',
  description:
    'Portfolio of Earl Romeo Ordovez, a full stack developer crafting immersive digital experiences.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Earl Romeo Ordovez — Full Stack Developer',
    description:
      'Portfolio of Earl Romeo Ordovez, a full stack developer crafting immersive digital experiences.',
    url: 'https://earl-portfolio.onedevph.online',
    siteName: 'Earl Romeo Ordovez Portfolio',
    images: [
      {
        url: '/EARL_ORDOVEZ.JPG',
        width: 1200,
        height: 630,
        alt: 'Earl Romeo Ordovez',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Earl Romeo Ordovez — Full Stack Developer',
    description:
      'Portfolio of Earl Romeo Ordovez, a full stack developer crafting immersive digital experiences.',
    images: ['/EARL_ORDOVEZ.JPG'],
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
      className={`${anton.variable} ${instrumentSerif.variable} ${inter.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-cream font-sans antialiased">{children}</body>
    </html>
  );
}
