import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

import './globals.css';
import { site } from '@/lib/content';
import SmoothScroll from '@/components/SmoothScroll';

/* Blue Ridge sets its type in Avenir Next LT Pro. Plus Jakarta Sans carries the
   same geometric-humanist character for display, with Inter for body copy. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
  weight: ['500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: `${site.retailerName} — Blue Ridge Communications Internet, TV, Mobile & Phone`,
    template: `%s · ${site.retailerName}`,
  },
  description:
    'Independent authorized retailer of Blue Ridge Communications. Order fiber and high-speed internet up to 2 Gig, three-year price-locked bundles, Blue Ridge Stream, Mobile and Home Phone across Northeast and Central Pennsylvania.',
  keywords: [
    'Blue Ridge Communications',
    'Blue Ridge Fiber',
    'Pennsylvania internet',
    'high-speed internet PA',
    'Blue Ridge Stream',
    'Blue Ridge Mobile',
    'HomeFi',
  ],
  openGraph: {
    type: 'website',
    title: `${site.retailerName} — Blue Ridge Communications Authorized Retailer`,
    description:
      'Fiber and high-speed internet up to 2 Gig, price-locked bundles, Stream, Mobile and Home Phone across Northeast and Central Pennsylvania.',
    siteName: site.retailerName,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#00061c',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <head>
        {/* Framer Motion serialises its `initial` state into the SSR markup as
            inline opacity:0. If the bundle never executes, the page would
            render blank — so with scripting off, force every reveal visible. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-br-electric focus:px-5 focus:py-3 focus:font-display focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
