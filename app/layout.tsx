import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://earl-portfolio.onedevph.online'),
  title: 'Earl Romeo Ordovez — Fullstack Developer & Creative Technologist',
  description:
    'Portfolio of Earl Romeo Ordovez — Fullstack developer crafting developer tools, embedded IoT systems, robotics simulations, and interactive web applications.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Earl Romeo Ordovez — Fullstack Developer & Creative Technologist',
    description:
      'Portfolio of Earl Romeo Ordovez — Fullstack developer crafting developer tools, embedded IoT systems, robotics simulations, and interactive web applications.',
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
    title: 'Earl Romeo Ordovez — Fullstack Developer & Creative Technologist',
    description:
      'Portfolio of Earl Romeo Ordovez — Fullstack developer crafting developer tools, embedded IoT systems, robotics simulations, and interactive web applications.',
    images: ['/EARL_ORDOVEZ.JPG'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-accent="ember">
      <body className="bg-paper text-ink font-sans antialiased selection:bg-accent selection:text-accent-ink">
        {children}
      </body>
    </html>
  );
}
