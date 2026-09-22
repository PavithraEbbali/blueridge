import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import './globals.css';
import { site } from '@/lib/content';
import SmoothScroll from '@/components/SmoothScroll';

/* Blue Ridge sets its type in Avenir Next LT Pro. Plus Jakarta Sans carries
   the same geometric-humanist character for display, with Inter for body.
 *
 * Loaded from committed files rather than `next/font/google`. That loader
 * fetches the Google Fonts stylesheet during the build, so the build needs
 * outbound network — and it fails hard when it cannot get it:
 *
 *   TypeError: Cannot read properties of null (reading '1')
 *   at next/dist/compiled/@next/font/dist/google/loader.js
 *
 * which is what broke the first Vercel deploys. These are the identical
 * latin-subset variable woff2 files that loader was downloading, so the
 * rendering is unchanged and the build no longer touches the network. */
const jakarta = localFont({
  src: './fonts/PlusJakartaSans-latin.woff2',
  weight: '500 800',
  style: 'normal',
  display: 'swap',
  variable: '--font-jakarta',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

const inter = localFont({
  src: './fonts/Inter-latin.woff2',
  weight: '400 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-inter',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
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
