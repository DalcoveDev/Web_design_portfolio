import type { Metadata, Viewport } from 'next';
import './globals.css';
import ThemeWrapper from '@/components/ThemeWrapper';

export const metadata: Metadata = {
  metadataBase: new URL('https://dalcove.dev'),
  title: {
    default: 'Dalcove — Web Designer & Frontend Developer',
    template: '%s | Dalcove',
  },
  description:
    'Portfolio of Dalcove, a web designer and frontend developer crafting modern, user-centered digital experiences. Specializing in React, Next.js, TypeScript, and immersive 3D web experiences.',
  keywords: [
    'web designer',
    'frontend developer',
    'React developer',
    'Next.js',
    'TypeScript',
    'UI/UX design',
    'portfolio',
    'Dalcove',
    'web development',
    '3D web experience',
    'Rwanda developer',
  ],
  authors: [{ name: 'Dalcove', url: 'https://dalcove.dev' }],
  creator: 'Dalcove',
  publisher: 'Dalcove',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dalcove.dev',
    siteName: 'Dalcove Portfolio',
    title: 'Dalcove — Web Designer & Frontend Developer',
    description:
      'Crafting modern, user-centered websites that merge visual beauty with functional precision. View my projects in fintech, AI, and web development.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dalcove — Web Designer & Frontend Developer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dalcove — Web Designer & Frontend Developer',
    description:
      'Crafting modern, user-centered websites that merge visual beauty with functional precision.',
    images: ['/og-image.png'],
    creator: '@DalcoveDev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0e0e0e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dalcove',
    jobTitle: 'Web Designer & Frontend Developer',
    url: 'https://dalcove.dev',
    sameAs: [
      'https://github.com/DalcoveDev',
      'https://instagram.com/DalcoveDev',
    ],
    knowsAbout: [
      'Web Design',
      'Frontend Development',
      'React',
      'Next.js',
      'TypeScript',
      'UI/UX Design',
      'Three.js',
      '3D Web Development',
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeWrapper>
          <div className="grain" aria-hidden="true" />
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
